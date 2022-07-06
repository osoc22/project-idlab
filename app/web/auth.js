import {
    login,
    handleIncomingRedirect,
    getDefaultSession,
    fetch
  } from "@inrupt/solid-client-authn-browser";


// Implementation based on https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/
async function handleLogin() {
    // If being redirected from login
    await handleIncomingRedirect();

    if (!getDefaultSession().info.isLoggedIn) {
        await login({
            oidcIssuer: podUrl,
            clientName: "Project-IDLab",
            redirectUrl: interfaceUrl
        });
    }
}

handleLogin();
