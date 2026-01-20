import Logo from "../../assets/image/Group 1 (2).svg";

export default function Welcome() {
  return (
    <div className="hidden md:flex text-center w-full py-9 xl:py-20 bg-blue-50 rounded-full">
      <h1 className="font-bold">
        Welcome To <b className="text-blue-800">Daily Starters</b>
      </h1>
      <p>Wishing you a great time ahead as WOFNC</p>
      <img src={Logo} alt="Daily starters logo" className=" w-[80%] " />
    </div>
  );
}
