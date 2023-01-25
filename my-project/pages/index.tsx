import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Blog from "./blog";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Head>
        <title>Blogs-short</title>
      </Head>
      <main className="dark:bg-gray-800 dark:text-gray-50">
        <div>
          <h1 className="mb-5 text-3xl font-bold underline flex justify-center">
            Welcome to blogs short!
          </h1>
          <h2 className="flex justify-center">
            Where you can Post your Blogs And show it to the world
          </h2>
        </div>
        <div>
          <h2 className="mt-5 flex justify-center">Recent blogs</h2>
          <Blog></Blog>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
