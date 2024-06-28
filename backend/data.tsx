import { Innertube } from "https://deno.land/x/youtubei@v10.0.0-deno/deno.ts";
import { Item } from "backend/sessions.ts";

const youtube = await Innertube.create();

export async function searchYoutube(q: string) {
  try {

    const result = await youtube.search(q, {type: 'video', sort_by: 'relevance'})

    // filter out videos without duration (live?), then get first 10 videos
    // @ts-ignore - no type for duration
    const videos = result.videos.filter((item) => item.duration?.seconds).slice(0, 10);
      
    return videos.map((item) => {
      return {
        title: item.title.text ?? 'Untitled',
        // @ts-ignore - no type for thumbnails
        thumbnail: item.thumbnails?.[0].url,
        // @ts-ignore - no type for id
        id: item.id,
        likes: new Set<string>(),
        added: Date.now(),
        // @ts-ignore - no type for duration
        duration: item.duration?.seconds,
        type:'youtube'
      } as Item;
    });
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