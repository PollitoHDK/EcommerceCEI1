require('dotenv/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Variables de entorno
const api = process.env.API_URL;

// Middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Conectar a la base de datos
mongoose.connect(process.env.CONNECTION_URL, {
  dbName: 'ecommerce-database'
})
.then(() => {
  console.log('Connected to the database');
})
.catch((err) => {
  console.error('Database connection error:', err);
});

// Usar rutas importadas
app.use(api, productRoutes);
app.use(api, userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
