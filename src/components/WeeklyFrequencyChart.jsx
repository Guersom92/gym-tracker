import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyFrequencyChart = ({ exercises }) => {
  const [weeklyData, setWeeklyData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!exercises || exercises.length === 0) return;

    // Agrupar ejercicios por semana
    const exercisesByWeek = exercises.reduce((acc, exercise) => {
      const date = new Date(exercise.day);
      const weekKey = getWeekKey(date);
      acc[weekKey] = (acc[weekKey] || new Set()).add(date.toDateString());
      return acc;
    }, {});

    // Convertir Sets a conteos de días únicos
    const weeklyFrequency = Object.fromEntries(
      Object.entries(exercisesByWeek).map(([week, daysSet]) => [
        week,
        daysSet.size,
      ])
    );

    // Preparar datos para la gráfica
    setWeeklyData({
      labels: Object.keys(weeklyFrequency),
      datasets: [
        {
          label: "Días de entrenamiento por semana",
          data: Object.values(weeklyFrequency),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
        },
      ],
    });
  }, [exercises]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Frecuencia Semanal de Entrenamiento",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Función helper para obtener la clave de la semana
  const getWeekKey = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil(
      (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
    );
    return `Semana ${weekNumber}`;
  };

  return (
    <div className="weekly-chart">
      <Line options={options} data={weeklyData} />
    </div>
  );
};

export default WeeklyFrequencyChart;
