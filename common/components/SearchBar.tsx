import { UIX } from "uix";

const suggestions = [
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
    }, 
    {
        cover: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        song: "Never Gonna Give You Up",
        artist: "Rick Astley",
        length: "3:33"
    },
    {
        cover: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg",
        song: "Despacito",
        artist: "Luis Fonsi",
        length: "4:42"
    },
    {
        cover: "https://img.youtube.com/vi/3tmd-ClpJxA/0.jpg",
        song: "Faded",
        artist: "Alan Walker",
        length: "3:32"
    },
    {
        cover: "https://img.youtube.com/vi/5GL9JoH4Sws/0.jpg",
        song: "Blinding Lights",
        artist: "The Weeknd",
        length: "3:20"
    },
    {
        cover: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg",
        song: "Gangnam Style",
        artist: "PSY",
        length: "4:13"
    },
    {
        cover: "https://img.youtube.com/vi/3JWTaaS7LdU/0.jpg",
        song: "Billie Jean",
        artist: "Michael Jackson",
        length: "4:54"
    },
    {
        cover: "https://img.youtube.com/vi/Kp7eSUU9oy8/0.jpg",
        song: "Believer",
        artist: "Imagine Dragons",
        length: "3:24"
    },
    {
        cover: "https://img.youtube.com/vi/Q0oIoR9mLwc/0.jpg",
        song: "Shallow",
        artist: "Lady Gaga, Bradley Cooper",
        length: "3:37"
    },
    {
        cover: "https://img.youtube.com/vi/JGwWNGJdvx8/0.jpg",
        song: "Shape of You",
        artist: "Ed Sheeran",
        length: "4:23"
    },
    {
        cover: "https://img.youtube.com/vi/ktvTqknDobU/0.jpg",
        song: "Radioactive",
        artist: "Imagine Dragons",
        length: "3:06"
    },
    {
        cover: "https://img.youtube.com/vi/fLexgOxsZu0/0.jpg",
        song: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        length: "4:30"
    },
    {
        cover: "https://img.youtube.com/vi/OPf0YbXqDm0/0.jpg",
        song: "Sugar",
        artist: "Maroon 5",
        length: "5:02"
    },
    {
        cover: "https://img.youtube.com/vi/tkOrjXTIQkA/0.jpg",
        song: "Something Just Like This",
        artist: "The Chainsmokers & Coldplay",
        length: "4:08"
    },
    {
        cover: "https://img.youtube.com/vi/7wtfhZwyrcc/0.jpg",
        song: "Thunder",
        artist: "Imagine Dragons",
        length: "3:07"
    },
    {
        cover: "https://img.youtube.com/vi/08k-E6cNOZc/0.jpg",
        song: "Lean On",
        artist: "Major Lazer & DJ Snake",
        length: "2:59"
    },
    {
        cover: "https://img.youtube.com/vi/hoNb6HuNmU0/0.jpg",
        song: "Cheap Thrills",
        artist: "Sia",
        length: "3:44"
    },
    {
        cover: "https://img.youtube.com/vi/ysYJp4t2iKQ/0.jpg",
        song: "Closer",
        artist: "The Chainsmokers ft. Halsey",
        length: "4:21"
    },
    {
        cover: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg",
        song: "Havana",
        artist: "Camila Cabello",
        length: "3:37"
    },
    {
        cover: "https://img.youtube.com/vi/YQHsXMglC9A/0.jpg",
        song: "Hello",
        artist: "Adele",
        length: "6:06"
    },
    {
        cover: "https://img.youtube.com/vi/CevxZvSJLk8/0.jpg",
        song: "Roar",
        artist: "Katy Perry",
        length: "4:30"
    },
    {
        cover: "https://img.youtube.com/vi/2Vv-BfVoq4g/0.jpg",
        song: "Perfect",
        artist: "Ed Sheeran",
        length: "4:40"
    },
    {
        cover: "https://img.youtube.com/vi/SlPhMPnQ58k/0.jpg",
        song: "Senorita",
        artist: "Shawn Mendes, Camila Cabello",
        length: "3:25"
    },
    {
        cover: "https://img.youtube.com/vi/3AtDnEC4zak/0.jpg",
        song: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        length: "2:21"
    },
    {
        cover: "https://img.youtube.com/vi/wnJ6LuUFpMo/0.jpg",
        song: "Memories",
        artist: "Maroon 5",
        length: "3:09"
    },
    {
        cover: "https://img.youtube.com/vi/pRpeEdMmmQ0/0.jpg",
        song: "Waka Waka (This Time for Africa)",
        artist: "Shakira",
        length: "3:31"
    },
    {
        cover: "https://img.youtube.com/vi/2vjPBrBU-TM/0.jpg",
        song: "Chandelier",
        artist: "Sia",
        length: "3:52"
    },
    {
        cover: "https://img.youtube.com/vi/ZbZSe6N_BXs/0.jpg",
        song: "Happy",
        artist: "Pharrell Williams",
        length: "3:53"
    },
    {
        cover: "https://img.youtube.com/vi/pXRviuL6vMY/0.jpg",
        song: "Stressed Out",
        artist: "Twenty One Pilots",
        length: "3:46"
    },
    {
        cover: "https://img.youtube.com/vi/rYEDA3JcQqw/0.jpg",
        song: "Rolling in the Deep",
        artist: "Adele",
        length: "3:48"
    },
    {
        cover: "https://img.youtube.com/vi/LsoLEjrDogU/0.jpg",
        song: "All of Me",
        artist: "John Legend",
        length: "5:08"
    },
    {
        cover: "https://img.youtube.com/vi/y6Sxv-sUYtM/0.jpg",
        song: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        length: "4:30"
    },
    {
        cover: "https://img.youtube.com/vi/fLexgOxsZu0/0.jpg",
        song: "Counting Stars",
        artist: "OneRepublic",
        length: "4:44"
    },
    {
        cover: "https://img.youtube.com/vi/OPf0YbXqDm0/0.jpg",
        song: "Dark Horse",
        artist: "Katy Perry",
        length: "3:45"
    },
    {
        cover: "https://img.youtube.com/vi/tkOrjXTIQkA/0.jpg",
        song: "Photograph",
        artist: "Ed Sheeran",
        length: "4:19"
    },
    {
        cover: "https://img.youtube.com/vi/7wtfhZwyrcc/0.jpg",
        song: "Can't Stop the Feeling!",
        artist: "Justin Timberlake",
        length: "4:45"
    },
    {
        cover: "https://img.youtube.com/vi/08k-E6cNOZc/0.jpg",
        song: "Royals",
        artist: "Lorde",
        length: "3:21"
    },
    {
        cover: "https://img.youtube.com/vi/hoNb6HuNmU0/0.jpg",
        song: "Let It Go",
        artist: "Idina Menzel",
        length: "3:45"
    },
    {
        cover: "https://img.youtube.com/vi/ysYJp4t2iKQ/0.jpg",
        song: "Wake Me Up",
        artist: "Avicii",
        length: "4:33"
    },
    {
        cover: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg",
        song: "Stay With Me",
        artist: "Sam Smith",
        length: "2:52"
    }
];

const getSuggestions = (query: string) => {
    if (!query) return [];
    return suggestions.filter(suggestion => 
        suggestion.song.toLowerCase().includes(query.toLowerCase()) ||
        suggestion.artist.toLowerCase().includes(query.toLowerCase())
    );
}

const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    const filteredSuggestions = getSuggestions(query);
    updateSuggestions(filteredSuggestions);
}

const updateSuggestions = (suggestions: typeof suggestions) => {
    const suggestionList = document.getElementById('suggestions');
    const searchBar = document.getElementById('search') as HTMLInputElement;
    if (suggestionList && searchBar) {
        if (searchBar.value.trim() && suggestions.length > 0) {
            suggestionList.classList.add('border', 'border-gray-300', 'mt-2');
        } else {
            suggestionList.classList.remove('border', 'border-gray-300', 'mt-2');
        }
        suggestionList.innerHTML = '';
        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                
                const listItem = document.createElement('li');
                listItem.className = 'p-2 cursor-pointer hover:bg-zinc-900 flex items-center justify-between text-white';

                const coverImage = document.createElement('img');
                coverImage.src = suggestion.cover;
                coverImage.alt = suggestion.song;
                coverImage.className = 'w-12 h-12 rounded-sm mr-4';

                const textContainer = document.createElement('div');
                const songName = document.createElement('p');
                songName.innerHTML = `${suggestion.song} <span class="text-xs text-gray-600">by ${suggestion.artist}</span>`;
                songName.className = 'text-sm font-semibold';

                const videoLength = document.createElement('p');
                videoLength.textContent = suggestion.length + " minutes";
                videoLength.className = 'text-xs text-gray-500';

                textContainer.className = 'flex-1';

                textContainer.appendChild(songName);
                textContainer.appendChild(videoLength);

                const addButtonContainer = document.createElement('div');
                addButtonContainer.className = 'add-button-container';

                const addButton = document.createElement('button');
                addButton.className = 'rounded-full w-6 h-6 bg-white flex items-center justify-center active:bg-pink-600 ml-6';
                addButton.innerHTML = '<span class="text-black align-text-top" style="position: relative; top: -1.5px;">+</span>';
                addButton.classList.add("unselectable");
                addButtonContainer.appendChild(addButton);
                addButton.onclick = () => {
                    addToQueue(suggestion);
                    toggleHeart(addButton);
                };

                listItem.appendChild(coverImage);
                listItem.appendChild(textContainer);
                listItem.appendChild(addButton);

                suggestionList.appendChild(listItem);
            });
            
        }
    } else {
        console.error('Suggestion list or search bar element not found.');
    }
}

const addToQueue = (suggestion: typeof suggestions[0]) => {
    console.log(`Added "${suggestion.song}" by ${suggestion.artist} to queue.`);
}

const toggleHeart = (button: HTMLButtonElement) => {
    const span = button.querySelector('span');
    if (span) {
        if (span.textContent === '+') {
            span.innerHTML = '&hearts;';
            span.className = 'text-black align-text-top';
            span.style.position = 'relative';
            span.style.top = '0px';
        } else {
            span.textContent = '+';
            span.className = 'text-black align-text-top';
            span.style.position = 'relative';
            span.style.top = '-1.5px';
        }
    }
}

export default function SearchBar() {
    return (
        <div class='max-w-md mx-auto pl-2 pr-2 pt-2'>
            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-neutral-900 overflow-hidden">
                <input
                    class="peer h-full w-full pl-12 pr-2 text-sm text-white bg-neutral-950 outline-none border-none rounded-lg"
                    type="text"
                    id="search"
                    placeholder="Find your song..."
                    oninput={handleInputChange} />
                <div id="searchicon" class="absolute left-0 top-0 h-full w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  stroke="white" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <br />
            <ul id="suggestions" class="max-h-20 overflow-y-auto bg-black rounded-lg"></ul>
            <style>{`
                .add-button-container {
                    height: 20px;
                }
                
                #search {
                    outline: none;
                    border: 1px solid gray;
                }
                #search:focus {
                    outline: none;
                    border: 1px solid white;
                }
                #suggestions::-webkit-scrollbar {
                    width: 8px;
                }
                #suggestions {
                    max-height: calc(118vh - 12rem);
                    overflow-y: auto;
                }
                #suggestions::-webkit-scrollbar-thumb {
                    background: white;
                    border-radius: 8px;
                    width: 3px;
                    
                }
                .unselectable {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            `}</style>
        </div>
    );
}