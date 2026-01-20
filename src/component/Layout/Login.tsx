import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import type { FormEvent, ChangeEvent } from "react";

interface UserData {
  email: string;
  password: string;
}

export default function Login() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  };

  const forgottenPassword = () => {
    console.log("Forgot password clicked");
  };

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

      <Input
        type="password"
        className="w-full rounded-md p-3 border border-gray-600"
        onChange={handleChange}
        value={userData.password}
        name="password"
        placeholder="Password"
      />

      <Button
        type="submit"
        className="w-full bg-red-800 rounded-md p-3 font-bold text-white"
      >
        Login
      </Button>

      <Button
        type="button"
        className="italic font-bold text-right"
        onClick={forgottenPassword}
      >
        Forgotten password
      </Button>
    </form>
  );
}
