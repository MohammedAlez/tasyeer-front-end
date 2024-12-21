import { CalendarFold, Users, NotepadText, Grid2x2Check, SquareActivity, BedDouble, Hotel, CarTaxiFront, Pyramid, BookUser } from "lucide-react";
import SideBarLink from "./SideBarLink";
import Cookies from "js-cookie";

const isAuthorized = (role: string) => {
  var result = Cookies.get('role');
    console.log("++++++++" + result === role);
  return result === role;
};

export default function SideBarLinks(){
    
    return <div className="flex flex-col gap-2">
        {/* <SideBarLink to='/app/dashboard' title="DashBoard" icon={<Grid2x2Check size={'20'}/>}/> */}
        {isAuthorized("Super-Admin") && <SideBarLink to='/app/admins-management' title="Admins Management" icon={<Users size={'20'}/>}/>}
        {isAuthorized("Super-Admin") && <SideBarLink to='/app/activities-management' title="Activities Management" icon={<SquareActivity size={'20'}/>}/>}
        {isAuthorized("Super-Admin") && <SideBarLink to='/app/hotels-management' title="hotels Management" icon={<Hotel size={'20'}/>}/>}
        {isAuthorized("Super-Admin") && <SideBarLink to='/app/hostels-management' title="hostels Management" icon={<BedDouble size={'20'}/>}/>}
        {isAuthorized("Super-Admin") && <SideBarLink to='/app/trasnport-management' title="Transport Management" icon={<CarTaxiFront size={'20'}/>}/>}
        {isAuthorized("Super-Admin") && <SideBarLink to='/app/places-management' title="Places Management" icon={<Pyramid size={'20'}/>}/>}
        {/* <SideBarLink to='/app/demands-management' title="Demands Management" icon={<BookUser size={20} />}/>
        <SideBarLink to='/app/events-management' title="Events Management" icon={<CalendarFold size={20}/>}/>
        <SideBarLink to='/app/subscriptions-management' title="Subscriptions Management" icon={<NotepadText size={20} />}/> */}
        
    </div>
}