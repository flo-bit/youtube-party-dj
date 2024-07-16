let darkMode = false;

export function loadInitialTheme() {
    document.body.classList.add('h-full');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
        return;
    }

    // if savedTheme doesnt exist in localStorage, check if the user prefers dark mode
    if (savedTheme !== 'light' && globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
}

export function toggleTheme() {
    darkMode = !darkMode
    if (darkMode) {
        document.body.classList.add('dark', 'dark:bg-gray-950');
    } else {
        document.body.classList.remove('dark', 'dark:bg-gray-950');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
};

// Load the saved theme on initial load
export default function ToggleThemeButton() {
    return (
        <div>
            <button onclick={toggleTheme} class="cursor-pointer border-black dark:border-white/20">
                <div class="flex items-center justify-center w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="rounded-lg size-6 active:size-5 active:m-1 hidden dark:block fill-white">
                        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="rounded-lg size-6 active:size-5 active:m-1 block dark:hidden fill-black">
                        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </button>
        </div>
    )
};



