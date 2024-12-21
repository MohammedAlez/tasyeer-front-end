
import SideBar from "./myComponents/Sidebar/SideBar"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import UserManagement from "./myComponents/admins-management/AdminManagment"
import SubscriptionsManagement from "./myComponents/subscriptions management/SubscriptionsManagement"
import { Login } from "./myComponents/auth/Login"
// import DashBoard from "./myComponents/Dashboard/index.tsx"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ActivityManagement from "./myComponents/activity-management/ActivityManagment"
import HotelManagement from "./myComponents/hotel-management/HostelManagment"
import HostelManagement from "./myComponents/hostel-management/HostelManagment"
import TrasnportManagement from "./myComponents/trasnport-management/TransportManagment"
import PlaceManagement from "./myComponents/Places-management/PlaceManagment"
import { Button } from "@mui/material"
import EventsManagement from "./myComponents/events management/EventsManagement"
import Cookies from "js-cookie";


const isAuthenticated = () => {
  var result = Cookies.get('jwt') !== undefined;
  console.log(result);
  return result;
};

const isAuthorized = (role: string) => {
  var result = Cookies.get('role');

  return result === role;
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: {children: React.ReactElement}) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const ProtectedAuthorizedRoute = ({ children,role }: {children: React.ReactElement,role: string}) => {
  return isAuthorized(role) ? children : <Unauthorized/>;
};
function Unauthorized(){
  return <>Unauthorized</>;
}


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="app" element={
            <div className='flex'>
              <SideBar />
              <div className="flex-1 p-6">
                <Outlet />
              </div>
            </div>}>
            {/* <Route path="dashboard" element={<DashBoard />}/> */}
            <Route path="hotels-management/*" element={
              <ProtectedRoute>
                <ProtectedAuthorizedRoute role="Super-Admin">
                  <HotelManagement />
                </ProtectedAuthorizedRoute>
              </ProtectedRoute>
            }/>
            <Route path="admins-management/*" element={
              <ProtectedRoute>
                <ProtectedAuthorizedRoute role="Super-Admin">
                <UserManagement />
                </ProtectedAuthorizedRoute>
              </ProtectedRoute>
            }/>
            <Route path="hostels-management/*" element={
              <ProtectedRoute>
                <ProtectedAuthorizedRoute role="Super-Admin">
                  <HostelManagement />
                </ProtectedAuthorizedRoute>
              </ProtectedRoute>
          }/>
            <Route path="trasnport-management/*" element={
              <ProtectedRoute>
                <ProtectedAuthorizedRoute role="Super-Admin">
                <TrasnportManagement />
                </ProtectedAuthorizedRoute>
              </ProtectedRoute>
          }/>
            <Route path="places-management/*" element={
              <ProtectedRoute>
                <ProtectedAuthorizedRoute role="Super-Admin">
                  <PlaceManagement />
                </ProtectedAuthorizedRoute>
              </ProtectedRoute>
            }
            />
            <Route path="demands-management" element={
            <Button>Hello2</Button>
          }/>
            <Route path="activities-management" element={
              <ProtectedRoute>
                <ProtectedAuthorizedRoute role="Super-Admin">
                  <ActivityManagement />
                </ProtectedAuthorizedRoute>
              </ProtectedRoute>
          }/>
            <Route path="subscriptions-management" element={<SubscriptionsManagement />}/>
            <Route path="events-management" element={<EventsManagement />}/>
          </Route>
          <Route path='/auth/login' element={<Login />} />
          <Route path='*' element={<Navigate to='auth/login'/>} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
