export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
    const value = $$('');

    return (
        <div class="relative flex items-center w-full">
            <input type="text" value={value} onkeypress={(event) => {
                if (event.key === 'Enter') {
                    onSearch(value);
                }
            }} name="search" class="block w-full font-semibold rounded-xl border-0 outline-none py-4 pr-14 dark:text-white text-black bg-white ring-black dark:bg-white/5 shadow-sm ring-1 ring-inset dark:ring-white/10 placeholder:text-black dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-xl sm:leading-6" />
            <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button class="inline-flex items-center px-1 stroke-black dark:stroke-white" onclick={() => {
                    onSearch(value);
                }}>
                    <div class="w-10 h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-8 active:size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}