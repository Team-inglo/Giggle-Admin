import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ES module에서 __dirname을 구현하려면 아래와 같이 사용
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@apis", replacement: resolve(__dirname, "src/apis") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@components", replacement: resolve(__dirname, "src/components") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@views", replacement: resolve(__dirname, "src/views") },
      { find: "@layout", replacement: resolve(__dirname, "src/layout") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
    ],
  },
})