import { createPool } from "mysql2/promise";

// Configuration de la base de données
const db = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "gym",
  connectionLimit: 10, // Limite des connexions simultanées
});

export default db;
