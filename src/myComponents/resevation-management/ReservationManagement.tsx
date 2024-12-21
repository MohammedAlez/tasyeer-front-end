import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import DemoPage from "./reservation-list/activitiesList";
import Header from "./Header";
import { useState } from "react";
import { Reservation } from "./reservation-list/columns";


export default function ReservationManagement(){

    const [data, setData] = useState<Reservation[]>([])

    return (
    <Routes>
        <Route index element={
            <div>
                <PageTitle subTitle="manage Activities" title="Activities List"/>
                <Header setData={setData} />
                <DemoPage data={data} setData={setData}/>
            </div>
        }/>
        <Route path="user-details/:id" element={
            <div>
                <PageTitle title="User Details"/>
                {/* <ActivityDetails /> */}
            </div>
        }/>
        
    </Routes>
        )
}