import React from "react";
import Link from "next/link";

const Post = () => {
  return (
    <div className="py-10 w-2/3 mx-auto">
      <div className="flex justify-start">
        <span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">
          Label
        </span>
        <span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">
          Flex
        </span>
      </div>

      <h1 className="text-3xl font-semibold">Blog Header</h1>
      <p className="flex-1 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas
        cupiditate consequatur. Vitae non incidunt cupiditate iusto fugit
        officia placeat accusamus inventore ad veniam asperiores enim beatae
        natus, ex atque?
      </p>

      <Link
        rel="noopener noreferrer"
        href="#"
        className="inline-flex items-center pt-2 mb-1 space-x-2 text-sm dark:text-violet-400"
      >
        <span>Read more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
          data-darkreader-inline-fill=""
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>

      <div className="self-center text-sm mb-1">by Random Person</div>
      <div className="text-xs">x min read</div>
    </div>
  );
};

export default Post;
