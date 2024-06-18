import { UIX } from "uix";

// register a new theme
UIX.Theme.registerTheme({
	name: 'no-more-css-theme',
	mode: undefined,
	values: {
		'bg': 'white',
		'text': 'black'
	},
	stylesheets: [],
	onActivate() {
		console.log('Theme activated!');
	},
	onDeactivate() {
		console.log('Theme deactivated!');
	}
})

UIX.Theme.useThemes("no-more-css-theme")
