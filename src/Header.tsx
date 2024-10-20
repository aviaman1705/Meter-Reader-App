import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import utf8 from "utf8";
import { IoMdArrowDropdown } from "react-icons/io";
import { logout } from "./components/auth/handleJWT";
import AuthenticationContext from "./components/auth/AuthenticationContext";
import Authorized from "./components/auth/Authorized";

import "./Header.css";

export default function Header() {
  const { update, claims } = useContext(AuthenticationContext);
  const history = useHistory();
  const [display, setDisplay] = useState("none");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (claims.find((claim) => claim.name === "username") !== undefined) {
      const currentUsername = utf8.decode(
        claims.find((claim) => claim.name === "username").value
      );
      setUsername(`היי ${currentUsername}`);
    }
  }, [claims]);

  return (
    <>
      <header className="header">
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <NavLink
                className="main-nav-link"
                activeClassName="nav-cta"
                exact={true}
                to="/"
              >
                עמוד הבית
              </NavLink>
            </li>

            <Authorized
              authorized={
                <>
                  <li>
                    <NavLink
                      className="main-nav-link"
                      activeClassName="nav-cta"
                      to="/tracks"
                      exact={true}
                    >
                      מסלולים
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="main-nav-link"
                      activeClassName="nav-cta"
                      to="/notebooks"
                    >
                      פנקסים
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="main-nav-link"
                      activeClassName="nav-cta"
                      to="/statistics"
                    >
                      סטטיסטיקות
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>

          <Authorized
            notAuthorized={
              <>
                <ul className="main-nav-list">
                  <li>
                    <NavLink
                      className="main-nav-link"
                      activeClassName="nav-cta"
                      to="/login"
                    >
                      כניסה
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="main-nav-link"
                      activeClassName="nav-cta"
                      to="/register"
                    >
                      הרשמה
                    </NavLink>
                  </li>
                </ul>
              </>
            }
            authorized={
              <>
                <div className="dropdown-box">
                  <div className="dropdown">
                    <button className="dropbtn">
                      {username}
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <a
                      id="logout-mobile-btn"
                      className="main-nav-link"
                      onClick={(e: any) => {
                        e.preventDefault();
                        logout();
                        update([]);
                        history.push("/");
                      }}
                      href="/#"
                    >
                      יציאה
                    </a>
                  </div>
                </div>
              </>
            }
          />
        </nav>
        <NavLink className="navbar-brand" to="/" exact={true}>
          <img className="logo" alt="Omnifood logo" src="logo192.png" />
        </NavLink>
      </header>
    </>
  );
}
