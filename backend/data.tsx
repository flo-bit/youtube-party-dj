import { Innertube } from "https://deno.land/x/youtubei@v10.0.0-deno/deno.ts";
import { Item } from "backend/sessions.ts";
import uniqBy from 'https://cdn.skypack.dev/lodash/uniqBy';
import shuffle from 'https://cdn.skypack.dev/lodash/shuffle';
import take from 'https://cdn.skypack.dev/lodash/take';

const youtube = await Innertube.create();

export async function searchYoutube(q: string) {
  try {

    const result = await youtube.search(q, {type: 'video', sort_by: 'relevance'})

    // filter out videos without duration (live?), then get first 10 videos
    // @ts-ignore - no type for duration
    const videos = result.videos.filter((item) => item.duration?.seconds).slice(0, 10);

    return videos.map(item => normalizeVideo(item));
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function searchSpotify(q:string, access_token: string){
  try{
  const url = 'https://api.spotify.com/v1/search?q='+ q + '&type=track&market=DE&limit=10';
  const response = await fetch(url,
    {        
      headers: {
       Authorization: 'Bearer ' + access_token,
      }
    }
  );
      
  const result = await response.json();
  //@ts-ignore item type
  return result.tracks.items.map((item) => {

  return {
      title: item.name ?? 'Untitled', 
      thumbnail: item.album.images[0].url,
      id: item.id,
      likes: new Set<string>(),
      added: Date.now(),
      duration: Math.floor(item.duration_ms/1000),
      type: 'spotify' 
    } as Item;
  });
}  catch (error) {
  console.error(error);
  return [];
}
}

const normalizeVideo = (video: any) => {
  console.log(video);
  return {
    title: video.title.text ?? 'Untitled',
    // @ts-ignore - no type for thumbnails
    thumbnail: video.thumbnails?.[0].url,
    // @ts-ignore - no type for id
    id: video.id,
    likes: new Set<string>(),
    added: Date.now(),
    // @ts-ignore - no type for duration
    duration: video.duration?.seconds ?? 0,
    type: 'youtube',
  } as Item
}

async function getRelatedVideos(videoId: string) {
  try {
    const videoDetails = await youtube.getInfo(videoId);
    const related = videoDetails.watch_next_feed.map(related => normalizeVideo(related));
    return related;
  } catch (error) {
    console.error("Error fetching related videos:", error);
    throw error;
  }
}

export async function getRecommendations(queue: { id: string }[], maxRecommendations = 5) {
  let allRecommendations: string[] = [];

  for (const video of queue) {
    try {
      const relatedVideos = await getRelatedVideos(video.id);
      allRecommendations.push(...relatedVideos.slice(0, maxRecommendations));
    } catch (error) {
      console.error(`Error processing video ID ${video.id}:`, error);
    }
  }

  // filter out duplicates that are in queue
  const newRecommendations = allRecommendations.filter((video) => !queue.some((item) => item.id === video.id));

  const uniqueRecommendations = uniqBy(newRecommendations, 'id');

  const shuffledRecommendations = shuffle(uniqueRecommendations);

  const finalRecommendations = take(shuffledRecommendations, maxRecommendations);

  console.log("FINDAL RECOMMENDATIONS", finalRecommendations);
  return finalRecommendations;
}

export async function updateRecommendations(session: any, code: string) {
  const recommendations = await getRecommendations(session.queue);

  recommendations.forEach(() => {
    session?.recommendedQueue.pop()
  })
  recommendations.forEach((video) => {
    session?.recommendedQueue.push(video)
  })

  return session;
}
