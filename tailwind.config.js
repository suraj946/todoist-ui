/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
			"./index.html",
			"./src/**/*.{js,ts,jsx,tsx}",
		],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
				success: "#28a745",
        info: "#17a2b8",
        warning: "#ffc107",
        danger: "#dc3545",
        primary: {
          1: "#03a9f4",
          2: "#4ab2f5",
          3: "#6abcf7",
          4: "#84c5f8",
          5: "#9bcefa",
          6: "#b1d8fb",
        },
        dark: {
          1: "#121212",
          2: "#282828",
          3: "#3f3f3f",
          4: "#575757",
          5: "#717171",
          6: "#8b8b8b",
        },
        mixed: {
          1: "#191f25",
          2: "#2e3439",
          3: "#454a4f",
          4: "#5d6166",
          5: "#76797e",
          6: "#8f9396",
        },
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

