import NavItem from "common/components/nav/NavItem.tsx";

export default function NavMenu({ buttons, active }: Readonly<{ buttons: { label: string, onClick: () => void }[], active: string }>) {
	return (
		<div class="fixed bottom-6 w-full z-50 pointer-events-auto">
			<div class="flex flex-1 justify-center">

				<nav>
					<ul
						class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-white/5 dark:text-zinc-200 dark:ring-white/10"
					>
						{buttons.map(({ label, onClick }) => (
							<NavItem onClick={onClick} active={active} label={label} />
						))}
					</ul>
				</nav>
			</div>
		</div>)
}
