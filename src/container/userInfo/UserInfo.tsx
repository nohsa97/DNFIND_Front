import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import userInfoAPI, {
  EquimentDTO,
  UserInfoDTO,
} from "../../api/neopleAPI/userInfoAPI";

import styled from "./UserInfo.module.css";

const UserInfo = () => {
  const [params, setParams] = useSearchParams();

  const [userEquipment, setUserEquipment] = useState<EquimentDTO[]>([]);

  const getUserInfo = async () => {
    const userServer = params.get("server");
    const userId = params.get("charId");

    if (userServer && userId) {
      const UserInfoDTO: UserInfoDTO = {
        serverId: userServer,
        characterId: userId,
      };

      const result = await userInfoAPI(UserInfoDTO);

      console.log(result);

      const equimentList: EquimentDTO[] = [];

      for (const key in result) {
        const tempData: EquimentDTO = {
          slotId: result[key].slotId,
          itemId: result[key].itemId,
          itemName: result[key].itemName,
        };
        equimentList.push(tempData);
      }

      setUserEquipment(equimentList);
    }
  };

  useEffect(() => {
    console.log(params.get("charId"));
    getUserInfo();
  }, []);

  return (
    <div>
      <div className={styled.userBox}>
        <div className={styled.userImg}>
          <img
            src={`https://img-api.neople.co.kr/df/servers/${params.get(
              "server"
            )}/characters/${params.get("charId")}?zoom=2`}
          />
        </div>
        <div className={styled.userEquip}>
          {userEquipment.map((item) => (
            <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
