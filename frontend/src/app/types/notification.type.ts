export interface INotification {
  _id: string;
  noti_send: { _id: string; user_name: string; user_avatar?: string };
  noti_content: string;
  createdAt: string;
}
