import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import HotelDetails from "./place-details/PlaceDetails";
import DemoPage from "./place-list/placeList";
import Header from "./Header";
import { Place } from "./place-list/columns";
import { useState } from "react";


export default function PlaceManagement(){
    

    const [data, setData] = useState<Place[]>([]);
    // console.log(data)
    return <>
        <Routes>
            <Route index element={
                <div className=''>
                    <PageTitle subTitle="manage Places" title="Places List"/>
                    <Header setData={setData}/>
                    <DemoPage data={data} setData={setData}/>
                </div>
            }/>
            <Route path="user-details/:id" element={
                <div className=''>
                    <PageTitle title="Place  Details"/>
                    <HotelDetails />
                </div>
            }/>
            
        </Routes>
    </>
}