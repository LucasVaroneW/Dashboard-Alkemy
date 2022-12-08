import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
    <Auth0Provider
        domain='dev-qhxnxnp5zgr7h74y.us.auth0.com' 
        clientId='Bq2q3epWuk7RTqnX0DPgfGd7ur1txnRY' 
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>,
  document.getElementById("root")
);
