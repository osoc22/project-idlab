/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		theme: {
			extend: {
				gridTemplateColumns: {
					// Complex site-specific column configuration
					table: '1fr 1fr'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
