---
title: Install, run & build
nav_order: 1
parent: Svelte (Frontend)
grand_parent: Docs
---

# Svelte: Install, run & build the front-end

The front-end is a Svelte project that generates into static files. It's based on create-svelte, which is viewable [on the repo](https://github.com/osoc22/project-idlab/blob/master/app/svelte/README-create-svelte.md).

However, the main relevant commands are as following:
- `npm dev` - start a dev server with auto-reload, useful whilst coding.
- `npm build` - builds the Svelte project into the build/ directory, useful for deployment.
*(npm can be substituted by svelte in both these commands)*

Important notes:
- [Adapter-Static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) is used to ensure that Svelte generates a static website
- [svelte-to-gh-pages.yml](https://github.com/osoc22/project-idlab/blob/master/.github/workflows/svelte-to-gh-pages.yml) is a GitHub actions workflow that auto builds & deploys our project into GitHub pages
- [vite.config.js](https://github.com/osoc22/project-idlab/blob/master/app/svelte/vite.config.js) has a bunch of polyfills to allow the [solid client](solid-integration) to work, so be careful when changing that.