

export let currentTheme = 'dark';

export function toggleTheme(theme:string){
    currentTheme = theme
    const searchBar = document.getElementById('search');
    const searchButton = document.getElementById('searchbutton');
    const qricon = document.getElementById('qricon');
    const qrButton = document.getElementById('qrButton');
    const qrCloseButton = document.getElementById('qrCloseButton');
    const qr = document.getElementById('qr');
    const qrtext = document.getElementById('qrtext');
    const qrtext2 = document.getElementById('qrtext2');
    const player = document.getElementById('player');
    const playerframe = document.getElementById('playerframe');
    const plusicon = document.getElementById('plusicon');
    const plusiconclient = document.getElementById('plusiconclient');
    const plusiconframeclient = document.getElementById('plusiconframeclient');
    const showQRButton = document.getElementById('showQRcode')
    const queueItemFrames = document.querySelectorAll('.queueframe');
    const queueItems = document.querySelectorAll('.queueitem');
    const queueIcons = document.querySelectorAll('.queueicon');
    const queueIcon2s = document.querySelectorAll(".queueicon2");
    const toggleThemeButton = document.getElementById('togglethemebutton');
    const playerqueueborder = document.getElementById("playerqueueborder");
    const playerqueuebg = document.getElementById("playerqueuebg");
    const queueiconframeclient = document.getElementById("queueiconframeclient");
    const queueiconclient = document.getElementById("queueiconclient");
    

    if (theme === "light") {
        
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.style.backgroundColor = "white";
        if (searchBar) {
            searchBar.classList.remove('placeholder:text-gray-400', 'text-white', 'bg-white/5', 'ring-white/10', "placeholder:text-gray-400");
            searchBar.classList.add('placeholder:text-black', 'text-black', 'bg-white', 'ring-black', "placeholder:text-gray-600");
        }
        if (searchButton){
            searchButton.classList.remove('stroke-white');
            searchButton.classList.add('stroke-black');
        }
        if(toggleThemeButton){
            toggleThemeButton.classList.remove('border-white/20');
            toggleThemeButton.classList.add('border-black');
        }
        if(qrButton){
            qrButton.classList.remove('bg-white/5', 'border-white/10');
            qrButton.classList.add('bg-white', 'border-black');
        }
        if(playerqueuebg){
            playerqueuebg.classList.remove('bg-white/5', 'border-white/10');
            playerqueuebg.classList.add('green', 'border-black');
        }
        if(playerqueueborder){
            playerqueueborder.classList.remove('border-white/20');
            playerqueueborder.classList.add('border-black');
        }
        if(qricon){
            qricon.classList.remove('stroke-white');
            qricon.classList.add('stroke-black');
        }
        if(qrCloseButton){
            qrCloseButton.classList.remove('stroke-white');
            qrCloseButton.classList.add('stroke-black');
        }
        if(qr){
            qr.classList.remove('border-white/10');
            qr.classList.add('border-black');
        }
        if(qrtext){
            qrtext.classList.remove('text-white');
            qrtext.classList.add('text-black');
        }
        if(showQRButton){
            showQRButton.classList.remove('bg-white/5', 'border-white/10');
            showQRButton.classList.add('bg-white', 'border-black');
        }
        if(playerframe){
            playerframe.classList.remove('bg-white/5', 'border-white/10');
            playerframe.classList.add('bg-white', 'border-black', "backdrop-blur");
        }
        if(player){
            player.classList.remove('text-white');
            player.classList.add("text-black");
        }
        if(qrtext){
            qrtext.classList.remove('text-white');
            qrtext.classList.add('text-black');
        }
        if(qrtext2){
            qrtext2.classList.remove('text-white');
            qrtext2.classList.add('text-black');
        }
        queueItems.forEach(item => {
            item.classList.remove('text-white');
            item.classList.add('text-black');
        });

        queueItemFrames.forEach(frame => {
            frame.classList.remove('bg-white/5', 'border-white/10');
            frame.classList.add('bg-white', 'border-black');
        });

        queueIcons.forEach(icon => {
            icon.classList.remove('stroke-white');
            icon.classList.add('stroke-black');
        });

        queueIcon2s.forEach(icon => {
            icon.classList.remove('stroke-white');
            icon.classList.add('stroke-black');
        });

        if(plusicon){
        plusicon.classList.remove('stroke-white');
        plusicon.classList.add("stroke-black");
        }
        if(plusiconclient){
            plusiconclient.classList.remove('stroke-white');
            plusiconclient.classList.add("stroke-black");
        }
        if(plusiconframeclient){
            plusiconframeclient.classList.remove('bg-white/5', 'border-white/10');
            plusiconframeclient.classList.add('bg-white', 'border-black',"backdrop-blur");
        }
        if(queueiconframeclient){
            queueiconframeclient.classList.remove('bg-white/5', 'border-white/10');
            queueiconframeclient.classList.add('bg-white', 'border-black');
        }
        if(queueiconclient){
            queueiconclient.classList.remove('stroke-white');
            queueiconclient.classList.add("stroke-black");
        }
        

    } else {
        currentTheme = "dark";
        document.body.style.backgroundColor = "#1a191f";
        if (searchBar) {
            searchBar.classList.add('placeholder:text-gray-400', 'text-white', 'bg-white/5', 'ring-white/10', 'focus:ring-red-600', "placeholder:text-gray-400");
            searchBar.classList.remove('placeholder:text-black', 'text-black', 'bg-white', 'ring-black', "placeholder:text-gray-600");
        }
        if(searchButton){
            searchButton.classList.add('stroke-white');
            searchButton.classList.remove('stroke-black');
        }
        if(toggleThemeButton){
            toggleThemeButton.classList.add('border-white/20');
            toggleThemeButton.classList.remove('border-black');
        }
        if(qrButton){
        qrButton.classList.add('bg-white/5', 'border-white/10');
        qrButton.classList.remove('bg-white', 'border-black');
        }
        if(qricon){
            qricon.classList.add('stroke-white');
            qricon.classList.remove('stroke-black');
        }
        if(qrCloseButton){
            qrCloseButton.classList.add('stroke-white');
            qrCloseButton.classList.remove('stroke-black');
        }
        if(qr){
            qr.classList.add('bg-white', 'border-white/10');
            qr.classList.remove('bg-black', 'border-black');
        }
        if(qrtext){
            qrtext.classList.remove('text-black');
            qrtext.classList.add('text-white');
        }
        if(playerframe){
            playerframe.classList.add('bg-white/5', 'border-white/10');
            playerframe.classList.remove('bg-white', 'border-black');
        }
        if(player){
            player.classList.add('text-white');
            player.classList.remove("text-black");
        }
        if(playerqueueborder){
            playerqueueborder.classList.add('border-white/20');
            playerqueueborder.classList.remove('border-black');
        }
        if(playerqueuebg){
            playerqueuebg.classList.add('bg-white/5', 'border-white/10');
            playerqueuebg.classList.remove('green', 'border-black');
        }
        if(qrtext){
            qrtext.classList.add('text-white');
            qrtext.classList.remove('text-black');
        }
        if(qrtext2){
            qrtext2.classList.add('text-white');
            qrtext2.classList.remove('text-black');
        }
        
        if(showQRButton){
            showQRButton.classList.add('bg-white/5', 'border-white/10', "backdrop-blur");
            showQRButton.classList.remove('bg-white', 'border-black');
        }        
        queueItems.forEach(item => {
            item.classList.add( 'text-white');
            item.classList.remove( 'text-black');
        });

        queueIcons.forEach(icon => {
            icon.classList.add('stroke-white');
            icon.classList.remove('stroke-black');
        });
        queueItemFrames.forEach(frame => {
            frame.classList.add('bg-white/5', 'border-white/10');
            frame.classList.remove('bg-white', 'border-black');
        });

        queueIcon2s.forEach(icon => {
            icon.classList.add('stroke-white');
            icon.classList.remove('stroke-black');
        });
        if(plusicon){
        plusicon.classList.add('stroke-white');
        plusicon.classList.remove("stroke-black");
        }
        if(plusiconclient){
            plusiconclient.classList.add('stroke-white');
            plusiconclient.classList.remove("stroke-black");
        }
        if(plusiconframeclient){
            plusiconframeclient.classList.add('bg-white/5', 'border-white/10');
            plusiconframeclient.classList.remove('bg-white', 'border-black');
        }
        if(queueiconclient){
            queueiconclient.classList.add('stroke-white');
            queueiconclient.classList.remove("stroke-black");
        }
        if(queueiconframeclient){
            queueiconframeclient.classList.add('bg-white/5', 'border-white/10');
            queueiconframeclient.classList.remove('bg-white', 'border-black');
        }
    
    }
    localStorage.setItem('theme', theme);
};

// Load the saved theme on initial load
export default function ToggleThemeButton(){
    const toggleIcon = () => {
        const darkIcon = document.getElementById('darkIcon');
        const lightIcon = document.getElementById('lightIcon');
        
            if(darkIcon){
                darkIcon.classList.remove('size-8');
                darkIcon.classList.add('size-6');
            }
            if(lightIcon){
                lightIcon.classList.remove('size-8');
                lightIcon.classList.add('size-6');
            }
                setTimeout(() => {
                    if(darkIcon){
                        darkIcon.classList.add('size-8');
                        darkIcon.classList.remove('size-6');
                    }
                    if(lightIcon){
                        lightIcon.classList.add('size-8');
                        lightIcon.classList.remove('size-6');
                    }
            }, 100);

        if (darkIcon?.style.display === 'inline') {
            darkIcon.style.display = 'none';
            if (lightIcon){lightIcon.style.display = 'inline';}
            toggleTheme("light");
            currentTheme = 'light';
            
        } else if (lightIcon?.style.display === 'inline') {
            if(darkIcon){darkIcon.style.display = 'inline';}
            lightIcon.style.display = 'none';
            toggleTheme('dark');
            currentTheme = 'dark';
        }
    };

    return (
        <div >
            <button id="toggleThemeButton" onclick={toggleIcon} class="cursor-pointer">
                <div class="flex-1 items-center justify-center w-10">
                    <img class="rounded-lg size-8" id="darkIcon" src="./darkSunNew.png" alt="Dark Sun" style="display: inline;" />
                    <img class="rounded-lg size-8" id="lightIcon" src="./lightMoon-cropped.svg" alt="Light Moon" style="display: none; padding: 0.5rem;" />
                </div>
            </button>
        </div>
     )
};



