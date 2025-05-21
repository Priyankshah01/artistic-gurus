import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; // 🔥 add this
import AOS from 'aos'; // 🔥 add this

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🔥 initialize AOS
AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
