import { Context } from "uix/routing/context.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";

export type Item = {
  title: string;
  thumbnail: string;
  duration: string;
  id: string;
  likes: Set<string>;
  liked?: boolean;
  added: number;
};

export interface SessionData {
  code: string;
  hostId: string;
  clientIds: Set<string>;
  queue: Item[];
  currentlyPlaying: Item | null;
};

// map of session codes to session data
export const sessions = eternalVar('sessions-1234') ?? $$({} as Record<string, SessionData>);

export const getAndRemoveNextVideoFromSession = (code: string) => {
  const session = sessions[code];
  console.log(session);
  if (!session) {
    return;
  }
  console.log(session.queue);
  const video = session.queue.shift();
  if (video) {
    session.currentlyPlaying = video;
  }
  return video;
}

export const getSessionWithCode = (code: string) => {
  return sessions[code];
}

export const getSessionUserHosts = async () => {
  console.log('sessions', sessions)
  const user = await getUserId();
  for (const code of Object.keys(sessions)) {
    if (sessions[code].hostId === user.userId) {
      console.log('found session', sessions[code]);
      return sessions[code];
    }
  }

  // create new
  const session = createSession(user.userId);

  return session;
}

export const addClientToSession = async (code: string) => {
  const client = await getUserId();
  const session = sessions[code];
  if (!session) {
    return;
  }
  session.clientIds.add(client.userId);

  console.log(session);

  return session;
}

export const toggleLike = async (code: string, videoId: string) => {
  console.log(code, videoId);
  try {
    const user = await getUserId();

    const session = sessions[code];
    console.log(session);
    if (!session) {
      return;
    }
    const video = session.queue.find((video) => video.id == videoId);
    console.log(video);
    if (!video) {
      return;
    }
    if (video.likes.has(user.userId)) {
      console.log('deleting like');
      video.likes.delete(user.userId);
    } else {
      console.log('adding like');
      video.likes.add(user.userId);
    }

    // this breaks shit
    //sortVideos(session.queue);

    return video;
  } catch (error) {
    console.error(error);
  }
}

export const getUserId = async () => {
  const privateData = (await Context.getPrivateData(datex.meta)) as { userId: string };
  if (!privateData.userId) {
    privateData.userId = crypto.randomUUID()
  }
  return privateData;
}

const createSession = (userId: string) => {
  // create random code that is not already in use
  let code = null;

  // check if the code is already in use
  while (!code || sessions[code]) {
    // generate a random 4 character code consisting of uppercase letters and numbers
    code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 36).toString(36).toUpperCase()).join('');
  }
  const session = {
    code,
    hostId: userId,
    clientIds: new Set() as Set<string>,
    queue: [] as Item[],
    currentlyPlaying: null as Item | null,
  };
  sessions[code] = session;

  return session;
}

const sortVideos = (videos: ObjectRef<Item[]>) => {
  console.log("sorting", videos);
  videos.sort((a, b) => {
    if (a.likes.size > b.likes.size) return -1;
    if (a.likes.size < b.likes.size) return 1;
    if (a.added > b.added) return 1;
    if (a.added < b.added) return -1;
    return 0;
  });
  console.log("sorted", videos);
}

export const getSortedQueue = (code: string) => {
  const session = sessions[code];
  if (!session) {
    console.log("no session!")
    return $$([])
  }
  return always(() => {
    return session.queue.toSorted((a, b) => {
      if (a.likes.size > b.likes.size) return -1;
      if (a.likes.size < b.likes.size) return 1;
      if (a.added > b.added) return 1;
      if (a.added < b.added) return -1;
      return 0;
    });
  });
}