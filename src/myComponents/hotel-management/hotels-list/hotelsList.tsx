import { useEffect, useState } from "react"
import { Hotel, columns } from "./columns"
import { DataTable } from "./Table"

export default function DemoPage({data, setData}:{data:Hotel[], setData:React.Dispatch<React.SetStateAction<Hotel[]>>}) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
    getHotels();
  }, []);

    const getHotels = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(API_URL + `/api/hotels?populate=*`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`, 
        },
        mode: 'no-cors',

      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();
      // console.log(result)
      console.log(result.data)
      setData(result.data)
      // setData(result);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(data)
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
