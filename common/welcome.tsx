import { redirect } from "uix/utils/window-apis.ts"
import { Context } from "uix/routing/context.ts";
import { addClientsInfo } from "backend/sessions.ts";
import {
	loadInitialTheme,
} from "./components/ToggleThemeButton.tsx";


export default function Welcome(ctx: Context) {

	const user_name = $$("");
	const code = $$(ctx.searchParams.get('code') ?? "");

	const noCode = always(() => {
		return !code.val;
	})

	const continueToParty = () => {
		if(!code.val) {
			console.error('No code provided');
			return;
		}

		const name = user_name.val ?? 'anon';
		const my_code = code.val.toUpperCase();

		addClientsInfo(code.val.toUpperCase(), name);

		const url = `/client/${encodeURIComponent(my_code)}`;
		redirect(url);
	}

	loadInitialTheme();

	return (
		<div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-950">
			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<img class="mx-auto h-10 w-auto" src="./rsc/logo.svg" alt="Your Company" />
				<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-50">Join the party</h2>
			</div>

			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div class="space-y-6">
					<div>
						<label for="code" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Code</label>
						<div class="mt-2">
							<input id="code" name="code" value={code}
								onchange={() => {
									code.val = code;
								}} required class="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset dark:bg-white/5 ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 dark:focus:ring-accent-500 sm:text-sm sm:leading-6" />
						</div>
					</div>
					
					<div>
						<label for="nickname" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Nickname</label>
						<div class="mt-2">
							<input id="nickname" name="nickname" value={user_name}
								onchange={() => {
									user_name.val = user_name;
								}} class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset dark:bg-white/5 ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 dark:focus:ring-accent-500 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<button disabled={noCode} onclick={continueToParty} class="flex w-full justify-center rounded-md bg-accent-600 dark:bg-accent-500 disabled:opacity-50 dark:hover:bg-accent-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600">Join</button>
					</div>
				</div>
			</div>
		</div>
	);
}