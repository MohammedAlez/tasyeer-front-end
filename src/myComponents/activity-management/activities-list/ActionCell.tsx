import { Button } from "@/components/ui/button"
import { colors } from "@/utils/colors"
// import { Row } from "@tanstack/react-table"
// import { User } from "./columns"
import { Link } from "react-router-dom"

// type Props ={
//     user?:Row<User>
// }
export function ActionCell(){
    return <Link to='/app/users-management/user-details/:id' >
        <Button className={`text-green font-medium dbg-[${colors.main}] text-white py-0  flex  rounded-lg  px-3 `}>
            View
        </Button>
    </Link>
}