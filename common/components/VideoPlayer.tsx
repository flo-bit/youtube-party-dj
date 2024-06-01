export default function VideoPlayer() {

return (<div class="relative aspect-video bg-white/5 border border-white/10 w-full overflow-hidden object-cover rounded-xl">

	<div class="w-full h-full flex items-center justify-center text-white"> CURRENT YOUTUBE VIDEO </div>

</div>);

}

/*
let player;
let videoList = [];
	
        function play(videoId) {
            if (player) {
                player.loadVideoById(videoId);
            } else {
                player = new YT.Player('player', {
                    height: '315',
                    width: '560',
                    videoId: videoId,
                    events: {
                        'onStateChange': StateChange
                    }
                });
            }
        }

        function StateChange(event) {
            if (event.data === YT.PlayerState.ENDED) {
                videoList.shift();
                if (videoList.length > 0) {
                    play(videoList[0].videoId);
                }
            }
        }

 	var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady() {
            if (videoList.length > 0) {
                play(videoList[0].videoId);
            }
        }
	
*/
