import { Queue } from "./components/Queue.tsx";
import QRCodeOverlay from "common/components/QRCodeOverlay.tsx";
import SearchBar from "common/components/SearchBar.tsx";
import { Item, sampleQueue, search } from "backend/data.tsx";

export default function App() {
	const searchResults: Item[] = $$([]);

	const showSearch = $$(false);

	const onSearch = async (value: string) => {
		searchResults.splice(0, searchResults.length);
		searchResults.push(...await search(value));
	};

	const renderToggle = () => {
		return toggle(showSearch,
			<button onclick={() => {
				showSearch.val = false;
			}} class="absolute bottom-2 right-2 w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">

				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-14 stroke-white">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
				</svg>
			</button>,
			<button onclick={() => {
				showSearch.val = true;
			}} class="absolute bottom-2 right-2 w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">

				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-16 stroke-white">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</button>);
	}

	return (
		<main>
			<div
				class="flex flex-col overflow-y-hidden h-screen rounded-xl mx-auto max-w-2xl"
			>
				<div class="flex px-4 my-4 ">
					<SearchBar onSearch={onSearch} />
				</div>
				<div class="px-4 py-4 border-t border-white/20 mx-0 overflow-y-scroll flex-grow">
					{toggle(showSearch, <Queue items={searchResults} type={'search'} />, <Queue items={sampleQueue} type={'client'} />)}
				</div>

				{renderToggle()}

				<QRCodeOverlay />
			</div>
		</main>);
}