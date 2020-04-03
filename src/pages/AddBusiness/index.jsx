import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Select from 'components/Forms/Select';
import ImageInput from 'components/Forms/ImageInput';
import ChooseLocation from 'components/ChooseLocation';
import './style.scss';

// should get the data from the DB in the future
const businessTypes = [
  { id: 1, value: 'Restaurant' },
  { id: 2, value: 'Cafe' },
  { id: 3, value: 'Bar' },
  { id: 4, value: 'Store' },
  { id: 5, value: 'Other' },
];

// should get the data from the DB in the future
const cuisines = [
  { id: 1, value: 'Italian' },
  { id: 2, value: 'Mexican' },
  { id: 3, value: 'Asian' },
  { id: 4, value: 'French' },
  { id: 5, value: 'Arabic' },
  { id: 6, value: 'Other' },
];

const endPointUrl = process.env.REACT_APP_API_URL;

function AddBusiness({ intl, editing = {} }) {
  const history = useHistory();
  console.log(editing);
  const [mainImg, setMainImg] = useState(editing.image || '');
  const [subImgs, setSubImgs] = useState(editing.images || []);
  const [userPosition, setUserPosition] = useState({});
  const [userId, setUserId] = useState('');
  const [businessLatlng, setBusinessLatlng] = useState({});
  const [missingType, setMissingType] = useState(false);
  const [missingCuisine, setMissingCuisine] = useState(false);
  const [missingImage, setMissingImage] = useState(false);

  const [business, setBusiness] = useState(() => ({
    name: editing.name || '',
    description: editing.description || '',
    phone: editing.phone || '',
    email: editing.email || '',
    cuisine: editing.cuisine || '',
    address: editing.address || '',
    type: editing.type || '',
    parking: editing.parking || false,
    smokingArea: editing.smokingarea || false,
    freeWifi: editing.freewifi || false,
  }));

  useEffect(() => {
    // here we get the user location  after the user approve using
    // The HTML Geolocation API which is used to locate a user's position.
    if (navigator.geolocation) {
      setUserPosition({
        lat: 32.8172164,
        lng: 34.9912262,
      });
      setBusinessLatlng({
        lat: 32.8172164,
        lng: 34.9912262,
      });
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setUserPosition({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setBusinessLatlng({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    async function getUserId() {
      const { data } = await axios.get(`${endPointUrl}/api/isLoggedIn`, {
        withCredentials: true,
      });
      if (!data.id) {
        history.push('/');
      } else {
        setUserId(data.id);
      }
    }
    getUserId();
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
    setBusiness(prevState => ({
      ...business,
      [input.name]: !prevState[input.name],
    }));
  };

  const checkInput = async () => {
    if (!business.type || !business.type.length) {
      setMissingType(true);
    } else setMissingType(false);

    if (!business.cuisine || !business.cuisine.length) {
      setMissingCuisine(true);
    } else setMissingCuisine(false);
    if (!business.mainImg|| !mainImg.length) {
        setMissingImage(true);
      } else setMissingImage(false);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    await checkInput();
    if (!business.cuisine || !business.cuisine.length || !business.type || !business.type.length) return;
    if(missingCuisine || missingType) return;
    const data = {
      userId,
      ...business,
      subImgs,
      primaryImage: mainImg,
      lat: businessLatlng.lat,
      lng: businessLatlng.lng,
    };
    try {
      const result = await axios.post(
        `${endPointUrl}/api/new-businesses`,
        data,
        { withCredentials: true },
      );

      if (result.data.success) {
        history.push('/profile-business-list');
      } else {
        // handle error with popup ?
      }
    } catch (err) {
      // handle error with popup ?
      console.log(err);
      history.push('/profile-business-list');
    }

    // Redirect the user to another page
  };

  const translate = word => intl.formatMessage({ id: word });

  return (
    <>
      <header className="create-business-header">
        <div className="header-items">
          {mainImg ? (
            <img src={mainImg} alt="main-img" />
          ) : (
            <ImageInput height="150px" onChange={url => setMainImg(url)} />
          )}
          <div className="sub-imgs">
            {subImgs.map((subImg, index) => (
              <img key={index + 1} src={subImg} alt="sub-img" />
            ))}
            <ImageInput
              height="40px"
              width="40px"
              onChange={url => setSubImgs([...subImgs, url])}
              onChangeMultiple={images => setSubImgs([...subImgs, ...images])}
              multiple
            />
          </div>
        </div>
      </header>

      <section className="add-business-form">
        <div className="form-container">
          <form
            onSubmit={handleSubmit}
            className="form-items"
            style={{ width: '90%' }}
          >
            <input
              type="text"
              name="name"
              placeholder={translate('Name')}
              className="form-input"
              value={business.name}
              onChange={handleChange}
              minLength="6"
              required
            />

            <textarea
              className="large-input"
              rows="4"
              placeholder={translate('Description')}
              name="description"
              value={business.description}
              onChange={handleChange}
              required
            />

            <div style={{ display: 'flex' }}>
              <Select
                items={businessTypes}
                name="type"
                label={translate('Type')}
                className="form-input"
                onSelect={handleTypeSelect}
                value={business.type.length ? business.type : null}
                required
              />
              <Select
                items={cuisines}
                name="cuisine"
                label={translate('Cuisine')}
                className="form-input"
                onSelect={handCuisineSelect}
                value={business.cuisine}
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder={translate('Phone')}
              className="form-input"
              value={business.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={translate('Email')}
              className="form-input"
              value={business.email}
              onChange={handleChange}
              required
            />

            <textarea
              className="large-input form-input"
              type="text"
              rows="2"
              name="address"
              placeholder={translate('Address')}
              value={business.address}
              onChange={handleChange}
              required
            />

            <div className="checkbox">
              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="parking"
                  value={business.parking}
                  onChange={handleCheckBox}
                  checked={business.parking}
                />
                <label htmlFor="parking">
                  <FormattedMessage id="Parking" />
                </label>
              </div>

              <div className="checkbox-items">
                <input
                  type="checkbox"
                  primaryImage
                  className="checkbox-input"
                  name="smokingArea"
                  value={business.smokingArea}
                  onChange={handleCheckBox}
                  checked={business.smokingArea}
                />
                <label htmlFor="smokingArea">
                  <FormattedMessage id="Smoking Area" />
                </label>
              </div>

              <div className="checkbox-items">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="freeWifi"
                  value={business.freeWifi}
                  onChange={handleCheckBox}
                  checked={business.freeWifi}
                />
                <label htmlFor="freeWifi">
                  <FormattedMessage id="Free Wifi" />
                </label>
              </div>
            </div>
            <span
              style={{
                color: '#726A6A',
                fontSize: '20px',
                marginBottom: '20px',
              }}
            >
              <FormattedMessage id="Choose location" />
            </span>

            <ChooseLocation
              userPosition={userPosition}
              setBusinessLatlng={setBusinessLatlng}
              latLng={businessLatlng}
            />
            {missingType && (
              <span className="error-msg">Please select business type.</span>
            )}
            {missingCuisine && (
              <span className="error-msg">Please select business cusine.</span>
            )}
              {missingImage && (
              <span className="error-msg">Please upload at least one primary image.</span>
            )}

            {!editing.name && (
              <button type="submit" className="submit-btn">
                <FormattedMessage id="Submit" />
              </button>
            )}
            {editing.name && (
              <button type="submit" className="submit-btn">
                <FormattedMessage id="Edit" />
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default injectIntl(AddBusiness);
