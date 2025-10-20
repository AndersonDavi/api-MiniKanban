require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a la base de datos MySQL"))
  .catch((err) => console.error("❌ Error al conectar con MySQL:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
);
