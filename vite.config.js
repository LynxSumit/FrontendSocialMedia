import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const manifestForShareMe = {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "maskable.png",
  ],
  manifest: {
    name: "Share Me",
    short_name: "Share Me",
    description: "A Pinterest clone for sharing images and inspiration.",
    icons: [
      {
        src: "/maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/logo384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ]
    },
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
  }

export default defineConfig({
  plugins: [react(), VitePWA(manifestForShareMe)],
  
})
