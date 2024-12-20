// import { useEffect, useState } from "react"
import { Plan, columns } from "./columns"
import { DataTable } from "./Table"

const data:Plan[] = [
  {
    id: "728ed52f",
    name:"University",
    price:600,
    img:'/src/assets/university.jpg'
  },
  {
    id: "728ed52f",
    name:"Senior",
    price:900,
    img:"/src/assets/junior.jpg"
  },
  {
    id: "728ed52f",
    name:"Junior",
    price:800,
    img:"/src/assets/senior.jpg"
  },
  {
    id: "728ed52f",
    name:"Classic",
    price:900,
    img:"/src/assets/classic.jpg"
  },
  {
    id: "728ed52f",
    name:"School",
    price:300,
    img:"/src/assets/school.jpg"
  },
  {
    id: "728ed52f",
    name:"Weekly",
    price:240,
    img:"/src/assets/weekly.jpg"
  },
  
]

export default function SupscriptionsList() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const [data, setData] = useState<Plan[]>([])
    // useEffect(()=>{
    //   async function getData(){
    //     try{
    //       fetch('./data.json').then((res)=>res.json()).then((data)=>{
    //         console.log(data)
    //       })
    //       // const data1 = await res.json();
    //       // console.log(res.body);
    //       // setData(data1);
    //     }catch{
    //       console.log('heeello')
    //     }finally{
    //       console.log('hello')

    //     }
    //   }

    //   getData()
    // },[])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
