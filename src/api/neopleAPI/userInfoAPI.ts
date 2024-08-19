import axios from "axios";
import { FindUserData } from "./neopleAPI";

export interface UserInfoDTO {
  serverId: string;
  characterId: string;
}

export interface EquimentDTO {
  slotId: string;
  itemId: string;
  itemName: string;
  enchant: Enchant;
}

interface Enchant {
  status: Status[];
  explain: string;
}

export interface Status {
  name: string;
  value: number;
}

const userInfoAPI = async (userData: UserInfoDTO) => {
  console.log("통신시작");
  const testURL =
    process.env.REACT_APP_API_BASE_URL +
    `/userInfo?server=${userData.serverId}&characterId=${userData.characterId}`;

  try {
    const response = await axios.get(testURL);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default userInfoAPI;
