/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Background colors
        'background-primary': 'var(--background-primary)',
        'background-secondary': 'var(--background-secondary)',

        // Border colors
        'border-primary': 'var(--border-primary)',

        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-button-primary': 'var(--text-button-primary)',

        'gray-hover': 'var(--gray-hover)',
        'background-secondary-hover': 'var(--background-secondary-hover)',

        // Brand colors
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-primary-hover': 'var(--accent-primary-hover)',
        'accent-secondary-hover': 'var(--accent-secondary-hover)',

        //Diabled colors
        disabled: 'var(--disabled)',
        'disabled-text': 'var(--disabled-text)',

        // input box colors
        'input-text': 'var(--input-text)',
        'input-background': 'var(--input-background)',
        'input-border': 'var(--input-border)',

        // chat interface colors
        'ai-answer-background': 'var(--ai-answer-background)',
        'ai-prompt-send-background': 'var(--ai-prompt-send-background)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
