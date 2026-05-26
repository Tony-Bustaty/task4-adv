import { useState } from "react";
import Form from "../../components/Form/Form";
import type { Input, SignUpPayload } from "../../types/interfaces";
import "./Register.css";
import { authService } from "../../api/services/auth.service";
import { useNavigate } from "react-router";
function Register() {
  const inputs: Input[] = [
    { name: "firstName", type: "text", placeholder: "First Name",label:"Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },

    { name: "email", type: "email", placeholder: "Enter your email",label:"Email" },

    { name: "password", type: "password", placeholder: "Enter password",label:"Password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter your password",
    },
    { name: "profileImage", type: "file", accept: "image/*",label:"Profile Image" },
  ];
  const navigate=useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SignUpPayload) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!data.profileImage) {
      setError("Profile image is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const Data = await authService.register(data);
      if(Data.status === 201){

        localStorage.setItem("auth_token",Data.data.token);
         localStorage.setItem("user",JSON.stringify(Data.data.user));
         navigate("/items?page=1")
      }
      else{
        throw new Error("Something went wrong")
      }
     
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };
 return (
    <div className="register">
      <Form<SignUpPayload>
        submit="sign up"
        onSubmit={handleSubmit}
        title="Sign Up"
        inputs={inputs}
        description="Fill in the following fields to create an account."
        secondaryLink={{to:"/login",label:"Sign in",text:"Do you have an account? "}}
        isLoading={isSubmitting}
      >
      
      </Form>
    </div>
  );
}

export default Register;
