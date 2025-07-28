import { useState } from "react";
import Calendar from "react-calendar";
import "../styles/Home.css";
import { useUser } from "../hooks/useUser";
import ExerciseForm from "../components/ExerciseForm";

const Home = () => {
  const { exercises, setExercises } = useUser();
  const [date, setDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  const handleDateClick = (value) => {
    setDate(value);
    setShowForm(true);
  };

  const handleExerciseAdded = (updatedExercise) => {
    setExercises((prevExercises) => {
      const index = prevExercises.findIndex(
        (ex) => ex.id === updatedExercise.id
      );
      if (index !== -1) {
        // Actualizar ejercicio existente
        const newExercises = [...prevExercises];
        newExercises[index] = updatedExercise;
        return newExercises;
      } else {
        // Añadir nuevo ejercicio
        return [...prevExercises, updatedExercise];
      }
    });
  };

  const handleExerciseDeleted = (exerciseId) => {
    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  // Función para comparar fechas ignorando la hora
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Obtener ejercicios del día seleccionado
  const getDayExercises = () => {
    return exercises.filter((exercise) =>
      isSameDay(new Date(exercise.day), date)
    );
  };

  // Función para mostrar puntos en los días con ejercicios
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasExercise = exercises.some((exercise) =>
        isSameDay(new Date(exercise.day), date)
      );
      return hasExercise ? <div className="exercise-dot">•</div> : null;
    }
  };

  return (
    <div className="home">
      <h1>Calendario de Ejercicios</h1>
      <Calendar
        onChange={handleDateClick}
        value={date}
        tileContent={tileContent}
      />
      {showForm && (
        <ExerciseForm
          date={date}
          exercises={getDayExercises()}
          onClose={() => setShowForm(false)}
          onExerciseAdded={handleExerciseAdded}
          onExerciseDeleted={handleExerciseDeleted}
        />
      )}
    </div>
  );
};

export default Home;
