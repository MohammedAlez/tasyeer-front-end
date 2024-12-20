
import { ColumnDef } from "@tanstack/react-table"
import { ActionCell } from "./ActionCell"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Plan = {
  id: string,
  name:string,
  price:number,
  img:string
}

export const columns: ColumnDef<Plan>[] = [
  {
    accessorKey: "img",
    header:"IMAGE",
    cell:({row})=>{
      return <img src={`${row.getValue('img')}`} alt="" className="rounded-full object-cover bg-red-300 w-12 h-12"  />
    }
  },
  {
    accessorKey: "name",
    header: "PLAN",
    cell:({row})=>{
      return <div className='font-medium'>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell:({row})=>{
      return <div className="text-green-600 font-medium">
        {row.getValue('price')+",00 DZ"}
      </div>
    }
  },
  {
    accessorKey: "d",
    header: ()=>{
      return <div className="text-center">Action</div>
    },
    cell:({row})=><ActionCell  plan={row}/>
  },
]
