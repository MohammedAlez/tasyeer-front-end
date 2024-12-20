import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import ActivityDetails from "./activity-details/activityDetails";
import DemoPage from "./activities-list/activitiesList";
import Header from "./Header";
import { useState } from "react";
import { Activity } from "./activities-list/columns";


export default function ActivityManagement(){

    const [data, setData] = useState<Activity[]>([])

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
                <ActivityDetails />
            </div>
        }/>
        
    </Routes>
        )
}