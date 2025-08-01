import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Shadcn/ui Base
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
				},

				// GYMSHOCK BRAND COLORS
				gymshock: {
					// Primary Brand (Reds) - del Hero
					primary: {
						50: '#fef2f2',
						100: '#fee2e2',
						200: '#fecaca',
						300: '#fca5a5',
						400: '#f87171',
						500: '#ef4444',
						600: '#dc2626',  // Main brand color del Hero
						700: '#b91c1c',  // border-red-700 del Hero
						800: '#991b1b',
						900: '#7f1d1d',
						950: '#450a0a',
					},
					// Energy Colors (Orange)
					energy: {
						50: '#fff7ed',
						100: '#ffedd5',
						200: '#fed7aa',
						300: '#fdba74',
						400: '#fb923c',
						500: '#f97316',
						600: '#ea580c',
						700: '#c2410c',
						800: '#9a3412',
						900: '#7c2d12',
						950: '#431407',
					},
					// Dark/Gray Scale - del Hero completo
					dark: {
						50: '#f8fafc',
						100: '#f1f5f9',
						200: '#e2e8f0',
						300: '#cbd5e1',  // text-gray-300 del Hero
						400: '#94a3b8',
						500: '#64748b',
						600: '#475569',
						700: '#334155',
						800: '#1e293b',   // gray-800 del Hero
						900: '#181717',   // Journey background (actualizado)
						950: '#0f172a',   // gray-900 del Hero
					},
					// Social Proof Colors - del Hero
					social: {
						blue: '#3b82f6',    // bg-blue-500
						green: '#22c55e',   // bg-green-500  
						yellow: '#eab308',  // bg-yellow-500
						purple: '#a855f7',  // bg-purple-500
					},
					// Success/Progress
					success: {
						50: '#f0fdf4',
						100: '#dcfce7',
						200: '#bbf7d0',
						300: '#86efac',
						400: '#4ade80',    // text-green-400 del Hero
						500: '#22c55e',
						600: '#16a34a',
						700: '#15803d',
						800: '#166534',
						900: '#14532d',
						950: '#052e16',
					},
					// Warning/Highlights
					warning: {
						50: '#fffbeb',
						100: '#fef3c7',
						200: '#fde68a',
						300: '#fcd34d',
						400: '#fbbf24',
						500: '#f59e0b',
						600: '#d97706',
						700: '#b45309',
						800: '#92400e',
						900: '#78350f',
						950: '#451a03',
					}
				}
			},

			// Background Images & Gradients - del Hero
			backgroundImage: {
				'gymshock-hero': 'linear-gradient(to bottom right, #1f2937, #111827, #000000)', // from-gray-900 via-gray-800 to-black
				'gymshock-footer': 'linear-gradient(to bottom, #181717, #0f172a)',
				'gymshock-journey': 'linear-gradient(to bottom, #181717, #1e293b)',
				'gymshock-primary': 'linear-gradient(to right, #dc2626, #ef4444)',
				'gymshock-energy': 'linear-gradient(to right, #f97316, #dc2626)',
				'gymshock-glow-red': 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
				'gymshock-glow-orange': 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
			},

			// Box Shadows
			boxShadow: {
				'gymshock-glow': '0 0 40px rgba(220, 38, 38, 0.15)',
				'gymshock-energy': '0 0 30px rgba(249, 115, 22, 0.2)',
				'gymshock-brand': '0 10px 25px rgba(220, 38, 38, 0.1)',  // shadow-red-600/20 del Hero
				'gymshock-elevated': '0 10px 25px rgba(0, 0, 0, 0.1)',
				'gymshock-card': '0 4px 20px rgba(0, 0, 0, 0.05)',
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			// Animations del Hero
			animation: {
				'gymshock-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'gymshock-glow': 'glow 2s ease-in-out infinite alternate',
				'gymshock-float': 'float 3s ease-in-out infinite',
				'gymshock-scale': 'scale 300ms ease-in-out', // hover:scale-105 del Hero
			},

			// Keyframes
			keyframes: {
				glow: {
					'0%': {
						textShadow: '0 0 20px rgba(220, 38, 38, 0.5), 0 0 30px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.5)'
					},
					'100%': {
						textShadow: '0 0 5px rgba(220, 38, 38, 0.5), 0 0 10px rgba(220, 38, 38, 0.5), 0 0 15px rgba(220, 38, 38, 0.5)'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				scale: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' }
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }: any) {
			const newUtilities = {
				'.text-shadow-gymshock-glow': {
					textShadow: '0 0 40px rgba(220, 38, 38, 0.4)',
				},
				'.text-shadow-gymshock-energy': {
					textShadow: '0 0 30px rgba(249, 115, 22, 0.3)',
				},
				'.text-shadow-gymshock-white': {
					textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;