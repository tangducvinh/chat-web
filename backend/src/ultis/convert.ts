import { Types } from "mongoose";

export const stringToObjectId = (id: string) => {
  return new Types.ObjectId(id);
};
