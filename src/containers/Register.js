import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  window.scrollTo(0, 0);

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="flex flex-col items-center my-32 gap-10">
      <div className="flex flex-col gap-3 w-full max-w-md">
        <p className="text-2xl mb-4 text-center text-zinc-800">REGISTER</p>

        <button
          type="submit"
          className="bg-zinc-50 hover:bg-zinc-300 text-zinc-800 p-3 rounded-md flex items-center justify-center gap-3"
        >
          <img src="/ic_google.svg" alt="google" className="w-6" />
          Sign Up With Google
        </button>
        <div className="text-center my-6 relative flex justify-center">
          <div className="absolute top-0 left-0 right-0 h-full w-full flex items-center">
            <hr className="w-full border-zinc-500" />
          </div>
          <p className="bg-default px-4 z-20 text-zinc-500">or</p>
        </div>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-transparent border border-zinc-500 p-3 rounded-md text-zinc-800"
          />
          <div className="relative">
            <input
              type={isPasswordShown ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="bg-transparent border border-zinc-500 p-3 rounded-md w-full text-zinc-800"
            />
            <div className="absolute top-0 right-2 h-full flex items-center">
              <img
                onClick={() => setIsPasswordShown(!isPasswordShown)}
                src={isPasswordShown ? "/ic_eyeoff.svg" : "/ic_eye.svg"}
                alt="hide"
                className="p-2 cursor-pointer bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-zinc-50 hover:bg-primary/80 p-3 rounded-md"
          >
            Register
          </button>
        </form>
        <p className="text-zinc-800">
          Already have an account?{" "}
          <Link to="/login">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
