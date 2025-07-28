import { useEffect, useState } from "react";
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

const WeeklyFrequencyChart = ({ exercises, user }) => {
  const [weeklyData, setWeeklyData] = useState({
    labels: [],
    datasets: [],
  });

  // Definir colores por usuario
  const userColors = {
    mariceze: {
      borderColor: "#ff1493", // rosa fuerte
      backgroundColor: "rgba(255, 20, 147, 0.3)",
    },
    morgues: {
      borderColor: "#1976d2", // azul fuerte
      backgroundColor: "rgba(25, 118, 210, 0.3)",
    },
    default: {
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  };
  const colors = userColors[user?.username] || userColors.default;

  useEffect(() => {
    if (!exercises) return;

    // Agrupar ejercicios por semana
    const exercisesByWeek = exercises.reduce((acc, exercise) => {
      const date = new Date(exercise.day);
      const weekKey = getWeekKey(date);
      acc[weekKey] = (acc[weekKey] || new Set()).add(date.toDateString());
      return acc;
    }, {});

    // Calcular la semana actual
    const today = new Date();
    const currentWeekNumber = getWeekNumber(today);

    // Generar las últimas 5 semanas (aunque no haya datos)
    const last5WeekNumbers = Array.from(
      { length: 5 },
      (_, i) => currentWeekNumber - 4 + i
    );

    // Construir etiquetas y datos, poniendo 0 si no hay ejercicios esa semana
    const labels = last5WeekNumbers.map((num) => `Semana ${num}`);
    const data = last5WeekNumbers.map((num) => {
      const key = `Semana ${num}`;
      return exercisesByWeek[key] ? exercisesByWeek[key].size : 0;
    });

    setWeeklyData({
      labels,
      datasets: [
        {
          label: "Días de entrenamiento por semana",
          data,
          fill: false,
          borderColor: colors.borderColor,
          backgroundColor: colors.backgroundColor,
          tension: 0.1,
        },
      ],
    });
  }, [exercises, user]);

  // Helper para obtener el número de semana (ISO 8601)
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };

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
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Función helper para obtener la clave de la semana
  const getWeekKey = (date) => {
    const weekNumber = getWeekNumber(date);
    return `Semana ${weekNumber}`;
  };

  return (
    <div className="weekly-chart">
      <Line options={options} data={weeklyData} />
    </div>
  );
};

export default WeeklyFrequencyChart;
