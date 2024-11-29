import "./AdminSubs.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import { useNavigate } from "react-router-dom";

const AdminSubs: React.FC = () => {
  const navigate = useNavigate();
  // Données des abonnements simulées
  const subscriptions = [
    {
      cin: "11165773",
      name: "Cosmin Negotia",
      email: "fabcoss49@gmail.com",
      id_offer: "98656920",
      start_date: "Feb 23, 2003",
      end_date: "F",
    },
    {
      cin: "11125774",
      name: "Norman Lynx",
      email: "normalyx@gmail.com",
      id_offer: "96541236",
      start_date: "Feb 23, 2002",
      end_date: "F",
    },
    {
      cin: "11167774",
      name: "Andrew Collins",
      email: "andrewcollins.me",
      id_offer: "20451289",
      start_date: "Feb 23, 2001",
      end_date: "M",
    },
    {
      cin: "11165775",
      name: "Emma Watson",
      email: "emmawest@hotmail.com",
      id_offer: "24128936",
      start_date: "Feb 23, 1997",
      end_date: "F",
    },
    {
      cin: "11165773",
      name: "Chris Patel",
      email: "chrispet85@mailin.ui",
      id_offer: "52149756",
      start_date: "Feb 23, 1980",
      end_date: "M",
    },
    {
      cin: "11165779",
      name: "Alexa Dawson",
      email: "meg.alexadawson.com",
      id_offer: "30542896",
      start_date: "Feb 23, 1995",
      end_date: "F",
    },
    {
      cin: "11465773",
      name: "James Morgan",
      email: "maesmorgan@gmail.com",
      id_offer: "95215731",
      start_date: "Feb 23, 2004",
      end_date: "M",
    },
    {
      cin: "15165773",
      name: "Josh Kravitch",
      email: "joshkzlh@gmail.com",
      id_offer: "93093932",
      start_date: "Feb 23, 2005",
      end_date: "M",
    },
  ];

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Subscriptions</h1>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
        </div>

        {/* Tableau des abonnements */}
        <div className="tablepad">
          <table className="subscriptions-table">
            <thead>
              <tr>
                <th>CIN</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ID_OFFER</th>
                <th>START_DATE</th>
                <th>END_DATE</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={index} className="table-row">
                  <td>{sub.cin}</td>
                  <td>{sub.name}</td>
                  <td>{sub.email}</td>
                  <td>{sub.id_offer}</td>
                  <td>{sub.start_date}</td>
                  <td>{sub.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton pour envoyer une notification */}
        <div className="addoffpad">
          <button className="add-offer-button">Send notification</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubs;
