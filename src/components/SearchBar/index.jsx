import React, { useState, useEffect } from 'react';
import './style.scss';
import { injectIntl, useIntl } from 'react-intl';

export default function SearchBar({ businesses, setSearchData }) {
    const [query, setQuery] = useState('');
    const intl = useIntl();

    const inputStyles = {
        'boxSizing': 'border-box',
        'width': '100%',
        'border': 'solid 1px #21b5a2',
        'borderRadius': '4px',
        'padding': '0 10px',
        'outline': 'none',
        'fontSize': '19px',
    };

    useEffect(() => {
        if (query === '') return setSearchData([]);

        const arabicExp = /^[ذ|ض|ص|ض|ث|ق|ف|غ|ع|ه|خ|ح|ج|د|ش|س|ي|ب|ل|ا|ت|ن|م|ك|ط|ئ|ء|ؤ|ر|ل|ا|ى|ة|و|ز|ظ]+$/;

        let lang = 'english';

        if (arabicExp.test(query)) {
            lang = 'arabic';
        }

        switch (lang) {
            case 'english': {
                return setSearchData(
                    businesses.filter(business => {
                        return (
                            business.name.toLowerCase().includes(query.toLowerCase())
                            || business.type.toLowerCase().includes(query.toLowerCase())
                            || business.cuisine.toLowerCase().includes(query.toLowerCase())
                        )
                    })
                );
            }
            case 'arabic': {
                return setSearchData(
                    businesses.filter(business => {
                        return (
                            intl.formatMessage({ id: business.type }).includes(query)
                            || intl.formatMessage({ id: business.cuisine }).includes(query)
                        )
                    })
                );
            }
            default: { return 1; }
        }
    }, [query]);

    return (
        <input
            style={inputStyles}
            onChange={event => setQuery(event.target.value)}
            type="text"
            autoComplete="off"
            placeholder={intl.formatMessage({ id: 'searchPlaceholder' })}
        />
    );
}
