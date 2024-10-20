import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import AuthenticationContext from "./AuthenticationContext";
import { getClaims, saveToken } from "./handleJWT";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import Loading from "../../utils/Loading";
import LoginForm from "./LoginForm";

import css from "./../../Form.module.css";

export default function Login() {
  // פונקציה לעדכון פרטי משתמש בלוגין
  const { update } = useContext(AuthenticationContext);
  //* הצגת רכיב טעינה
  const [loading, setLoading] = useState(false);
  //* מערך שמציג שגיאות שרת
  const [errors, setErrors] = useState<string[]>([]);
  //* אובייקט לניווט לדף אחר
  const history = useHistory();

  // פונקציה לביצוע לוגין
  function login(credentials: userCredentials, actions: any) {
    setLoading(true);
    setErrors([]);

    axios
      .post<authenticationResponse>(`${urlAccounts}/login`, credentials)
      .then((response: AxiosResponse<authenticationResponse>) => {
        setTimeout(() => {
          saveToken(response.data);
          setLoading(false);
          update(getClaims());
          history.push("/");
        }, 3000);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);

          let helper: string[] = [];

          error.response.data.forEach((err: string) => {
            helper.push(err);
          });

          setErrors(helper);
          actions.setSubmitting(false);
        }, 2000);
      });
  }

  return (
    <>
      <h1 className={css["auth-page-title"]}>כניסה</h1>
      <div className={css["auth-container"]}>
        {loading && <Loading left="150px" top="90px" />}
        <div className={css["form"]}>
          <LoginForm onSubmit={login} />
          <DisplayErrors errors={errors} />
        </div>
      </div>
    </>
  );
}
