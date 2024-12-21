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
import { Place } from "./place-list/columns";
import { API_URL, SERVER_URL } from "@/utils";
import Cookies from "js-cookie";

export default function Header({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<Place[]>>;
}) {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [picture, setPicture] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState(false)


    const handleCreate = async () => {
        if (!name || !location || !picture) {
            alert("All fields are required.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name, place: location }));
        formData.append("files.picture", picture);



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
                    place:location,
                    picture: uploadedFile[0].id,
                },
            };

            const res = await fetch(`${API_URL}/api/toristic-places`, {
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

            const newPlace = await res.json();
            setData((prev) => [...prev, { ...newPlace.data, picture: { url: uploadedFile[0].url } }]);

            // Reset form fields
            setName("");
            setLocation("");
            setPicture(null);
            setSuccess(true)
        } catch (error) {
            console.error("Error creating hostel:", error);
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-end mb-6">
            <Button className={`text-green font-medium dbg-[${colors.main}] text-white py-0  flex  rounded-lg  px-3`}>
                <Dialog>
                    <DialogTrigger>Add New</DialogTrigger>
                    <DialogContent className="min-w-fit">
                        <DialogHeader>
                            {success 
                                ?
                                    <div className="text-2xl font-bold">
                                        <img src="/icons/success.png" alt="" className="w-20 mx-auto" />
                                        <h1 className="font-bold text-3xl text-green-600 text-center my-4">Success!</h1>
                                        <p className="text-center text-lg text-gray-600">The entry created successfully</p>
                                        <Button onClick={()=>setSuccess(false)} className="mx-auto block mt-6 bg-green-600 hover:bg-green-500">Create new</Button>
                                    </div>
                                :
                                <>
                                    <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>
                                        Add a new place
                                    </DialogTitle>
                                    <div
                                        style={{ marginBottom: "60px" }}
                                        className="flex gap-10 justify-between items-start mb-10"
                                    >
                                        <div>
                                            {picture ? (
                                                <img
                                                    src={URL.createObjectURL(picture)}
                                                    alt=""
                                                    className="min-w-[300px] min-h-[280px] object-contain border rounded-3xl"
                                                />
                                            ) : (
                                                <div className="flex justify-center items-center w-[300px] h-[280px] overflow-hidden border-2 border-dashed rounded-3xl border-gray-400">
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
                                                            if (e.target.files && e.target.files.length > 0)
                                                                setPicture(e.target.files[0]);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex flex-col gap-2 justify-between mb-4">
                                                <label htmlFor="name" className="min-w-fit font-medium">
                                                    Title
                                                </label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="h-fit w-[300px]"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 justify-between mb-4">
                                                <label htmlFor="location" className="min-w-fit font-medium">
                                                    Location
                                                </label>
                                                <Input
                                                    id="location"
                                                    className="h-fit w-[300px]"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="mt-10 block w-full"
                                        onClick={handleCreate}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Create"}
                                    </Button>
                                </>
                            }
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Button>
        </div>
    );
}
