import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";

import Header from "./Header";
import HotelDetails from "./hotel-details/HotelDetails";
import { Hotel } from "./hotels-list/columns";
import DemoPage from "./hotels-list/hotelsList";


export default function HotelManagement(){
    
    const [data, setData] = useState<Hotel[]>([]);

    return( 
        <Routes>
            <Route index element={
                <div className=''>
                    <PageTitle subTitle="manage Hotels" title="Hotels List"/>
                    <Header setData={setData} />
                    <DemoPage data={data} setData={setData} />
                </div>
            }/>
            <Route path="user-details/:id" element={
                <div className=''>
                    <PageTitle title="User Details"/>
                    <HotelDetails />
                </div>
            }/>
            
        </Routes>
    );
}