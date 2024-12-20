import { useEffect, useState } from "react"
import { User, columns } from "./columns"
import { DataTable } from "./Table"

function getData():User[]{
  return [
    {
      id: 'fjkdsl',
      fullName: 'Khaled',
      cartStatus: "Activated",
      email: 'johndeo@gmail.com',
      phone:'+2134564875213',
      subscription:'Classic',
      image:'/src/assets/user.jpg'
    },
    {
      id: 'fjkdsl',
      fullName: 'Samir',
      cartStatus: "Blocked",
      email: 'samir@gmail.com',
      phone:'+213456487895',
      subscription:'Senior',
      image:'/src/assets/use2.jpg'
    },
    {
      id: 'fjkdsl',
      fullName: 'Imad',
      cartStatus: "Disactivated",
      email: 'ima@gmail.com',
      phone:'+213587897789',
      subscription:'Senior',
      image:'/src/assets/user1.jpg'
    },
  ]
}

export default function DemoPage() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<User[]>([])
    useEffect(()=>{
        const data1 = getData()
        setData(data1)
    },[])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
