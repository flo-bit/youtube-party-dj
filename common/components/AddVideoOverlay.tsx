import { UIX } from "uix";
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

            <div style={{ display: showOverlay }} class="absolute inset-0 z-20 bg-black">
                <button onclick={() => {
                    showOverlay.val = false;
                }} class="absolute bottom-2 right-2 w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-14 stroke-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                </button>
				
                <div class="flex flex-col overflow-y-hidden h-screen rounded-xl mx-auto max-w-2xl">
                    
                    <div class="px-4 py-4 border-t border-white/20 mx-0 overflow-y-scroll flex-grow">
                        <Queue />
                    </div>
                </div>
            </div>
        </div>
    );
}
