import Navigator from "../../component/navigator/Navigator";
import styled from "./FindUser.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import neopleAPI, {
  FindedDTO,
  FindUserData,
} from "../../api/neopleAPI/neopleAPI";
import { useEffect, useState } from "react";
import SERVER from "../../enum/ServerList";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const FindUser = () => {
  const [checkUser, setCheckUser] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [inputServer, setInputServer] = useState<string>("");
  const [charList, setCharList] = useState<FindedDTO[]>([]);

  const navigate = useNavigate();

  const test = async (evenvt: React.FormEvent<HTMLFormElement>) => {
    evenvt.preventDefault();

    const userData: FindUserData = {
      serverId: inputServer,
      userName: userName,
    };

    const result = await neopleAPI(userData);

    if (result.status !== 200) {
      console.log("실패");
      setCheckUser(false);
    } else {
      let testDataList: FindedDTO[] = [];
      setCheckUser(true);

      result.data.forEach((item: FindedDTO) => {
        let testData: FindedDTO = {
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
        testData.serverId = item.serverId;
        testData.characterId = item.characterId;
        testData.characterName = item.characterName;
        testData.jobName = item.jobName;
        testData.fame = item.fame;
        testData.jobGrowName = item.jobGrowName;
        testDataList.push(testData);
      });

      setCharList(testDataList);
    }
  };

  useEffect(() => {
    setInputServer(SERVER[0].serverId); // 기본값을 첫 번째 서버로 설정
  }, []);

  const handleServer = (event: SelectChangeEvent) => {
    setInputServer(event.target.value as string);
  };

  // const setUserServer = (serverId: string) => {
  //   // const userServer
  // };

  const movePageUserInfo = () => {
    navigate("/userInfo");
  };

  return (
    <div className={styled.mainBox}>
      {/* 헤더 부분 */}
      <div className={styled.header}>
        <Navigator />
      </div>

      <div className={styled.section}>
        {/* 박스 내용 */}
        <div className={styled.mainSection}>
          <h1 className={styled.title}>캐릭터 검색</h1>

          <form onSubmit={test} className={styled.inputForm}>
            <FormControl size="small">
              <InputLabel id="server-select-label">서버</InputLabel>
              <Select label="서버" value={inputServer} onChange={handleServer}>
                {SERVER.map((item) => (
                  <MenuItem value={`${item.serverId}`} key={item.serverId}>
                    {item.serverName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* textFiled는 따로 label 추가 필요없지만, select는 inputLabel추가가 필요.  */}
            <TextField
              id="outlined-basic"
              label="캐릭터 이름"
              variant="standard"
              required
              size="small"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(value.target.value);
              }}
            />
            <Button type="submit" variant="outlined">
              <SearchIcon />
            </Button>
          </form>

          {checkUser === true ? (
            <div className={styled.charList}>
              {charList.map((item, index) => (
                <div
                  className={styled.userInfo}
                  key={index}
                  onClick={movePageUserInfo}
                >
                  <div className={styled.userImgBox}>
                    <img
                      className={styled.serverIcon}
                      src={`./icon/server/${item.serverId}.png`}
                      alt="서버아이콘"
                    />
                    <img
                      alt="유저 이미지"
                      className={styled.userImg}
                      src={`https://img-api.neople.co.kr/df/servers/${item.serverId}/characters/${item.characterId}?zoom=1`}
                    />
                  </div>

                  <div className={styled.userName}>{item.characterName}</div>
                  <div className={styled.userJobName}>{item.jobGrowName}</div>
                  <div className={styled.userFame}>
                    <img
                      src="./icon/ico_fame.png"
                      alt="명성아이콘"
                      className={styled.fameIcon}
                    />
                    {item.fame ? item.fame : "X"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUser;
