import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FormattedMessage, injectIntl } from 'react-intl';

import './style.scss';

function Filtering({ filterByTypeHandler, filterByCuisineHandler, intl, setShowSideBar }) {
    const typeOptions = [
        { label: 'All', value: 'All' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Cafe', value: 'Cafe' },
        { label: 'Bar', value: 'Bar' },
        { label: 'Store', value: 'Store' },
        { label: 'Other', value: 'Other' }].map(
        ({ label, value }) => ({ label: intl.formatMessage({ id: label }), value }),
    )

    const cuisineOptions = [
        { label: 'All', value: 'All' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Mexican', value: 'Mexican' },
        { label: 'Asian', value: 'Asian' },
        { label: 'French', value: 'French' },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'Other', value: 'Other' }].map(
        ({ label, value }) => ({ label: intl.formatMessage({ id: label }), value }),
    )

    return (
        <div className="filters">
            <h1 className="filterSectionTitle"><FormattedMessage id="Filter By" /> </h1>

            <div className="filtersContainer">
                <div className="filterByBusinessTypeContainer">
                    <p className="filterLabel"><FormattedMessage id="Business Type" /></p>

                    <DropDownList
                        className="filterByBusinessType"
                        data={typeOptions.map(({ label }) => label)}
                        defaultValue={typeOptions[0].label}
                        onChange={({ value }) => filterByTypeHandler({ value: typeOptions.filter((item) => item.label === value)[0].value })}
                    />
                </div>

                <div className="filterByCuisineTypeContainer">
                    <p className="filterLabel"><FormattedMessage id="Cuisine Type" /></p>

                    <DropDownList
                        className="filterByCuisineType"
                        data={cuisineOptions.map(({ label }) => label)}
                        defaultValue={cuisineOptions[0].label}
                        onChange={({ value }) => filterByCuisineHandler({ value: cuisineOptions.filter((item) => item.label === value)[0].value })}
                    />
                </div>

                <div className="buttonContainer">
                    <button
                        className="actionButton"
                        onClick={() => setShowSideBar(false)}
                    >
                        <FormattedMessage id="See reults" />
                    </button>
                    <button
                        className="actionButton"
                        onClick={() => {
                            filterByTypeHandler({ value: 'All' })
                            filterByCuisineHandler({ value: 'All' })
                            setShowSideBar(false)
                        }}
                    >
                        <FormattedMessage id="Clear" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(Filtering);
