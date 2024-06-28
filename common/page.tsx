import QRCode from "./components/QR.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import { Queue } from "./components/Queue.tsx";
import QRCodeOverlay from "./components/QRCodeOverlay.tsx";
import { getSessionUserHosts } from "backend/sessions.ts";
import { NowPlaying } from "./components/NowPlaying.tsx";
import ToggleThemeButton, { loadInitialTheme } from "./components/ToggleThemeButton.tsx";
import {generateRandomString, sha256, base64encode, loadSpotifySDK, authorizeSpotify, getAccessToken } from "../common/spotifyHelper.tsx"


export default async function App() {
	const session = await getSessionUserHosts()

	const code = $$(session.code as string);

	const current = always(() => {
		if (session.currentlyPlaying) {
			return <div class="px-4 mx-0">
			<div class="text-accent-500 font-semibold text-sm mb-2">currently playing</div>
			<NowPlaying item={session.currentlyPlaying.$} />
		</div>
		} else {
			return null;
		}
	})

	loadInitialTheme();

	const CLIENT_ID = '87684034f00b4534b87af30e3b582d09';
	const CLIENT_REDIRECT = 'http://localhost/player'

	const codeVerifier  = generateRandomString(64);
	if (session.spotifyInformation?.codeVerifier == '')  session.spotifyInformation.codeVerifier = codeVerifier;
	
	const hashed = await sha256(codeVerifier);
	const codeChallenge = base64encode(hashed);

	loadSpotifySDK();
	console.log(session);
	

	const urlParams = new URLSearchParams(window.location.search);
	const spotify_code  = urlParams.get('code');
	
	if (spotify_code && !session.spotifyUnlocked) await getAccessToken(session.code, spotify_code, CLIENT_ID,CLIENT_REDIRECT);
	
	
	return (
		<main class="w-screen h-screen relative bg-gray-50 dark:bg-gray-950">
			<div class="mx-auto grid md:grid-cols-2 h-screen">
				<div class="h-screen hidden md:flex items-center flex-col justify-center p-8">
					<QRCode code={code} />
					<div class="text- dark:text-white text-3xl font-semibold mt-4">Party code: <span>{code}</span></div>
				</div>
				<div
					class="flex flex-col overflow-y-hidden h-screen bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl"
				>
					<div class="flex px-8 mx-0 mt-8 mb-4">
						{/* @ts-ignore - uix doesn't support types? */}
						<VideoPlayer queue={session.queue} code={code} />
					</div>
					<div class="flex items-center justify-end px-12 h-10 mb-4">
						<ToggleThemeButton />
					</div>

					{current}
					<div
						class="px-4 py-4 border-t border-black dark:border-white/20 mx-0 overflow-y-scroll flex-grow">
						<Queue items={session.$.queue} type={'player'} code={code} />
					</div>
				</div>
			</div>

			<QRCodeOverlay code={code} />

			<button class="fo" onclick={()=>authorizeSpotify(CLIENT_ID, CLIENT_REDIRECT, codeChallenge)}>
					<img src="./rsc/spotify_icon.png" height="50" width="50" alt="" />
			</button>

		</main>);
}
