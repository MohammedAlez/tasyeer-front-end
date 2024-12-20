import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import Header from "./Header";
import HotelDetails from "./hostel-details/HostelDetails";
import { Auberge } from "./hostel-list/columns";
import DemoPage from "./hostel-list/hostelsList";


export default function HostelManagement(){

    const [data, setData] = useState<Auberge[]>([]);

    return <>
        <Routes>
            <Route index element={
                <div>
                    <PageTitle subTitle="manage Auberges" title="Auberges List"/>
                    <Header setData={setData} />
                    <DemoPage data={data} setData={setData} />
                </div>
            }/>
            <Route path="user-details/:id" element={
                <div>
                    <PageTitle title="User Details"/>
                    <HotelDetails />
                </div>
            }/>
        </Routes>
    </>
}