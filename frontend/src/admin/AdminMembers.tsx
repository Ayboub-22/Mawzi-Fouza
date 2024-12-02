import "./AdminMembers.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import garbage from '../assets/icons/delete.png';
import PopupConfirmDelete from "./PopupConfirmDelete";

const AdminMembers: React.FC = () => {
  const navigate = useNavigate();

  // Données des membres simulées
  const initialMembers = [
    {
      cin: "11165773",
      name: "Cosmin Negotia",
      email: "fabcoss49@gmail.com",
      phone: "98656920",
      birthdate: "Feb 23, 2003",
      sex: "F",
      adherent: false,
    },
    {
      cin: "11125774",
      name: "Norman Lynx",
      email: "normalyx@gmail.com",
      phone: "96541236",
      birthdate: "Feb 23, 2002",
      sex: "F",
      adherent: false,
    },
    {
      cin: "11167774",
      name: "Andrew Collins",
      email: "andrewcollins.me",
      phone: "20457189",
      birthdate: "Feb 23, 2001",
      sex: "M",
      adherent: true,
    },
    {
      cin: "11165775",
      name: "Emma Watson",
      email: "emmawest@hotmail.com",
      phone: "24712396",
      birthdate: "Feb 23, 1997",
      sex: "F",
      adherent: true,
    },
    {
      cin: "11165773",
      name: "Chris Patel",
      email: "chrispet85@mailin.ui",
      phone: "52014756",
      birthdate: "Feb 23, 1989",
      sex: "M",
      adherent: false,
    },
    {
      cin: "11165779",
      name: "Alexa Dawson",
      email: "meg.alexadawson.com",
      phone: "30542896",
      birthdate: "Feb 23, 1995",
      sex: "F",
      adherent: false,
    },
    {
      cin: "11465773",
      name: "James Morgan",
      email: "maesmorgan@gmail.com",
      phone: "94215731",
      birthdate: "Feb 23, 2004",
      sex: "M",
      adherent: true,
    },
  ];

  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null); // Ajouté pour stocker le membre à supprimer
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Etat pour gérer l'affichage de la pop-up

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  // Fonction pour ouvrir la pop-up de suppression
  const openDeletePopup = (cin: string) => {
    setMemberToDelete(cin);
    setShowDeletePopup(true);
  };

  // Fonction pour fermer la pop-up sans supprimer
  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setMemberToDelete(null);
  };

  // Fonction pour supprimer un membre
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
            <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
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
                      <div className="div-span">
                        <span className="delete-icon">
                          <img
                            src={garbage}
                            alt="delete"
                            className="delete-icon-garbage"
                            onClick={() => openDeletePopup(member.cin)} // Ajout d'une fonction de suppression
                          />
                        </span>
                      </div>
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
            onConfirm={handleDelete} // Appeler handleDelete quand confirmée
            onCancel={closeDeletePopup} // Fermer sans supprimer
          />
        )}
      </div>
    </div>
  );
};

export default AdminMembers;
