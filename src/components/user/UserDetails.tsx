import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { urlAccounts } from "../../endpoints";
import { editUserDTO } from "./user.models";
import { convertUserDetailsToFormData } from "../../utils/formDataUtils";
import UserDetailsForm from "./UserDetailsForm";
import DisplayErrors from "../../utils/DisplayErrors";
import Loading from "../../utils/Loading";

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState<editUserDTO>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    setLoading(true);
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
    const formData = convertUserDetailsToFormData(userDetails);
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
        console.log(error);
      });
  };

  const selectImageHandler = (selectedFile: File) => {
    userDetails.imageFile = selectedFile;
  };

  return (
    <>
      <h1>עמוד פרופיל</h1>

      <div className="container">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <DisplayErrors errors={errors} />
                  {userDetails ? (
                    <UserDetailsForm
                      model={userDetails}
                      onSubmit={(values) => update(values)}
                      onSelect={(file: File) => selectImageHandler(file)}
                    >
                      {loading === true ? (
                        <Loading left="40%" top="40%" />
                      ) : null}
                    </UserDetailsForm>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
