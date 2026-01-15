import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

interface userDataProp {
  userName: string;
  email: string;
  password: string | number;
}

export default function Signup() {
  const [userData, setUserData] = useState<userDataProp>({
    userName: "",
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

  return (
    <>
      <Input
        type="userName"
        className="w-full hover:bg-white rounded-md p-3 border border-gray-600"
        onChange={(e) => handleChange(e)}
        value={userData.email}
        name="email"
        placeholder="input Username (e.g John)"
      />

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
        className="w-full bg-green-500 rounded-md p-3 font-bold text-white"
        onClick={(e) => submitForm(e)}
      >
        Create Account
      </Button>
    </>
  );
}
