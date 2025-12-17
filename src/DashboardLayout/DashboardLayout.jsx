import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Pages/Dashboard/Aside/Aside';

const DashboardLayout = () => {
    return (
        <div className='flex gap-5'>
            <Aside></Aside>
            <div className='flex-1 ml-5'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;