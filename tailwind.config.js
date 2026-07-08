/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// WiCyS brand palette.
// WiCyS's brand identity is purple + green/teal ("Purple and Green" honor cord,
// signature 💜). The exact official hex codes live behind a password-protected
// affiliate portal, so the values below are careful approximations. They are
// the SINGLE source of truth for brand color — if you gain access to the
// official WiCyS Global Branding Guidelines, update these values and the whole
// site re-themes.
// ---------------------------------------------------------------------------
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wicys: {
          purple: {
            50: '#f3edfb',
            100: '#e5d8f6',
            200: '#c9b0ec',
            300: '#a985df',
            400: '#8a5fd1',
            500: '#6d3cbd',
            600: '#5c2e91', // primary
            700: '#472473',
            800: '#331a53',
            900: '#221238',
          },
          green: {
            50: '#e8fbf0',
            100: '#c6f4d9',
            200: '#8fe8b4',
            300: '#57d68d',
            400: '#2fbf71', // accent
            500: '#1fa35c',
            600: '#158049',
            700: '#11633a',
          },
          teal: '#0fa3a3',
        },
        ink: {
          950: '#0b0a14', // base background
          900: '#14121f',
          800: '#1d1a2e',
          700: '#2a2640',
        },
        cream: '#f5f3ff',
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wicys-gradient':
          'linear-gradient(135deg, #5c2e91 0%, #6d3cbd 40%, #0fa3a3 80%, #2fbf71 100%)',
        'wicys-radial':
          'radial-gradient(1200px 600px at 15% -10%, rgba(109,60,189,0.35), transparent), radial-gradient(1000px 600px at 100% 10%, rgba(15,163,163,0.22), transparent)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(109,60,189,0.55)',
        'glow-green': '0 0 40px -12px rgba(47,191,113,0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
