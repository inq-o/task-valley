import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        village: {
          bg: '#0f0f1a',
          surface: '#1a1a2e',
          border: '#2a2a3d',
          panel: 'rgba(26, 26, 46, 0.72)',
          text: {
            primary: '#e8e8f0',
            muted: '#8888aa',
          },
          energy: {
            amber: '#f59e0b',
            stage1: '#2a2a3d',
            stage2: '#3d3020',
            stage3: '#5c4a1e',
          },
        },
      },
      boxShadow: {
        glow: '0 0 15px rgba(245, 158, 11, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
