import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import configureInterceptor from "./utils/httpInterceptors";
import { getClaims } from "./components/auth/handleJWT";
import { claim } from "./components/auth/auth.models";
import AuthenticationContext from "./components/auth/AuthenticationContext";
import { searchResultsDTO } from "./components/search/search.models";
import routes from "./route-config";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

import classes from "./App.module.css";

configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  return (
    <AuthenticationContext.Provider
      value={{ claims: claims, update: setClaims }}
    >
      <div id={classes["main-container"]}>
        <div id="wrapper">
          <Header />
          <Sidebar />
          <div id="page-wrapper">
            <main>
              <Switch>
                {routes.map((route, index) => (
                  <Route exact={route.exact} path={route.path} key={route.path}>
                    {route.isAdmin && !isAdmin() ? (
                      <>You are not allowed to see this page</>
                    ) : (
                      <route.component />
                    )}
                  </Route>
                ))}
              </Switch>
            </main>
          </div>
        </div>
        {/* <Header /> */}
        {/* <!-- Navigation --> */}

        {/* <Sidebar />

      
        <Footer /> */}
      </div>
    </AuthenticationContext.Provider>
  );
}

export default App;
