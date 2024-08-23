import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import '@fortawesome/fontawesome-free/css/all.min.css';




const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <App/>
)