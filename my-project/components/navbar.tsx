import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../globalState/globalState";

const Navbar = () => {
  const { state, logout } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <nav className="bg-white shadow dark:bg-indigo-900">
      <div className="container grid grid-cols-6 gap-16 p-6 mx-auto text-gray-600 dark:text-gray-300">
        <a className="text-3xl text-start col-span-2 font-bold text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">
          Blogs-Short
        </a>
        <a className="text-xl text-center border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
          Find By Genre?
        </a>

        <Link
          href="/"
          className="text-xl text-center border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Latest Blogs!
        </Link>
        {!state?.auth ? (
          <>
            <Link
              href="/login"
              className="text-xl text-end col-end-7 col-span-1 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              Login/Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className=" text-xl text-center border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-xl text-center border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
              onClick={(e) => {
                e.preventDefault();
                logout();
                router.push("/");
              }}
            >
              Log-Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
