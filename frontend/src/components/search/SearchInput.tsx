import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="relative mt-4 bg-black w-full">
      <input
        placeholder="Search Friends"
        className="bg-black w-full p-3 absolute text-sm text-gray-300 outline-none rounded-md"
      ></input>
      <IoSearchOutline className="text-gray-300 text-xl absolute right-[15px] border-none top-[12px] hover:cursor-pointer" />
    </div>
  );
};

export default SearchInput;
