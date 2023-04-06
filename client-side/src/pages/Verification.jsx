import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Verification() {
  let { token } = useParams();
  const navigate = useNavigate();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:8001/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          alert(response.data.message);
          navigate("/user/login");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <p>Your account is being verified</p>
      <p>{token}</p>
      {/* pake useeffect untuk lempar ke backend */}
    </div>
  );
}

export default Verification;
