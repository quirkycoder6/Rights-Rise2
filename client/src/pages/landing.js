import React from "react";
import kid from "../images/y-kids.svg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className=" h-fit bg-blue px-10 font-bold text-white">
        <div className="py-2 flex items-center bg-blue-900 w-full px-4 fixed top-0 left-0 right-0 mx-auto justify-between">
          <h1 className="text-base md:text-4xl" href="/">
            Law Quests
          </h1>
        </div>
      </header>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-[#235390] text-white"
        style={{ backgroundImage: "url(bg-snow.svg)" }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16 lg:flex-row md:gap-36">
          <img
            src={kid}
            alt=""
            srcset=""
            className="rounded-2xl h-fit w-10/12 md:w-[600px]"
          />
          <div>
            <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12">
              The free, fun, and effective way to learn!
            </p>
            <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
              <h1
                // href="/register"
                className="w-full rounded-2xl border-b-4 border-yellow-700 bg-yellow-600 px-10 py-3 text-center font-bold uppercase transition hover:border-yellow-600 hover:bg-yellow-500 md:min-w-[320px]"
              >
                Get started
              </h1>
              <button
                className="w-full rounded-2xl border-2 border-b-4 border-[#042c60] bg-[#235390] px-8 py-3 font-bold uppercase transition hover:bg-[#204b82] md:min-w-[320px]"
                onClick={() => navigate("/register")}
              >
                I already have an account
              </button>
            </div>
          </div>
        </div>
        {/* <article className="absolute bottom-0 left-0 right-0 hidden h-20 items-center justify-center bg-[#0a4a82] text-white md:flex"></article> */}
        {/* <LoginScreen
          loginScreenState={loginScreenState}
          setLoginScreenState={setLoginScreenState}
        /> */}
      </main>
    </div>
  );
};

export default Landing;
