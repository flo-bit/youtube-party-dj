import QRCode from "./components/QR.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import { Queue } from "./components/Queue.tsx";
import QRCodeOverlay from "./components/QRCodeOverlay.tsx";
import { sampleQueue } from "backend/data.tsx";
import { getPlayerSession } from "backend/sessions.ts";

export default function App() {
	const code = $$("XXXX");
	const queue = $$(sampleQueue);

	getPlayerSession().then((session) => {
		code.val = session.sessionData.code;
		/* @ts-ignore - cannot assign new value to ObjectRef through val? */
		queue.val = session.sessionData.queue.$;
	});

	return (
		<main class="w-screen h-screen relative">
			<div class="mx-auto grid md:grid-cols-2 h-screen">
				<div class="h-screen hidden md:flex items-center flex-col justify-center p-8">
					<QRCode code={code}/>

					<div class="text-white text-3xl font-semibold mt-4">Party code: <span>{code}</span></div>
				</div>
				<div
					class="flex flex-col overflow-y-hidden h-screen bg-white/5 border border-white/10 rounded-xl"
				>
					<div class="flex px-8 mx-0 my-8 ">
						{/* @ts-ignore - uix doesn't support types? */}
						<VideoPlayer queue={queue.$.map((item) => {
							return item.$;
						})} />
					</div>
					<div class="px-4 py-4 border-t border-white/20 mx-0 overflow-y-scroll flex-grow">
						<Queue items={queue} type={'player'} />
					</div>
				</div>
			</div>

	<QRCodeOverlay code={code} />
</main>);
}
