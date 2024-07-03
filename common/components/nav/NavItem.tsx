export default function NavItem({ onClick, active, label}: { onClick?: () => void, active: string, label: string }) {
	function renderActive() {
		if (active !== label) return null

		return (<span
			class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/40 dark:to-cyan-400/0"
		/>)
	}

	const myButton = always(() => {
		return (<button
			onclick={onClick}
			class={'relative block px-3 py-2.5 transition duration-200 ' +
				(active == label
					? 'text-cyan-500 dark:text-cyan-400'
					: 'hover:text-cyan-500 dark:hover:text-cyan-400')}
		>
			{active == label ? <span
			class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/40 dark:to-cyan-400/0"
		/> : null}
			{label}
		</button>)
	})

	return myButton;
}