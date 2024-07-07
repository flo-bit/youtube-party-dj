/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */
import { Context } from "uix/routing/context.ts";
import "../common/theme.tsx"

export default {
	'/player': async () => {
		const App = await import("../common/page.tsx");
		return App.default();
	},
	'/client/([A-Z0-9]{4})': async (ctx: Context) => {
		const App = await import("../common/client.tsx");
		return App.default(ctx);
	},

	"/": import("../common/home.tsx"),

	// Temporary integration of the Discord component
	"/integration/discord": async () => {
		const App = await import("common/components/integrations/discord/Discord.tsx");
		return App.default();
	}
}