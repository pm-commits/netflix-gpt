import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validateForm.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

  function handleButtonClick() {
    // Validate the form data
    console.log(email.current.value, password.current.value);
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    console.log(message);
    setErrorMsg(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
          navigate("/");
        });
    }
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg"
          alt="bkg-login"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 opacity-90 bg-black mx-auto left-0 right-0 my-36 text-white"
      >
        <h1 className="font-bold text-3xl py-4 rounded-m z-50">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 my-2 w-full rounded-md opacity-85 border border-gray-700 bg-blue-950 placeholder-gray-200"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full rounded-md opacity-85 border border-gray-700 bg-blue-950 placeholder-gray-200"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full opacity-85 rounded-md border border-gray-700  bg-blue-950 placeholder-gray-200"
        />
        <p className="text-red-500 text-sm">{errorMsg}</p>
        <button
          className="p-2 my-2 bg-red-700 w-full rounded-md"
          onClick={handleButtonClick}
        >
          Sign In
        </button>
        <p className="py-4 text-sm cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? SignUp now!"
            : "Already a member? Log In!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
