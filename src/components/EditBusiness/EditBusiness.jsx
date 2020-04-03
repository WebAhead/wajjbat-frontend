import React, { useEffect, useState } from 'react';
import AddBusiness from '../../pages/AddBusiness';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

export default ({ editingBusiness, businessData, setBusinessData }) => {
  const [err, setErr] = useState(false);

  useEffect(()=>{

    async function getEditingBusinessData () {
      if (editingBusiness && setBusinessData) {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/businesses/${editingBusiness.id}`,
            {
              withCredentials: true,
            },
          );
          setBusinessData(data);
          setErr(false);
        } catch (error) {
          setErr(error);
        }
      }
    }
    getEditingBusinessData();
  }, [editingBusiness,setBusinessData]);

  if (err) {
    return <span>We failed to load business data, please try again.</span>;
  }
  if (!businessData) {
    return (
      <div style={{ width: '60px', margin: '0 auto' }}>
        <CircularProgress disableShrink />
      </div>
    );
  } else {
    return <AddBusiness editing={businessData.details} />;
  }
};
