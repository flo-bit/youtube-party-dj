/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */

export default {
	// show frontend-rendered page on /frontend
	'/frontend': import("../common/page.tsx") 
}