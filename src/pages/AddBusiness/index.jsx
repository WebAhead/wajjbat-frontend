import React, { useState, Fragment } from "react";
import Select from "../../components/Select";
import "./style.scss";

//should get the data from the DB in the future
const businessTypes = [
  { id: 1, value: "Restaurant" },
  { id: 2, value: "Cafe" },
  { id: 3, value: "Bar" },
  { id: 4, value: "Store" },
  { id: 5, value: "Other" }
];
export default function AddBusiness(props) {
  const [mainImg, setMainImg] = useState("");
  const [subImgs, setSubImgs] = useState([]);
  const [business, setBusiness] = useState(prevState => {
    return {
      name: "",
      description: "",
      phone: "",
      email: "",
      cuisine: "",
      address: "",
      type: "",
      parking: false,
      smokingArea: false,
      freeWifi: false
    };
  });

  const handleSubImgUpload = e => {
    const image = URL.createObjectURL(e.target.files[0]);
    setSubImgs([...subImgs, image]);
  };
  const handleSubImgClick = e => {
    setMainImg(e.target.src);
  };

  const handleChange = ({ currentTarget: input }) => {
    setBusiness({ ...business, [input.name]: input.value });
  };

  const handleSelect = type => {
    setBusiness({ ...business, type });
  };

  const handleCheckBox = ({ currentTarget: input }) => {
    setBusiness(prevState => {
      return { ...business, [input.name]: !prevState[input.name] };
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0"
      ></meta>
      <div>{/* navbar to added here */}</div>
      <header className="create-business-header">
        <div className="header-items">
          <img src={mainImg} alt="main-img" />
          <div className="sub-imgs">
            {subImgs.map((subImg, index) => (
              <img
                key={index + 1}
                src={subImg}
                alt="sub-img"
                onClick={handleSubImgClick}
              ></img>
            ))}
            <div className="add-image">
              <label htmlFor="file" className="file-input-label">
                +
              </label>
              <input
                id="file"
                name="file"
                type="file"
                style={{ display: "" }}
                onChange={handleSubImgUpload}
                className="file-input"
              ></input>
            </div>
          </div>
        </div>
      </header>

      <section className="add-business-form">
        <div className="form-container">
          <form
            onSubmit={handleSubmit}
            className="form-items"
            style={{ width: "90%" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-input"
              value={business.name}
              onChange={handleChange}
              required
            />

            <textarea
              class="large-input"
              rows="5"
              placeholder="Description"
              name="description"
              value={business.description}
              onChange={handleChange}
              required
            ></textarea>

            <Select
              items={businessTypes}
              name="type"
              label="Type"
              className="form-input"
              onSelect={handleSelect}
              value={business.type}
            ></Select>

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-input"
              value={business.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={business.email}
              onChange={handleChange}
            />

            <textarea
              class="large-input"
              type="text"
              rows="2"
              name="address"
              placeholder="Address"
              className="form-input"
              value={business.address}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              className="form-input"
              value={business.cuisine}
              onChange={handleChange}
            />

            <div className="checkbox">
              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="parking"
                  value={business.parking}
                  onChange={handleCheckBox}
                />
                <label htmlFor="parking">Parking</label>
              </div>

              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="smokingArea"
                  value={business.smokingArea}
                  onChange={handleCheckBox}
                />
                <label htmlFor="smokingArea">Smoking Area</label>
              </div>

              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="freeWifi"
                  value={business.freeWifi}
                  onChange={handleCheckBox}
                />
                <label htmlFor="freeWifi">Free Wifi</label>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}
