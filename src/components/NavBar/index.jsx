import React, { useState, useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function NavBar(props) {
    const history = useHistory();
    const [lang, setLang] = useState('ar');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLang = ({ target }) => {
        localStorage.setItem('language', target.value)
        setLang(target.value)
    };

    const handleUser = () => {
        if (isLoggedIn) return history.push('/profile');

        return history.push('/signin');
    };

    useEffect(() => {
        const currentLang = localStorage.getItem('language') || lang;
        setLang(currentLang)
        props.setLang(currentLang)(async function fetchIsLoggedIn() {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/isLoggedIn`,
                    {
                        withCredentials: true,
                    },
                );

                if (data.id) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log(error);
            }
        }());
    }, [])

    useEffect(() => { props.setLang(lang) }, [lang, props]);

    const useStyles = makeStyles({
        root: { color: '#21b5a2', height: '40px', width: '40px' },
    });

    const classes = useStyles();

    return (
        <div className="navBar">
            <div className="changeLanguage">
                <select className="select" onChange={handleLang} value={lang}>
                    <option value="ar">ar</option>
                    <option value="en">en</option>
                </select>
            </div>

            <div className="signUp" />
            <div className="login">
                <button
                    onClick={() => {
                        handleUser();
                    }}
                >
                    <AccountCircleIcon
                        classes={{
                            root: classes.root,
                        }}
                    />
                </button>
            </div>
        </div>
    );
}
