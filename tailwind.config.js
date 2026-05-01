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
            '--tw-prose-body': '#0b47c8',
            '--tw-prose-headings': '#0b47c8',
            '--tw-prose-bold': '#082f8c',
            '--tw-prose-links': '#0b47c8',
            '--tw-prose-lead': '#475569',
            '--tw-prose-counters': '#64748b',
            '--tw-prose-bullets': '#94a3b8',
            '--tw-prose-hr': 'rgba(11, 71, 200, 0.22)',
            '--tw-prose-quotes': '#0b47c8',
            '--tw-prose-quote-borders': 'rgba(11, 71, 200, 0.35)',
            '--tw-prose-captions': '#64748b',
            '--tw-prose-code': '#082f8c',
            '--tw-prose-pre-code': '#334155',
            '--tw-prose-pre-bg': '#f7faff',
            '--tw-prose-th-borders': 'rgba(11, 71, 200, 0.2)',
            '--tw-prose-td-borders': 'rgba(11, 71, 200, 0.12)',
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
            },
            pre: {
              borderWidth: '1px',
              borderColor: 'rgba(11, 71, 200, 0.14)',
              borderRadius: '0.5rem',
              boxShadow: 'none',
            },
            'pre code.hljs': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}