import QRCode from "./components/QR.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import { Queue } from "./components/Queue.tsx";
import { QueueItem } from "./components/QueueItem.tsx";

import QRCodeOverlay from "./components/QRCodeOverlay.tsx";
import { getSessionUserHosts, getSortedQueue } from "backend/sessions.ts";
import { NowPlaying } from "./components/NowPlaying.tsx";
import addDurations from "./helper.tsx";

import ToggleThemeButton, {
  loadInitialTheme,
} from "./components/ToggleThemeButton.tsx";
import { Item } from "../backend/sessions.ts";

export default async function App() {
  const session = await getSessionUserHosts();

  const code = $$(session.code as string);

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

  const timeLeft = always(() => {
    let timeCounter = "0:00";
    session.queue.forEach((item: Item) => {
      timeCounter = addDurations(timeCounter, item.duration);
    });
    return timeCounter;
  });

  loadInitialTheme();

  return (
    <main class="w-screen h-screen overflow-hidden py-8 relative bg-gray-50 dark:bg-gray-950">
		<div class="h-2/3 flex justify-between space-8 px-4">
			<div class="mb-8 px-4">
				<VideoPlayer queue={session.queue} code={code} />
			</div>
			<div class="mb-8 w-96 px-4">
				<QRCode code={code} />
				<div class="text-black dark:text-white mt-4">
					<p>Or go to {window.location.hostname} and enter the party code:</p>
					<p class="w-min text-2xl font-semibold bg-gray-100 rounded p-1.5 mt-2"><a target="_blank" href={window.location.origin + '/client/' + code}>{code}</a></p>
				</div>
			</div>
		</div>
		<div class="h-1/3 px-8">
		<p class="text-4xl font-bold mb-4">Next up:</p>
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
			<div class="flex overflow-hidden">
				{always(() => {
					sorted.slice(0, 3).map((item: Item) => {
					return <QueueItem item={item.$} type={'player'} code={code}></QueueItem>
					}) })
				}
			</div>
		</div>
      	<QRCodeOverlay code={code} />
	  	<div class="flex items-center justify-end px-12 h-10 mb-4">
			<ToggleThemeButton />
		</div>
    </main>
  );
}
