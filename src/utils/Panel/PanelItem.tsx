import { NavLink } from "react-router-dom";

import classes from "./Panel.module.css";

export default function PanelItem(props: panelItemlProps) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="panel panel-success">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-4">
              <i className="fa fa-comments fa-5x"></i>
            </div>
            <div className="col-xs-8 text-right">
              <div className={classes["cart-item-home-title"]}>
                {props.value}
              </div>
              <div>{props.text}</div>
            </div>
          </div>
        </div>

        <NavLink exact={true} to={props.link}>
          <div className="panel-footer">
            <div className="clearfix"></div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

interface panelItemlProps {
  value: string;
  text: string;
  link: string;
}

PanelItem.defaultProps = {
  header: "",
};
