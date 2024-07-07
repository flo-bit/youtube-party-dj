import { Innertube } from "https://deno.land/x/youtubei@v10.0.0-deno/deno.ts";

const youtube = await Innertube.create();

export async function search(q: string, userName: string) {
  try {

    const result = await youtube.search(q, {type: 'video', sort_by: 'relevance'})

    // filter out videos without duration (live?), then get first 10 videos
    // @ts-ignore - no type for duration
    const videos = result.videos.filter((item) => item.duration?.seconds).slice(0, 10);

    return videos.map((item) => {
      return {
        addedBy: userName,
        title: item.title.text ?? 'Untitled',
        // @ts-ignore - no type for thumbnails
        thumbnail: item.thumbnails?.[0].url,
        // @ts-ignore - no type for id
        id: item.id,
        likes: new Set<string>(),
        added: Date.now(),
        // @ts-ignore - no type for duration
        duration: item.duration?.text ?? '-',
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
