import { QueueItem } from "./components/QueueItem.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { search } from "backend/data.tsx";
import { updateUser, getSortedQueue, Item } from "backend/sessions.ts";
import { Context } from "uix/routing/context.ts";
import { loadInitialTheme } from "./components/ToggleThemeButton.tsx";
import NavMenu from "./components/nav/NavMenu.tsx";

export default async function App(ctx: Context) {
  const code = ctx.urlPattern?.pathname.groups[0] ?? "XXXX";

  //get the nick of the user from sessiondata
  //const nick = (ctx.searchParams.get('nick') ?? "anon");
  
	const session = await updateUser(code);


  if (!session) {
    return;
  }

	const sorted = await getSortedQueue(code);

  const searchResults = $$<Item[]>([]);

  const activeView = $$<"queue" | "search" | "settings">("queue");

	const showSearch = $$(false);

  const onSearch = async (value: string) => {
    activeView.val = "search";

    showSearch.val = true;

    searchResults.splice(0, searchResults.length);
    searchResults.push(...(await search(value)));
  };

  const menu = always(() => {
    if (!activeView) return;

    console.log("activeView", activeView);

    return (
      <NavMenu
        active={activeView}
        buttons={[
          {
            label: "queue",
            onClick: () => {
              console.log("queue");
              activeView.val = "queue";

              showSearch.val = false;
            },
          },
          {
            label: "search",
            onClick: () => {
              console.log("search");
              activeView.val = "search";

              showSearch.val = true;
            },
          },
          {
            label: "settings",
            onClick: () => {
              console.log("settings");
              activeView.val = "settings";
            },
          },
        ]}
      />
    );
  });

  loadInitialTheme();

  return (
    <main class="bg-gray-50 dark:bg-gray-950">
      <div class="flex flex-col overflow-y-hidden h-[100dvh] rounded-xl mx-auto max-w-2xl">
        <div class="flex px-4 my-4 ">
          <SearchBar onSearch={onSearch} />
        </div>
        <div class="px-4 py-4 border-t border-black dark:border-white/20 mx-0 overflow-y-scroll flex-grow">
        
        {toggle(showSearch, 
        <div class="space-y-4">{
          searchResults.$.map(item => {
            return <QueueItem item={item} type={'search'} code={code}></QueueItem>
          })}
        </div>,
      <div class="space-y-4">{
        sorted.$.map(item => {
          return <QueueItem item={item} type={'client'} code={code}></QueueItem>
        })}
      </div>)}
       
        </div>
      </div>
      {menu}
    </main>
  );
}
