/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */
import { Context } from "uix/routing/context.ts";
import "../common/theme.tsx"
import { auth } from "backend/integrations/discord/Client.ts";
import { provideRedirect } from "uix/html/entrypoint-providers.tsx";

export default {
	'/player': async () => {
		const App = await import("../common/page.tsx");
		return App.default();
	},
	'/client/([A-Z0-9]{4})': async (ctx: Context) => { 
		const App = await import("../common/client.tsx");
		return App.default(ctx);
	},
	"/welcome": import("../common/welcome.tsx"),
	
	"/": import("../common/home.tsx"),

	// Temporary integration of the Discord component
	"/integration/discord": async () => {
		const App = await import("common/components/integrations/discord/Discord.tsx");
		return App.default();
	},

	"/integration/discord/auth": async (ctx: Context) => {
		if (ctx.searchParams.has("code")) {
			if (!(await auth(ctx.searchParams.get("code")!, globalThis.location.origin))) {
				return "Failed to authenticate with Discord. Please try again."
			}
		}	
		return provideRedirect("/player");
	}
}