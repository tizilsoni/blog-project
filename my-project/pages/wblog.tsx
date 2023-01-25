import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../globalState/globalState";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loading from "../components/Loading";
import "github-markdown-css";
import axios from "axios";

const MarkdownPreview = lazy(() =>
  delayForDemo(import("../components/MarkdownPreview"))
);

export default function WBlog() {
  const { state } = useContext(GlobalContext);
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(true);
  const [markdown, setMarkdown] = useState("Hello, **world**!");

  useEffect(() => {
    if (!state?.auth) router.push("/");
    console.log(state);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
  });

  const handleFormDataChange = (e: any) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    const { title, description, topic } = formData;
    if (!title) {
      alert("title is Required");
      return;
    }
    if (!description) {
      alert("Description is Required");
      return;
    }
    if (!topic) {
      alert("Genre is Required");
      return;
    }

    axios({
      method: "POST",
      url: "http://localhost:5000/blog",
      headers: {
        "Content-Type": "application/json",
        token: state.token,
      },
      data: {
        title: formData.title,
        topic: formData.topic,
        description: formData.description,
      },
    })
      .then((res) => {
        alert("Blog Successfully Posted");
        router.push("/dashboard");
      })
      .catch((err) => alert("Not Possible"));
  };

  return (
    <>
      <Navbar></Navbar>
      <form
        className="py-10 w-2/3 mx-auto space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
          handleFormSubmit();
        }}
      >
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
          onChange={handleFormDataChange}
        ></input>

        <h2 className="text-3xl flex justify-start">
          What Topic is it regarding?
        </h2>
        <input
          id="topic"
          name="topic"
          className="block w-1/3 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          type="text"
          onChange={handleFormDataChange}
        ></input>

        <h2 className="text-3xl flex justify-center">Lets write!</h2>
        <textarea
          id="description"
          name="description"
          value={markdown}
          className="block w-full h-48 px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          onChange={(e) => {
            setMarkdown(e.target.value), handleFormDataChange(e);
          }}
        ></textarea>

        {showPreview && (
          <Suspense fallback={<Loading />}>
            <h2>Preview</h2>
            <div className="markdown-body">
              <MarkdownPreview markdown={markdown} />
            </div>
          </Suspense>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </form>
      <Footer></Footer>
    </>
  );
}
function delayForDemo(
  promise: Promise<typeof import("../components/MarkdownPreview")>
) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
