import { Button } from "@/components/ui/button"
import { colors } from "@/utils/colors"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Row } from "@tanstack/react-table"
import { Plan } from "./columns"
import { Input } from "@/components/ui/input"

export const ActionCell=({plan}:{plan:Row<Plan>})=>{
    
    
    
    return <Button className={`mx-auto text-green font-medium dbg-[${colors.main}] text-white py-0  flex  rounded-lg  px-3 `}>
          <Dialog>
            <DialogTrigger >Edit</DialogTrigger>
            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>Edit Plan</DialogTitle>
                <div style={{marginBottom:'60px'}} className="flex gap-20 justify-between items-center mb-10">
                    <div className="">
                        <div className="flex gap-6 items-center  flex-col">
                            <img src={plan.getValue('img')} alt="" className="object-cover min-w-[200px] h-[200px] rounded-xl bg-red-400" />
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="picture" className='text-center'>
                                    <Button>Upload</Button>
                                </label>
                                <Input  id="picture" type="file" className="hidden"/>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex gap-10 items-center justify-between mdb-20 ">
                            <label htmlFor="name" className="min-w-fit font-medium">Plan Name</label>
                            <Input value={plan.getValue('name')} id="name" type="text" className="h-fit w-[240px]"/>
                        </div>
                        <div className="flex gap-10 items-center justify-between mt-10">
                            <label htmlFor="price" className="min-w-fit font-medium">Plan Price</label>
                            <Input value={plan.getValue('price')} id="price" type="number" className="h-fit w-[240px]"/>
                        </div>
                    </div>
                </div>
                <Button className="mt-10 block">Save Changes</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      </Button>
}