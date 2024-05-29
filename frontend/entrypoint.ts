/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */
import "../common/theme.tsx"
import { provideRedirect } from "uix/html/entrypoint-providers.tsx"

export default {
	'/player': import("../common/page.tsx"),
	'/client': import("../common/client.tsx"),

	'/': provideRedirect("/player")
}