import {
    login,
    handleIncomingRedirect,
    getDefaultSession,
    fetch
  } from "@inrupt/solid-client-authn-browser";

var podUrl = "http://localhost:3000";
var interfaceUrl = "http://localhost:1234"
  
document.getElementById("login").addEventListener("click", function () {
    login({
        oidcIssuer: podUrl,
        clientName: "Project-IDLab",
        redirectUrl: interfaceUrl + "/calendar.html"
    });
});
