// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  // 启用暗色模式（EFB 必须使用暗色模式）
  darkMode: 'class',

  // 扫描文件路径（确保能识别 @/ 路径下的类名）
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],

  // 自定义 EFB 专用样式
  theme: {
    extend: {
      // 1. 触控尺寸规范（ICAO / CAAC 标准）
      minHeight: {
        'tap': '44px',     // 最小触控目标
        'button': '48px',  // 普通按钮
        'efb': '56px',     // EFB 主操作按钮
      },
      fontSize: {
        'efb-sm': '0.875rem',
        'efb-base': '1rem',
        'efb-lg': '1.125rem',
        'efb-xl': '1.25rem',
      },
      // 2. iPad 响应式断点
      screens: {
        'ipad': '768px',      // 竖屏 iPad
        'ipad-landscape': '1024px', // 横屏 iPad (驾驶舱模式)
        'cockpit': '1366px', // 宽屏 EFB 硬件
      },
      // 3. EFB 专用颜色（高对比度）
      colors: {
        efb: {
          bg: '#0a0a0a',        // 背景
          panel: '#1a1a1a',     // 面板
          border: '#333333',    // 边框
          text: '#e5e5e5',     // 主文字
          accent: '#007AFF',    // 强调色 (iOS 蓝)
          warning: '#FF9500',   // 警告
          danger: '#FF3B30',    // 危险
        }
      },
      fontFamily: {
        mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      }
    },
  },

  plugins: [],
} satisfies Config;