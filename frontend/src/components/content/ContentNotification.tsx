"use client";

import { useEffect, useState } from "react";

import { useMyContext } from "@/store/MyContext";
import UserNotificationItem from "../user/UserNotificationItem";
import { getListNotification } from "@/apis/notification.api";
import { INotification } from "@/app/types/notification.type";

const ContentNotification = () => {
  const { user } = useMyContext();
  const [listNotification, setListNotification] = useState<INotification[]>();
  useEffect(() => {
    const fetchListNotification = async (userId: string) => {
      const response = await getListNotification({ userId });

      if (response?.metadata.length >= 1) {
        setListNotification(response.metadata);
      }
    };

    fetchListNotification(user.id);
  }, [user.id]);

  return (
    <div className="min-w-[350px] p-2 rounded-md min-h-[400px] bg-gray-200">
      <h2 className="text-left text-semibold">Notification</h2>

      <ul className="mt-2">
        {listNotification?.map((item) => (
          <UserNotificationItem
            name={item.noti_send.user_name}
            content={item.noti_content}
            avatar={item.noti_send.user_avatar}
            time={item.createdAt}
            key={item._id}
            id={item.noti_send._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContentNotification;
