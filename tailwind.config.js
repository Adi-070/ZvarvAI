/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  background: 'var(--background)',
		  foreground: 'var(--foreground)',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
	  },
	},
	safelist: [
	  // Add all the gradient classes that you are using dynamically here
	  'from-green-500', 'to-green-700',
	  'from-red-500', 'to-red-700',
	  'from-gray-600', 'to-gray-800',
	  'from-blue-500', 'to-blue-700',
	  // Add any other dynamic color classes you might use
	],
	plugins: [require("tailwindcss-animate")],
  };
  