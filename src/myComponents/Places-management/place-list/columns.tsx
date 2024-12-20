
import { ColumnDef } from "@tanstack/react-table"
import { ActionCell } from "./ActionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Place = {
  id: string
  title: string
  image: string
  location: string
  category: string
}

export const columns: ColumnDef<Place>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "picture",
    header: "IMAGE",
    cell:({row})=>{
      const SERVER_URL = import.meta.env.VITE_SERVER_URL
      console.log(SERVER_URL + row.getValue('picture')?.url)
      return <div>
        <img src={SERVER_URL + row.getValue('picture')?.url} alt="" className="object-cover w-10 h-10 rounded-xl" />
      </div>
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "place",
    header: "Place",
  },
  {
    header:'Action',
    cell:()=><ActionCell />
  }
]
