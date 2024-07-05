import { redirect } from "uix/utils/window-apis.ts"
import { Context } from "uix/routing/context.ts";
import { addClientToSession, addClientsInfo} from "backend/sessions.ts";

export default function Welcome(ctx: Context) {

    const user_name =  $$(""); 
	const code = (ctx.searchParams.get('code') ?? "XXXX");

    const handleWithNick = () => {
		addClientsInfo(code, user_name);
		const url = `/client/${encodeURIComponent(code)}`;
    	redirect(url);
    };

	const handleAnonym = () => {
		addClientsInfo(code, user_name);
        const url = `/client/${encodeURIComponent(code)}`;  
    	redirect(url);
    };
    
    return (
		<main class="w-screen h-screen absolute inset-0 text-white bg-gray-950 flex flex-col items-center justify-center">
			
				<h1 class="text-6xl text-rose-500 font-bold m-5 text-center p-8"> Welcome <br></br> to the Party </h1>

				<div class="flex flex-col items-center w-full md:w-1/2 px-5">

					<input 
						class="text-black font-bold rounded-lg py-3 w-full text-center text-2xl"
						type="text" 
						placeholder={"Type in your nick for the Party"}
						value={user_name}
						onchange={() => { 
							user_name.val = user_name;
						}}
					/>
				
					<button
						class="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full text-2xl py-4 px-8 m-5 w-full"
						onclick={handleWithNick}
					> Lets Gooo !
					</button>
						
					<div class="w-full h-px bg-gray-400 my-1 md:my-1"></div>

					<button
						class="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full text-2xl py-4 px-8 m-5 w-full"
						onclick={handleAnonym}
					> Continue anonymously :)
					</button>

				</div>
				
		</main>
    );
}