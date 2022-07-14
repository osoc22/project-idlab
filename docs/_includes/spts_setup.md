This will quickly set up a Solid community server and create a pod with auto-inserted test credentials.
Setup & start:

{% 
include clone.md 
relpath="solidpod-testserver/"
commands=
"npm install
npm start"      
%}

If you select `y` on the post install script, the following credentials will be set:  
```
- base url/pod host/identity provider: http://localhost:3000/
- name: johndoe
- email: johndoe@localhost.be
- password: johndoe
```
