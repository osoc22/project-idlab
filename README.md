# Project IDLab - Powerful Personal Data

<div align="center">
  <img src="./docs/assets/powerful-personal-data-crest.svg" width="250px" />
</div>

Powerful Personal Data consists of three parts:
- A front-end calendar app
- A back-end weather API
- A solidpod server for testing

## Quick start
Refer to our quick start documentation at https://osoc22.github.io/project-idlab/docs/quick-start!

## Building locally

For any of the parts, you will require the following prerequisites:
- [Node.js](https://nodejs.org/en/), version 16 is recommended. Consider using [nvm](https://github.com/nvm-sh/nvm) if you want to use multiple node versions on your system.
- [Git](https://git-scm.com/downloads) (In case you're using Windows, make sure to tick `install Git Bash`, so you can use run.sh!)

To set up specific parts locally, refer to [the docs](https://osoc22.github.io/project-idlab/docs/) of the [frontend](https://osoc22.github.io/project-idlab/docs/svelte/), [backend](https://osoc22.github.io/project-idlab/docs/backend/) or [solidpod testserver](https://osoc22.github.io/project-idlab/docs/solidpod-testserver/) 

Or to use the interactive CLI
```bash
git clone https://github.com/osoc22/project-idlab.git
chmod +x run.sh
./run.sh
```

## Project structure
- [.github/workflows/](.github/workflows/)
  - [svelte-to-gh-pages.yml](.github/workflows/svelte-to-gh-pages.yml) --> GitHub Actions CI/CD for statically building the frontend, hosting it, linting.... 
- [app/](app/)
  - [solidpod-testserver/](app/solidpod-testserver/) --> Scripts, files and build artifacts for the solidpod testserver - [docs page](https://osoc22.github.io/project-idlab/docs/solidpod-testserver/)
  - [svelte/](app/svelte/) --> Source files and scripts for the Svelte frontend - [docs page](https://osoc22.github.io/project-idlab/docs/svelte/)
  - [backend/](app/backend) --> Source code and docker deployment file for the backend weather application
- [docs/](docs/)
  - [app/](docs/app/) --> Static build of the [Svelte frontend](app/svelte/), built through [GitHub Actions](.github/workflows/svelte-to-gh-pages.yml) hosted online through [GitHub Pages](https://osoc22.github.io/project-idlab/app/).
  - [docs/](docs/docs/) --> Jekyll site for documentation, also [hosted through GitHub pages](https://osoc22.github.io/project-idlab/docs/).
- [poc](poc/) --> proof of concepts (using comunica, rml, JSON-LD...)
- [LICENSE](LICENSE) --> License used by this project
- [NOTICE.md](NOTICE) --> Licenses used by projects used by this project
- [README.md](README.md) --> this
- [run.sh](run.sh) --> bash script for interactive CLI


## Notice
- CommunitySolidServer is licensed under the MIT License. The copyright notice is included [in this repository](NOTICE.md#CommunitySolidServer) or [on their repository](https://github.com/CommunitySolidServer/CommunitySolidServer/blob/main/LICENSE.md).

## License
Developed by [Abel de Bruijn](https://github.com/yustarandomname), [Denperidge](https://github.com/Denperidge) and [Matei Penca](https://github.com/Matei9721) for [Open Summer Of Code](https://osoc.be/) 2022.
This software is licensed under the [MIT license](LICENSE).
