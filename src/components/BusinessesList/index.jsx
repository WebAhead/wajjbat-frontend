import React, {useState} from 'react';
import BusinessCard from '../Cards/BusinessCard';
import BusinessPage from '../../pages/BusinessPage';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import EditBusiness from 'components/EditBusiness/EditBusiness';

export default ({
    businesses,
    homeView,
    cardWidth,
    selectedBusiness,
    setSelectedBusiness,
    editBusiness,
    setEditBusiness,
}) => {
    const [businessData, setBusinessData] = useState(null);

    const handleBack = () => {
        if (editBusiness) setEditBusiness(null);
        else if (selectedBusiness) setSelectedBusiness(null);
    };

    if (selectedBusiness) {
        return (
            <div className="selected-business-container">
                <div className="business-control-navbar">
                    <button
                        onClick={() => setEditBusiness(true)}
                        className="business-control-btn"
                    >
                        <FormattedMessage id="Edit" />
                    </button>
                    <button className="business-control-btn">
                        <FormattedMessage id="Promotions" />
                    </button>
                    <button
                        onClick={() => handleBack()}
                        className="business-control-back-btn"
                    >
                        <FormattedMessage id="Back" />
                    </button>
                </div>
                {editBusiness && selectedBusiness && (
                    <EditBusiness
                        setBusinessData={setBusinessData}
                        businessData={businessData}
                        setEditBusiness={setEditBusiness}
                        editingBusiness={selectedBusiness}
                    />
                )}

                {!editBusiness && selectedBusiness && (
                    <BusinessPage match={{ params: { id: selectedBusiness.id } }} />
                )}
            </div>
        );
    }

    return (
        <>
            <ul className="businesses-list">
                {businesses.map(business => (
                    <li key={business.id} onClick={() => setSelectedBusiness(business)}>
                        <BusinessCard
                            business={business}
                            homeView={homeView}
                            cardWidth={cardWidth}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
