/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */
import { Context } from "uix/routing/context.ts";
import "../common/theme.tsx"
import { auth } from "backend/integrations/discord/Client.ts";
import { provideRedirect } from "uix/html/entrypoint-providers.tsx";
import { loadInitialTheme } from "common/components/ToggleThemeButton.tsx";
import { Entrypoint } from "uix/html/entrypoints.ts";

loadInitialTheme();

// workaround for safari - import page.tsx before using it in the route
const Page = await import("../common/page.tsx");
const Welcome = await import("../common/welcome.tsx");

export default {
	'/player': () => Page.default(),
	'/client/([A-Za-z0-9]+)': async ctx => { 
		const App = await import("../common/client.tsx");
		return App.default(ctx);
	},
	"/welcome": ctx => Welcome.default(ctx),
	
	// "/": import("../common/home.tsx"),

	// Temporary integration of the Discord component
	"/integration/discord": async () => {
		const App = await import("common/components/integrations/discord/Discord.tsx");
		return App.default();
	},

	"/integration/discord/auth": async ctx => {
		if (ctx.searchParams.has("code")) {
			if (!(await auth(ctx.searchParams.get("code")!, globalThis.location.origin))) {
				return "Failed to authenticate with Discord. Please try again."
			}
			return provideRedirect("/integration/discord/auth");
		}
		const user = await (await import("backend/sessions.ts")).getUser();
		if (user.discord.isLoggedIn) {
			return "Authenticated with Discord. You may close this tab now."
		}
	}
} satisfies Entrypoint;