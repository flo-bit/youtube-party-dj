import { UIX } from "uix";
import { datexVersion, denoVersion, uixVersion } from "../backend/data.ts";

export default 
	<main class="hello-container">
		<section>
			<h1>Welcome to UIX &lt;3</h1>
			<p>This page was rendered on the <b>{UIX.context}</b>!</p>
			<ul>
				<li><b>UIX version:</b> {uixVersion}</li>
				<li><b>DATEX version:</b> {datexVersion}</li>
				<li><b>Deno version:</b> {denoVersion}</li>
			</ul>
			<p>To get started, take a look at our <a href="https://docs.unyt.org/manual/uix/getting-started" target="_blank">documentation</a>.</p>
		</section>
	</main>;