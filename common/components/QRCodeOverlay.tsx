import QRCode from "./QR.tsx";

export default function QRCodeOverlay() {
	const showQR = $$(false);

	return (
<div>
	<button onclick={() => {
		showQR.val = true;
	}} class="absolute md:hidden bottom-2 left-2 w-20 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="size-18 stroke-white">
			<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
			<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
		</svg>
	</button>

	<div style={{display:showQR}} class="absolute inset-0 flex md:hidden z-20 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md items-center justify-center">
		<button class="absolute inset-0 h-full w-full" onclick={() => {
			showQR.val = false;
		}}></button>

		<QRCode />

		<button class="absolute top-2 right-2 stroke-white" onclick={() => {
			showQR.val = false;
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-8">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
</div>);
}