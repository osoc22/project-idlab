# Web interface

The web interface is the client-side thing that connects all the... things.
- Show the interactable calendar interface to the user
- Read data from & write data to the solid pod (thus also allowing the user to log into their pod/grant permissions)
- Grab the data from external API's (weather and the like) and integrate them into the pod, thus also integrating them into the calendar

## Authenticated requests
> By default, solid-client functions make unauthenticated requests. To perform read/write operations on restricted Resources (i.e., not open to the general public), the user must first authenticate as a user who has appropriate access to that Resource. Then, to make authenticated requests, pass to the various read/write functions the authenticated Session’s fetch function.

*\- [From Inrupt Read/Write Structured Data docs #Required Access](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#required-access)*

NOTE: I assume - but have not been able to confirm - that once authenticated, the fetch function on every other import is authenticated to. Once we know more, this note will be updated.

## Important external docs
- [Getting started with Inrupts Solid Client libraries](https://docs.inrupt.com/developer-tools/javascript/client-libraries/using-libraries/)
  - [Browser-only authentication](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/) (and [staying authenticated](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/restore-session-browser-refresh/))
  - [Read/Write data](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data)
- [Intrupts Solid Client libraries API](https://docs.inrupt.com/developer-tools/javascript/client-libraries/api/)
