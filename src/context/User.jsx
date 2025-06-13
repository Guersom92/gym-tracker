import { createContext, useEffect, useState } from "react";
import service from "../services/gym";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      service.setToken(user.token);
    }
  }, []);

  const clear = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, setUser, clear }}>
      {children}
    </UserContext.Provider>
  );
};
