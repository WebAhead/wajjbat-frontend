import React, { useState, useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';
import MenuSideBar from '../MenuSideBar';

export default function NavBar(props) {
    const history = useHistory();
    const [lang, setLang] = useState('ar');
    const [logged, setLogged] = useState(false);
    const [showMenuSideBar, setMenuShowSideBar] = useState(false);

    const handleLang = ({ target }) => {
        localStorage.setItem('language', target.value);
        setLang(target.value);
    };

    useEffect(async () => {
        const currentLang = localStorage.getItem('language') || lang;
        setLang(currentLang);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/isLoggedIn`, {
                withCredentials: true
            });

            if (data.id) setLogged(true);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        props.setLang(lang);
    }, [lang, props]);

    const useStyles = makeStyles({
        root: { color: '#21b5a2', height: '40px', width: '40px' }
    });

    const classes = useStyles();

    return (
        <div className="navBar">
            <img onClick={() => history.push('/')} className="logo-img" src={require('../../assets/icons/logo-3.png')} alt="Logo image" />

            <div className="login">
                <div className="changeLanguage">
                    <select className="select" onChange={handleLang} value={lang}>
                        <option value="ar">ar</option>
                        <option value="en">en</option>
                    </select>
                </div>
                <button onClick={() => history.push('/search')}>
                    <Search
                        classes={{
                            root: classes.root
                        }}
                    />
                </button>
                <button onClick={() => setMenuShowSideBar(!showMenuSideBar)}>
                    <Menu
                        classes={{
                            root: classes.root
                        }}
                    />
                </button>
            </div>
            <div>
                <MenuSideBar setMenuShowSideBar={setMenuShowSideBar} showMenuSideBar={showMenuSideBar} logged={logged} setLogged={setLogged} />
            </div>
        </div>
    );
}
