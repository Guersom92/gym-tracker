import WeeklyFrequencyChart from "../components/WeeklyFrequencyChart";
import "../styles/Statistics.css";
import { useUser } from "../hooks/useUser";

function Statistics() {
  const { exercises, user } = useUser();

  return (
    <div className="statistics-container">
      <div className="stats-grid">
        <div className="stats-card">
          <div className="card-header">
            <h3>Tu Consistencia Semanal</h3>
            <p className="card-subtitle">
              Frecuencia de entrenamiento por semana
            </p>
          </div>
          <WeeklyFrequencyChart exercises={exercises} user={user} />
        </div>

        <div className="stats-card future-feature">
          <div className="card-header">
            <h3>Próximamente</h3>
            <p className="card-subtitle">
              Más estadísticas personalizadas en camino
            </p>
          </div>
          <div className="coming-soon">
            <ul>
              <li>Progreso de pesos por ejercicio 📈</li>
              <li>Tiempo total de entrenamiento ⏱️</li>
              <li>Ejercicios más frecuentes 🎯</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
