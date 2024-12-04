import React, { useEffect, useState } from "react";
import "./AdminMembers.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import { useNavigate } from "react-router-dom";
import garbage from "../assets/icons/delete.png";
import PopupConfirmDelete from "./PopupConfirmDelete";

const AdminMembers: React.FC = () => {
  const navigate = useNavigate();

  // État pour stocker les membres, la recherche et les informations pour la suppression
  const [members, setMembers] = useState<any[]>([]); // Initialisé vide, les données viendront du backend
  const [search, setSearch] = useState("");
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Fonction pour récupérer les données depuis le backend
  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:3000/membre"); // Remplacez par l'URL réelle de votre backend
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des membres.");
      }
      const data = await response.json();

      // Transformation des données pour correspondre au tableau
      const transformedData = data.map((user: any) => ({
        cin: user.cin,
        name: user.name,
        email: user.mail,
        phone: user.tel,
        birthdate: new Date(user.birth).toLocaleDateString(), // Formatage de la date
        sex: user.sex,
        adherent: user.id_abonnement !== 0, // true si `id_abonnement` est non nul
      }));
      setMembers(transformedData); // Mise à jour de l'état
    } catch (error) {
      console.error(error);
    }
  };

  // Appeler `fetchMembers` lorsque le composant est monté
  useEffect(() => {
    fetchMembers();
  }, []);

  // Gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filtrer les membres en fonction de la recherche
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  // Ouvrir la pop-up de suppression
  const openDeletePopup = (cin: string) => {
    setMemberToDelete(cin);
    setShowDeletePopup(true);
  };

  // Fermer la pop-up sans supprimer
  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setMemberToDelete(null);
  };

  // Supprimer un membre
  const handleDelete = () => {
    if (memberToDelete !== null) {
      setMembers(members.filter((member) => member.cin !== memberToDelete));
      setMemberToDelete(null);
      setShowDeletePopup(false);
    }
  };

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Members</h1>
          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="search-bar"
          />
          {/* Bouton de déconnexion */}
          <div className="divlogout">
            <button className="logout-button" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </div>

        {/* Tableau des membres */}
        <div className="tablepad">
          <table className="members-table">
            <thead>
              <tr>
                <th>CIN</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>BIRTHDATE</th>
                <th>SEX</th>
                <th>ADHERENT</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.cin} className="table-row">
                  <td>{member.cin}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.birthdate}</td>
                  <td>{member.sex}</td>
                  <td>
                    <div className="div-adh">
                      <div className="div-check">
                        <input
                          type="checkbox"
                          checked={member.adherent}
                          readOnly
                        />
                      </div>
                      {/* <div className="div-span">
                        <span className="delete-icon">
                          <img
                            src={garbage}
                            alt="delete"
                            className="delete-icon-garbage"
                            onClick={() => openDeletePopup(member.cin)}
                          />
                        </span>
                      </div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pop-up de confirmation de suppression */}
        {showDeletePopup && (
          <PopupConfirmDelete
            onConfirm={handleDelete}
            onCancel={closeDeletePopup}
          />
        )}
      </div>
    </div>
  );
};

export default AdminMembers;
