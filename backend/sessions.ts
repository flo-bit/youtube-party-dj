import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { getUserPlayerInstances, play } from "backend/integrations/discord/Client.ts";
import { datexClassType } from "unyt_core/datex_all.ts";
import { UserData } from "common/components/integrations/discord/Definitions.ts";

export type Item = {
  title: string;
  thumbnail: string;
  duration: string;
  id: string;
  likes: Set<string>;
  liked?: boolean;
  added: number;
};

export interface Client {
	id: string;
	name: string;
}

// TO ADD: In the session, clientName should also be saved together with clientId
export interface SessionData {
  code: string;
  hostId: string;
  clientIds: Set<string>;
  clients: Record<string, Client>;
  queue: Item[];
  recommendedQueue: Item[];
  currentlyPlaying: Item | null;
};

// map of session codes to session data
export const sessions = eternalVar('sessions-1234') ?? $$({} as Record<string, SessionData>);

export const getAndRemoveNextVideoFromSession = (code: string) => {
  const session = sessions[code];
  if (!session) {
    return;
  }
  console.log(session.queue);
  const video = session.queue.shift();
  if (video) {
    session.currentlyPlaying = video;
    const playerInstances = getUserPlayerInstances(session.hostId);
    if (playerInstances)
      play(
        playerInstances,
        {
          track: video.id,
        },
        () => getAndRemoveNextVideoFromSession(code)
      );
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
      return sessions[code];
    }
  }

  // create new
  const session = createSession(user.userId);

  return session;
}


export const updateUser = (code: string) => {
  const client = getUser();
  const session = sessions[code];
  if (!session) {
    return;
  }
  session.clientIds.add(client.userId);

  console.log(session);
  
  return session;
}

export const addClientsInfo = (code: string, nick: string) => {
  const client = getUser();
  const session = sessions[code];
  if (!session) {
    return;
  }

  session.clients[client.userId] = {
    id: client.userId,
    name: nick
  };

  return session;
}

export const toggleLike = (code: string, videoId: string) => {
  try {
    const user = getUser();

    const session = sessions[code];
    if (!session) {
      return;
    }
    const video = session.queue.find((video) => video.id == videoId);
    if (!video) {
      return;
    }
    if (video.likes.has(user.userId)) {
      video.likes.delete(user.userId);
    } else {
      video.likes.add(user.userId);
    }

    // this breaks shit
    // sortVideos(session.queue);

    return video;
  } catch (error) {
    console.error(error);
  }
}

const users = eternalVar("users") ?? $$({} as Record<string, datexClassType<ObjectRef<typeof UserData>>>)

export const getUser = (endpoint?: string) => {
  /**
   * Returns an existing or a newly created user session.
   * 
   * @param endpoint - The endpoint must be passed as a parameter if the function is called from the backend
   * @returns A new or existing user session
   */
  const user = endpoint ? endpoint : datex.meta.caller.main.toString();
  if (!(user in users)) {
    users[user] = new UserData();
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
    clients: {} as Record<string, Client>,
    queue: [] as Item[],
    recommendedQueue: [] as Item[],
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
    if (getUserPlayerInstances(session.hostId).length > 0) {
      getAndRemoveNextVideoFromSession(code);
    }
  }

  return session;
}

export const getRecommendedQueue = (code: string) => {
  const session = sessions[code];
  if (!session) {
    console.log("no session!")
    return $$([])
  }
  return always(() => {
    return session.recommendedQueue
  });
}