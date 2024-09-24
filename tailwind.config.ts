import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin';
import tailwindTypographyPlugin from '@tailwindcss/typography';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#F8F4E3', // Very light cream
					100: '#E3D8B7', // Light beige
					200: '#C9BFA3', // Soft taupe
					300: '#B3A58D', // Muted olive green
					400: '#A18C6D', // Warm golden brown
					500: '#8B6B4A', // Rich caramel
					600: '#7A5B3A', // Darker warm brown
					700: '#6C4A2D', // Deep terracotta
					800: '#5A3B25', // Muted burnt sienna
					900: '#482E1B' // Warm chestnut
				}
			}
		}
	},
	plugins: [tailwindTypographyPlugin, flowbitePlugin]
} as Config;
