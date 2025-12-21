import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import BloodRequestCard from './BloodRequestCard';

const BloodRequests = () => {

    const [allRequests,setAllRequests]=useState([]);

    const axiosInstance=useAxios();

    useEffect(()=>{
        
    axiosInstance.get('/allRequests')
    .then(res=>setAllRequests(res.data))
    },[axiosInstance])

    console.log(allRequests);
    

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10'>
            {
                allRequests.map(req=><BloodRequestCard req={req} key={req._id}></BloodRequestCard>)
            }
        </div>
    );
};

export default BloodRequests;