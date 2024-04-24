const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require('./config/sequelize');
const { router } = require("./routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Rutas API
app.use('/v1', router);

// Sincronizar modelos con la base de datos
async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}

syncModels();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running Port ${PORT}`);
});