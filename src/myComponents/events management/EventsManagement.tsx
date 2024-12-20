import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import EventDetails from "./events details/EventDetails";
import DemoPage from "./events/EventsList";


export default function EventsManagement(){
    return <>
        <Routes>
            <Route index element={
                <div className=''>
                    <PageTitle subTitle="Share beautifull events and blogs" title="Manage The Events"/>
                    <DemoPage />
                </div>
            }/>
            <Route path="event-details/:id" element={
                <div className=''>
                    <PageTitle title="Event Details"/>
                    <EventDetails />
                </div>
            }/>
            
        </Routes>
    </>
}