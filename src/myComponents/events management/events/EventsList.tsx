import { useEffect, useState } from "react"
import { Event, columns } from "./columns"
import { DataTable } from "./Table"
import Header from "../Header"

function getData():Event[]{
  return [
    {
      id: 'fjkdsl',
      title: 'Ramadan Tombola',
      publishDate: "14-05-2024",
      visibility: 'hidden',
      image:'/src/assets/tombola.jpg',
    },
    {
      id: 'fjkdsl',
      title: 'Ramadan Karim',
      publishDate: "14-05-2024",
      visibility: 'visible',
      image:'/src/assets/ramadan.jpg',
    },
    {
      id: 'fjkdsl',
      title: 'Independece Day',
      publishDate: "05-07-2024",
      visibility: 'visible',
      image:'/src/assets/independence.jpg',
    },
  ]
}

export default function DemoPage() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<Event[]>([])
    useEffect(()=>{
        const data1 = getData()
        setData(data1)
    },[])

  return (
    <div className="container mx-auto py-10">
      <Header />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
