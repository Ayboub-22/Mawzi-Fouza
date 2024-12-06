import React, { useState, useEffect } from "react";
import "./AdminSubs.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSubs: React.FC = () => {
  const navigate = useNavigate();

  // État pour stocker les abonnements récupérés
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  // Fonction pour récupérer les abonnements depuis l'API
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("http://localhost:3000/membre/subs");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des abonnements");
      }
      const data = await response.json();
      console.log({data});
      setSubscriptions(data); // Mettre à jour l'état avec les abonnements récupérés
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la récupération des abonnements");
    }
  };

  // Utiliser useEffect pour récupérer les abonnements à l'initialisation du composant
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleNotif = async () => {
    try {
      console.log("debut handler");
        // Envoi d'une requête POST au backend
        const response = await axios.post('http://localhost:3000/membre/subs/notify');
        console.log("apres envoi de la requete lil back");
        console.log(response.status);
        // Vérifier si la réponse est correcte (statut 200)
        if (response.status === 200) {
            alert(`${response.data.message}`); // Afficher une confirmation
            navigate(0); // Recharger la page
        }
    } catch (error) {
        // Gestion des erreurs si la requête échoue
        console.error('Erreur lors de l\'envoi des notifications :', error);
        alert('Une erreur est survenue lors de l\'envoi des notifications.');
    }
};





  // Fonction pour envoyer un e-mail de notification d'expiration
  // const sendExpirationEmail = async (subscription: any) => {
  //   try {
  //     const response = await fetch('/send-subscription-notification', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: subscription.name,
  //         email: subscription.email,
  //         expirationDate: subscription.end_date,
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Error sending email');
  //     }
  //     alert(`Notification sent to ${subscription.email}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // Fonction pour vérifier les abonnements expirant dans une semaine
  // const checkSubscriptionExpirations = () => {
  //   const oneWeekLater = new Date();
  //   oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  //   const expiringSubscriptions = subscriptions.filter((sub) => {
  //     const expirationDate = new Date(sub.end_date);
  //     return expirationDate <= oneWeekLater && expirationDate > new Date();
  //   });

  //   return expiringSubscriptions;
  // };

  // // Fonction pour gérer les notifications par e-mail
  // const handleNotifications = () => {
  //   const expiringSubscriptions = checkSubscriptionExpirations();

  //   // Envoi des e-mails aux abonnements qui expirent dans 7 jours
  //   expiringSubscriptions.forEach((sub) => {
  //     sendExpirationEmail(sub);
  //   });
  // };

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
              {subscriptions.length > 0 ? (
                subscriptions.map((sub, index) => (
                  <tr key={index} className="table-row">
                    <td>{sub.cin}</td>
                    <td>{sub.name}</td>
                    <td>{sub.mail}</td>
                    <td>{sub.id_offre}</td>
                    <td>{sub.start_date.split('T')[0]}</td>
                    <td>{sub.end_date.split('T')[0]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No subscriptions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bouton pour envoyer une notification */}
        <div className="addoffpad">
          <button className="add-offer-button" onClick={handleNotif}>Send Notification</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubs;
