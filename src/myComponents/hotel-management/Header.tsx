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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Hotel } from "./hotels-list/columns";

export default function Header({ setData }: { setData: React.Dispatch<React.SetStateAction<Hotel[]>> }) {
    const [picture, setPicture] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

    
    const initialValues = {
        name: "",
        place: "",
        websiteURL: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        place: Yup.string().required("Place is required"),
        websiteURL: Yup.string()
            .url("Invalid URL format")
            .required("Website URL is required"),
    });

    const addHotel = async (values: typeof initialValues, { resetForm }: any) => {
        try {
            const { name, place, websiteURL } = values;

            if (!picture) {
                alert("Please upload a picture");
                return;
            }

            const API_URL = import.meta.env.VITE_API_URL;
            const token = import.meta.env.VITE_API_TOKEN;

            // Prepare the picture file for upload
            const formData = new FormData();
            formData.append("files", picture);

            // Upload the picture to Strapi
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
            console.log(uploadedFile)

            // Use the uploaded picture ID for the hotel entry
            const payload = {
                data: {
                    name,
                    Place:place,
                    websiteURL,
                    picture: uploadedFile[0].id,
                },
            };
            console.log(payload)
            const res = await fetch(`${API_URL}/api/hotels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("Server Error Response:", error);
                throw new Error("Failed to create hotel");
            }

            const newHotel = await res.json();
            console.log(newHotel)
            setData((prev) => [...prev, {...newHotel.data, picture:{url:uploadedFile[0].url}}]);
            resetForm();
            setPicture(null);
        } catch (error) {
            console.error("Error creating hotel:", error);
        }
    };

    return (
        <div className="flex justify-end mb-6">
            <Button className={`text-green font-medium dbg-[${colors.main}] text-white py-0  flex  rounded-lg  px-3 `}>
                <Dialog>
                    <DialogTrigger>Add</DialogTrigger>
                    <DialogContent className="min-w-fit">
                        <DialogHeader>
                            <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>Add New Hotel</DialogTitle>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={addHotel}
                            >
                                {({ errors, touched, handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div style={{ marginBottom: "60px" }} className="flex gap-10 justify-between items-start mb-10">
                                            <div className="">
                                                {picture ? (
                                                    <img
                                                        src={URL.createObjectURL(picture)}
                                                        alt=""
                                                        className="min-w-[300px] min-h-[280px] object-contain border rounded-3xl"
                                                    />
                                                ) : (
                                                    <div className="flex justify-center items-center w-[240px] h-[240px] overflow-hidden border-2 border-dashed rounded-3xl border-gray-400">
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
                                                    <label htmlFor="name" className="min-w-fit font-medium">
                                                        Name
                                                    </label>
                                                    <Field
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        as={Input}
                                                        className="h-fit w-[300px]"
                                                    />
                                                    {errors.name && touched.name && (
                                                        <div className="text-red-500 text-sm">{errors.name}</div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2 justify-between mb-4 ">
                                                    <label htmlFor="place" className="min-w-fit font-medium">
                                                        Place
                                                    </label>
                                                    <Field
                                                        id="place"
                                                        name="place"
                                                        type="text"
                                                        as={Input}
                                                        className="h-fit w-full"
                                                    />
                                                    {errors.place && touched.place && (
                                                        <div className="text-red-500 text-sm">{errors.place}</div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2 justify-between">
                                                    <label htmlFor="websiteURL" className="min-w-fit font-medium">
                                                        Website URL
                                                    </label>
                                                    <Field
                                                        id="websiteURL"
                                                        name="websiteURL"
                                                        type="text"
                                                        as={Input}
                                                        className="h-fit w-full"
                                                    />
                                                    {errors.websiteURL && touched.websiteURL && (
                                                        <div className="text-red-500 text-sm">{errors.websiteURL}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" className="mt-10 block" disabled={isSubmitting}>
                                            {isSubmitting ? "Creating..." : "Create"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Button>
        </div>
    );
}
