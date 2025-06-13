import { createContext, useEffect, useState } from "react";
import service from "../services/gym";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      service.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    service
      .getExercises()
      .then((data) => setExercises(data))
      .catch((error) => {
        console.error("Error al cargar ejercicios:", error);
      });
  }, [user]);

  const clear = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, setExercises, clear, exercises }}
    >
      {children}
    </UserContext.Provider>
  );
};
