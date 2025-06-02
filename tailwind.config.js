/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                deepMaroon: '#3C0008',
            },
        },
    },
    plugins: [],
};
