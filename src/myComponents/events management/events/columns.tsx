
import { ColumnDef } from "@tanstack/react-table"
import { ActionCell } from "./ActionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
  id: string,
  title: string,
  publishDate: string,
  visibility: string,
  image:string,
} 

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "image",
    header: "IMAGE",
    cell:({row})=>{
      return <div className="">
        <img src={row.getValue('image')} alt="" className="bg-blue-400 w-14 h-14 rounded-xl" />
      </div>
    }
  },
  {
    accessorKey: "title",
    header: "TITLE",
    cell:({row})=>{
      return <div className="font-medium text-[18px] text-gray-700">
        {row.getValue('title')}
      </div>
    }
  },
  {
    accessorKey: "publishDate",
    header: "PUBLISH DATE",
  },
  {
    accessorKey: "visibility",
    header: "VISIBILITY",
    cell:({row})=>{
      const style = row.getValue('visibility')==='visible' ? 'bg-green-100 text-green-500 border-green-300' : 'bg-orange-200 text-orange-500 border-orange-300'
      return <div className={`font-medium ${style}  rounded-xl w-fit p-1 px-2  border`}>
        {row.getValue('visibility')}
      </div>
    }
  },
  {
    header:'',
    id:'action',
    cell:({row})=><ActionCell plan={row}/>
  }
]
