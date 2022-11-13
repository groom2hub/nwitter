import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React from 'react';
// import * as ReactDOMClient from 'react-dom/client';
// import App from './components/App';

// const container = document.getElementById("App");
// const root = ReactDOMClient.createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App  />
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

// const rootElement = document.getElementById('root');
// const root = ReactDOMClient.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );