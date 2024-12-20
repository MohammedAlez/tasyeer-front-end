import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { colors } from "@/utils/colors"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function Header(){

    const [picture, setPicture] = useState<File | null>(null)

    return <div className="flex justify-end mb-6">
        <Button className={`text-green font-medium dbg-[${colors.main}] text-white py-0  flex  rounded-lg  px-3 `}>
          <Dialog>
            <DialogTrigger >Add</DialogTrigger>
            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>Add New Sub-Admin</DialogTitle>
                <div style={{marginBottom:'60px'}} className="flex gap-10 justify-between items-star mb-10">
                    
                    <div className="w-full">
                        <div className="flex flex-col gap-2 justify-between mb-4 ">
                            <label htmlFor="email" className="min-w-fit font-medium">Email</label>
                            <Input  id="email" type="text" className="h-fit w-full"/>
                        </div>
                        <div className="flex flex-col gap-2 justify-between mb-4 ">
                            <label htmlFor="password" className="min-w-fit font-medium">Password</label>
                            <Input  id="name" type="text" className="h-fit w-full"/>
                        </div>
                        <div className="flex flex-col gap-2 justify-between mb-4 ">
                            <label htmlFor="confirm-password" className="min-w-fit font-medium">Confirm Password</label>
                            <Input  id="confirm-name" type="text" className="h-fit w-full"/>
                        </div>
                        {/* <div className="">
                            <label htmlFor="" className="flex gap-3 items-center font-medium">
                                Visibility 
                                <Switch />
                            </label>
                        </div> */}
                    </div>
                </div>
                <Button className="mt-10 block">Create</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      </Button>
    </div>
}