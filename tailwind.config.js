/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b47c8',    
        secondary: '#64748b',
        tertiary: '#e1ecfa',
      },
      fontFamily: {
        primary: ['Lora', 'serif'],
        secondary: ['Merriweather', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#0b47c8',  // Using your primary color
              '&:hover': {
                color: '#0b47c8',
              },
            },
            h1: {
              color: '#0b47c8',
              fontFamily: 'Lora, serif',
              fontWeight: 'normal',
            },
            h2: {
              color: '#0b47c8',
              fontFamily: 'Lora, serif',
              fontWeight: 'normal',
            },
            h3: {
              color: '#0b47c8',
              fontFamily: 'Lora, serif',
              fontWeight: 'normal',
            },
            h4: {
              color: '#0b47c8',
              fontFamily: 'Lora, serif',
              fontWeight: 'normal',
            }
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}