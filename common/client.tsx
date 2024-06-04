import AddVideoOverlay from "common/components/AddVideoOverlay.tsx";
import {Queue} from "./components/Queue.tsx";
import QRCodeOverlay from "common/components/QRCodeOverlay.tsx";
import { sampleClientQueue } from "backend/data.tsx";

export default function App() {
	return (
<main class="w-screen h-screen relative">
	<div class="mx-auto max-w-2xl">
		<div class="px-4 py-4 overflow-y-scroll h-screen">
			<Queue {...sampleClientQueue}/>
		</div>

		<QRCodeOverlay />

		<AddVideoOverlay />
	</div>
</main>);
}