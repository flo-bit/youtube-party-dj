import { getAndRemoveNextVideoFromSession, Item, SessionData } from "backend/sessions.ts";

export default function VideoPlayer({ queue, session }: Readonly<{ queue: Item[], session: SessionData }>) {
  // @ts-ignore - YouTube API
  let player;

  async function playNext() {
    // @ts-ignore - YouTube API
    if (!player || player.getPlayerState() !== YT.PlayerState.PLAYING) {
      const video = await getAndRemoveNextVideoFromSession(session.code);
      if (video) {
        play(video.id);
      }
    }
  }

  function play(videoId: string) {
    // @ts-ignore - YouTube API
    if (player) {
      player.loadVideoById(videoId);
    } else {
      // @ts-ignore - YouTube API
      player = new window.YT.Player("player", {
        height: "315",
        width: "560",
        videoId: videoId,
        events: {
          onStateChange: onStateChange,
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

  // @ts-ignore - YouTube API
  function onStateChange(event) {
    // @ts-ignore - YouTube API
    if (event.data === window.YT.PlayerState.ENDED) {
      setTimeout(() => {
        playNext();
      }, 200);
    }
  }

  function onYouTubeIframeAPIReady() {
    queueActions();
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  // @ts-ignore - YouTube API
  globalThis.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  const queueActions = () => {
    if (session.currentlyPlaying) {
      play(session.currentlyPlaying.id);
    } else {
      playNext();
    }
  }

  const text = always(() => {
    console.log("queue updated");
    if (queue.length === 0) {
      return <span>Add a video to the queue!</span>;
    }
    if (!session.currentlyPlaying)
      queueActions();
    return <span>Loading video...</span>;
  });

  return (
    <div class="relative aspect-video bg-white dark:bg-white/5 border border-black dark:border-white/10 w-full overflow-hidden object-cover rounded-xl">
      <div
        id="player"
        class="w-full h-full flex items-center justify-center dark:text-white text-black font-semibold"
      >
        {text}
      </div>
    </div>
  );
}


/*
  let ytplayer;
  let spotplayer;
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);
  function play2(id: string, type: string) {
    if (type === "youtube") {
      if (ytplayer) {
        player.loadVideoById(id);
      } else {
        player = new window.YT.Player("ytplayer", {
          height: "315",
          width: "560",
          videoId: id,
          events: {
            onStateChange: onStateChange,
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
    } else if (type === "spotify") {
      if (spotplayer) {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
          method: "PUT",
          body: JSON.stringify({ uris: [`spotify:track:${id}`] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }) else {
            player = new Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            })
        }};
      }
    } 
*/
