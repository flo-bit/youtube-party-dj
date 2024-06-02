import QRCode from "./components/QR.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import Queue from "./components/Queue.tsx";
import QRCodeOverlay from "./components/QRCodeOverlay.tsx";

export default function App() {
	const videoIds = $$(['k1BneeJTDcU', 'dQw4w9WgXcQ', '-eohHwsplvY']);

	return (
<main class="w-screen h-screen relative">
	<div class="mx-auto grid md:grid-cols-2 h-screen">
		<div class="h-screen hidden md:flex items-center flex-col justify-center p-8">
				<QRCode />
				
				<div class="text-white text-3xl font-semibold mt-4">Party code: XXXX</div>
		</div>
		<div
			class="flex flex-col overflow-y-hidden h-screen bg-white/5 border border-white/10 rounded-xl"
		>
			<div class="flex px-8 mx-0 my-8 ">
				<VideoPlayer videoList={videoIds}/>

			</div>
			<div class="px-4 py-4 border-t border-white/20 mx-0 overflow-y-scroll flex-grow">
				<Queue />
			</div>
		</div>
	</div>

	<QRCodeOverlay />
</main>);
}
