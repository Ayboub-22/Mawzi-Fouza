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
      end_date: "2024-12-08", // Date d'expiration de l'abonnement
    },
    {
      cin: "11125774",
      name: "Norman Lynx",
      email: "normalyx@gmail.com",
      id_offer: "96541236",
      start_date: "Feb 23, 2002",
      end_date: "2024-12-12", // Date d'expiration de l'abonnement
    },
    {
      cin: "11165779",
      name: "Alexa Dawson",
      email: "meg.alexadawson.com",
      id_offer: "30542896",
      start_date: "Feb 23, 1995",
      end_date: "2024-12-12",
    },
    {
      cin: "11465773",
      name: "James Morgan",
      email: "maesmorgan@gmail.com",
      id_offer: "95215731",
      start_date: "Feb 23, 2004",
      end_date: "2024-12-12",
    },
    {
      cin: "15165773",
      name: "Josh Kravitch",
      email: "lindachrigui03@gmail.com",
      id_offer: "93093932",
      start_date: "Feb 23, 2005",
      end_date: "2024-12-10",
    },
  ];

  // Fonction pour envoyer un e-mail de notification d'expiration
  const sendExpirationEmail = async (subscription: any) => {
    try {
      const response = await fetch('/send-subscription-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: subscription.name,
          email: subscription.email,
          expirationDate: subscription.end_date,
        }),
      });
      if (!response.ok) {
        throw new Error('Error sending email');
      }
      alert(`Notification sent to ${subscription.email}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour vérifier les abonnements expirant dans une semaine
  const checkSubscriptionExpirations = () => {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const expiringSubscriptions = subscriptions.filter((sub) => {
      const expirationDate = new Date(sub.end_date);
      return expirationDate <= oneWeekLater && expirationDate > new Date();
    });

    return expiringSubscriptions;
  };

  // Fonction pour gérer les notifications par e-mail
  const handleNotifications = () => {
    const expiringSubscriptions = checkSubscriptionExpirations();

    // Envoi des e-mails aux abonnements qui expirent dans 7 jours
    expiringSubscriptions.forEach((sub) => {
      sendExpirationEmail(sub);
    });
  };

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
          <button className="add-offer-button" onClick={handleNotifications}>Send Notification</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubs;
