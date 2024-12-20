import { Route, Routes } from "react-router-dom";
import PageTitle from "../general/PageTitle";
import UserDetails from "./admins-details/AdminDetails";
import DemoPage from "./admins-list/AdminsList";
import Header from "./Header";


export default function AdminManagement(){
    return <>
        <Routes>
            <Route index element={
                <div className=''>
                    <PageTitle subTitle="manage Admins" title="Admins List"/>
                    <Header />
                    <DemoPage />
                </div>
            }/>
            <Route path="user-details/:id" element={
                <div className=''>
                    <PageTitle title="User Details"/>
                    <UserDetails />
                </div>
            }/>
            
        </Routes>
    </>
}