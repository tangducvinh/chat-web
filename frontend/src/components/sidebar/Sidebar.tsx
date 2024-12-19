"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import { CgMail } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import ContentFriend from "../content/FriendContent";
import main from "../../assets/main-icon/main.png";
import { useMyContext } from "@/store/MyContext";
import Image from "next/image";
import female1 from "../../assets/avatar/female1.jpg";
import ContentUserOnline from "../content/ContentBoxMessage";
import { IoPersonAdd, IoNotificationsOutline } from "react-icons/io5";
import FormAddFriend from "../form/FormAddFriend";
import ContentNotification from "../content/ContentNotification";
import { MdGroupAdd } from "react-icons/md";
import FormCreateGroup from "../form/FormCreateGroup";
import { IRoom } from "@/app/types/common.type";

const Sidebar = () => {
  const { user, socket } = useMyContext();
  const [option, setOption] = useState<number>(1);
  const [showFormAddFriend, setShowFormAddFriend] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [numberNotification, setNumberNotification] = useState<number>(0);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const statusGetMore = useRef<boolean>(false);
  const [listRoom, setListRoom] = useState<IRoom[]>([]);

  // handle close form add friend
  const handleShowFormAddFriend = useCallback(() => {
    setShowFormAddFriend((prev) => !prev);
  }, []);

  useEffect(() => {
    // friend request
    const handleFriendRequest = () => {
      setNumberNotification((prev) => prev + 1);
    };
    socket?.on("server-send-notice-friend-request", handleFriendRequest);

    // accepted friend
    const handleAcceptedFriend = (data: any) => {
      setNumberNotification((prev) => prev + 1);
    };
    socket?.on("server-send-notice-accepted-friend", handleAcceptedFriend);

    return () => {
      socket?.off("server-send-notice-friend-request", handleFriendRequest);
      socket?.off("server-send-notice-accepted-friend", handleAcceptedFriend);
    };
  }, [socket]);

  // handle click notification icon
  const handClickNotification = () => {
    setShowNotification(true);
    setNumberNotification(0);
  };

  // handle close form add create group
  const handleShowFormCreateGroup = useCallback(() => {
    setShowCreateGroup((prev) => !prev);
  }, []);

  // handle get more information
  const handleGetMoreRoom = (userId: string, skip: number) => {
    if (statusGetMore.current) return;
    statusGetMore.current = true;

    console.log({ userId, skip });
    if (userId && skip) {
      socket?.emit("client-send-get-more-room", { userId, skip });
      statusGetMore.current = false;
    }
  };

  useEffect(() => {
    // handle get list room from server
    const handleGetListRoom = (data: any) => {
      setListRoom(data);
    };
    socket?.on("server-send-list-room", handleGetListRoom);

    const handleMoreRoom = (data: any) => {
      if (!data || data.length === 0) return;
      setListRoom((prev) => [...prev, ...data]);
      console.log(data);
    };

    socket?.on("server-send-more-room", handleMoreRoom);

    // get list room
    if (user.id) {
      socket?.emit("client-send-get-list-room", user.id);
    }
    return () => {
      socket?.off("server-send-list-room", handleGetListRoom);
      socket?.off("server-send-more-room", handleMoreRoom);
    };
  }, [socket, user.id]);

  useEffect(() => {
    // console.log(container.current?.scrollTop);
    const handleScroll = () => {
      // console.log(container.current?.scrollTop);
      if (container.current) {
        const scrollTop = Math.abs(container.current.scrollTop);
        const clientHeight = container.current.clientHeight;
        const scrollHeight = container.current.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
          if (option === 1) {
            handleGetMoreRoom(user.id, listRoom.length);
          }
        }
      }
    };

    if (container.current) {
      container.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      container.current?.removeEventListener("scroll", handleScroll);
    };
  }, [socket, listRoom.length, user.id]);

  return (
    <div className="flex flex-col h-full relative">
      {showFormAddFriend && (
        <FormAddFriend onCloseForm={handleShowFormAddFriend} />
      )}

      {showCreateGroup && (
        <FormCreateGroup onCloseForm={handleShowFormCreateGroup} />
      )}

      <div className="flex items-center justify-between px-3 pt-3">
        <h1 className="text-white font-bold text-xl flex items-center gap-3">
          <Image alt="icon-main" src={main} width={40} height={40}></Image>
          Chat v7
        </h1>

        <div className="flex items-center gap-5">
          <div className="relative" onClick={handClickNotification}>
            <div className="relative">
              <IoNotificationsOutline className="hover:cursor-pointer text-gray-300 text-xl relative" />

              {numberNotification > 0 && (
                <span className="absolute right-[-5px] top-[-10px] text-[10px] px-[5px] py-[1px] bg-red-500 rounded-full text-white">
                  {numberNotification}
                </span>
              )}
            </div>

            <div className="left-[-10px] w-[40px] h-[20px] absolute"></div>

            {showNotification && (
              <div className="absolute left-[-100px] mt-2 z-10">
                <ContentNotification onCloseForm={setShowNotification} />
              </div>
            )}
          </div>

          <IoPersonAdd
            onClick={handleShowFormAddFriend}
            className="hover:cursor-pointer text-gray-300 text-xl"
          />

          <MdGroupAdd
            onClick={handleShowFormCreateGroup}
            className="hover:cursor-pointer text-gray-300 text-2xl"
          />
        </div>
      </div>

      <div className="bg-black p-1 flex gap-2 rounded-md mt-4 mx-3">
        <button
          onClick={() => setOption(1)}
          className={clsx(
            "font-medium text-white flex-1 py-2 justify-center rounded-md text-sm flex items-center gap-2",
            [option === 1 && "bg-[#2E2F38]"]
          )}
        >
          <CgMail size="20px" />
          Chat
        </button>
        <button
          onClick={() => setOption(2)}
          className={clsx(
            "text-white flex justify-center gap-2 flex-1 py-2 rounded-md text-sm font-medium",
            [option === 2 && "bg-[#2E2F38]"]
          )}
        >
          <FaUserFriends size="20px" />
          Friends
        </button>
      </div>

      <div
        ref={container}
        className="flex-1 overflow-y-auto h-[100%] scrollbar-custom-small scrollbar scrollbar-thumb-gray-500"
      >
        {option === 1 ? (
          <ContentUserOnline listRoom={listRoom} />
        ) : (
          <ContentFriend />
        )}
      </div>

      {user.name && (
        <div className="flex gap-3 z-0 items-center border-t-[1px] border-gray-300 pt-2 relative mx-3 mb-3">
          <Image
            alt="avatar"
            src={female1}
            width={50}
            height={50}
            className="rounded-full"
          ></Image>

          <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-[42px] top-[42px] border-black border-[1px]"></div>

          <div className="text-gray-300 text-sm">
            <strong>{user.name}</strong>
            <p>Free</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
