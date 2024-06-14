import { Item } from "backend/data.tsx"

export function NowPlaying({item} : Readonly<{item:Item}>)
{
    return <div class="w-full rounded-xl bg-white/5 border border-white/10 h-20 overflow-hidden mb-2">
          <div class="text-white flex items-left h-full">
            <img src={item.thumbnail} class="h-20 w-32 object-cover" alt=" " />
            <div class="flex flex-1 flex-grow justify-between">
              <div class="pl-4 justify-center flex flex-col h-full">
                <p class="line-clamp-2 font-bold text-md leading-6">{item.title} </p>
                <p class="text-xs">{item.duration} minutes</p>
              </div>
              <div class="flex h-full justify-center items-center px-2">
                <p class="text-red-600">Now Playing</p>
              </div>
            </div>
          </div>
        </div>
}
