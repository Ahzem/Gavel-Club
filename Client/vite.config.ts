import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_EMAILJS_PUBLIC_KEY: JSON.stringify(process.env.VITE_EMAILJS_PUBLIC_KEY),
      VITE_EMAILJS_SERVICE_ID: JSON.stringify(process.env.VITE_EMAILJS_SERVICE_ID),
      VITE_EMAILJS_TEMPLATE_ID: JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID),
      VITE_EMAILJS_TEMPLATE_ID_FOR_BLOG: JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID_FOR_BLOG),
      VITE_EMAILJS_TO_EMAIL: JSON.stringify(process.env.VITE_EMAILJS_TO_EMAIL),
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://gavel-club.azurewebsites.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, '/api')
//       }
//     }
//   }
// });