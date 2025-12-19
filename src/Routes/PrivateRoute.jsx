import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user,loading,roleLoading,userStatus}=use(AuthContext);

    const location= useLocation();


    if(loading || roleLoading){
        return <span className="mx-auto loading loading-bars loading-xl"></span>
    }

    if(!user || !userStatus==="active"){
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }
    else{
        return children
    }
};

export default PrivateRoute;