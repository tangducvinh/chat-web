export interface INotification {
  _id: string;
  noti_send: { _id: string; user_name: string; user_avatar?: string };
  noti_content: string;
  createdAt: string;
  noti_status_reply: Boolean;
}

export interface IUser {
  _id: string;
  user_name: string;
  user_avatar: string;
}

export interface IListFriends {
  infor_user: IUser;
  infor_room: string;
}

export interface IMessage {
  mes_content: string;
  mes_user_send: IUser;
}

export interface IRoom {
  _id: string;
  room_image: string;
  room_name: string;
  room_type: string;
  room_menbers: IUser[];
  room_list_messages: IMessage[];
}
