import QRCode from "./components/QR.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import { QueueItem } from "./components/QueueItem.tsx";

import QRCodeOverlay from "./components/QRCodeOverlay.tsx";
import UserDisplay from "./components/UserDisplay.tsx";
import { Item, getSessionUserHosts, getSortedQueue, getRecommendedQueue } from "backend/sessions.ts";

import { NowPlaying } from "./components/NowPlaying.tsx";
import addDurations from "./helper.tsx";

import ToggleThemeButton, {
  loadInitialTheme,
} from "./components/ToggleThemeButton.tsx";

import {generateRandomString, sha256, base64encode, authorizeSpotify, getAccessToken } from "../common/spotifyHelper.tsx"

//import {playNext} from "common/components/VideoPlayer.tsx"


import { ToggleDiscordControls } from "common/components/integrations/discord/DiscordPopup.tsx";
import Discord from "common/components/integrations/discord/Discord.tsx";

export default async function App() {
  const session = await getSessionUserHosts();
  
  const code = $$(session.code);

  const arr = Array.from(session.clientIds);
  const num = arr.length;
	const users = Object.values(session.clients).map(client => client.name);
	console.log(users);

  // discord controls toggle
  const showDiscordControls = $$(false);

  const toggleDiscordControls = () => {
    showDiscordControls.val = !showDiscordControls.val;
  }

  const current = always(() => {
    if (session.currentlyPlaying) {
      return (
        <div class="px-4 mx-0">
          <div class="text-accent-500 font-semibold text-sm mb-2">
            currently playing
          </div>
          <NowPlaying item={session.currentlyPlaying} />
        </div>
      );
    } else {
      return null;
    }
  });

	const sorted = await getSortedQueue(code);
  const recommended = await getRecommendedQueue(code);

  const timeLeft = always(() => {
    let timeCounter = "0:00";
    session.queue.forEach((item: Item) => {
      timeCounter = addDurations(timeCounter, item.duration);
    });
    return timeCounter;
  });

  loadInitialTheme();


  const Recommendations = () => {

    // console.log('session', session)
    if (recommended.length === 0) {
      return <></>
    }

    return (
      <div class="flex flex-col gap-3 mt-5">
        <div class="text-white">RECOMMENDED:</div>
        <div class="space-y-4">{
          recommended.$.map(item => {
            return <QueueItem item={item} type={'search'} code={code}></QueueItem>
          })}
        </div>
      </div>
    )

	}

  const CLIENT_ID = '87684034f00b4534b87af30e3b582d09';
	const CLIENT_REDIRECT = 'http://localhost/player';
	
  if (session.spotifyInformation.codeVerifier == '')  {
		session.spotifyInformation.codeVerifier = generateRandomString(64);
    
	}
  const hashed = await sha256(session.spotifyInformation.codeVerifier);
	const codeChallenge = base64encode(hashed);

  const urlParams = new URLSearchParams(window.location.search);
	const spotify_code  = urlParams.get('code');
	
  if (spotify_code && !session.spotifyUnlocked){
    session.spotifyInformation.accessToken = await getAccessToken(session.spotifyInformation.codeVerifier, spotify_code, CLIENT_ID,CLIENT_REDIRECT);
    session.spotifyUnlocked = true;
  }
	console.log(session.spotifyInformation)
	//session.spotifyInformation.codeVerifier ="";

	const unlock = $$(session.spotifyUnlocked);

  // assign video player component to a variable, so it can be rendered conditionally
  const videoPlayer = always(() => {
    return <VideoPlayer queue={sorted} session={session} access_token={session.spotifyInformation.accessToken} />;
  });

  // assign discord component to a variable, so it doesn't rerender on every state change
  const discord = always(() => <Discord code={code} />);

  // load from local storage
  if (localStorage.getItem('showDiscordControls') !== showDiscordControls.val.toString()) {
    showDiscordControls.val = localStorage.getItem('showDiscordControls') === 'true';
  }

  // show discord or video controls based on the state of showDiscordControls
  const showDiscordOrVideoControls = always(() => {
    // save in local storage
    localStorage.setItem('showDiscordControls', showDiscordControls.val.toString());
    if (showDiscordControls.val) {
      return discord;
    } else {
      return videoPlayer;
    }
  });

  return (
    <main class="w-screen h-screen relative bg-gray-50 dark:bg-gray-950">
      <div class="mx-auto grid md:grid-cols-2 h-screen">
        
        <div class="flex flex-col h-screen hidden md:flex items-center justify-center p-8">
          <QRCode code={code}/>
          <div class="text-black dark:text-white text-3xl font-semibold mt-4 text-center">
            Party code: <a target="_blank" href={`${window.location.origin}/welcome?code=${encodeURIComponent(code)}`}>{code}</a>
          </div>
          {/* <div class="text-xl text-white dark:text-white font-semibold">
              {num} 
          </div> */}
          <UserDisplay names={users} />

        </div>
        
        <div class="flex flex-col overflow-y-hidden h-screen bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl">
          <div class="flex px-8 mx-0 mt-8 mb-4">
              {showDiscordOrVideoControls}
          </div>
          <div class="flex items-center justify-end px-12 h-10 mb-4">
            <ToggleDiscordControls togglePointer={toggleDiscordControls} />
            <ToggleThemeButton />
          <div class = "rounded-full bg-white dark:bg-white/5 border border-black dark:border-white/10 dark:text-white"> 
          {toggle ( unlock, 
          <div class="mt-0.5 mx-2 fo flex items-center">
            <p class="mr-1.5 mb-0.5 font-bold">Logged in</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-spotify mr-1" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
            </svg>
          </div>,
            
          
          <button class="mt-0.5 mx-2 fo flex items-center" onclick={() => authorizeSpotify(CLIENT_ID, CLIENT_REDIRECT, codeChallenge)}>
            <p class="mb-2 font-bold relative -bottom-0.5">Login</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-spotify mr-2" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
            </svg>
</button>

           
            )}
          </div>
          </div>

          {current}
          <div class="px-4 py-4 border-t border-black dark:border-white/20 dark:text-white mx-0 overflow-y-scroll flex-grow">
            {always(() =>
              timeLeft.val !== "0:00" ? (
                <p class="mb-4"> Queue will last for {timeLeft} </p>
              ) : (
                <div>
                  <p class="mb-2 font-bold">The queue is empty right now.</p>
                  <p>
                    Be the first one to add a song! Just scan the code on the
                    left.
                  </p>
                </div>
              )
            )}
			<div class="space-y-4">{
        sorted.$.map(item => {
          return <QueueItem item={item} type={'player'} code={code}></QueueItem>
        })}
      </div>
      <Recommendations  />
          </div>
        </div>
      </div>

      <QRCodeOverlay code={code} />
    </main>
  );
}