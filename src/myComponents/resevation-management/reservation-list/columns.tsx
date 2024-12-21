
import { ColumnDef } from "@tanstack/react-table"
import { ActionCell } from "./ActionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Reservation = {
  user:string
  date:string, 
  auberge:string
}

export const columns: ColumnDef<Reservation>[] = [
  
  {
    accessorKey: "user",
    header: "Client name",
    // cell:({row})=>{
    //   const date:string = row.getValue("date")
    //   return <div>sadf</div>
    // }
  },
  {
    accessorKey: "date",
    header: "Start Date",
    // cell:({row})=>{
    //   const date:string = row.getValue("date")
    //   return <div>{date.substring(0,10)}</div>
    // }
  },
  {
    accessorKey: "auberge",
    header: "Hostle",
    cell:({row})=>{
      const date:string = row.getValue("auberge")
      return <div>some auberge</div>
    }
  },
  // {
  //   accessorKey: "cartStatus",
  //   header: "Cart Status",
  //   cell:({row})=>{
  //     const status = row.getValue('cartStatus')
  //     const style = status==='Activated' ? 
  //           'bg-green-100 text-green-500 border-green-300' :
  //           status==='Disactivated' 
  //           ? 'bg-orange-200 text-orange-500 border-orange-300'
  //           : 'bg-red-200 text-red-500 border-red-300'
  //     return <div className={`font-medium ${style}  rounded-xl w-fit p-1 px-2  border`}>
  //       {row.getValue('cartStatus')}
  //     </div>
  //   }
  // },
  // {
  //   header:'Action',
  //   cell:()=><ActionCell />
  // }
]
