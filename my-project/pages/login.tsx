import Link from "next/link";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../globalState/globalState";
import { useRouter } from "next/router";
import axios from "axios";
import Footer from "../components/footer";

export default function Login() {
  const { state, setState } = useContext(GlobalContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormDataChange = (e: any) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    const { email, password } = formData;
    if (!email && !password) {
      alert("Please provide all data");
      return;
    }

    axios({
      method: "POST",
      url: "http://localhost:5000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((res) => {
        console.log(res.data);
        setState({
          auth: true,
          token: res.data.token,
          username: res.data.username,
          email: res.data.email,
        });
        setTimeout(() => {
          router.push("/dashboard"), 2000;
        });
      })
      .catch((err) => alert("Invalid Credentials"));
  };

  return (
    <div className="h-full">
      <div className="max-w-lg p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20 mb-96">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Welcome Back :)
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleFormDataChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleFormDataChange}
              />
            </div>
          </div>

          <div className="flex justify-start space-x-4 mt-6">
            <p>Not A Member?</p>
            <Link className="underline" href="/register">
              Sign up
            </Link>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}
