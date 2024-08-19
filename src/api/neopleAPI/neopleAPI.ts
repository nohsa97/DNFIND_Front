import axios from "axios";

export interface FindUserData {
  serverId: string;
  userName: string;
}

export interface FindedDTO {
  serverId: string;
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  fame: number;
}

const neopleAPI = async (userData: FindUserData) => {
  const testURL =
    process.env.REACT_APP_API_BASE_URL +
    `/findUser?server=${userData.serverId}&characterName=${userData.userName}`;

  try {
    const response = await axios.get(testURL);

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);

    return false;
    throw error;
  }
};

export default neopleAPI;
