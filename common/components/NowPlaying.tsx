import { Item } from "backend/sessions.ts"

export function NowPlaying({ item }: Readonly<{ item: Item }>) {

  const shouldShowAddedBy = () => {
    return item.addedBy && item.addedBy.toLowerCase() !== "anon";
  };

  
  const renderAddedBy = () => {
    if (shouldShowAddedBy()) {
      return (
        <div class="text-sm font-bold text-accent-500 dark:text-accent-400 text-left">
          @{item.addedBy}
        </div>
      );
    }
    return null;
  };

  
  return (
    <div class="queueframe w-full rounded-xl bg-white dark:bg-white/5 border border-black dark:border-white/10 h-22 overflow-hidden mb-2">
      <div class="queueitem text-black dark:text-white flex items-left h-full">
        <img src={item.thumbnail} class="h-22 w-36 object-cover" alt=" " />
        <div class="flex flex-1 flex-grow justify-between">
          <div class="pl-4 justify-center flex flex-col h-full">
            {renderAddedBy()}
            <p class="line-clamp-2 font-bold text-md leading-6">{item.title}</p>
            <p class="text-xs">{item.duration} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
