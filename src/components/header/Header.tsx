import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import utf8 from "utf8";
import { logout } from "../auth/handleJWT";
import AuthenticationContext from "../auth/AuthenticationContext";
import Authorized from "../auth/Authorized";

export default function Header() {
  const { update, claims } = useContext(AuthenticationContext);
  const history = useHistory();
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
      <nav
        className="navbar navbar-default navbar-static-top"
        role="navigation"
        style={{ marginBottom: 0 }}
      >
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <NavLink className="navbar-brand" to="/">
            מערכת קריאת מונים
          </NavLink>
        </div>
        {/* <!-- /.navbar-header --> */}

        <Authorized
          authorized={
            <>
              <ul className="nav navbar-top-links navbar-left">
                <li className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i className="fa fa-user fa-fw"></i>
                    <i className="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                    <li>
                      <NavLink to="/user-details">
                        <i className="fa fa-user fa-fw"></i> פרופיל
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/settings">
                        <i className="fa fa-gear fa-fw"></i> הגדרות
                      </NavLink>
                    </li>
                    <li className="divider"></li>
                    <li>
                      <a
                        onClick={(e: any) => {
                          e.preventDefault();
                          logout();
                          update([]);
                          history.push("/");
                        }}
                        href="/#"
                      >
                        <i className="fa fa-sign-out fa-fw"></i> יציאה
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          }
        />

        <Authorized
          authorized={<></>}
          notAuthorized={
            <>
              <ul className="nav navbar-top-links navbar-left">
                <li>
                  <NavLink to="/login">כניסה</NavLink>
                </li>
                <li>
                  <NavLink to="/register">הרשמה</NavLink>
                </li>
              </ul>
            </>
          }
        />

        {/* <!-- /.navbar-top-links --> */}
      </nav>
    </>
  );
}
