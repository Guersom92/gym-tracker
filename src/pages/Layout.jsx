import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../styles/Layout.css";
import { useUser } from "../hooks/useUser";

function Layout() {
  const { user, clear } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  if (user === null && !window.localStorage.getItem("loggedUser"))
    return <Navigate to="/login" />;

  return (
    <div className={user?.username}>
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
