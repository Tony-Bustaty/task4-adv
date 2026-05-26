import { useState } from "react";
import Form from "../../components/Form/Form";
import type { Input, LoginPayload } from "../../types/interfaces";
import "./Login.css";
import { authService } from "../../api/services/auth.service";
import { useNavigate } from "react-router";

function Login() {
const navigate=useNavigate()
  const inputs: Input[] = [
    { name: "email", type: "text", placeholder: "Enter your email",label:"Email" },
    { name: "password", type: "password", placeholder: "Enter your password",label:"Password" },
    
  ];

      const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleSubmit = async (data: LoginPayload) => {
    if (!data.password) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const Data = await authService.login(data);
      console.log(Data)
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
    <div className="login">
      <Form<LoginPayload>
        submit="sign in"
        title="sign in "
        description="Enter your credentials to access your account"
        inputs={inputs}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        secondaryLink={{to:"/register",text:"Don't have an account?",label:"Create One"}}
      />
    </div>
  );
}

export default Login;
