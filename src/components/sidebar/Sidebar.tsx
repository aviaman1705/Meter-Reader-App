import { NavLink, useHistory, useParams } from "react-router-dom";
import Authorized from "../auth/Authorized";
import { MdDashboard } from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import { PiNotebookFill } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { TbArrowsMoveVertical } from "react-icons/tb";

import classes from "./Sidebar.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import SearchContext from "../../store/search-context";
import Button from "../../utils/Button";

export default function Sidebar() {
  const inputRef = useRef(null);
  const history = useHistory();
  const [isDisabeld, setIsDisabeld] = useState(true);

  function searchHandler() {
    const helper = inputRef.current.value;
    inputRef.current.value = "";

    history.push(`/search-results/${helper}`);
  }

  function keyUpHandler() {
    if (inputRef.current.value) {
      setIsDisabeld(false);
    } else {
      setIsDisabeld(true);
    }
  }

  return (
    <>
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <ul className="nav" id="side-menu">
            <li className="sidebar-search">
              <div className="input-group custom-search-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="חפש..."
                  onKeyUp={keyUpHandler}
                  ref={inputRef}
                />
                <span className="input-group-btn">
                  <Button
                    className="btn btn-default"
                    disabled={isDisabeld}
                    title="חפש"
                    onClick={searchHandler}
                  >
                    <i className="fa fa-search"></i>
                  </Button>
                </span>
              </div>
              {/* <!-- /input-group --> */}
            </li>
            <li>
              <NavLink activeClassName="active" to="/" exact={true}>
                <i className="fa fa-dashboard fa-fw"></i> מסך ראשי
              </NavLink>
            </li>
            <Authorized
              authorized={
                <>
                  <li>
                    <NavLink activeClassName="active" to="/tracks">
                      <i className="fa fa-bar-chart-o fa-fw"></i> מסלולים
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/notebooks">
                      <i className="fa fa-edit fa-fw"></i> פנקסים
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/user-details">
                      <i className="fa fa-user fa-fw"></i> פרופיל
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/settings">
                      <i className="fa fa-cog fa-fw"></i> הגדרות
                    </NavLink>
                  </li>
                </>
              }
            />

            {/* <li>
              <a href="#">
                <i className="fa fa-bar-chart-o fa-fw"></i> Charts
                <span className="fa arrow"></span>
              </a>
              <ul className="nav nav-second-level">
                <li>
                  <a href="flot.html">Flot Charts</a>
                </li>
                <li>
                  <a href="morris.html">Morris.js Charts</a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
        {/* <!-- /.sidebar-collapse --> */}
      </div>
      {/* <!-- /.navbar-static-side --> */}
    </>
  );
}
