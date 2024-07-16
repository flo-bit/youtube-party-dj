import QRCode from "./components/QR.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import { Queue } from "./components/Queue.tsx";
import { QueueItem } from "./components/QueueItem.tsx";

import QRCodeOverlay from "./components/QRCodeOverlay.tsx";
import UserDisplay from "./components/UserDisplay.tsx";
import { getSessionUserHosts, getSortedQueue, getRecommendedQueue } from "backend/sessions.ts";

import { NowPlaying } from "./components/NowPlaying.tsx";
import addDurations from "./helper.tsx";

import ToggleThemeButton, {
  loadInitialTheme,
} from "./components/ToggleThemeButton.tsx";
import { Item } from "../backend/sessions.ts";

export default async function App() {
  const session = await getSessionUserHosts();
  
  const code = $$(session.code);

  const arr = Array.from(session.clientIds);
  const num = arr.length;
  console.log(arr);
	const users = Object.values(session.clients).map(client => client.name);
	console.log(users);

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
    if (recommended.$.length === 0) {
      return null
    }

    return (
      <div class="flex flex-col gap-3 mt-5">
        <div class="text-black dark:text-white">RECOMMENDED:</div>
        <div class="space-y-4">{
          recommended.$.map(item => {
            return <QueueItem item={item} type={'search'} code={code}></QueueItem>
          })}
        </div>
      </div>
    )

	}

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
            <VideoPlayer queue={sorted} session={session} />
          </div>
          <div class="flex items-center justify-end px-12 h-10 mb-4">
            <ToggleThemeButton />
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