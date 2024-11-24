import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const logoClickHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe when component unmounts
    //onAuthStateChanged is like an event listener
    return () => unsubscribe();
  }, []);

  function handlerUserClick() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="absolute w-full px-24 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO_URL}
        alt="logo"
        onClick={logoClickHandler}
      />
      {user && (
        <div>
          <div className="flex items-center">
            <img className="w-10 h-10" src={user.photoURL} alt="user-icon" />
            <button className="text-white ml-3" onClick={handlerUserClick}>
              ▾
            </button>
          </div>
          {/* <p>({user.displayName})</p> */}
          {showDropdown && (
            <ul className="border-gray-400 bg-gray-700 text-white absolute w-32">
              <li>
                <button className="px-2 py-2 text-sm" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
