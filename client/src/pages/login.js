import { useState } from "react";
import loginImage from "../images/login.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const RegisterPage = () => {
  const [loginpage, setLoginpage] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const response = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });
    const data = await response.json();
    console.log("register data ", data);
    if (response.ok || data.statusCode === 201) {
      alert("Registration successful");
      navigate("/lawquest");
    } else {
      alert("Unsuccessful registration");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await response.json();
      console.log("login data ", data);
      if (response.ok) {
        alert("LOGGED IN");
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );
        navigate("/lawquest");
      } else {
        alert("INVALID CREDENTIALS");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className=" h-fit bg-blue px-10 font-bold text-white">
        <div className="py-2 flex items-center bg-blue-900 w-full px-4 fixed top-0 left-0 right-0 mx-auto justify-between">
          <h1 className="text-base md:text-4xl" href="/">
            Law Quests
          </h1>
        </div>
      </header>
      <div
        className="flex w-full flex-col min-h-screen bg-[#235390] pt-2 items-center justify-center md:flex-row mx-auto"
        style={{ backgroundImage: "url(bg-snow.svg)" }}
      >
        <img src={loginImage} className="h-fit w-2/3 md:w-1/2 lg:w-[600px]" />
        <div class="flex md:w-1/2 justify-center items-center mt-7">
          <form
            action={loginpage ? "/auth/login" : "/auth/signup"}
            method={loginpage ? "GET" : "POST"}
            onSubmit={loginpage ? handleLogin : handleSignup}
          >
            <h1 class="text-white text-2xl font-bold md:text-4xl mb-1">
              Unlock Journey.
            </h1>
            <p class="lg:text-xl text-base font-normal text-white  mb-4">
              Welcome Aboard!
            </p>
            {loginpage ? (
              ""
            ) : (
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <label htmlFor="select-image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="h-5 w-5 text-white 0"
                    fill="currentColor"
                  >
                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"></path>
                  </svg>
                </label>
                <input
                  class="pl-2 py-1 outline-none border-none bg-transparent placeholder-slate-300 focus:text-white text-white caret-white"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white 0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                class="pl-2 py-1 outline-none border-none bg-transparent placeholder-slate-300 focus:text-white text-white caret-white"
                type="text"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="pl-2 py-1 outline-none border-none bg-transparent placeholder-slate-300 focus:text-white text-white caret-white"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="rounded-2xl mt-4 text-white border-b-4 border-yellow-700 bg-yellow-600 px-6 py-2 mb-2 text-center font-bold uppercase transition select-none hover:border-yellow-600 hover:bg-yellow-500 w-full cursor-pointer"
              type="submit"
            >
              {loginpage ? "Login" : "Sign Up"}
            </button>
            <br />
            <div className="mb-10">
              <span class="text-base ml-2 text-white select-none text-center">
                {loginpage ? "New User?" : "Already a user?"}{" "}
              </span>
              <span
                class="text-base select-none font-medium text-yellow-400 cursor-pointer"
                onClick={() => setLoginpage(!loginpage)}
              >
                {loginpage ? "Sign Up" : "Log In"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
