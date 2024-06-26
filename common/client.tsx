import { Queue } from "./components/Queue.tsx";
import SearchBar from "./components/SearchBar.tsx";
import Settings from "./components/Settings.tsx";
import { search } from "backend/data.tsx";
import { addClientToSession, Item } from "backend/sessions.ts";
import { Context } from "uix/routing/context.ts";
import { loadInitialTheme } from "./components/ToggleThemeButton.tsx";
import NavMenu from "common/components/nav/NavMenu.tsx";

export const playedVideos :Item[] = $$([]);

export default async function App(ctx: Context) {
	const code = (ctx.urlPattern?.pathname.groups[0] ?? "XXXX");

	const session = await addClientToSession(code);

	if (!session) {
		return;
	}

	const searchResults: Item[] = $$([]);

	const activeView: ('queue' | 'search' | 'settings') = $$('queue');

	const onSearch = async (value: string) => {
		activeView.val = 'search';

		searchResults.splice(0, searchResults.length);
		searchResults.push(...await search(value));
	};

	const view = always(() => {
		if (activeView == 'queue') {
			return <Queue items={session.queue} type={'client'} code={code} />;
		} else if (activeView == 'search') {
		return <Queue items={searchResults} type={'search'} code={code} />;
		}

		return <Settings />;
	})

	const menu = always(() => {
		if(!activeView) return;

		console.log('activeView', activeView);

		return <NavMenu active={activeView} buttons={[{
			label: 'queue', onClick: () => {
				console.log('queue');
				activeView.val = 'queue';
			}
		}, {
			label: 'search', onClick: () => {
				console.log('search');
				activeView.val = 'search';
			}
		}, {
			label: 'settings',
			onClick: () => {
				console.log('settings');
				activeView.val = 'settings';
			}
		}]} />
	})

	loadInitialTheme();

	return (
		<main class="bg-gray-50 dark:bg-gray-950">
			<div
				class="flex flex-col overflow-y-hidden h-[100dvh] rounded-xl mx-auto max-w-2xl"
			>
				<div class="flex px-4 my-4 ">
					<SearchBar onSearch={onSearch} />
				</div>
				<div class="px-4 py-4 border-t border-black dark:border-white/20 mx-0 overflow-y-scroll flex-grow">
					{view}
				</div>
				<button onclick={()=>toggleHistory.val = !toggleHistory.val} class="absolute bottom-4 right-2 w-20 h-20 bg-white dark:bg-white/2 border border-black dark:border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                    		PLAYING HISTORY
                		</button>
				{toggle(toggleHistory, <Queue items={playedVideos} type={'history'} code={code}/>)}
			</div>
			{menu}
		</main>
	);
}
