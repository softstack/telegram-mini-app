/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            boxShadow: {
                'custom-white': '0px 0px 4px 10px rgba(255, 255, 255, 0.2)',
            },
            colors: {
                customGreen: '#273f44',
                customGrayText: '#888a8c',
                customBlue: '#aadaf1',
                customGraySkip: '#888A8C',
                customBlueButton: '#007aff',
                customGrayAddress: '#707579',
                customGrayWallet: '#efeff4',
                customBlackText: '#212121',
                customBlueSelected: '#B9C1F4',
                customGrayLine: '#c6c6c6',
                customGrayAccountDetails: '#616161',
                customDarkModeBackground: '#262233',
                customDarkModeTextColor: '#DEDEDE',
            },
            gridTemplateColumns: {
                'custom-1-3-1': '1fr 3fr 1fr',
            },
        },
    },
    plugins: [],
};
