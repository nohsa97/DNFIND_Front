import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FindedDTO } from "../../api/neopleAPI/neopleAPI";

//초기 상태
const initialState: FindedDTO = {
  serverId: "",
  characterId: "",
  characterName: "",
  level: 0,
  jobId: "",
  jobGrowId: "",
  jobName: "",
  jobGrowName: "",
  fame: 0,
};

const userInfoReducer = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<FindedDTO>) => {
      state = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoReducer.actions;

export default userInfoReducer.reducer;
