import React, { useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//slmzsmto

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { title, description, category, imageUrl } = formValue;
  const navigate = useNavigate();

  const onInputChange = (e) => {};
  const onCategoryChage = (e) => {};
  const onUploadImage = (files) => {
    console.log(files);

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "slmzsmto");
    axios
      .post("http://api.cloudinary.com/v1_1/smudger/image/upload", data)
      .then((res) => {
        toast.info("Image Uploaded Successfully");
        setFormValue({ ...formValue, imageUrl: res.data.url });
      })
      .catch((err) => {
        toast.error("Image Upload Failed");
      });
  };
  const handleSubmit = () => {};

  return (
    <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
      <p className="fs-2 fw-bold">Add Blog</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="Please prrovide a title"
          invalid
        />
        <br />
        <MDBInput
          value={description}
          name="description"
          type="text"
          onChange={onInputChange}
          required
          label="Description"
          textarea
          rows={4}
          validation="Please prrovide a description"
          invalid
        />
        <br />
        <MDBInput
          name="image"
          type="file"
          onChange={(e) => onUploadImage(e.target.files)}
          required
          validation="Please prrovide an image"
          invalid
        />
        <br />
        <select
          value={category}
          onChange={onCategoryChage}
          className="categoryDropdown"
        >
          <option>Please select category</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              option
            </option>
          ))}
        </select>
        <br />
        <br />
        <MDBBtn
          style={{
            marginRight: "10px",
          }}
          type="submit"
        >
          Add
        </MDBBtn>
        <MDBBtn
          style={{
            marginRight: "10px",
          }}
          color="light"
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditBlog;
