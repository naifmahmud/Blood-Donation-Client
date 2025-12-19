import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Contexts/AuthContext';
import { Navigate } from 'react-router';

const Funding = () => {

    const {user}=useContext(AuthContext);



    const axiosInstance= useAxios();

    const handleCheckout=(e)=>{
        e.preventDefault();
        const donateAmout= e.target.donateAmount.value;
        const donorEmail= user?.email;
        const donorName = user?.displayName;


        const formData={
            donateAmout,
            donorEmail,
            donorName
        }

        axiosInstance.post('/create-payment-checkout',formData)
        .then(res=>{
            console.log(res.data)
            window.location.href= res.data.url;
           
            
        })

    }
    return (
        <div>
            <form onSubmit={handleCheckout} className='flex justify-center items-center gap-5 min-h-screen'>

                <input type="text"
                placeholder="Type here"
                className="input" 
                name='donateAmount'
                />

                <button className='btn'>Submit</button>
            </form>
        </div>
    );
};

export default Funding;