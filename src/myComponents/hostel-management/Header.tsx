import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { colors } from "@/utils/colors";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Auberge } from "./hostel-list/columns";

export default function Header({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<Auberge[]>>;
}) {
    const [picture, setPicture] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [capacity, setCapacity] = useState<number | "">("");

    const addHostel = async () => {
        try {
            if (!picture) {
                alert("Please upload a picture");
                return;
            }

            const API_URL = import.meta.env.VITE_API_URL;
            const token = import.meta.env.VITE_API_TOKEN;

            // Prepare the picture file for upload
            const formData = new FormData();
            formData.append("files", picture);

            const uploadResponse = await fetch(`${API_URL}/api/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload picture");
            }

            const uploadedFile = await uploadResponse.json();

            // Use the uploaded picture ID for the hostel entry
            const payload = {
                data: {
                    name,
                    place,
                    price,
                    capacity,
                    picture: uploadedFile[0].id,
                },
            };

            const res = await fetch(`${API_URL}/api/auberges`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Failed to create hostel");
            }

            const newHostel = await res.json();
            setData((prev) => [...prev, { ...newHostel.data, picture: { url: uploadedFile[0].url } }]);

            // Reset form fields
            setName("");
            setPlace("");
            setPrice("");
            setCapacity("");
            setPicture(null);
        } catch (error) {
            console.error("Error creating hostel:", error);
        }
    };

    return (
        <div className="flex justify-end mb-6">
            <Button className={`text-green font-medium dbg-[${colors.main}] text-white py-0  flex  rounded-lg  px-3 `}>
                <Dialog>
                    <DialogTrigger>Add</DialogTrigger>
                    <DialogContent className="min-w-fit">
                        <DialogHeader>
                            <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>
                                Add New Auberge
                            </DialogTitle>
                            <div
                                style={{ marginBottom: "60px" }}
                                className="flex gap-10 justify-between items-star mb-10"
                            >
                                <div className="">
                                    {picture ? (
                                        <img
                                            src={URL.createObjectURL(picture)}
                                            alt=""
                                            className="min-w-[300px] min-h-[280px] object-contain border rounded-3xl"
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center w-[330px] h-[330px] overflow-hidden border-2 border-dashed rounded-3xl border-gray-400">
                                            <label htmlFor="picture">
                                                <img
                                                    src="/src/assets/upload img.png"
                                                    alt=""
                                                    className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]"
                                                />
                                            </label>
                                            <Input
                                                id="picture"
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        setPicture(e.target.files[0]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-col gap-2 justify-between mb-4 ">
                                        <label htmlFor="Name" className="min-w-fit font-medium">
                                            Name
                                        </label>
                                        <Input
                                            id="Name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-fit w-[300px]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between mb-4 ">
                                        <label htmlFor="Place" className="min-w-fit font-medium">
                                            Place
                                        </label>
                                        <Input
                                            id="Place"
                                            type="text"
                                            value={place}
                                            onChange={(e) => setPlace(e.target.value)}
                                            className="h-fit w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between mb-4 ">
                                        <label htmlFor="Price" className="min-w-fit font-medium">
                                            Price
                                        </label>
                                        <Input
                                            id="Price"
                                            type="number"
                                            min={0}
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            className="h-fit w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between">
                                        <label htmlFor="Capacity" className="min-w-fit font-medium">
                                            Capacity
                                        </label>
                                        <Input
                                            id="Capacity"
                                            type="number"
                                            min={0}
                                            value={capacity}
                                            onChange={(e) => setCapacity(Number(e.target.value))}
                                            className="h-fit w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button className="mt-10 block" onClick={addHostel}>
                                Create
                            </Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Button>
        </div>
    );
}
