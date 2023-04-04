import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  let currpage = 0;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex sm:justify-center space-x-2 dark:bg-gray-900">
      <div className="flex flex-row list-none">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="rounded-lg px-3 py-2 text-slate-700 font-medium  active:bg-violet-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <a
              onClick={() => {
                paginate(number);
              }}
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
