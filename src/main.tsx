
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Add font imports
const fontLinks = [
  document.createElement('link'),
  document.createElement('link'),
  document.createElement('link'),
];

fontLinks[0].rel = 'stylesheet';
fontLinks[0].href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';

fontLinks[1].rel = 'stylesheet';
fontLinks[1].href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap';

fontLinks[2].rel = 'stylesheet';
fontLinks[2].href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap';

fontLinks.forEach(link => document.head.appendChild(link));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
