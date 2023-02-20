import React, { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GlobalContext } from "../globalState/globalState";
import Footer from "../components/footer";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { state, setState } = useContext(GlobalContext);
  const router = useRouter();

  const handleFormDataChange = (e: any) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username && !email && !password && !confirmPassword) {
      alert("Please provide all data");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      alert("Wrong Email Address");
      return;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/i.test(formData.password)) {
      alert("Password is invalid");
      return;
    }

    axios({
      method: "POST",
      url: "http://localhost:5000/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        localStorage.setItem("token", res.data.token);
        setState({ auth: true, token: res.data.token });
        router.push("/wblog");
      })
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-lg p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20 mb-60">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Create Account
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
            handleFormSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label
                htmlFor="username"
                className="text-white dark:text-gray-200"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleFormDataChange}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleFormDataChange}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleFormDataChange}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleFormDataChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white transition-colors duration-200 border border-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}
