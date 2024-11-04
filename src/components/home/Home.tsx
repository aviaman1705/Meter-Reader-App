import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { urlTracks } from "../../endpoints";
import { dashboardSummaryDTO } from "./dashboard.models";
import Panel from "../../utils/Panel/Panel";
import Chart from "../../utils/Chart/Chart";

import classes from "./Home.module.css";

export default function Home() {
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
        <Panel data={dashboardSummary} />
      </div>

      <div className="row">
        <Chart
          calledsPerMonths={dashboardSummary.calledsPerMonths}
          unCalledsPerMonths={dashboardSummary.unCalledsPerMonths}
        />
      </div>
    </>
  );
}
