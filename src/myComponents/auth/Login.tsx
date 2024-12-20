import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { colors } from "@/utils/colors";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();

  // Formik Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Form Values: ", values);
    // Later: Add auth fetch logic
    navigate("/app/admins-management");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-xl border p-3 mt-28">
        <h1 className={`text-3xl text-[${colors.main}] text-center my-5 mb-6 font-bold `}>Login</h1>
        <h3 className="text-2xl font-medium text-gray-600 mb-10 text-center">Welcome back 👋</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid w-full max-w-sms items-center font-medium gap-1.5 mb-2">
                <label htmlFor="email" className="ml-1">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-[500px]"
                  as={Input}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm ml-1" />
              </div>

              <div className="grid w-full max-w-sm items-center font-medium gap-1.5 mb-2">
                <label htmlFor="password" className="ml-1">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-[500px]"
                  as={Input}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm ml-1" />
              </div>

              <Button type="submit" className="w-full my-4 mb-6" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
