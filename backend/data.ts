import { Datex } from "datex-core-legacy/datex.ts";
import { UIX } from "uix";
import { SessionData } from "../common/helpers/sessions.ts";

/**
 * Version information on the backend
 */
export const denoVersion = Deno.version.deno;
export const datexVersion = Datex.Runtime.VERSION;
export const uixVersion = UIX.version;

export const sessionS = eternalVar('sessions') ?? $$(Array<SessionData>());