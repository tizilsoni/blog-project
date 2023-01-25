import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../globalState/globalState";

const Navbar = () => {
  const { state, logout } = useContext(GlobalContext);
  const router = useRouter();

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
          <Link
            href="/"
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            onClick={(e) => {
              e.preventDefault();
              logout();
              router.push("/");
            }}
          >
            Log-Out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
