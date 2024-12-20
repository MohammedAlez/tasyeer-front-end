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
import { Bus, TrainFront } from "lucide-react";
import { Transport } from "./trasnport-list/columns";
import { SERVER_URL } from "@/utils";

export default function Header({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<Transport[]>>;
}) {
    const [transportType, setTransportType] = useState<string>("bus");
    const [fromPlace, setFromPlace] = useState<string>("");
    const [toPlace, setToPlace] = useState<string>("");
    const [fromTime, setFromTime] = useState<string>("");
    const [toTime, setToTime] = useState<string>("");

    const handleCreate = async () => {
        const payload = {
            data: {
                fromPlace,
                toPlace,
                fromTime,
                toTime,
                type:transportType,
            },
        };

        try {
            const token = import.meta.env.VITE_API_TOKEN;
            console.log(payload)
            const response = await fetch(SERVER_URL+"/api/transports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const createdTransport = await response.json();
                setData((prev) => [...prev, createdTransport.data]);

                // Reset form fields after successful creation
                setFromPlace("");
                setToPlace("");
                setFromTime("");
                setToTime("");
                setTransportType("bus");
            } else {
                console.error("Failed to create transport.");
            }
        } catch (error) {
            console.error("An error occurred while creating transport:", error);
        }
    };

    return (
        <div className="flex justify-end mb-6">
            <Button
                className={`text-green font-medium dbg-[${colors.main}] text-white py-0 flex rounded-lg px-3`}
            >
                <Dialog>
                    <DialogTrigger>Add</DialogTrigger>
                    <DialogContent className="min-w-fit">
                        <DialogHeader>
                            <DialogTitle
                                className={`text-[${colors.main}] mb-14 text-3xl`}
                            >
                                Add New Transport
                            </DialogTitle>
                            <div
                                style={{ marginBottom: "60px" }}
                                className="flex gap-10 justify-between items-start mb-10"
                            >
                                <div className="w-full">
                                    <div className="flex flex-col gap-2 justify-between mb-4 min-w-[300px]">
                                        <label htmlFor="fromPlace" className="min-w-fit font-medium">
                                            From Place
                                        </label>
                                        <Input
                                            id="fromPlace"
                                            value={fromPlace}
                                            onChange={(e) => setFromPlace(e.target.value)}
                                            type="text"
                                            className="h-fit w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between mb-4 min-w-[300px]">
                                        <label htmlFor="toPlace" className="min-w-fit font-medium">
                                            To Place
                                        </label>
                                        <Input
                                            id="toPlace"
                                            value={toPlace}
                                            onChange={(e) => setToPlace(e.target.value)}
                                            type="text"
                                            className="h-fit w-full"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-2 justify-between mb-4 min-w-[300px]">
                                            <label htmlFor="fromTime" className="min-w-fit font-medium">
                                                From Time
                                            </label>
                                            <Input
                                                id="fromTime"
                                                value={fromTime}
                                                onChange={(e) => setFromTime(e.target.value)}
                                                type="time"
                                                className="h-fit w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 justify-between mb-4 min-w-[300px]">
                                            <label htmlFor="toTime" className="min-w-fit font-medium">
                                                To Time
                                            </label>
                                            <Input
                                                id="toTime"
                                                value={toTime}
                                                onChange={(e) => setToTime(e.target.value)}
                                                type="time"
                                                className="h-fit w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between mb-4 min-w-[300px]">
                                        <label className="min-w-fit font-medium">Type</label>
                                        <div className="flex gap-2">
                                            <div
                                                onClick={() => setTransportType("bus")}
                                                className={`cursor-pointer ${
                                                    transportType === "bus"
                                                        ? "border-blue-500 outline-blue-500 outline-3"
                                                        : "outline-none"
                                                } rounded-xl flex-1 border flex gap-2 justify-center p-4`}
                                            >
                                                <Bus />
                                                <span className="text-lg">Bus</span>
                                            </div>
                                            <div
                                                onClick={() => setTransportType("train")}
                                                className={`cursor-pointer ${
                                                    transportType === "train"
                                                        ? "border-blue-500 outline-blue-500 outline-3"
                                                        : "outline-none"
                                                } rounded-xl flex-1 border flex gap-2 justify-center p-4`}
                                            >
                                                <TrainFront />
                                                <span className="text-lg">Train</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={handleCreate} className="mt-10 block">
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Button>
        </div>
    );
}
