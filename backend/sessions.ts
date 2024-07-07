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

const sorter = (a: Item, b: Item) => {
  if (a.likes.size > b.likes.size) return -1;
  if (a.likes.size < b.likes.size) return 1;
  if (a.added > b.added) return 1;
  if (a.added < b.added) return -1;
  return 0;
}

export const getAndRemoveNextVideoFromSession = (code: string) => {
  const session = sessions[code];
  console.log(session);
  if (!session) {
    return;
  }

  // sort queue by likes and added date, get and remove the first video
  const video = session.queue.sort(sorter).shift();
  if (video) {
    session.currentlyPlaying = video;
  } else {
    session.currentlyPlaying = null;
  }
  return video;
}

export const getSessionWithCode = (code: string) => {
  return sessions[code];
}

export const getSessionUserHosts = () => {
  const user = getUser();

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

export const addClientToSession = (code: string) => {
  const client = getUser();
  const session = sessions[code];
  if (!session) {
    return;
  }
  session.clientIds.add(client.userId);

  console.log(session);

  return session;
}

export const toggleLike = (code: string, videoId: string) => {
  try {
    const user = getUser();

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

const users = eternalVar("users") ?? $$({} as Record<string, UserData>)

export const getUser = (endpoint?: string) => {
  /**
   * Returns an existing or a newly created user session.
   * 
   * @param endpoint - The endpoint must be passed as a parameter if the function is called from the backend
   * @returns A new or existing user session
   */
  const user = endpoint ? endpoint : datex.meta.caller.main.toString();
  if (!(user in users)) {
    users[user] = $$({
      userId: crypto.randomUUID()
    })
  }
  return users[user];
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

export const addItemToQueue = (code: string, item: Item) => {
  const session = sessions[code];
  if (!session) {
    return;
  }
  session.queue.push(item);

  console.log("session", session);
  if (!session.currentlyPlaying) {
    if (playerInstances[session.hostId]) {
      getAndRemoveNextVideoFromSession(code);
    }
  }

  return session;
}