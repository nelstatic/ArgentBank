const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const dbConnection = require("./database/connection");

// Charger le fichier Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à la base de données
dbConnection();

// CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes pour les API
app.use("/api/v1/user", require("./routes/userRoutes"));

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  console.log(`Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
