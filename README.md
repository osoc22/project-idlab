# Project IDLab - Powerful Personal Data

## Getting started

Prerequisites:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads) (In case you're using Windows, make sure to tick `install Git Bash`, so you can use run.sh!)

To set up the project:
```bash
git clone https://github.com/osoc22/project-idlab.git
chmod +x run.sh
./run.sh
```

run.sh will install and setup any currently missing things, and can later simply be re-used to start your existing install! 

## Demo/test/dev credentials
These credentials will be set when either saying yes to the dev-setup dialogue on install,
or when running `./setup.sh dev`.

- base url: http://localhost:3000/
- name: johndoe
- email: johndoe@localhost.be
- password: johndoe

## Production
It should be noted that in run.sh, the file-no-setup config is used.
For production, there's probably better options! Check out the available configs [here](https://github.com/CommunitySolidServer/CommunitySolidServer/tree/main/config).

## Notice
- CommunitySolidServer is licensed under the MIT License. The copyright notice is included [in this repository](NOTICE#CommunitySolidServer) or [on their repository](https://github.com/CommunitySolidServer/CommunitySolidServer/blob/main/LICENSE.md).

## License
This software is licensed under the [MIT license](LICENSE).
