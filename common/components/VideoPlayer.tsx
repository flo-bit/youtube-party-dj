import { getAndRemoveNextVideoFromSession, Item, SessionData } from "backend/sessions.ts";
import { pauseDiscord, resumeDiscord } from "backend/integrations/discord/Client.ts";

export default function VideoPlayer({ queue, session, access_token }: Readonly<{ queue: Item[], session: SessionData , access_token : string}>) {
  // @ts-ignore - YouTube API
  let youtubePlayer;
  //@ts-ignore Spotify API
  let spotifyPlayer;
  let spotifyDeviceID = '';

  if(access_token != " ") {
    const spotifyPlayerElement = document.createElement('script');
    spotifyPlayerElement.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(spotifyPlayerElement);
  }

  const isYoutubePlayer = $$(true);
  const spotifyImage = $$('')

  const youtubePlayerElement = document.createElement("script");
  youtubePlayerElement.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(youtubePlayerElement);
  
  // @ts-ignore - YouTube API
  globalThis.onYouTubeIframeAPIReady = ()=>{};
  // @ts-ignore Spotify API
  globalThis.onSpotifyWebPlaybackSDKReady = ()=> {
    //@ts-ignore Spotify API
    if (spotifyPlayer) return;
        //@ts-ignore Spotify API
    spotifyPlayer = new window.Spotify.Player({
      name: 'UIXSpotifyPlayer',
      //@ts-ignore Spotify API
      getOAuthToken : cb => {cb(access_token)},
      volume: 0.5,
    });

    //@ts-ignore Spotify API
    spotifyPlayer.on("ready", ({device_id}) => {
      spotifyDeviceID = device_id;
    });

    //@ts-ignore Spotify API
    spotifyPlayer.on("player_state_changed", state => onStateChangeSpotify(state))

    spotifyPlayer.connect();
  }

   const playNext = async  () => {
    // @ts-ignore - YouTube API
    if(spotifyPlayer) spotifyPlayer.pause()
     // @ts-ignore - YouTube API
    //youtubePlayer.stopVideo()

    const video = await getAndRemoveNextVideoFromSession(session.code);
      
    if (!video) return;
    session.currentlyPlaying = video;
    
    if (video.type == 'youtube') {
      isYoutubePlayer.val = true;   
      playYoutube(video.id);
    
    } else {
           
      isYoutubePlayer.val = false;
      playSpotify(video.id,video.thumbnail);
    }
   
  }

  function playYoutube(videoId: string) {
    // @ts-ignore - YouTube API
    if (youtubePlayer) {
      youtubePlayer.loadVideoById(videoId);
    } else {
      // @ts-ignore - YouTube API
      youtubePlayer = new window.YT.Player("player", {
        height: "315",
        width: "560",
        videoId: videoId,
        events: {
          onStateChange: onStateChangeYoutube,
        },
        playerVars: {
          autoplay: 1,
          color: "white",
          controls: 0,
          disablekb: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
      });
    }
  }

  
  async function playSpotify(trackId:string, thumbnail:string){
    spotifyImage.val = thumbnail;
    
    //@ts-ignore Spotify API 
    if(spotifyPlayer) {      
      
      const response = await fetch('https://api.spotify.com/v1/me/player/play?device_id=' + spotifyDeviceID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer '+ access_token,
        },
        body: JSON.stringify({
          uris: ['spotify:track:'+ trackId],
          position_ms: 0,
      })
    })
    console.log(response.json());

  }}

  // @ts-ignore - YouTube API
  function onStateChangeYoutube(event) {
    // @ts-ignore - YouTube API
    if (event.data === window.YT.PlayerState.ENDED) {
      setTimeout(() => {
        playNext();
      }, 200);
    // @ts-ignore - YouTube API
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      pauseDiscord();
    // @ts-ignore - YouTube API
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      resumeDiscord();
    }
  }

  let current_track_id = ""; 
  
  //@ts-ignore Spotify API
  function onStateChangeSpotify(state) {
    console.log(state);
    //console.log(current_track_id);
    current_track_id = state.track_window.current_track.id;
  
    //track finishes playing. the state gets paused and the position is 0
    //play new song.
    //the state is changed to new song, it is still paused and pos 0, but not finished playing.

    //for a new song, have counter, when it gets added the counter goes to 1, when it is done the counter goes to 2 and we can skip to next
  
    if (state.paused && state.position === 0 && !state.loading ) {
      setTimeout(() => {
        playNext(); 
      
      }, 200);}

      
    }
      
     
  


  const queueActions = () => {
    if (session.currentlyPlaying) {
      if(session.currentlyPlaying.type== 'youtube')
        playYoutube(session.currentlyPlaying.id);
      else 
        playSpotify(session.currentlyPlaying.id, session.currentlyPlaying.thumbnail)
    } 

    else {
      playNext();
    }
  }

  const text = always(() => {
    console.log("queue updated");
    if (queue.length === 0) {
      return <span>Add a video to the queue!</span>;
    }
    if (!session.currentlyPlaying){
      console.log("queueactions");
      
      queueActions();
    }
      
    return <span>Loading video...</span>;
  });

  return (
    <div class = "relative w-full">
      <div class="relative aspect-video bg-white dark:bg-white/5 border border-black dark:border-white/10 w-full overflow-hidden object-cover rounded-xl">
        {toggle(isYoutubePlayer,<div
          id="player"
          class="w-full h-full flex items-center justify-center dark:text-white text-black font-semibold"
        >
          {text}
        </div>,
        <div class="h-full w-full flex items-center justify-center object-cover">
          <img id="spotifyImage" src={spotifyImage} alt="" />
        </div>
        )}

      
      </div>
      <div class="px-2 py-0.5 rounded-full bg-white dark:bg-white/5 border border-black dark:border-white/10 dark:text-white"> 
      <button class="fo flex items-center ml-2 mr-1 my-1 border border-black dark:border-white/10 dark:text-white rounded-full" onclick={playNext} >
          <svg class="mx-1.5 my-1" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        width="16px" height="16px" viewBox="0 0 408.221 408.221"
        xml:space="preserve">
      <g>
        <g>
          <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11
            C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012
            c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/>
        </g>
      </g>
      </svg>
        
        <p class="mr-1">Play | Skip</p>
      </button>
      </div>
    </div>
  );
}
