const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const moment = require('moment-timezone');
const { router } = require("./routes");

dotenv.config();
// Configurar moment-timezone para usar la zona horaria "America/Guatemala"
moment.tz.setDefault('America/Guatemala');
// Establecer la zona horaria a nivel de proyecto en Node.js
process.env.TZ = 'America/Guatemala';
const app = express();

app.use(express.json());
app.use(cors());

// Rutas API
app.use('/v1', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running Port ${PORT}`);
});