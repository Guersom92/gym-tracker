import { createContext, useEffect, useState } from "react";
import service from "../services/gym";
import Spinner from "../components/Spinner";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      service.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      service
        .getExercises()
        .then((data) => setExercises(data))
        .catch((error) => {
          console.error("Error al cargar ejercicios:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const clear = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, setExercises, clear, exercises, setIsLoading }}
    >
      {isLoading && <Spinner />} {children}
    </UserContext.Provider>
  );
};
