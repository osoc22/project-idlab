import { sveltekit } from '@sveltejs/kit/vite';
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import builtins from "rollup-plugin-node-builtins";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['svelte-hero-icons']
	},
	optimizeDeps: {
		esbuildOptions: {
		  plugins: [
			NodeGlobalsPolyfillPlugin({
			  process: true,
			  buffer: true,
			}),
			NodeModulesPolyfillPlugin(),
		  ],
		},
	},
	build: {
		rollupOptions: {
		  plugins: [
			// Enable rollup polyfills plugin
			// used during production bundling
			builtins(),
			rollupNodePolyFill(),
		  ],
		},
	},

};

export default config;
