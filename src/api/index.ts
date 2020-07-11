import axios from "axios";
import { API_URL } from "../../env";

export default class Api {
  host = null;
  constructor() {
    this.host = API_URL;
  }

  createRoom(roomId: string, userId: string) {
    return axios({
      method: "POST",
      url: `${API_URL}/room`,
      data: {
        roomId,
        userId,
      },
    });
  }

  leaveRoom(roomId: string, userId: string) {
    return axios({
      method: "POST",
      url: `${API_URL}/leave/${roomId}`,
      data: {
        userId,
      },
    });
  }

  joinRoom(roomId: string, userId: string, clientId: string) {
    return axios({
      method: "POST",
      url: `${API_URL}/join/${roomId}`,
      data: {
        userId,
        clientId,
      },
    });
  }
}
