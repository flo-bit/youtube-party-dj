import { Context } from "uix/routing/context.ts";
import { PrivateSessionData, SessionData } from "../common/helpers/sessions.ts";
import { ObjectRef } from "unyt_core/runtime/pointers.ts";
import { sampleQueue, sessionS } from "backend/data.tsx";

class PlayerSession {
  id: string;
  sessionData: ObjectRef<SessionData>;

  constructor(session: ObjectRef<SessionData>, sessions: PlayerSessionManager, generate: boolean = false) {
    this.id = crypto.randomUUID();
    this.sessionData = session;
    if (generate) {
      let code = null;
      // check if the code is already in use
      while (!code || sessions.get(code)) {
        // generate a random 4 character code consisting of uppercase letters and numbers
        code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 36).toString(36).toUpperCase()).join('');
      }
      this.sessionData.$.code.val = code;
    }
  }

  addClient(userId: string) {
    this.sessionData.$.clients.val.push(userId);
  }

  removeClient(userId: string) {
    this.sessionData.$.clients.val = this.sessionData.$.clients.val.filter(client => client !== userId);
  }
}

export class PlayerSessionManager {
  sessions: ObjectRef<Array<PlayerSession>>;

  constructor() {
    console.log(sessionS)
    this.sessions = sessionS.$.map(session => new PlayerSession(session, this)) as unknown as ObjectRef<Array<PlayerSession>>;
  }

  create(userId: string) {
    console.log("Creating new session with host", userId, "...");
    const sessionData = $$({ code: "", host: userId, clients: [], queue: $$(sampleQueue) });
    const session = new PlayerSession(sessionData, this, true);
    sessionS.push(session.sessionData);
    this.sessions.push(session);
    console.log(session);
    return session;
  }

  getByUserId(userId: string) {
    return this.sessions.find(session => session.sessionData.host === userId);
  }

  get(code: string) {
    return this.sessions.find(session => session.sessionData.code === code);
  }
}

const playerSessionManager = new PlayerSessionManager();

const getUserSession = async () => {
  const privateData = (await Context.getPrivateData(datex.meta)) as PrivateSessionData;
  if (!privateData.userSession) {
    privateData.userSession = {
      userId: crypto.randomUUID(),
    };
  }
  return privateData.userSession;
}

export const getPlayerSession = async () => {
  const userSession = await getUserSession();
  if (!userSession.playerSession) {
    userSession.playerSession = playerSessionManager.getByUserId(userSession.userId);
    if (!userSession.playerSession) {
      userSession.playerSession = playerSessionManager.create(userSession.userId);
    }
  }
  return userSession.playerSession;
}

export const addClient = async (code: string) => {
  const session = playerSessionManager.get(code);
  if (!session) {
    return;
  }
  session.addClient((await getUserSession()).userId);
}