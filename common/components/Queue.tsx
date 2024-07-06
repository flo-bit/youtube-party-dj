import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { QueueItem } from "./QueueItem.tsx";
import { Item } from "backend/sessions.ts";

export type QueueType = 'player' | 'client' | 'search';

export function Queue({ items, type, code }: Readonly<{ items: ObjectRef<Item[]>, type: QueueType, code: string }>) {
  return <div class="space-y-4">{
    items.$.map(item => {
      return <QueueItem item={item} type={type} code={code}></QueueItem>
    })}
  </div>
}