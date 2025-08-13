import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const root = document.getElementById("root");

const app = createRoot(root);
app.render(
  <BrowserRouter>
    <App />
    <Analytics />
  </BrowserRouter>
);
