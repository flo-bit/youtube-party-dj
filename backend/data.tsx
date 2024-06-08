import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { SessionData } from "../common/helpers/sessions.ts";

const env = await load();

export type Item = {
  title: string;
  thumbnail: string;
  duration: string;
  id: string;
  likes: number;
  liked?: boolean;
  added: number;
};

export const sampleQueue: Item[] = $$([
  {
    title: "Cat sings in camera",
    thumbnail: "https://i.ytimg.com/vi/av4sEcTS8QA/hqdefault.jpg",
    duration: "0:07",
    likes: 1000,
    id: "kG7d_4LeP48",
    added: Date.now() - 50,
  },
  {
    title:
      'Welcome to the Internet - Bo Burnham (from "Inside" -- ALBUM OUT NOW)',
    thumbnail: "https://i.ytimg.com/vi/k1BneeJTDcU/default.jpg",
    duration: "4:20",
    likes: 1,
    id: "k1BneeJTDcU",
    added: Date.now(),
  },
  {
    title: "Rick Astley - Never Gonna Give You Up (Video)",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
    duration: "3:33",
    likes: 1,
    id: "dQw4w9WgXcQ",
    added: Date.now() + 100,
  },
  {
    title: "LCD Soundsystem - New York, I Love You But You're Bringing Me Down",
    thumbnail: "https://i.ytimg.com/vi/-eohHwsplvY/default.jpg",
    duration: "2:57",
    likes: 1,
    id: "-eohHwsplvY",
    added: Date.now() + 200,
  },
]);

export function removePlayedVideo() {
  sampleQueue.shift();
}

effect(() => {
  // sort by likes, then by time added
  sampleQueue.sort((a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    if (a.added > b.added) return 1;
    if (a.added < b.added) return -1;
    return 0;
  });
});

// get key from .env
const key = env.YOUTUBE_API_KEY;

export async function search(q: string) {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&safeSearch=none&key=${key}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const json = await response.json();

    // deno-lint-ignore no-explicit-any
    return json.items.map((item: any) => {
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        id: item.id.videoId,
        likes: 1,
        added: Date.now(),
        duration: "-",
      };
    });
  } catch (error) {
    console.error(error);
  }
}

export const sessionS = eternalVar('sessions') ?? $$(Array<SessionData>());