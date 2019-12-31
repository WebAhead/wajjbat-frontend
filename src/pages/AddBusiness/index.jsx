import React, { useState, useEffect, Fragment } from "react";
import Select from "../../components/Select";
import ImageInput from "../../components/ImageInput";
import InitialGoogleMaps from "../../components/InitialGoogleMaps";
import axios from "axios";
import { FormattedMessage, injectIntl } from 'react-intl';
import "./style.scss";

//should get the data from the DB in the future
const businessTypes = [
  { id: 1, value: "Restaurant" },
  { id: 2, value: "Cafe" },
  { id: 3, value: "Bar" },
  { id: 4, value: "Store" },
  { id: 5, value: "Other" }
];

//should get the data from the DB in the future
const cuisines = [
  { id: 1, value: "Italian", },
  { id: 2, value: "Mexican" },
  { id: 3, value: "Asian" },
  { id: 4, value: "French" },
  { id: 5, value: "Arabic" },
  { id: 6, value: "Other" }
];

const endPointUrl = process.env.REACT_APP_API_URL;
function AddBusiness({ intl }) {
  const [mainImg, setMainImg] = useState("");
  const [subImgs, setSubImgs] = useState([]);
  const [userPosition, setUserPosition] = useState({});
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      setUserPosition({ lat: coords.latitude, lng: coords.longitude })
    )
  }, []);

  useEffect(() => {
    (async function getUserId() {
      const { data } = await axios.get(`${endPointUrl}/api/isLoggedIn`, { withCredentials: true });
      setUserId(data.id);
    })()
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setBusiness({ ...business, [input.name]: input.value });
  };

  const handleTypeSelect = type => {
    setBusiness({ ...business, type });
  };
  const handCuisineSelect = cuisine => {
    setBusiness({ ...business, cuisine });
  };

  const handleCheckBox = ({ currentTarget: input }) => {
    setBusiness(prevState => {
      return { ...business, [input.name]: !prevState[input.name] };
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      userId,
      ...business,
      subImgs,
      primaryImage: mainImg,
      lat: userPosition.lat,
      lng: userPosition.lng
    };

    await axios.post(`${endPointUrl}/api/new-businesses`, data, { withCredentials: true });

    //Redirect the user to another page
  };

  const translate = (word) => intl.formatMessage({ id: word })

  return (
    <Fragment>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0"
      ></meta>
      <div>{/* navbar to added here */}</div>
      <header className="create-business-header">
        <div className="header-items">
          {mainImg ? (
            <img src={mainImg} alt="main-img" />
          ) : (
              <ImageInput height="150px" onChange={url => setMainImg(url)} />
            )}
          <div className="sub-imgs">
            {subImgs.map((subImg, index) => (
              <img key={index + 1} src={subImg} alt="sub-img"></img>
            ))}
            <ImageInput
              height="40px"
              width="40px"
              onChange={url => setSubImgs([...subImgs, url])}
            />
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
              placeholder={translate("Name")}
              className="form-input"
              value={business.name}
              onChange={handleChange}
              minLength="6"
              required
            />

            <textarea
              className="large-input"
              rows="4"
              placeholder={translate("Description")}
              name="description"
              value={business.description}
              onChange={handleChange}
              required
            ></textarea>

            <div style={{ display: 'flex' }}>
              <Select
                items={businessTypes}
                name="type"
                label={translate("Type")}
                className="form-input"
                onSelect={handleTypeSelect}
                value={business.type}
              ></Select>
              <Select
                items={cuisines}
                name="cuisine"
                label={translate("Cuisine")}
                className="form-input"
                onSelect={handCuisineSelect}
                value={business.cuisine}
                required
              ></Select>
            </div>



            <input
              type="text"
              name="phone"
              placeholder={translate("Phone")}
              className="form-input"
              value={business.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder={translate("Email")}
              className="form-input"
              value={business.email}
              onChange={handleChange}
            />

            <textarea
              className="large-input"
              type="text"
              rows="2"
              name="address"
              placeholder={translate("Address")}
              className="form-input"
              value={business.address}
              onChange={handleChange}
            ></textarea>

            <div className="checkbox">
              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="parking"
                  value={business.parking}
                  onChange={handleCheckBox}
                />
                <label htmlFor="parking"><FormattedMessage id="Parking" /></label>
              </div>

              <div className="checkbox-items">
                <input
                  type="checkbox"
                  primaryImage
                  className="checkbox-input"
                  name="smokingArea"
                  value={business.smokingArea}
                  onChange={handleCheckBox}
                />
                <label htmlFor="smokingArea"><FormattedMessage id="Smoking Area" /></label>
              </div>

              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="freeWifi"
                  value={business.freeWifi}
                  onChange={handleCheckBox}
                />
                <label htmlFor="freeWifi"><FormattedMessage id="Free Wifi" /></label>
              </div>
            </div>
            <button type="submit" className="submit-btn">
              <FormattedMessage id="Submit" />
            </button>
            <InitialGoogleMaps userPosition={userPosition}></InitialGoogleMaps>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default injectIntl(AddBusiness)