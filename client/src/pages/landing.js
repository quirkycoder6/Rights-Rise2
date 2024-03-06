import React from "react";
import kid from "../images/y-kids.svg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div style={{overflow:"hidden"}}>
      <header className=" h-fit bg-blue px-10 font-bold text-white">
        <div className="py-2 flex items-center bg-blue-900 w-full px-4 fixed top-0 left-0 right-0 mx-auto justify-between">
          <h1 className="text-base font-serif md:text-4xl mx-auto" href="/">
            Rights Rise
          </h1>
        </div>
      </header>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-[#235390] text-white"
        style={{ backgroundImage: "url(bg-snow.svg)" }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-16 lg:flex-row md:gap-16">
          <img
            src={kid}
            alt=""
            srcset=""
            className="rounded-2xl h-fit w-10/12 mt-20 md:w-[600px]"
          />
          <div>
            <p className="mt-36 mr-8 max-w-[600px] text-center text-xl font-serif md:mb-12">
            Embark on a learning adventure with Rights Rise, a vibrant gamified platform designed to educate and empower children about their rights. Join us in making education fun and impactful!
            </p>
            <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
              <h1
                // href="/register"
                className="w-full rounded-2xl border-b-4 border-yellow-700 bg-yellow-600 px-10 py-3 text-center font-bold uppercase transition cursor-pointer hover:border-yellow-600 hover:bg-yellow-500 md:min-w-[320px]"
                onClick={() => navigate("/register")}
              >
                Get started
              </h1>
              {/* <button
                className="w-full rounded-2xl border-2 border-b-4 border-[#042c60] bg-[#235390] px-8 py-3 font-bold uppercase transition hover:bg-[#204b82] md:min-w-[320px]"
                onClick={() => navigate("/register")}
              >
                I already have an account
              </button> */}
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
