const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { initDb } = require("./src/config/db");

const basicRoutes = require("./src/routes/basicRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", basicRoutes);
app.use("/users", userRoutes);
app.use("/login", authRoutes);

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicacion:", error.message);
    process.exit(1);
  }
};

startServer();
