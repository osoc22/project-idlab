## Svelte/front-end development docmunentation

It all gets set up at once though!

```bash
git clone https://github.com/osoc22/project-idlab.git
cd project-idlab/app/svelte/
npm install
```

The web interface is the client-side thing that connects all the... things.
- Show the interactable calendar interface to the user: see the [framework.md](framework.md) docs.
- Read data from & write data to the solid pod (thus also allowing the user to log into their pod/grant permissions): see the [solid-integration docs](solid-integration.md).
- Grab the data from external API's (weather and the like) and integrate them into the pod, thus also integrating them into the calendar: that's under development sorry.

