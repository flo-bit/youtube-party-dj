/**
 * Backend entrypoint:
 * This module provides a default export that defines the UI that is returned from the backend
 * when a page is visited
 */
import "common/theme.tsx"
// import { init, auth } from "backend/integrations/discord/Client.ts";

try {
	const Client = await import("backend/integrations/discord/Client.ts");
	Client.init();
} catch (e) {
	console.error(e);
}

export default {}