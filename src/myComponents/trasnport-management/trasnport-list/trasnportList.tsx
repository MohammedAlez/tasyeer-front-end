import { useEffect, useState } from "react";
import { Transport, columns } from "./columns";
import { DataTable } from "./Table";

export default function DemoPage({data, setData}:{data:Transport[], setData:React.Dispatch<React.SetStateAction<Transport[]>>}) {
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(API_URL + `/api/transports`, {
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
