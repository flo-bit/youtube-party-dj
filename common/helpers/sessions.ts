import { ObjectRef } from "unyt_core/datex_all.ts";
import { Context } from "uix/routing/context.ts";
import { Item } from "backend/data.tsx";

export interface SessionData {
  code: string;
  host: string;
  clients: string[];
  queue: ObjectRef<Item[]>;
};

export interface UserSession {
  userId: string;
  playerSession?: PlayerSession;
};

export interface PrivateSessionData {
  userSession: UserSession;
};

export interface PlayerSession {
  id: string;
  sessionData: ObjectRef<SessionData>;
};

export interface PlayerSessionManager {
  sessions: ObjectRef<Array<PlayerSession>>;
};

export const getUserSession = async (ctx: Context) => {
  const sharedData = (await ctx.getSharedData()) as UserSession;
  if (!sharedData.userId) {
    sharedData.userId = crypto.randomUUID();
  }
  return sharedData.userId;
}