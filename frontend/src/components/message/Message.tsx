import { GiStrongMan } from "react-icons/gi";
import female1 from "../../assets/avatar/female1.jpg";
import Image from "next/image";
import { memo } from "react";
import moment from "moment";

interface IMessage {
  name: string;
  avatar?: string;
  time: string;
  content: string;
}

const Message: React.FC<IMessage> = ({ name, avatar, time, content }) => {
  return (
    <div className="flex gap-3">
      <Image
        className="rounded-full object-cover"
        alt="avatar"
        src={female1}
        width={45}
        height={45}
      ></Image>

      <div className="text-gray-200">
        <strong className="mr-3">{name}</strong>
        <span className="text-sm text-gray-500">
          {moment(time).format("hh:mm A")}
        </span>

        <p className="break-words text-wrap">{content}</p>
      </div>
    </div>
  );
};

export default memo(Message);
