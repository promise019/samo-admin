import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import type { FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { signIn } from "../../lib/auth";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface UserData {
  email: string;
  password: string;
}

export default function Login() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowpassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsloading(true);
      await signIn(userData.email, userData.password);
      toast.success("Welcome back!");
      // Redirect logic here (e.g., useNavigate to dashboard)
      navigate("/admin/dashboard");
    } catch (error: any) {
      setIsloading(false);
      console.error(error.code);

      // Handle specific Login errors
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Incorrect email or password");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email");
          break;
        case "auth/too-many-requests":
          toast.error("Too many failed attempts. Try again later.");
          break;
        default:
          toast.error("Failed to login. Please check your connection.");
      }
    } finally {
      setIsloading(false);
    }
  };

  // const forgottenPassword = () => {
  //   console.log("Forgot password clicked");
  // };

  return (
    <form onSubmit={submitForm} className="space-y-4">
      <Input
        type="email"
        className="w-full rounded-md p-3 border border-gray-600"
        onChange={handleChange}
        value={userData.email}
        name="email"
        placeholder="Email (e.g john@gmail.com)"
      />

      <section className="relative">
        {showPassword ? (
          <EyeOff
            className="absolute right-2 top-3"
            onClick={() => setShowpassword(false)}
          />
        ) : (
          <Eye
            className="absolute right-2 top-3"
            onClick={() => setShowpassword(true)}
          />
        )}
        <Input
          type={showPassword ? "text" : "password"}
          className="w-full rounded-md p-3 border border-gray-600"
          onChange={handleChange}
          value={userData.password}
          name="password"
          placeholder="Password"
        />
      </section>

      <Button
        type="submit"
        className="w-full bg-red-800 rounded-md p-3 font-bold text-white"
      >
        {isloading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            <span>Signing In...</span>
          </div>
        ) : (
          "Sign In"
        )}{" "}
      </Button>

      {/* <Button
        type="button"
        className="italic font-bold text-right"
        onClick={forgottenPassword}
      >
        Forgotten password
      </Button> */}
    </form>
  );
}
