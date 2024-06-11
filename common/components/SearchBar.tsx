const results = [
    {
        cover: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
        song: "Shape of You",
        artist: "Ed Sheeran",
        length: "4:24"
    },
    {
        cover: "https://img.youtube.com/vi/2Vv-BfVoq4g/0.jpg",
        song: "Perfect",
        artist: "Ed Sheeran",
        length: "4:40"
    }
];

const shrinkIconOnClick = () => {
    console.log("shrinkIconWurdeaufgerufen");
    const searchIcon = document.getElementById('searchicon');
    searchIcon.classList.remove('size-8');
    searchIcon.classList.add('scale-90');
    setTimeout(() => {
        searchIcon.classList.remove('scale-90');
        searchIcon.classList.add('size-8');
    }, 200);
}

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
    const value = $$('');
    
        return (
            <div class="relative flex items-center w-full">
                <input type="text" value={value} onkeypress={(event) => {
                    if (event.key === 'Enter') {
                        onSearch(value);
                        shrinkIconOnClick();
                    }
                }} placeholder = "Find your Song..." name="search" id="search" class="block w-full font-semibold rounded-xl border-0 outline-none py-4 pr-14 text-white bg-white/5 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-xl sm:leading-6" />
                <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <button id="searchbutton"class="inline-flex items-center justify-center px-1 stroke-white" onclick={() => {
                        onSearch(value);
                        shrinkIconOnClick();
                    }}>
                        <div id="iconframe" class="w-10 h-10 flex justify-center items-center">
                            <svg id="searchicon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-8 h-8 transition-transform transform">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        );
    }