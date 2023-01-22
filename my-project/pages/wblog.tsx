import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../globalState/globalState";

export default function WBlog() {
  const { state } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (!state?.auth) router.push("/");
    console.log(state);
  }, []);

  return (
    <div className="py-10 w-2/3 mx-auto space-y-10">
      <h1 className="text-5xl underline font-bold flex justify-center">
        Create A Blog
      </h1>

      <h2 className="text-3xl flex justify-start">
        Give An Awesome Title to it :))
      </h2>
      <input
        id="title"
        name="title"
        className="block w-1/3 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        type="text"
      ></input>

      <h2 className="text-3xl flex justify-start">
        What Topic is it regarding?
      </h2>
      <input
        id="genre"
        name="genre"
        className="block w-1/3 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        type="text"
      ></input>

      <h2 className="text-3xl flex justify-center">Lets write!</h2>
      <textarea
        id="description"
        name="description"
        className="block w-full h-48 px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
      ></textarea>
    </div>
  );
}
