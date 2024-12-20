import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SideBarLink({to,title,icon}:{to:string,title:string,icon:any}){

    const path = window.location.pathname
    console.log(path)
    console.log(to)
    const classStyle= ' flex items-center gap-3  p-2 px-3 transition w-full rounded-md'
    return <NavLink to={to} 
        className={({ isActive })=> 
            isActive ? `text-white bg-[#091f47] `+ classStyle
            : `text-[#091f47] hover:bg-gray-200 `+ classStyle
        }
        
        >
            {icon}
            <span 
                className={` font-medium py-1 `}
            >{title}</span>
    </NavLink>
    
}