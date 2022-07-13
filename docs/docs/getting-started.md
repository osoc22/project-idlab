## Getting started with powerful personal data

This project is a calendar app that uses linked data for weather info on your own calendar, all stored in your personal solid pod.

### Get a pod

Solid pods are moveable, privacy-focused, decentralised data stores.
See the [solid project website](https://solidproject.org/about) for more info on that.

Before you can use this application, you'll need a Solid pod by either...
- ... using your existing pod (if applicable).
- ... [signing up for a pod](https://solidproject.org/users/get-a-pod) from a pod provider.
- <details>
    <summary>... locally running our test pod</summary>
    
    Note: [not meant for production!](../../README.md#production) 
    
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
  </details>

### Use our app!

Next, all you have to do is [open our web app](https://osoc22.github.io/project-idlab/app/), and you're all set!