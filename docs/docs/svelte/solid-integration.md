---
title: JavaScript Solid API
parent: Svelte (Frontend)
grand_parent: Docs
nav_order: 3
---

# Interacting with solid pods from a client-side/static/javascript web interface

There are two important files here:
- We built a JavaScript interface to deal with reading and parsing Events in [solidInterface.ts](https://github.com/osoc22/project-idlab/blob/master/app/svelte/src/lib/utils/solidInterface.ts).
- Which gets called from the front-end in in [eventStore.ts](https://github.com/osoc22/project-idlab/blob/master/app/svelte/src/lib/stores/eventStore.ts)

## Authenticated requests
> By default, solid-client functions make unauthenticated requests. To perform read/write operations on restricted Resources (i.e., not open to the general public), the user must first authenticate as a user who has appropriate access to that Resource. Then, to make authenticated requests, pass to the various read/write functions the authenticated Session’s fetch function.

*\- [From Inrupt Read/Write Structured Data docs #Required Access](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#required-access)*

NOTE: (At least on Parcel) re-importing the fetch function will not automatically authenticate as well.

## Important external docs
- [Getting started with Inrupts Solid Client libraries](https://docs.inrupt.com/developer-tools/javascript/client-libraries/using-libraries/)
  - [Browser-only authentication](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/) (and [staying authenticated](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/restore-session-browser-refresh/))
  - [Read/Write data](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data)
- [Intrupts Solid Client libraries API](https://docs.inrupt.com/developer-tools/javascript/client-libraries/api/)
