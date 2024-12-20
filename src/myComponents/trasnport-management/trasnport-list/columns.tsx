
import { ColumnDef } from "@tanstack/react-table"
import { ActionCell } from "./ActionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transport = {
  id: string
  type:string
  fromTime:string  
  toTime:string
  fromPlace:string
  toPlace:string
}

export const columns: ColumnDef<Transport>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell:({row})=>{
      const type = row.getValue('type')
      return <div>
        <h1 className={`font-medium text-center p-1 w-fit px-2 rounded-xl text-gray-600 border ${type=='train' ? 'border-green-600 bg-green-100 text-green-600 font-medium' : 'border-blue-600 bg-blue-100 text-blue-600 font-medium'}`}>{row.getValue('type')}</h1>
      </div>
    }
  },
  {
    accessorKey: "fromPlace",
    header: "Start Location",
  },
  {
    accessorKey: "toPlace",
    header: "Arrival Location",
  },
  {
    accessorKey: "fromTime",
    header: "Start Time",
  },
  {
    accessorKey: "toTime",
    header: "End Time",
  },
  {
    header:'Action',
    cell:()=><ActionCell />
  }
]
