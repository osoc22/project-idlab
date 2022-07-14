---
parent: Svelte (Front-End)
---

## Interacting with solid pods from a client-side/static/javascript web interface

### Authenticated requests
> By default, solid-client functions make unauthenticated requests. To perform read/write operations on restricted Resources (i.e., not open to the general public), the user must first authenticate as a user who has appropriate access to that Resource. Then, to make authenticated requests, pass to the various read/write functions the authenticated Session’s fetch function.

*\- [From Inrupt Read/Write Structured Data docs #Required Access](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#required-access)*

NOTE: (At least on Parcel) re-importing the fetch function will not automatically authenticate as well.

### Important external docs
- [Getting started with Inrupts Solid Client libraries](https://docs.inrupt.com/developer-tools/javascript/client-libraries/using-libraries/)
  - [Browser-only authentication](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/) (and [staying authenticated](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/restore-session-browser-refresh/))
  - [Read/Write data](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data)
- [Intrupts Solid Client libraries API](https://docs.inrupt.com/developer-tools/javascript/client-libraries/api/)
