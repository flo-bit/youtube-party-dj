import { Datex } from "datex-core-legacy/datex.ts";
import { UIX } from "uix";

/**
 * Version information on the backend
 */

type Item = {
    title: string;
    thumbnail: string;
    duration: string;
    url : string;
    likes: number;
  }

  type Queue = {
    items: Item[],
    type: 'player' | 'client'
}

export const sampleQueueItems : Item[] = $$([
    {
        title : 'Rick Roll',
        thumbnail: '',
        duration: '2:57',
        likes : $$(69),
        url  : 'dQw4w9WgXcQ'
                  
    },
    {
        title : 'Epic Sax Guy',
        thumbnail: '',
        duration: '4:20',
        likes : $$(420),           
        url  : 'pHXDMe6QV-U'
    },
]);

export const samplePlayerQueue  : Queue = $$({
    items : sampleQueueItems,
    type : "player",

})

export const sampleClientQueue : Queue = $$({
    items : sampleQueueItems,
    type : "client",
})



export const denoVersion = Deno.version.deno;
export const datexVersion = Datex.Runtime.VERSION;
export const uixVersion = UIX.version;