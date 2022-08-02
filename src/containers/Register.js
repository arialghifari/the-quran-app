import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
import { initialize } from "../reducers/firebaseSlice";
import { useDispatch } from "react-redux";

function Register() {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    return signInWithPopup(auth, provider).then(async (result) => {
      await runTransaction(db, async (transaction) => {
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await transaction.get(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            bookmarks: [],
            text_arabic: "Regular",
            text_translation: "Regular",
            translation: true,
          });
        } else {
          const dataSnap = await getDoc(userDocRef);

          dispatch(initialize(dataSnap.data()));
        }
      });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (result) => {
        await runTransaction(db, async (transaction) => {
          const userDocRef = doc(db, "users", result.user.uid);
          const userDocSnap = await transaction.get(userDocRef);

          if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
              bookmarks: [],
              text_arabic: "Regular",
              text_translation: "Regular",
              translation: true,
            });
          } else {
            const dataSnap = await getDoc(userDocRef);

            dispatch(initialize(dataSnap.data()));
          }
        });
      });

      return user;
    } catch (error) {
      let errMessage = "There was an error";
      const sanitizeErrMsg = error.message?.split("/")[1]?.split(")")[0];

      if (sanitizeErrMsg === "invalid-email") {
        errMessage = "Invalid email address";
      }

      if (sanitizeErrMsg === "weak-password") {
        errMessage = "Password should be at least 6 characters";
      }

      if (sanitizeErrMsg === "email-already-in-use") {
        errMessage = "Email already in use";
      }

      setErrorMessage(`* ${errMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center my-32 gap-10">
      <div className="flex flex-col gap-3 w-full max-w-md">
        <p className="text-2xl mb-4 text-center text-zinc-800">REGISTER</p>

        <button
          onClick={signInWithGoogle}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
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
