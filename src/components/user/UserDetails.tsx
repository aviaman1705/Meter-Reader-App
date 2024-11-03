import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { urlAccounts } from "../../endpoints";
import { editUserDTO } from "./user.models";
import { convertUserDetailsToFormData } from "../../utils/formDataUtils";
import UserDetailsForm from "./UserDetailsForm";
import DisplayErrors from "../../utils/DisplayErrors";
import Loading from "../../utils/Loading";

import classes from "./UserDetails.module.css";

export default function UserDetails() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<[]>([]);
  const [userDetails, setUserDetails] = useState<editUserDTO>({
    userName: "",
    email: "",
    phone: "",
    image: "",
    imageFile: null,
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getUserDetails();
    }, 2000);
  }, []);

  const getUserDetails = () => {
    axios
      .get(`${urlAccounts}/GetUserDetails`)
      .then((response: AxiosResponse<editUserDTO>) => {
        setUserDetails(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const update = (editUserDTO: editUserDTO) => {
    setLoading(true);
    const formData = convertUserDetailsToFormData(editUserDTO);
    axios({
      method: "post",
      url: `${urlAccounts}/UpdateUserDetails`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response: AxiosResponse<editUserDTO>) => {
        setTimeout(() => {
          setUserDetails(response.data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setErrors(error.response.data);
        setLoading(false);
      });
  };

  const selectImageHandler = (selectedFile: File) => {
    userDetails.imageFile = selectedFile;
  };

  return (
    <>
      <h1 id={classes["user-details-page-title"]}>עמוד פרופיל</h1>
      <div className="main-body">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <DisplayErrors errors={errors} />
                <UserDetailsForm
                  model={userDetails}
                  onSubmit={(values) => update(values)}
                  onSelect={(file: File) => selectImageHandler(file)}
                >
                  {loading === true ? <Loading left="40%" top="40%" /> : null}
                </UserDetailsForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
