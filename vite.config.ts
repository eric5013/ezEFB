// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // 1. 路径别名（解决 App.tsx 中的 @/ 报错）
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/lib': path.resolve(__dirname, './src/lib'),
    },
  },

  // 2. 服务器配置（方便 iPad 局域网调试）
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // 某些文件系统需要轮询
    },
  },

  // 3. 构建优化（EFB 应用通常需要较大的资源）
  build: {
    chunkSizeWarningLimit: 2000, // 提高警告阈值（因为包含地图库）
  },
});