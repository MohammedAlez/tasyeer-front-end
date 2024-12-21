import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/utils/colors";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Activity } from "./activities-list/columns";
import { useState } from "react";

export default function Header({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<Activity[]>>;
}) {
  const initialValues = {
    name: "",
    type: "",
    duration: "",
    place: "",
    startTime: "",
  };

  const [success, setSuccess] = useState(false)
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    duration: Yup.string().required("Duration is required"),
    place: Yup.string().required("Place is required"),
    startTime: Yup.string().required("Start Time is required"),
  });

  const addActivity = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const { name, type, duration, place, startTime } = values;

      const API_URL = import.meta.env.VITE_API_URL;
      const token = import.meta.env.VITE_API_TOKEN;

      const payload = {
        data: {
          name,
          type,
          duration,
          place,
          startTime,
        },
      };

      console.log("Request Payload:", payload);

      const res = await fetch(`${API_URL}/api/activities`, {
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
        throw new Error("Failed to create activity");
      }

      const newActivity = await res.json();
      setData((prev) => [...prev, newActivity.data]);
      resetForm();
      setSuccess(true)
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <div className="flex justify-end mb-6">
      <Button className={`text-green font-medium dbg-[${colors.main}] text-white py-0 flex rounded-lg px-3`}>
        <Dialog>
          <DialogTrigger>Add</DialogTrigger>
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
                      <DialogTitle className={`text-[${colors.main}] mb-14 text-3xl`}>Add New Activity</DialogTitle>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={addActivity}
                      >
                        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
                          <Form>
                            <div className="flex gap-10 justify-between items-start mb-10">
                              <div className="w-full">
                                <div className="flex flex-col gap-2 justify-between mb-4">
                                  <label htmlFor="name" className="font-medium">
                                    Name
                                  </label>
                                  <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    as={Input}
                                    className="w-full"
                                  />
                                  {errors.name && touched.name && (
                                    <div className="text-red-500 text-sm">{errors.name}</div>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <div className="flex-1 flex flex-col gap-2 justify-between mb-4">
                                    <label htmlFor="type" className="font-medium">
                                      Type
                                    </label>
                                    <Select
                                      onValueChange={(value) => setFieldValue("type", value)}
                                      value={values.type}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                      <SelectContent className="w-full">
                                        <SelectItem value="Scientifique">Scientifique</SelectItem>
                                        <SelectItem value="Sportif">Sportif</SelectItem>
                                        <SelectItem value="Culturel">Culturel</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    {errors.type && touched.type && (
                                      <div className="text-red-500 text-sm">{errors.type}</div>
                                    )}
                                  </div>
                                  <div className="flex-1 flex flex-col gap-2 justify-between mb-4">
                                    <label htmlFor="duration" className="font-medium">
                                      Duration
                                    </label>
                                    <Field
                                      id="duration"
                                      name="duration"
                                      type="text"
                                      as={Input}
                                      className="w-full"
                                    />
                                    {errors.duration && touched.duration && (
                                      <div className="text-red-500 text-sm">{errors.duration}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 justify-between mb-4">
                                  <label htmlFor="place" className="font-medium">
                                    Place
                                  </label>
                                  <Field
                                    id="place"
                                    name="place"
                                    type="text"
                                    as={Input}
                                    className="w-full"
                                  />
                                  {errors.place && touched.place && (
                                    <div className="text-red-500 text-sm">{errors.place}</div>
                                  )}
                                </div>
                                <div className="flex flex-col gap-2 justify-between mb-4">
                                  <label htmlFor="startTime" className="font-medium">
                                    Start Time
                                  </label>
                                  <Field
                                    id="startTime"
                                    name="startTime"
                                    type="date"
                                    as={Input}
                                    className="w-full"
                                  />
                                  {errors.startTime && touched.startTime && (
                                    <div className="text-red-500 text-sm">{errors.startTime}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button type="submit" className="mt-10 block w-full" disabled={isSubmitting}>
                              {isSubmitting ? "Creating..." : "Create"}
                            </Button>
                          </Form>
                        )}
                      </Formik>    
                  </>
                }
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Button>
    </div>
  );
}
