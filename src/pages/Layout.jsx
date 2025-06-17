import React, { useContext } from "react";
import { UserContext } from "../context/User";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../styles/Layout.css";

function Layout() {
  const { user, clear } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (user === null) return <Navigate to="/login" />;

  return (
    <div className={user.username}>
      <nav className="layout__nav">
        <ul className="layout__nav-list">
          <li>
            {location.pathname === "/" ? (
              <Link className="layout__nav-link" to="/statistics">
                Estadísticas
              </Link>
            ) : (
              <Link className="layout__nav-link" to="/">
                Home
              </Link>
            )}
          </li>
          <li>
            <button
              className="layout__nav-button"
              onClick={() => {
                clear();
                window.localStorage.clear();
                navigate("/login");
              }}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
