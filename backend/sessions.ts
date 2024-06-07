import { PlayerSessionManager } from "../common/helpers/sessions.ts";

const playerSessionManager = new PlayerSessionManager();

export const getPlayerSession = async () => {
    const userId = datex.meta.caller.name;
  if (!userId) {
    return null;
  }
  const session = playerSessionManager.getByUserId(userId);
  if (!session) {
    return playerSessionManager.create(userId);
  }
  return session;
}

export const addClient = (code: string) => {
  const session = playerSessionManager.getByCode(code);
  if (!session) {
    return;
  }
  session.addClient(datex.meta.caller.name);
}