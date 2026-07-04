/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 値はダークモード基準の固定色。ライトモードの上書きはsrc/styles/index.cssで
        // 生成後のユーティリティクラスを直接ターゲットして行う
        // （CSS変数 + Tailwindのalpha-value機構がビルド時に静的展開されてしまい、
        //   実行時のテーマ切替に追従しなかったため）。
        rig: {
          bg: '#0a0d0f',
          panel: '#0d1214',
          panelSoft: '#111a1d',
          panelStrong: '#050708',
          border: '#1c2b2f',
        },
        gold: {
          DEFAULT: '#cba135',
          dim: '#8b6d23',
        },
        live: {
          DEFAULT: '#c3272b',
          hover: '#a01f22',
        },
        depth: {
          shallow: '#0e5a6b',
          mid: '#083245',
          deep: '#040d1a',
          abyss: '#01050c',
        },
        bioluminescent: '#5df2d6',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        display: ['"Rajdhani"', '"Noto Sans JP"', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-6px) translateX(4px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px currentColor)' },
          '50%': { filter: 'drop-shadow(0 0 8px currentColor)' },
        },
      },
      animation: {
        blink: 'blink 1.6s ease-in-out infinite',
        drift: 'drift 4s ease-in-out infinite',
        glow: 'glow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
