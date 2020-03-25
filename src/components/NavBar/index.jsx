import React, { useState, useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'universal-cookie';

export default function NavBar(props) {
  const history = useHistory();
  const [lang, setLang] = useState('ar');
  const [logged, setLogged] = useState(false);

  const handleLang = ({ target }) => {
    localStorage.setItem('language', target.value);
    setLang(target.value);
  };

  const handleLogout = () => {
    setLogged(false);
    const cookies = new Cookies();
    cookies.remove('wajjbat_access_token');
    history.push('/');
  };

  const handleUser = () => {
    if (logged) return history.push('/profile');

    return history.push('/signin');
  };

  useEffect(async () => {
    const currentLang = localStorage.getItem('language') || lang;
    setLang(currentLang);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/isLoggedIn`,
        {
          withCredentials: true,
        },
      );

      if (data.id) setLogged(true);
      return 1;
    } catch (error) {
      console.log(error);
      return 1;
    }
  }, []);

  useEffect(() => {
    props.setLang(lang);
  }, [lang, props]);

  const useStyles = makeStyles({
    root: { color: '#21b5a2', height: '40px', width: '40px' },
  });

  const classes = useStyles();

  return (
    <div className="navBar">
      {/* <div className="signUp" /> */}
      <img
        onClick={() => history.push('/')}
        className="logo-img"
        src={require('../../assets/icons/logo-3.png')}
        alt="Logo image"
      />

      <div className="login">
        {/* <button className="home-btn" onClick={() => history.push('/')}>
                    <HomeIcon
                        classes={{
                            root: classes.root,
                        }}
                    />
                </button> */}

        <div className="changeLanguage">
          <select className="select" onChange={handleLang} value={lang}>
            <option value="ar">ar</option>
            <option value="en">en</option>
          </select>
        </div>
        <button onClick={() => handleUser()}>
          <AccountCircleIcon
            classes={{
              root: classes.root,
            }}
          />
        </button>
        {logged && (
          <button onClick={() => handleLogout()}>
            <ExitToAppOutlinedIcon
              classes={{
                root: classes.root,
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
}
