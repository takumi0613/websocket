import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Socket from "./componets/socket"; // typo修正: componentsに変更
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Socket />
  </React.StrictMode>
);
