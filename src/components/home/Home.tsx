import { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { urlTracks } from "../../endpoints";
import { dashboardDTO, dashboardSummaryDTO } from "./dashboard.models";
import Chart from "../../utils/Chart/Chart";
import Panel from "../../utils/Panel/Panel";
import BarChartItem from "../../utils/Chart/BarChartItem/BarChartItem";
import { NavLink } from "react-router-dom";
import SearchContext from "../../store/search-context";

import classes from "./Home.module.css";

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const searchCtx = useContext(SearchContext);
  const [dashboardSummary, setDashboardSummary] = useState<dashboardSummaryDTO>(
    {
      called: 0,
      unCalled: 0,
      unCalledPercentage: 0,
      lowestUnCalledTrack: null,
      highestUnCalledTrack: null,
      popularNotebook: null,
      calledsPerMonths: [],
      unCalledsPerMonths: [],
    }
  );

  useEffect(() => {
    loadDashboardData();
  }, []);

  function loadDashboardData() {
    axios
      .get(`${urlTracks}/getDashboardData`)
      .then(function (response: AxiosResponse<dashboardSummaryDTO>) {
        setDashboardSummary(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">מסך הבית</h1>
        </div>
      </div>

      <div className="row">
        {searchCtx.items.map((item) => (
          <div>{item.title}</div>
        ))}
        <div className="col-lg-4 col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-comments fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <div className={classes["cart-item-home-title"]}>
                    {dashboardSummary.called}
                  </div>
                  <div>נקרא</div>
                </div>
              </div>
            </div>

            <NavLink exact={true} to="/tracks">
              <div className="panel-footer">
                <div className="clearfix"></div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="panel panel-green">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-tasks fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <div className={classes["cart-item-home-title"]}>
                    {dashboardSummary.unCalled}
                  </div>
                  <div>לא נקרא</div>
                </div>
              </div>
            </div>
            <NavLink exact={true} to="/tracks">
              <div className="panel-footer">
                <div className="clearfix"></div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="panel panel-yellow">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-shopping-cart fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <div className={classes["cart-item-home-title"]}>
                    {dashboardSummary.unCalledPercentage}
                  </div>
                  <div>אחוזי אי קריאה</div>
                </div>
              </div>
            </div>
            <NavLink exact={true} to="/tracks">
              <div className="panel-footer">
                <div className="clearfix"></div>
              </div>
            </NavLink>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="panel panel-red">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-support fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <div className={classes["cart-item-home-title"]}>
                    {dashboardSummary.highestUnCalledTrack?.desc}
                  </div>
                  <div>המסלול הגרוע</div>
                </div>
              </div>
            </div>
            <NavLink
              exact={true}
              to={`/tracks/edit/${dashboardSummary.highestUnCalledTrack?.id}`}
            >
              <div className="panel-footer">
                <div className="clearfix"></div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-shopping-cart fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <div className={classes["cart-item-home-title"]}>
                    {dashboardSummary.lowestUnCalledTrack?.desc}
                  </div>
                  <div>המסלול המצויין</div>
                </div>
              </div>
            </div>
            <NavLink
              exact={true}
              to={`/tracks/edit/${dashboardSummary.lowestUnCalledTrack?.id}`}
            >
              <div className="panel-footer">
                <div className="clearfix"></div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="panel panel-green">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-support fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <div className={classes["cart-item-home-title"]}>
                    {dashboardSummary.popularNotebook?.desc}
                  </div>
                  <div>המסלול הנפוץ</div>
                </div>
              </div>
            </div>
            <NavLink
              exact={true}
              to={`/notebooks/edit/${dashboardSummary.popularNotebook?.id}`}
            >
              <div className="panel-footer">
                <div className="clearfix"></div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <h2 className="text-center">גרף קריאות</h2>
          <BarChartItem data={dashboardSummary.calledsPerMonths} name="נקרא" />
        </div>
        <div className="col-lg-6">
          <h2 className="text-center">גרף אי קריאות</h2>
          <BarChartItem
            data={dashboardSummary.unCalledsPerMonths}
            name="לא נקרא"
            color="#343a40"
          />
        </div>
      </div>
    </>
  );
}
