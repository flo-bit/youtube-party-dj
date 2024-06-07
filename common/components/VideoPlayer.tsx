import { Item, removePlayedVideo } from "backend/data.tsx";

export default function VideoPlayer({ queue }: Readonly<{ queue: Item[] }>) {
	// @ts-ignore - YouTube API
	let player;

	observe(queue, () => {
		// if not playing and queue is not empty, start playing
		if(queue.length > 0) {
			console.log('startPlaying');
			startPlaying();
		}
	});

	function startPlaying() {
		// @ts-ignore - YouTube API
		if (queue.length > 0 && (!player || player.getPlayerState() !== YT.PlayerState.PLAYING)) {
			play(queue[0].id);
		}
	}

	function play(videoId: string) {
		// @ts-ignore - YouTube API
		if (player) {
			player.loadVideoById(videoId);
		} else {
			// @ts-ignore - YouTube API
			player = new window.YT.Player('player', {
				height: '315',
				width: '560',
				videoId: videoId,
				events: {
					'onStateChange': onStateChange
				}
			});
		}
	}

	// @ts-ignore - YouTube API
	function onStateChange(event) {
		// @ts-ignore - YouTube API
		if (event.data === window.YT.PlayerState.ENDED) {
			// TODO: remove just played video from queue
			removePlayedVideo();

			setTimeout(() => {
				if (queue.length > 0) {
					play(queue[0].id);
				}
			}, 200);
		}
	}

	function onYouTubeIframeAPIReady() {
		startPlaying();
	}

	const tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	document.body.appendChild(tag);

	// @ts-ignore - YouTube API
	globalThis.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady

	return (
		<div class="relative aspect-video bg-white/5 border border-white/10 w-full overflow-hidden object-cover rounded-xl">
			<div id="player" class="w-full h-full flex items-center justify-center text-white font-semibold"> Loading video... </div>
		</div>);

}

