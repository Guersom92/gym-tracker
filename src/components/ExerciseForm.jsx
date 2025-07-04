import React, { useState, useEffect } from "react";
import service from "../services/gym";

const ExerciseForm = ({
  date,
  exercises,
  onClose,
  onExerciseAdded,
  onExerciseDeleted,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    sets: "",
    repetitions: "",
    weight: "",
    day: date.toISOString(),
  });
  const [error, setError] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      let response;
      if (editingExercise) {
        response = await service.updateExercise(editingExercise.id, formData);
        onExerciseAdded(response);
        setEditingExercise(null);
      } else {
        response = await service.createExercise(formData);
        onExerciseAdded(response);
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar ejercicio:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.deleteExercise(id);
      onExerciseDeleted(id);
    } catch (error) {
      console.error("Error al eliminar ejercicio:", error);
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sets: "",
      repetitions: "",
      weight: "",
      day: date.toISOString(),
    });
    setEditingExercise(null);
  };

  const startEdit = (exercise) => {
    setEditingExercise(exercise);
    setFormData({
      name: exercise.name,
      sets: exercise.sets,
      repetitions: exercise.repetitions,
      weight: exercise.weight,
      day: exercise.day,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="exercise-form"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>{editingExercise ? "Editar ejercicio" : "Añadir ejercicio"}</h3>

        {/* Lista de ejercicios existentes */}
        {exercises && exercises.length > 0 && (
          <div className="day-exercises">
            <h4>Ejercicios del día {date.toLocaleDateString()}</h4>
            {exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-item">
                <div className="exercise-info">
                  <strong>{exercise.name}</strong>
                  <span>{exercise.sets} series</span>
                  <span>{exercise.repetitions} repeticiones</span>
                </div>
                <div className="exercise-actions">
                  <button
                    type="button"
                    onClick={() => startEdit(exercise)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(exercise.id)}
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del ejercicio:</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value.trim() })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sets">Series:</label>
            <input
              id="sets"
              type="number"
              value={formData.sets}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sets: parseInt(e.target.value) || "",
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="repetitions">Repeticiones:</label>
            <input
              id="repetitions"
              type="number"
              value={formData.repetitions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  repetitions: parseInt(e.target.value) || "",
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Peso:</label>
            <input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  weight: parseFloat(e.target.value),
                })
              }
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-buttons">
            <button type="submit" disabled={isSubmitting}>
              {editingExercise ? "Actualizar" : "Guardar"}
            </button>
            {editingExercise && (
              <button
                type="button"
                onClick={resetForm}
                className="cancel-button"
                disabled={isSubmitting}
              >
                Cancelar edición
              </button>
            )}
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;
