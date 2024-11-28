import { useMyContext } from "@/store/MyContext";
import Image from "next/image";
import female1 from "../../assets/avatar/female1.jpg";

const ContentUserOnline = () => {
  const { listUsers } = useMyContext();

  return (
    <div className="mt-4">
      <ul>
        {listUsers.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 hover:cursor-pointer p-2 rounded-md hover:bg-[#2E2F38] relative"
          >
            <Image
              alt="avatar"
              src={female1}
              width={40}
              height={40}
              className="rounded-full "
            />

            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-[39px] top-[35px] border-black border-[1px]"></div>
            <strong className="text-sm text-gray-300">{item.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentUserOnline;
