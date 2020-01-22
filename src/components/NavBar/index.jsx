import React, { useState, useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function NavBar(props) {
    const history = useHistory();
    const [lang, setLang] = useState('ar');

    const handleLang = ({ target }) => {
        localStorage.setItem('language', target.value)
        setLang(target.value)
    };

    const handleUser = () => {
        if (document.cookie.indexOf('wajjbat_access_token') !== -1) return history.push('/profile');
        return history.push('/signin');
    };

    useEffect(() => {
        const currentLang = localStorage.getItem('language') || lang;
        setLang(currentLang)
        props.setLang(currentLang)

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
