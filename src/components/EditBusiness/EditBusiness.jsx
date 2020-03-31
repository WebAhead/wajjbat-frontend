import React, { useEffect } from 'react';
import AddBusiness from '../../pages/AddBusiness';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';





export default ({editingBusiness, businessData, setBusinessData}) =>{

  useEffect(async()=>{
    if(editingBusiness){
      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/businesses/${editingBusiness.id}`,
              {
                  withCredentials: true,
              },
          );
          setBusinessData(data);
      } catch (error) {
          console.log(error);
          return 1;
      }
    }
    
  },[])

if(!businessData){
return <CircularProgress disableShrink />
}else{
  console.log('got data! ',businessData);
  return <AddBusiness editing={businessData.details}/>
}


}