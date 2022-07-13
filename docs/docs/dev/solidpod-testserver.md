## Solidpod-testserver: technical info

### Production warning
It should be noted that in solidpod-testserver the file-no-setup config is used.
For production, there's probably better options! Check out the available configs [here](https://github.com/CommunitySolidServer/CommunitySolidServer/tree/main/config).

### Getting started

This will quickly set up a Solid community server and create a pod with auto-inserted test credentials.
Setup & start:
```bash
git clone https://github.com/osoc22/project-idlab.git
cd project-idlab/app/solidpod-testserver
npm install
npm start
```
If you select `y` on the post install script, the following credentials will be set:  
```
- base url/pod host/identity provider: http://localhost:3000/
- name: johndoe
- email: johndoe@localhost.be
- password: johndoe
```
