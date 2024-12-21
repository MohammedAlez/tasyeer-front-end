import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { colors } from "@/utils/colors";

interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    documentId: string;
    username: string;
    role: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    BirthDay: string | null;
    BirthPlace: string | null;
    sex: string | null;
    IdentityCardNumber: string | null;
  };
}

async function loginAndSetCookie(
  identifier: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data: LoginResponse = await response.json();

    if (!data.jwt) {
      return false;
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);

    document.cookie = `jwt=${data.jwt}; expires=${expirationDate.toUTCString()}; path=/; secure;`;
    document.cookie = `role=${data.user.role}; expires=${expirationDate.toUTCString()}; path=/; secure;`;
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export const Login = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    try {
      const success = await loginAndSetCookie(values.email, values.password);

      if (success) {
        setToastMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/app/admins-management");
        }, 2000);
      } else {
        setToastMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setToastMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-xl border p-3 mt-28">
        <h1 className={`text-3xl text-[${colors.main}] text-center my-5 mb-6 font-bold`}>Login</h1>
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

        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};
