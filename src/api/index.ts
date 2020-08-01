import axios from "axios";
import { API_URL } from "../../env";

export default class Api {
  host = null;
  constructor() {
    this.host = API_URL;
  }

  createRoom(roomId: string, userId: string, clientId: string, size: number) {
    return axios({
      method: "POST",
      url: `${API_URL}/room`,
      data: {
        roomId,
        userId,
        clientId,
        size,
      },
    });
  }

  resetRoom(roomId: string) {
    return axios({
      method: "POST",
      url: `${API_URL}/room/${roomId}/reset`,
    });
  }

  getRoom(roomId: string) {
    return axios({
      method: "GET",
      url: `${API_URL}/room/${roomId}`,
    });
  }

  leaveRoom(roomId: string, userId: string) {
    return axios({
      method: "POST",
      url: `${API_URL}/room/${roomId}/leave`,
      data: {
        userId,
      },
    });
  }

  joinRoom(roomId: string, userId: string, clientId: string) {
    return axios({
      method: "POST",
      url: `${API_URL}/room/${roomId}/join`,
      data: {
        userId,
        clientId,
      },
    });
  }
}
