// import google from "./../../assets/logo/google logo.svg";

export default function Header() {
  const date = new Date();
  return (
    <header className="sticky top-0 p-3 w-full bg-gray-200 text-right">
      <h1 className="font-bold">{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</h1>
    </header>
  );
}
