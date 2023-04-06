import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  // const [imageSrc, setImageSrc] = useState("");

  //   const buttonHandler = async () => {
  //     let response = await axios.post("http://localhost:8001/validation", {
  //       email: "yuanda@mail.com",
  //       password: "123456",
  //     });
  //     console.log(response);
  //   };

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    // console.log(preview);
    //src kita ubah menjadi data yang kita upload
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  const uploadImage = async () => {
    setIsLoading(true);
    try {
      if (file) {
        //membuat form data, di postman pun sama upload menggunakan form data
        const id = {
          id: user.id,
        };

        let formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify(id));

        //   console.log(formData);
        let response = await axios.post(
          "http://localhost:8001/upload",
          formData
        );
        console.log(response);

        //
        if (!response.error) {
          alert("Upload berhasil");
        }
        localStorage.setItem("profilePict", response.data.filepath);
        navigate("/");
      } else {
        alert("select image first");
      }
      setIsLoading(false);
    } catch (error) {
      alert("error");
    }
  };

  // useEffect(() => {}, [user.imagePath]);

  return (
    <div>
      <div className="w-3/4 m-auto bg-blue-200">
        <p>Update Profile</p>
        <div>
          {/* <p>{imageSrc}</p> */}
          <img src="" alt="" id="imagepreview" width="400px" height="200px" />
        </div>
        <div>
          <input
            type="file"
            id="file"
            onChange={(event) => onFileChange(event)}
          />
        </div>
        {isLoading ? (
          <button
            className="bg-red-300 px-4 py-2 text-white rounded-md"
            onClick={uploadImage}
            disabled
          >
            Upload
          </button>
        ) : (
          <button
            className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-500"
            onClick={uploadImage}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;
