import Queue from "common/components/Queue.tsx";

export default function AddVideoOverlay() {
	const showOverlay = $$(false);

	return (
<div>
	<button onclick={() => {
		showOverlay.val = true;
	}} class="absolute bottom-2 right-2 w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
		
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-16 stroke-white">
  			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</button>

	<div style={{display:showOverlay}} class="absolute inset-0 z-20 bg-black">
		<button onclick={() => {
			showOverlay.val = false;
		}} class="absolute bottom-2 right-2 w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
			
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-14 stroke-white">
  				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
			</svg>
		</button>
	

		<div
			class="flex flex-col overflow-y-hidden h-screen rounded-xl mx-auto max-w-2xl"
		>
			<div class="flex px-4 my-4 ">
				<div class="relative flex items-center w-full">
    				<input type="text" name="search" id="search" class="block w-full font-semibold rounded-xl border-0 outline-none py-4 pr-14 text-white bg-white/5 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-xl sm:leading-6" />
					<div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
      					<button class="inline-flex items-center px-1 stroke-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-8">
								<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
							</svg>
						</button>
					</div>
  				</div>
			</div>
			<div class="px-4 py-4 border-t border-white/20 mx-0 overflow-y-scroll flex-grow">
					<Queue />
			</div>
		</div>
	</div>
</div>);
}