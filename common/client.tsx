import { QueueItem } from "./components/QueueItem.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { search } from "backend/data.tsx";
import { updateUser, getSortedQueue, Item } from "backend/sessions.ts";
import { Context } from "uix/routing/context.ts";
import { loadInitialTheme } from "./components/ToggleThemeButton.tsx";
import NavMenu from "./components/nav/NavMenu.tsx";
import { toggleTheme } from "./components/ToggleThemeButton.tsx";

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

  const activeView = $$<"queue" | "search" | "chat" | "settings">("queue");

	const showQueue = $$(false);
	const showSearch = $$(false);
	const showChat = $$(false);
	const showSettings = $$(false);

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

              showQueue.val = true;
              showSearch.val = false;
              showChat.val = false;
              showSettings.val = false;
            },
          },
          {
            label: "search",
            onClick: () => {
              console.log("search");
              activeView.val = "search";

              showQueue.val = false;
              showSearch.val = true;
              showChat.val = false;
              showSettings.val = false;
            },
          },
          // {
          //   label: "chat",
          //   onClick: () => {
          //     console.log("chat");
          //     activeView.val = "chat";

          //     showQueue.val = false;
          //     showSearch.val = false;
          //     showChat.val = true;
          //     showSettings.val = false;
          //   },
          // },
          {
            label: "settings",
            onClick: () => {
              console.log("settings");
              activeView.val = "settings";
              showQueue.val = false;
              showSearch.val = false;
              showChat.val = false;
              showSettings.val = true;
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

          <div class="space-y-4 text-white" style={{ display: showSearch }}>{
            searchResults.$.map(item => {
              return <QueueItem item={item} type={'search'} code={code}></QueueItem>
            })}
          </div>
          <div class="space-y-4 text-white" style={{ display: showQueue }}>{
            sorted.$.map(item => {
              return <QueueItem item={item} type={'client'} code={code}></QueueItem>
            })}
          </div>



          <div class="space-y-4 text-white" style={{ display: showChat }}>Work in Progress
{/*
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-medium">Chat Box</span>
              <input type="checkbox" id="darkModeToggle" class="toggle-checkbox" onclick="toggleDarkMode()"></input>
            </div>

            <div id="chatBox" class="h-64 bg-white dark:bg-gray-700 dark:text-white p-4 rounded overflow-y-auto shadow-md border border-gray-300 dark:border-gray-600">
              Messages will be displayed here
            </div>

            <div class="mt-4 flex">
              <input type="text" id="messageInput" class="flex-1 p-2 rounded-l border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Type a message..."></input>
              <button onclick="sendMessage()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">Send</button>
            </div>
*/}
          </div>



          <div class="space-y-4 text-white" style={{ display: showSettings }}>
            <label class="inline-flex items-center cursor-pointer">
              <input onclick={toggleTheme} type="checkbox" value="" class="sr-only peer" checked></input>
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
            </label>
          </div>
        </div>
      </div>
      {menu}
    </main>
  );
}
