import HeaderContent from "../../components/content/HeaderContent";
import { FaGlobeAmericas } from "react-icons/fa";
import main from "../../assets/main-icon/main.png";
import Image from "next/image";
import Link from "next/link";

const ContentStart = () => {
  return (
    <div className="w-full flex flex-col justify-between">
      <HeaderContent title={"New chat"} />

      <div className="flex items-center gap-2 flex-col">
        <Image
          className="mx-auto"
          alt="main-icon"
          src={main}
          width={100}
          height={100}
        ></Image>
        <p className="text-white font-semibold text-xl">Chat v7</p>
      </div>

      <div className="mx-auto w-[600px] h-[300px] rounded-lg bg-[#1C1D22] mb-[20px] p-4">
        <h3 className="text-white text-xl font-semibold mb-4">Option chat:</h3>
        <Link
          href={"/chat/6759386ed28cf1c711a17a75"}
          className="text-white w-[300px] h-[50px] font-bold bg-[#5641E2] mx-auto rounded-md flex justify-center items-center gap-2 opacity-90 hover:opacity-100"
        >
          <FaGlobeAmericas className="text-white text-xl" />
          Start Text Chat
        </Link>
      </div>
    </div>
  );
};

export default ContentStart;
