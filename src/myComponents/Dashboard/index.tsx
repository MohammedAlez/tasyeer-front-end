import { useState } from "react";
import PageTitle from "../general/PageTitle";
import { Check, OctagonX } from "lucide-react";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";



export default function DashBoard(){
    const [tramwayStatus, setTramwayStatus] = useState<'available'|'stopped'>('available');

    return <div className="">
        
        <div className="bg-slate-100 p-6 rounded-3xl">
            <PageTitle title="DashBoard" />
            {/* Daily statics */}
            <h1 className="text-2xl mb-8 font-medium">Today Statics</h1>
            <div className="flex gap-10 mb-8">
                {/* Purchsed Tickets */}
                <div className="p-4 rounded-3xl bg-[#3f51b5] flex-1 flex gap-6 items-center">
                    <div className="flex flex-col justify-between h-full py-4">
                        <span className="text-white text-s font-medium mb-2 block ">Purchsed Tickets</span>
                        <h1 className="font-medium text-4xl text-white ">1200 </h1>
                    </div>
                    <img src="/src/assets/ticket img.png" alt="" className="w-[100px]" />
                </div>
                <div className="p-4 rounded-3xl bg-[#9c27b0] flex-1 flex gap-6 items-center">
                    <div className="flex flex-col justify-between h-full py-4">
                        <span className="text-white text-s font-medium mb-2 block">Validated Tickets</span>
                        <h1 className="font-medium text-4xl text-white ">900 </h1>
                    </div>
                    <img src="/src/assets/ticket img2.png" alt="" className="w-[100px]" />
                </div>
                <div className="p-4 rounded-3xl bg-[#10052b] flex-1 flex gap-10 items-center">
                    <div className="flex flex-col justify-between h-full py-4">
                        <span className="text-white text-s font-medium mb-2 block">Revnues </span>
                        <h1 className="font-medium text-xl text-white ">DA12500,00 </h1>
                    </div>
                    <img src="/src/assets/investment.png" alt="" className="w-[100px]" />
                </div>
                
            </div>
            <div className="flex gap-10">
                {/* status */}
                <div className="flex-1">
                    <h1 className="text-2xl mb-8 font-medium">Tramway Status</h1>
                    <div className="flex flex-col gap-6 items-center mb-8">
                        <div className="flex-1 w-full">
                            <div onClick={()=>setTramwayStatus('available')} className={`flex gap-3 justify-center cursor-pointer rounded-xl font-medium p-3 bg-green-100 ${tramwayStatus==='available' ? 'border-4 ' : 'border'} border-green-200 text-green-600`}>
                                <Check />
                                Services Available
                            </div>
                            
                        </div>
                        <div className="flex-1 w-full">
                            <div onClick={()=>setTramwayStatus('stopped')} className={`flex gap-3 justify-center cursor-pointer rounded-xl p-3 font-medium bg-red-100 ${tramwayStatus==='stopped' ? 'border-4 ' : 'border'}  border-red-200 text-red-600`}>
                                <OctagonX />
                                Services Stopped
                            </div>
                            
                        </div>
                    </div>   
                </div>
                {/* timing */}
                <div className="flex-1">
                    <h1 className="text-2xl mb-8 font-medium">Working Time</h1>
                    <div className="flex flex-col gap-6">
                        {/* starting */}
                        <TimePicker
                            className="w-full"
                            label="Starting at"
                            defaultValue={dayjs('2022-04-17T15:30')}
                        />
                        {/* starting */}
                        <TimePicker
                            className="w-full"
                            label="End at"
                            defaultValue={dayjs('2022-04-17T15:30')}
                        />
                    </div>
                </div>
            </div>
            
             
        </div>
    </div>
}