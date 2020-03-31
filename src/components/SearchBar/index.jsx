import React, { useState, useEffect } from 'react';
import './style.scss';

export default function SearchBar({ businesses, setSearchData }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query === '') return setSearchData([]);
        return setSearchData(
            businesses.filter(business => {
                return (
                    business.name.toLowerCase().includes(query.toLowerCase())
                    || business.type.toLowerCase().includes(query.toLowerCase())
                    || business.cuisine.toLowerCase().includes(query.toLowerCase())
                )
            })
        );
    }, [query]);

    return (
        <form className="search-form">
            <input
                onChange={event => setQuery(event.target.value)}
                type="text"
                autoComplete="off"
                placeholder="Search by name, type or cuisine"
            />
        </form>
    );
}
