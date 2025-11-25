import React from "react";
import { FaSearch } from "react-icons/fa";

const Cari = () => {
  return (
    <>
      <div className="relative mt-10">
        <input
          type="text"
          placeholder="Search Here"
          className="rounded rounded-gray-400 text-black px-2 py-1 w-full mb-4 text-sm bg-purple-400 h-10 w-2/3 pl-10"
        />
        <FaSearch className="absolute left-2 top-3 text-black flex items-center justify-center" />
      </div>
    </>
  );
};

export default Cari;
