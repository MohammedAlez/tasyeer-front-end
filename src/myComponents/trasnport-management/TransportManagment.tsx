import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import HotelDetails from "./trasnport-details/TrasnportDetails";
import DemoPage from "./trasnport-list/trasnportList";
import Header from "./Header";
import { Transport } from "./trasnport-list/columns";
import { useState } from "react";


export default function TransportManagement(){

    const [data, setData] = useState<Transport[]>([]);

    return <>
        <Routes>
            <Route index element={
                <div className=''>
                    <PageTitle subTitle="manage Trasnports" title="Transport List"/>
                    <Header setData={setData}/>
                    <DemoPage data={data} setData={setData}/>
                </div>
            }/>
            <Route path="user-details/:id" element={
                <div className=''>
                    <PageTitle title="User Details"/>
                    <HotelDetails />
                </div>
            }/>
            
        </Routes>
    </>
}