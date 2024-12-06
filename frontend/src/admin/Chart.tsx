import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; 
import "./AdminStat.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  CartesianScaleOptions
} from 'chart.js';
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CourseStats: React.FC = () => {
  const [courseData, setCourseData] = useState<{ course: string; participation: number }[]>([]); // State pour les données du backend
  const [isLoading, setIsLoading] = useState<boolean>(true); // State pour gérer le chargement
  const [error, setError] = useState<string | null>(null); // State pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reservation/rate'); // Appel à l'API
        const data = response.data.map((item: { courseName: string; reservationCount: number }) => ({
          course: item.courseName,
          participation: item.reservationCount,
        }));
        console.log(data);
        setCourseData(data); // Mise à jour des données
        setIsLoading(false); // Fin du chargement
      } catch (error) {
        setError('Erreur lors du chargement des données.'); // Gestion des erreurs
        setIsLoading(false); // Fin du chargement même en cas d'erreur
      }
    };

    fetchData();
  }, []);
  console.log(courseData);

  const labels = courseData.map(course => course.course);
  const data = courseData.map(course => course.participation);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Participation rate (%)',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Utilisation du type 'CartesianScaleOptions' pour l'axe 'y'
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
          type: 'linear', // Préciser que l'axe 'y' est linéaire
          beginAtZero: true,
          ticks: {
              max: 100,
          },
      } as unknown as CartesianScaleOptions,  // Typage spécifique pour l'axe cartésien
    },
  };

  return (
    <div className="course-stats">
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CourseStats;
