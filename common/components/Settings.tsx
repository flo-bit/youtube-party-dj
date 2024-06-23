import ToggleThemeButton from "common/components/ToggleThemeButton.tsx";

export default function Settings() {
  return (<div class="text-black dark:text-white">
	<h1 class="font-semibold text-xl mb-8">settings</h1>

	<div class="">
		<div class="flex justify-between">
			<p>dark/light mode</p>

			<ToggleThemeButton />
		</div>
	</div>
  </div>)
}