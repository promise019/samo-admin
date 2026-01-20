import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

interface userDataProp {
  email: string;
  password: string | number;
}

export default function Login() {
  const [userData, setUserData] = useState<userDataProp>({
    email: "",
    password: "",
  });

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  const ForgottenPassword = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Input
        type="email"
        className="w-full hover:bg-white rounded-md p-3 border border-gray-600"
        onChange={(e) => handleChange(e)}
        value={userData.email}
        name="email"
        placeholder="email (e.g john@gmail.com)"
      />

      <Input
        type="password"
        className="w-full hover:bg-white rounded-md p-3 border border-gray-600"
        onChange={(e) => handleChange(e)}
        value={userData.password}
        name="email"
        placeholder="input passworrd"
      />

      <Button
        disabled={false}
        className="w-full bg-red-800 rounded-md p-3 font-bold text-white"
        onClick={(e) => submitForm(e)}
      >
        Login
      </Button>
      <br />
      <Button
        className="italic font-bold text-right"
        onClick={(e) => submitForm(e)}
        disabled={false}
      >
        Forgotten password
      </Button>
    </>
  );
}
