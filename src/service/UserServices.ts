import { AxiosResponse } from "axios";
import API from "../http";

interface IProfile {
  userId: string;
  username: string;
}

interface IPerson {
  _id: string;
  username: string;
}

export interface IMessage {
  _id: string;
  text: string;
  sender: string | null;
  recipient: string | null;
  createdAt?: string;
  updatedAt?: string;
  file?: string;
  __v?: number;
}

class UserServices {
  static async getProfile(): Promise<AxiosResponse<IProfile>> {
    return API.get("/profile");
  }

  static async getPeople(): Promise<AxiosResponse<IPerson[]>> {
    return API.get("/people");
  }

  static async getMessages(userId: string): Promise<AxiosResponse<IMessage[]>> {
    return API.get(`/messages/${userId}`);
  }
}

export default UserServices;
