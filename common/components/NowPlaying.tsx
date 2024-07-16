import { Item } from "backend/sessions.ts"
import { parseTime } from "common/helper.tsx"

export function NowPlaying({ item }: Readonly<{ item: Item }>) {
  return <div class="queueframe w-full rounded-xl bg-white dark:bg-white/5 border border-black dark:border-white/10 h-20 overflow-hidden mb-2">
    <div class="queueitem dark:text-white tex-black flex items-left h-full">
      <img src={item.thumbnail} class="h-20 w-32 object-cover" alt=" " />
      <div class="flex flex-1 flex-grow justify-between">
        <div class="pl-4 justify-center flex flex-col h-full">
          <p class="line-clamp-2 font-bold text-md leading-6">{item.title} </p>
          <p class="text-xs">{parseTime(item.duration)} minutes</p>
        </div>
      </div>
    </div>
  </div>
}
