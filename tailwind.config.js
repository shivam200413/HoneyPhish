/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // HoneyPhish brand colors - Purple and Blue neon theme
        'honey-purple': '#9333EA',
        'honey-blue': '#3B82F6',
        'honey-cyan': '#06B6D4',
        'honey-pink': '#EC4899',
        'neon-purple': '#A855F7',
        'neon-blue': '#60A5FA',
        'neon-cyan': '#22D3EE',
        'dark-bg': '#0A0A0A',
        'card-bg': '#111111',
        'border-glow': '#9333EA',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle-float': 'particleFloat 20s linear infinite',
        'neon-pulse': 'neonPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        },
        neonPulse: {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(147, 51, 234, 0.8), 0 0 10px rgba(147, 51, 234, 0.6), 0 0 15px rgba(147, 51, 234, 0.4)',
            color: '#A855F7'
          },
          '50%': { 
            textShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)',
            color: '#60A5FA'
          },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(147, 51, 234, 0.3)',
        'glow-lg': '0 0 40px rgba(147, 51, 234, 0.4)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(135deg, #9333EA 0%, #3B82F6 50%, #06B6D4 100%)',
      }
    },
  },
  plugins: [],
};