import db from "../config/db";

// Récupérer tous les utilisateurs
export const getAllOffers = async () => {
  const [rows]: any = await db.query("SELECT * FROM offre"); // Type explicite
  return rows; // Retourne uniquement les lignes
};
