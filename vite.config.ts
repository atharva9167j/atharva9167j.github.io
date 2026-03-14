import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    Sitemap({
      hostname: 'https://atharva9167j.github.io',
      dynamicRoutes: [
        '/about',
        '/education',
        '/experience',
        '/projects',
        '/skills',
        '/contact',
        '/about-atharva-jagtap',
        '/projects-by-atharva9167j',
        '/contact-atharva-jagtap',
        '/who-is-atharva9167j',
        '/faq',
      ],
      generateRobotsTxt: true,
    }),
    {
      name: 'copy-index-to-404',
      writeBundle: () => {
        const distPath = path.resolve(__dirname, 'dist');
        if (fs.existsSync(path.join(distPath, 'index.html'))) {
          fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
