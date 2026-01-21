// import { useState } from "react";
// import Input from "../UI/Input";
// import Button from "../UI/Button";
// import type { FormEvent, ChangeEvent } from "react";
// import { createAccount } from "../../lib/auth";
// import {
//   validateEmailProvider,
//   ValidatePassword,
//   validateUsername,
// } from "../../lib/checkInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// interface UserData {
//   userName: string;
//   email: string;
//   password: string;
// }

// export default function Signup() {
//   const [userData, setUserData] = useState<UserData>({
//     userName: "",
//     email: "",
//     password: "",
//   });
//   const [confirmPassword, setConfirmpassword] = useState<string>("");
//   const [showPassword, setShowpassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmpassword] =
//     useState<boolean>(false);

//   const [isloading, setIsloading] = useState<boolean>(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setErrorMsg(null); // Reset errors

//     // --- STEP 1: VALIDATE USERNAME ---
//     const usernameResult = validateUsername(userData.userName);
//     if (usernameResult !== "Valid username") {
//       setErrorMsg(usernameResult);
//       return;
//     }

//     // --- STEP 2: VALIDATE EMAIL ---
//     const emailResult = validateEmailProvider(userData.email);
//     if (emailResult === "Unknown or Private Provider") {
//       setErrorMsg("Please use a Gmail, Yahoo, or Outlook account.");
//       return;
//     }

//     // --- STEP 3: VALIDATE PASSWORD ---
//     const passResult = ValidatePassword(userData.password);
//     if (!passResult.valid) {
//       setErrorMsg(passResult.message);
//       return;
//     }

//     if (userData.password !== confirmPassword) {
//       setErrorMsg("Password does not match");
//       return;
//     }

//     console.log(userData);

//     try {
//       setIsloading(true);
//       await createAccount(userData.email, userData.password);
//       toast.success("Sign Up successful");
//       setTimeout(() => {
//         window.location.reload();
//       }, 1500);
//     } catch (error: any) {
//       setIsloading(false);
//       if (error.code === "auth/email-already-in-use") {
//         setErrorMsg(
//           "This email is already registered. Try logging in instead.",
//         );
//         toast.error("Email already in use");
//       } else {
//         setErrorMsg("An error occurred during signup.");
//         toast.error("Signup failed");
//       }
//     } finally {
//       setIsloading(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={submitForm} className="space-y-4">
//         {errorMsg && <p className="text-red-700">{errorMsg}</p>}
//         <Input
//           type="text"
//           className="w-full rounded-md p-3 border border-gray-600"
//           onChange={handleChange}
//           value={userData.userName}
//           name="userName"
//           placeholder="Username (e.g John)"
//         />

//         <Input
//           type="email"
//           className="w-full rounded-md p-3 border border-gray-600"
//           onChange={handleChange}
//           value={userData.email}
//           name="email"
//           placeholder="Email (e.g john@gmail.com)"
//         />

//         <section className="relative">
//           {showPassword ? (
//             <EyeOff
//               className="absolute right-2 top-3"
//               onClick={() => setShowpassword(false)}
//             />
//           ) : (
//             <Eye
//               className="absolute right-2 top-3"
//               onClick={() => setShowpassword(true)}
//             />
//           )}
//           <Input
//             type={showPassword ? "text" : "password"}
//             className="w-full rounded-md p-3 border border-gray-600"
//             onChange={handleChange}
//             value={userData.password}
//             name="password"
//             placeholder="Password"
//           />
//         </section>

//         <section className="relative">
//           {showConfirmPassword ? (
//             <EyeOff
//               className="absolute right-2 top-3"
//               onClick={() => setShowConfirmpassword(false)}
//             />
//           ) : (
//             <Eye
//               className="absolute right-2 top-3"
//               onClick={() => setShowConfirmpassword(true)}
//             />
//           )}
//           <Input
//             type={showConfirmPassword ? "text" : "password"}
//             className="w-full rounded-md p-3 border border-gray-600"
//             onChange={(e) => setConfirmpassword(e.target.value)}
//             value={confirmPassword}
//             name="password"
//             placeholder="confirm password"
//           />
//         </section>

//         <Button
//           disabled={isloading ? true : false}
//           type="submit"
//           className="w-full bg-red-800 rounded-md p-3 font-bold text-white disabled:bg-red-500"
//           // onClick={(e) => submitForm(e)}
//         >
//           {isloading ? (
//             <div className="flex items-center justify-center gap-2">
//               <Loader2 className="animate-spin" size={20} />
//               <span>Creating Account...</span>
//             </div>
//           ) : (
//             "Create Account"
//           )}
//         </Button>
//       </form>
//     </>
//   );
// }
