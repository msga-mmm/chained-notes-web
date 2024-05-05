import App from "./App";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";

import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
// TODO: avoid disabling eslint rule
// eslint-disable-next-line import/no-unresolved
import "virtual:uno.css";

import "@unocss/reset/tailwind.css";

function setupRoot() {
  const container = document.getElementById("root");

  if (container === null) {
    return;
  }

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
          useRefreshTokens
        >
          <App />
        </Auth0Provider>
      </Provider>
    </React.StrictMode>,
  );
}

setupRoot();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
