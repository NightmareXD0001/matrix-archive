import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				matrix: {
					green: '#00FF41',
					'green-glow': '#00FF4133',
					charcoal: '#121212',
					black: '#000000',
					terminal: '#0D0208'
					DEFAULT: '#00FF41',
					light: '#3Dff69',
					dark: '#008F11',
					black: '#0D0208',
					terminal: '#121212'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'code-rain': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'30%': { opacity: '1' },
					'70%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' }
				},
				'text-flicker': {
					'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
					'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.33' }
				},
				'text-glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'20%, 80%': { transform: 'translateX(-2px)' },
					'40%, 60%': { transform: 'translateX(2px)' },
					'50%': { transform: 'translateX(-1px)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41', 
						textShadow: '0 0 5px #00FF41, 0 0 10px #00FF41'
					},
					'50%': { 
						boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41', 
						textShadow: '0 0 10px #00FF41, 0 0 20px #00FF41'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'code-rain': 'code-rain 10s linear infinite',
				'text-flicker': 'text-flicker 3s linear infinite',
				'text-glitch': 'text-glitch 0.3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards'
			},
			fontFamily: {
				'matrix': ['Share Tech Mono', 'monospace'],
				'glitch': ['VT323', 'monospace']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
