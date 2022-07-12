import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build"
		}),

		// Based of https://github.com/sveltejs/kit/tree/master/packages/adapter-static#github-pages
		appDir: "internal",

		paths: { 
			assets: "",
			base: dev ? "" : "/project-idlab/app"
		},

		prerender: {
			default: true
		}
		
	}
};

export default config;
