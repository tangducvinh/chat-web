"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { IoMdClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import female1 from "../../assets/avatar/female1.jpg";
import { getListUser } from "@/apis/user.api";
import { FaCheck } from "react-icons/fa6";
import clsx from "clsx";
import { IUser } from "@/app/types/common.type";
import { projectHmrEvents } from "next/dist/build/swc/generated-native";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useMyContext } from "@/store/MyContext";

interface IProps {
  onCloseForm: () => void;
}

interface IDataSearch {
  name?: string;
}

interface IListUser {
  user_name: string;
  user_avatar?: string;
  _id: string;
}

const FormCreateGroup: React.FC<IProps> = ({ onCloseForm }) => {
  const { socket, user } = useMyContext();
  const [nameGroup, setNameGroup] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [textDebounce] = useDebounce(searchText, 500);
  const [listUsers, setListUsers] = useState<IListUser[]>([]);
  const [listUserSelected, setListUserSelected] = useState<IListUser[]>([]);

  useEffect(() => {
    const fetchListUser = async (data: IDataSearch) => {
      const response = await getListUser(data);
      setListUsers(response.metadata);
    };

    if (textDebounce) {
      fetchListUser({ name: textDebounce });
    } else {
      setListUsers([]);
    }
  }, [textDebounce]);

  // handle select users
  const handleSelectUser = (item: IListUser) => {
    if (listUserSelected.some((subItem) => subItem._id === item._id)) {
      setListUserSelected(
        listUserSelected.filter((subItem) => subItem._id !== item._id)
      );
    } else {
      setListUserSelected((prev) => [...prev, item]);
    }
  };

  // handle submit create room
  const handleCreateRoom = () => {
    socket.emit("client-send-create-room", {
      name: nameGroup,
      dataUser: listUserSelected.map((item) => item._id),
      userId: user.id,
    });

    onCloseForm();
  };

  return (
    <div className="fixed inset-0 bg-overlay-black flex justify-center items-center z-20">
      <div className="w-[500px] h-[90%] flex flex-col overflow-hidden bg-white rounded-md relative">
        <div className="flex items-center p-3 justify-between border-b-2 border-gray-300 pb-2">
          <h2 className="text-black font-semibold">Thêm nhóm</h2>

          <button
            onClick={onCloseForm}
            className="hover:cursor-pointer p-2 rounded-full hover:bg-gray-300"
          >
            <IoMdClose className="text-black text-xl " />
          </button>
        </div>

        <div className="m-3 flex items-center gap-3">
          <div className="w-[50px] flex justify-center cursor-pointer items-center h-[50px] border-[1px] border-gray-300 rounded-full">
            <FaCamera className="text-xl text-gray-500" />
          </div>

          <input
            onChange={(e) => setNameGroup(e.target.value)}
            className="border-b-[1px] flex-1 outline-none border-gray-300"
            placeholder="Nhập tên nhóm..."
          ></input>
        </div>

        <div className="m-3 flex items-center rounded-2xl gap-1 p-[6px] text-sm border-[1px] border-gray-300">
          <IoSearchOutline className="text-sm text-gray-500" />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập tên user"
            className="flex-1 outline-none"
          ></input>
        </div>

        <div className="flex flex-1 gap-3 border-t-[1px] min-h-[300px] mt-5 m-3  pt-2 border-gray-300">
          <ul className="flex-6">
            {listUsers.map((item) => (
              <li
                onClick={() => handleSelectUser(item)}
                key={item._id}
                className="flex hover:bg-gray-200 gap-2 rounded-md p-1 items-center"
              >
                <button
                  className={clsx(
                    "w-[17px] h-[17px] flex items-center justify-center border-[1px] border-gray-400 rounded-full",
                    {
                      "bg-blue-500": listUserSelected.some(
                        (subitem) => subitem._id === item._id
                      ),
                    }
                  )}
                >
                  <FaCheck className="text-white text-[9px]" />
                </button>

                <div className="flex items-center gap-2">
                  <Image
                    alt="anh"
                    src={item.user_avatar || female1}
                    width={40}
                    height={40}
                    className="rounded-full"
                  ></Image>

                  <p className="text-sm">{item.user_name}</p>
                </div>
              </li>
            ))}
          </ul>

          {listUserSelected.length >= 1 && (
            <div className="flex-4 border-[1px] p-2 rounded-md border-gray-300">
              <strong className="text-sm">
                Đã chọn: {listUserSelected.length}
              </strong>

              <ul className="mt-1">
                {listUserSelected.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center mt-1 justify-between p-1 rounded-2xl bg-blue-200"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        alt="anh"
                        src={female1 || item.user_avatar}
                        width={25}
                        height={25}
                        className="rounded-full"
                      ></Image>
                      <p className="text-sm text-blue-600 ">{item.user_name}</p>
                    </div>

                    <IoCloseCircleSharp
                      onClick={() => handleSelectUser(item)}
                      className="text-blue-500 text-xl mr-1 hover:cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="h-[60px]"></div>
        <div className="border-t-[1px] bg-white flex justify-end p-3 absolute min-h-[60px] bottom-0 left-0 right-0 border-gray-300">
          <div className="gap-2 flex items-center">
            <button
              onClick={onCloseForm}
              className="bg-gray-300 font-semibold  text-black rounded-sm py-2 px-5"
            >
              Hủy
            </button>

            <button
              onClick={handleCreateRoom}
              className="bg-blue-400 font-semibold text-white rounded-sm py-2 px-5"
            >
              Tạo nhóm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateGroup;
