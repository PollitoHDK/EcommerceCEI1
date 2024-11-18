require('dotenv/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const connectDB = require("./database/config");


// Importar rutas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

connectDB();

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
  });
})();



// Variables de entorno
const api = process.env.API_URL;

// Middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'));


// Usar rutas importadas
app.use(api, productRoutes);
app.use(api, userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});

const cartRoutes = require('./routes/userRoutes');
app.use('/api', cartRoutes);