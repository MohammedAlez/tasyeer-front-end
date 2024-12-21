import { useEffect, useState } from "react";
import { Reservation, columns } from "./columns";
import { DataTable } from "./Table";




const const_data = [
  {
    user:"Mohammed",
    date:"10/01/2024",
    auberge:"boumerdes auberge 1"
  },
  {
    user:"Ahmed",
    date:"15/01/2025",
    auberge:"boumerdes auberge 1"
  },
  {
    user:"Ibrahim",
    date:"25/12/2024",
    auberge:"boumerdes auberge 1"
  },
]
export default function DemoPage({data, setData}:{data:Reservation[], setData:React.Dispatch<React.SetStateAction<Reservation[]>>}) {
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities2 = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;
      
      const res = await fetch(API_URL + `/api/reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`, 
        },

      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();
      // console.log(result)
      setData(result.data)
      // setData(result);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivities=()=>{
    setData(const_data)
  }
  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
