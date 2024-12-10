"use client";

import { useEffect, useState, useRef } from "react";

import { useMyContext } from "@/store/MyContext";
import UserNotificationItem from "../user/UserNotificationItem";
import { getListNotification } from "@/apis/notification.api";
import { INotification } from "@/app/types/common.type";

interface IProps {
  onCloseForm: (value: boolean) => void;
}

const ContentNotification: React.FC<IProps> = ({ onCloseForm }) => {
  const { user, socket } = useMyContext();
  const [listNotification, setListNotification] = useState<INotification[]>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchListNotification = async (userId: string) => {
      const response = await getListNotification({ userId });

      if (response?.metadata.length >= 1) {
        setListNotification(response.metadata);
      }
    };

    socket.on("server-send-get-new-list-notification", () => {
      console.log("handle get new list notification");
      fetchListNotification(user.id);
    });

    fetchListNotification(user.id);
  }, [user.id, socket]);

  useEffect(() => {
    const handleCloseForm = (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onCloseForm(false);
      }
    };

    document.addEventListener("mousedown", handleCloseForm);

    return () => document.removeEventListener("mousedown", handleCloseForm);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-w-[350px] p-2 rounded-md min-h-[400px] bg-gray-200"
    >
      <h2 className="text-left text-semibold">Notification</h2>

      <ul className="mt-2">
        {listNotification?.map((item) => (
          <UserNotificationItem
            name={item.noti_send.user_name}
            content={item.noti_content}
            avatar={item.noti_send.user_avatar}
            time={item.createdAt}
            status={item.noti_status_reply}
            key={item._id}
            notificationId={item._id}
            id={item.noti_send._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContentNotification;
