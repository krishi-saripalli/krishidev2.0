/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          '0%': {
            transform: 'translateY(1%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: '1'
          }
        }
      },
      animation: {
        fadeInDown: 'fadeInDown 0.4s ease-out'
      },
      colors: {
        primary: '#0b47c8', // royal blue
        secondary: '#64748b',
        tertiary: '#f7faff',
      },
      fontFamily: {
        primary: ['Lora', 'var(--font-lora)', 'serif'],
        secondary: ['Bitter', 'var(--font-bitter)', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#0b47c8',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationStyle: 'dashed',
              textDecorationWidth: '2px',
              '&:hover': {
                color: '#0b47c8',
              },
            },
            h1: {
              color: '#0b47c8',
              fontFamily: 'Bitter, serif',
              fontWeight: 'normal',
            },
            h2: {
              color: '#0b47c8',
              fontFamily: 'Bitter, serif',
              fontWeight: 'normal',
            },
            h3: {
              color: '#0b47c8',
              fontFamily: 'Bitter, serif',
              fontWeight: 'normal',
            },
            h4: {
              color: '#0b47c8',
              fontFamily: 'Bitter, serif',
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

a: {
  '@apply text-[#0b47c8] underline underline-offset-4 decoration-dashed decoration-2 hover:text-[#0b47c8]'
}