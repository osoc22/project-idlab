# Project IDLab - Powerful Personal Data

<div align="center">
  <img src="./docs/assets/powerful-personal-data-crest.svg" width="250px" />
</div>

## Getting started

Prerequisites:
- [Node.js](https://nodejs.org/en/), version 16 is recommended. Consider using [nvm](https://github.com/nvm-sh/nvm) if you want to use multiple node versions on your system.
- [Git](https://git-scm.com/downloads) (In case you're using Windows, make sure to tick `install Git Bash`, so you can use run.sh!)

To set up the project:
```bash
git clone https://github.com/osoc22/project-idlab.git
npm install
npm start
```
or
```bash
git clone https://github.com/osoc22/project-idlab.git
chmod +x run.sh
./run.sh
```
*(Direct calling of run.sh, without npm start, might be deprecated down the road)*

run.sh will install and setup any currently missing things, and can later simply be re-used to start your existing install! 

## Project structure
- [app/](app/)
  - [setup/](app/setup/) --> scripts to be used during setup, currently only dev credentials
  - *solid/ --> build artifact, stores solidpod data*
  - [web/](app/web/) --> unbundled files for the web interface
- *dist/ --> build artifact, web interface after parcel bundling*
- [docs/](docs/) 
  - [app/](docs/app/) --> Parcel build of [app/web/](app/web/), hosted online through GitHub Pages. 
  - [docs/](docs/docs/) --> documentation
- *node_modules/ --> build artifact, installation location for node modules*
- [poc](poc/) --> proof of concepts (using comunica, rml, JSON-LD...)
- *tools/ --> build artifact, installation location for external tools (currently only Bashlib)*
- [LICENSE](LICENSE) --> License used by this project
- [NOTICE.md](NOTICE) --> Licenses used by projects used by this project
- [package.json](package.json) && [package-lock.json](package-lock.json) --> information about (installed) npm (modules)
- [README.md](README.md) --> this
- [run.sh](run.sh) --> bash script to setup & run the project


## Notice
- CommunitySolidServer is licensed under the MIT License. The copyright notice is included [in this repository](NOTICE.md#CommunitySolidServer) or [on their repository](https://github.com/CommunitySolidServer/CommunitySolidServer/blob/main/LICENSE.md).

## License
Developed by [Abel de Bruijn](https://github.com/yustarandomname), [Denperidge](https://github.com/Denperidge) and [Matei Penca](https://github.com/Matei9721) for [Open Summer Of Code](https://osoc.be/) 2022.
This software is licensed under the [MIT license](LICENSE).
