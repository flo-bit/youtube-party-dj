export default function VideoPlayer({ videoList }: { videoList: string}) {

	let player;

	function startPlaying() {
            if (videoList.length > 0 && (!player || player.getPlayerState() !== YT.PlayerState.PLAYING)) {
                play(videoList[0]);
            }
        }
	
        function play(videoId: string) {
            if (player) {
                player.loadVideoById(videoId);
            } else {
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

        function onStateChange(event) {
            if (event.data === window.YT.PlayerState.ENDED) {
                videoList.shift();
                if (videoList.length > 0) {
                    play(videoList[0]);
                }
            }
        }

	function onYouTubeIframeAPIReady() {
        	startPlaying();
	}

 	let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady

return (<div class="relative aspect-video bg-white/5 border border-white/10 w-full overflow-hidden object-cover rounded-xl">

	<div id="player" class="w-full h-full flex items-center justify-center text-white"> CURRENT YOUTUBE VIDEO </div>

</div>);

}

