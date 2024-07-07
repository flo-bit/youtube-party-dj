/**
 * Backend entrypoint:
 * This module provides a default export that defines the UI that is returned from the backend
 * when a page is visited
 */
import "common/theme.tsx"
// import { init, auth } from "backend/integrations/discord/Client.ts";
import { Context } from "uix/routing/context.ts";
import { provideRedirect } from "uix/html/entrypoint-providers.tsx";

let auth: (ctx: Context, code: string) => Promise<boolean>;

try {
	const Client = await import("backend/integrations/discord/Client.ts");
	Client.init();
	auth = Client.auth;
} catch (e) {
	console.error(e);
}

export default {
	"/integration/discord/auth": async (ctx: Context) => {
		if (ctx.searchParams.has("code")) {
			if (!auth || !(await auth(ctx, ctx.searchParams.get("code")!))) {
				return "Failed to authenticate with Discord. Please try again."
			}
		}	
		return provideRedirect("/player");
	}
}