
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

// Default image fallbacks for products, shops, and medicines
window.addEventListener('error', function(e) {
  // Check if the error is from an image
  if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
    const img = e.target as HTMLImageElement;
    
    // Match the URL pattern to determine the type of content
    if (img.src.includes('product')) {
      img.src = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop';
    } else if (img.src.includes('shop') || img.src.includes('store')) {
      img.src = 'https://images.unsplash.com/photo-1604754742629-3e0498a7990b?q=80&w=2070&auto=format&fit=crop';
    } else if (img.src.includes('medicine') || img.src.includes('healthcare')) {
      img.src = 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2070&auto=format&fit=crop';
    } else {
      // General fallback for any other images
      img.src = 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=2070&auto=format&fit=crop';
    }
    
    // Prevent the error from being logged to the console
    e.preventDefault();
  }
}, true);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
