import {
    login,
    handleIncomingRedirect,
    getDefaultSession,
    fetch
  } from "@inrupt/solid-client-authn-browser";

  
document.getElementsByTagName("form")[0].onsubmit = function () {
    login({
        oidcIssuer: "http://localhost:3000",
        clientId: "johndoe@localhost.be",
        clientSecret: "johndoe"
    })
    return false;  // Don't attempt to send the form
}