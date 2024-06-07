import AddVideoOverlay from "./components/AddVideoOverlay.tsx";
import Queue from "./components/Queue.tsx";
import QRCodeOverlay from "./components/QRCodeOverlay.tsx";
import { addClient } from "backend/sessions.ts";
import { Context } from "uix/routing/context.ts";

export default function App(ctx: Context) {
	const code = (ctx.urlPattern?.pathname.groups[0] ?? "XXXX");
	addClient(code);

	return (
		<main class="w-screen h-screen relative">
			<div class="mx-auto max-w-2xl">
				<div class="px-4 py-4 overflow-y-scroll h-screen">
					<Queue />
				</div>

				<QRCodeOverlay code={code} />

				<AddVideoOverlay />
			</div>
		</main>
	);
}