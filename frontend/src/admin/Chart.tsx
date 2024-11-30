import React from 'react';
import { Bar } from 'react-chartjs-2'; 
import NavAdmin from"../componentsAdmin/NavAdmin";
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

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CourseStats: React.FC = () => {
  const courseData = [
    { course: "React Basics", participation: 80 },
    { course: "Advanced CSS", participation: 70 },
    { course: "JavaScript Fundamentals", participation: 95 },
    { course: "Node.js", participation: 60 },
    { course: "Python for Data Science", participation: 85 }
  ];

  const labels = courseData.map(course => course.course);
  const data = courseData.map(course => course.participation);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Taux de Participation (%)',
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
