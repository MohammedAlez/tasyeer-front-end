import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { colors } from "@/utils/colors";
  


export default function HotelDetails(){


    return <div className="">
        <div className="bg-slate-100 p-8 rounded-2xl ">
            <div  className="flex justify-between ">
                    <div className="flex gap-8  items-start ">
                        <div className="">
                            <div className="flex gap-6 items-center  flex-col">
                                <img src="/src/assets/user.jpg" alt="" className="object-cover w-[170px] h-[200px] rounded-xl bg-red-400" />
                            </div>
                        </div>
                        <div className="">
                            <div className="flex gap-2 items-center  mb-4 ">
                                <div className="min-w-fit font-medium text-gray-500 ">Full Name: </div>
                                <div className="min-w-fit font-medium cursor-pointer  hover:text-blue-700 ">Khaled</div>
                            </div>
                            <div className="flex gap-2 items-center  mb-4 ">
                                <div className="min-w-fit font-medium text-gray-500 ">Email: </div>
                                <div className="min-w-fit font-medium cursor-pointer  hover:text-blue-700 ">khaled@gmail.com</div>
                            </div>
                            <div className="flex gap-2 items-center  mb-4 ">
                                <div className="min-w-fit font-medium text-gray-500 ">Phone: </div>
                                <div className="min-w-fit font-medium cursor-pointer  hover:text-blue-700 ">+2135469878</div>
                            </div>
                            <div className="flex gap-2 items-center  mb-4 ">
                                <div className="min-w-fit font-medium text-gray-500 ">Sbubscription: </div>
                                <div className="min-w-fit font-medium cursor-pointer  hover:text-blue-700 ">University</div>
                            </div>
                            <div className="flex gap-2 items-center  mb-4 ">
                                <div className="min-w-fit font-medium text-gray-500 ">Cart Status: </div>
                                <div className="min-w-fit font-medium cursor-pointer  hover:text-blue-700 ">Activated</div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <BlockButton />
                    </div>
                </div>
        </div>
    </div>
}

const BlockButton=()=>{
    
    return <AlertDialog>
        <AlertDialogTrigger>
            <Button className={`bg-[${colors.main}]`}>Block Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will disactive this account
                and he will not be able to use his cart.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}