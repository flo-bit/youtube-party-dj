import { type SessionData, type Item } from "backend/sessions.ts";

const sorter = (a: Item, b: Item) => {
	if (a.likes.size > b.likes.size) return -1;
	if (a.likes.size < b.likes.size) return 1;
	if (a.added > b.added) return 1;
	if (a.added < b.added) return -1;
	return 0;
  }

export const getSortedQueue = (session: SessionData) => {
	if (!session) {
		console.log("no session!")
		return $$([])
	}
	return always(() => {
		return session.queue.toSorted(sorter);
	});
}