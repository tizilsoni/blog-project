import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../globalState/globalState";

const Navbar = () => {
  const { state, setState } = useContext(GlobalContext);

  const logout = () => {
    localStorage.removeItem("token");
    setState({});
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 dark:text-gray-300">
        <a className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">
          Blogs-Short
        </a>

        <a className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
          features
        </a>

        <a className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
          pricing
        </a>

        <a className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
          blog
        </a>
        {!state?.auth ? (
          <>
            <Link
              href="/login"
              className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              Sign-Up
            </Link>
          </>
        ) : (
          <a
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log-Out
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
