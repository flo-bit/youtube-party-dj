import { QueueItem } from "./QueueItem.tsx";
import { Item } from "backend/data.tsx";

export type QueueType = 'player' | 'client' | 'search';


export function Queue({ items, type }: Readonly<{ items: Item[], type: QueueType }>) {
  return <div class="space-y-4">{
    // @ts-ignore - uix stuff that doesn't work with types
    items.$.map((item: Item) => {
      // @ts-ignore - uix stuff that doesn't work with types
      return <QueueItem item={item.$} type={type}></QueueItem>
    })}
  </div>
}