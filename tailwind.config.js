module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Busca clases en archivos JS, JSX, TS, y TSX dentro de la carpeta src
    "./public/index.html",        // Asegúrate de incluir HTML si es necesario
  ],
  theme: {
    extend: {}, // Aquí puedes agregar extensiones personalizadas
  },
  plugins: [],
};
