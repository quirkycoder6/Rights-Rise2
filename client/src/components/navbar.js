import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../state/index";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <header className=" h-fit bg-blue px-10 font-bold text-white z-50">
      <div className="py-2 flex items-center bg-blue-900 w-full px-4 fixed top-0 left-0 right-0 mx-auto justify-between z-50 ">
        <h1 className="text-base md:text-4xl" href="/">
          Law Quests
        </h1>
        <button className="text-base md:text-2xl" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
