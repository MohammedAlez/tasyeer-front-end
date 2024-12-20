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
            <DialogTrigger >Create Event</DialogTrigger>
            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>Create a new event</DialogTitle>
                <div style={{marginBottom:'60px'}} className="flex gap-10 justify-between items-star mb-10">
                    <div className="">
                        {picture 
                        ? <img src={URL.createObjectURL(picture)} alt="" className="min-w-[300px] min-h-[280px] object-contain border rounded-3xl" />
                        :<div className="flex justify-center items-center w-[300px] h-[280px] overflow-hidden border-2 border-dashed rounded-3xl border-gray-400">
                            <label htmlFor="picture">
                                <img src="/src/assets/upload img.png" alt="" className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]" />
                                {/* <img src="/src/assets/upload1.png" alt="" className="absolute hover:hidden cursor-pointer w-[40px] h-[40px]" /> */}
                            </label>
                            <Input 
                                id="picture" type="file" className="hidden"
                                onChange={(e)=>{
                                    if(e.target.files && e?.target?.files?.length>0)
                                        setPicture(e.target.files[0])
                                }}
                            />
                        </div>
                        }
                    </div>
                    <div className="">
                        <div className="flex flex-col gap-2 justify-between mb-4 ">
                            <label htmlFor="name" className="min-w-fit font-medium">Title</label>
                            <Input  id="name" type="text" className="h-fit w-[300px]"/>
                        </div>
                        <div className="flex flex-col gap-2 justify-between mb-4">
                            <label htmlFor="desc" className="min-w-fit font-medium">Description</label>
                            <Textarea id="desc" className="h-fit min-h-[150px] w-[300px]"/>
                        </div>
                        <div className="">
                            <label htmlFor="" className="flex gap-3 items-center font-medium">
                                Visibility 
                                <Switch />
                            </label>
                        </div>
                    </div>
                </div>
                <Button className="mt-10 block">Create</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      </Button>
    </div>
}