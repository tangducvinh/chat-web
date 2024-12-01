import { IoPersonAdd } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { CgTimer } from "react-icons/cg";
import { memo } from "react";

interface IProps {
  title: string;
}

const HeaderContent: React.FC<IProps> = ({ title }) => {
  return (
    <div className="px-4 flex justify-between items-center w-full h-[60px] shadow-md">
      <h4 className="text-gray-300 text-base font-semibold">{title}</h4>

      <div className="flex gap-6 text-[20px]">
        <IoPersonAdd className="hover:cursor-pointer text-gray-300" />
        <FaBell className="hover:cursor-pointer text-gray-300" />
        <CgTimer className="hover:cursor-pointer text-gray-300 text-[22px]" />
      </div>
    </div>
  );
};

export default memo(HeaderContent);
