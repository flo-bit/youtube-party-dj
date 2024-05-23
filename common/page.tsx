import { UIX } from "uix";
import { datexVersion, denoVersion, uixVersion } from "../backend/data.ts";

export default 
	<main class="flex items-center justify-center h-screen">
		<section>
			<h1 class="text-xl font-bold text-red-500">Youtube Party DJ</h1>
			<p>This page was rendered on the <b>{UIX.context}</b>!</p>
			<ul>
				<li><b>UIX version:</b> {uixVersion}</li>
				<li><b>DATEX version:</b> {datexVersion}</li>
				<li><b>Deno version:</b> {denoVersion}</li>
			</ul>
			<p>To get started, take a look at our <a href="https://docs.unyt.org/manual/uix/getting-started" target="_blank" class="font-bold underline">documentation</a>.</p>
		</section>
	</main>;