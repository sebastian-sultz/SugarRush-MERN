export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'beige-100': '#F4D8C3',
        'beige-200': '#F4D8C3',
        'primary-600': '#D4A762',
        'primary-300':'#f5d889',
        'gray-900': '#1A1A1A',
      },
      fontFamily: {
        playball: ['Playball', 'cursive'],
        'open-sans': ['Open Sans', 'sans-serif'],
        dancing: ["Dancing Script", "cursive"],
      },
      animation: {
        bounce: 'bounce 2s infinite',
        zoom: 'zoom 2s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
