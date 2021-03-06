# Project IDLab - Powerful Personal Data

<div align="center">
  <img src="./docs/assets/powerful-personal-data-crest.svg" width="250px" />
</div>

Team Powerful Personal Data, also known as Solid Concepts, partnered up with [IDLab](https://www.ugent.be/ea/idlab/en) and [Imec](https://www.imec-int.com/en) to showcase how "taking back control of your personal data" can be achieved using linked data and Solid pods. We have built a smart calendar application that takes advantage of linked data to serve you weather data for the events that you store on your private Solid pod.

Our application consists of three parts:
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

Or use the interactive CLI
```bash
git clone https://github.com/osoc22/project-idlab.git
cd project-idlab/
node run.mjs
```
*Note: the cli doesn't support backend at the moment.*

## Project structure
- [.github/workflows/](.github/workflows/)
  - [svelte-to-gh-pages.yml](.github/workflows/svelte-to-gh-pages.yml) --> GitHub Actions CI/CD for statically building the frontend, hosting it, linting.... 
- [app/](app/)
  - [solidpod-testserver/](app/solidpod-testserver/) --> Scripts, files and build artifacts for the solidpod testserver - [docs page](https://osoc22.github.io/project-idlab/docs/solidpod-testserver/)
  - [svelte/](app/svelte/) --> Source files and scripts for the Svelte frontend - [docs page](https://osoc22.github.io/project-idlab/docs/svelte/)
  - [backend/](app/backend) --> Source code and docker deployment file for the backend weather application
- [docs/](docs/) GitHub Pages site for documentation and hosting. Accessible through https://osoc22.github.io/project-idlab/
- [poc](poc/) --> proof of concepts (using comunica, rml, JSON-LD...)
- [LICENSE](LICENSE) --> License used by this project
- [NOTICE.md](https://github.com/osoc22/project-idlab/blob/master/NOTICE.md) --> Licenses used by projects used by this project
- [README.md](README.md) --> this
- [run.mjs](run.mjs) --> node script for interactive CLI

More specific info of files within or functions of many of these folders can be found in https://osoc22.github.io/project-idlab/docs/

## Todo's/enhancements
Some features were cancelled due to time constraints. You can find these with the [out of scope label in our GitHub Issues](https://github.com/osoc22/project-idlab/issues?q=is%3Aissue+label%3A%22out+of+scope%22).

## Notice
- CommunitySolidServer is licensed under the MIT License. The copyright notice is included [in this repository](NOTICE.md#CommunitySolidServer) or [on their repository](https://github.com/CommunitySolidServer/CommunitySolidServer/blob/main/LICENSE.md).

## License
Developed by [Abel de Bruijn](https://github.com/yustarandomname), [DemianD](https://github.com/demiand), [Denperidge](https://github.com/Denperidge), [Matei Penca](https://github.com/Matei9721) and [Thor Galle](https://github.com/th0rgall) for [Open Summer Of Code](https://osoc.be/) 2022.
This software is licensed under the [MIT license](LICENSE).
