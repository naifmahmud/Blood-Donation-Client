import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user,loading}=use(AuthContext);

    const location= useLocation();


    if(loading){
        return <div className="skeleton h-32 w-32"></div>
    }

    if(user){
        return children
    }
    else{
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }
};

export default PrivateRoute;