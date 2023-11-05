import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const manifestForShareMe = {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "masked-icon.svg",
  ],
  manifest: {
    name: "Share Me",
    short_name: "Share Me",
    description: "A Pinterest clone for sharing images and inspiration.",
    icons: [
      {
        src: "/android-chrome.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
"prefer-related-applications" : true
  },
};

export default defineConfig({
  plugins: [react(), VitePWA()],
  
})
