import { ObjectRef } from "unyt_core/datex_all.ts";
import { sessionS } from "backend/data.ts";
import { Context } from "uix/routing/context.ts";

export interface SessionData {
  code: string;
  host: string;
  clients: string[];
  playList: string[];
};

export class PlayerSession {
  id: string;
  sessionData: ObjectRef<SessionData>;

  constructor(session: ObjectRef<SessionData>, sessions: PlayerSessionManager, generate: boolean = false) {
    this.id = crypto.randomUUID();
    this.sessionData = session;
    if (generate) {
      let code = null;
      // check if the code is already in use
      while (!code || sessions.getByCode(code)) {
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

  addSong(song: string) {
    this.sessionData.$.playList.val.push(song);
  }
}

export class PlayerSessionManager {
  sessions: ObjectRef<Array<PlayerSession>>;

  constructor() {
    this.sessions = sessionS.$.map(session => new PlayerSession(session, this)) as unknown as ObjectRef<Array<PlayerSession>>;
  }

  create(userId: string) {
    const sessionData = $$({ code: "", host: userId, clients: [], playList: [] });
    const session = new PlayerSession(sessionData, this, true);
    sessionS.push(session.sessionData);
    this.sessions.push(session);
    return session;
  }

  getByUserId(userId: string) {
    return this.sessions.find(session => session.sessionData.host === userId);
  }

  getByCode(code: string) {
    return this.sessions.find(session => session.sessionData.code === code);
  }
}

type UserSession = {
  userId: string;
};

export const getUserSession = async (ctx: Context) => {
  const sharedData = (await ctx.getSharedData()) as UserSession;
  if (!sharedData.userId) {
    sharedData.userId = crypto.randomUUID();
  }
  return sharedData.userId;
}