import { Pointer } from "unyt_core/runtime/pointers.ts";
import QRCode from "./QR.tsx";

export default function QRCodeOverlay({ code }: { code: Pointer<string> & string }) {
	const showQR = $$(false);

	return (
		<div>
			<button onclick={() => {
				showQR.val = true;
			}} class="absolute md:hidden bottom-2 left-2 w-20 h-20 bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-full flex flex-col gap-0 items-center justify-center backdrop-blur-md">

				<div>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-8 stroke-black dark:stroke-white">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
					</svg>
					<div class="text-xs font-bold text-black dark:text-white">
						{code}
					</div>
				</div>
			</button>

			<div style={{ display: showQR }} class="absolute inset-0 flex md:hidden z-20 bg-white dark:bg-white/5 rounded-xl border dark:border-white/10 border-black backdrop-blur-md items-center justify-center">
				<button class="absolute inset-0 h-full w-full" onclick={() => {
					showQR.val = false;
				}}></button>

				<QRCode code={code} />

				<button class="absolute top-2 right-2 dark:stroke-white stroke-black" onclick={() => {
					showQR.val = false;
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>);
}