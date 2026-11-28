/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  	extend: {
  		colors: {
  			brand: '#1d4ed8',
  			navy: {
  				50: '#f0f4fa',
  				100: '#dce4f2',
  				200: '#b9c8e3',
  				300: '#8aa2cc',
  				400: '#5b7ab0',
  				500: '#3a5a92',
  				600: '#284577',
  				700: '#1c355f',
  				800: '#142a4d',
  				900: '#0b1f3a',
  				950: '#071428'
  			},
  			ink: {
  				DEFAULT: '#020617',
  				950: '#05070d',
  				900: '#0a0f1c',
  				800: '#0e1424'
  			},
  			paper: '#ffffff',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			wordmark: [
  				'Rajdhani',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'Plus Jakarta Sans',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			soft: '0 12px 40px rgba(2,6,23,0.08)',
  			glow: '0 0 0 1px rgba(56,189,248,0.15), 0 20px 60px -20px rgba(14,165,233,0.45)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
        animation: {
          "spin-slow": "spin 4s linear infinite",
        }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
