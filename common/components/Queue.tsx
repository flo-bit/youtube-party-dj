import { QueueItem } from "./QueueItem.tsx";
import { Item } from "backend/sessions.ts";

export type QueueType = 'player' | 'client' | 'search' | 'history';

export function Queue({ items, type, code }: Readonly<{ items: Item[], type: QueueType, code: string }>) {
  return <div class="space-y-4">{
    // @ts-ignore - uix stuff that doesn't work with types
    items.$.map((item: Item) => {
      // @ts-ignore - uix stuff that doesn't work with types
      return <QueueItem item={item.$} type={type} code={code}></QueueItem>
    })}
  </div>
}
