import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import userInfoAPI, {
  EquimentDTO,
  UserDTO,
  UserInfoDTO,
} from "../../api/neopleAPI/userInfoAPI";

import styled from "./UserInfo.module.css";
import { enchantSum } from "../../hooks/equipment/useEquipment";

const UserInfo = () => {
  const [params] = useSearchParams();
  const [userEquipment, setUserEquipment] = useState<EquimentDTO[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfoDTO>();

  const getUserInfo = async () => {
    const userServer = params.get("server");
    const userId = params.get("charId");

    if (userServer && userId) {
      const UserInfoDTO: UserDTO = {
        serverId: userServer,
        characterId: userId,
      };

      const result = await userInfoAPI(UserInfoDTO);

      const equimentList: EquimentDTO[] = [];

      //유저 정보 저장
      const resultUserData: UserInfoDTO = {
        adventureName: result.adventureName,
        characterName: result.characterName,
        jobGrowName: result.jobGrowName,
        fame: result.fame,
      };
      setUserInfo(resultUserData);

      for (const key in result.equipment) {
        const tempData: EquimentDTO = {
          slotId: result.equipment[key].slotId,
          itemId: result.equipment[key].itemId,
          itemName: result.equipment[key].itemName,
          enchant: result.equipment[key].enchant,
        };

        enchantSum(tempData);
        equimentList.push(tempData);
      }
      setUserEquipment(equimentList);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getUserInfo();
  }, []);

  return (
    <div className={styled.userInfoPage}>
      <div className={styled.userBox}>
        <div className={styled.userBaseInfo}>
          <div className={styled.userName}>{userInfo?.characterName}</div>
          <div className={styled.userAdventureBox}>
            <img
              className={styled.advenIcon}
              src="./icon/advenIcon.png"
              alt="userImg"
            />
            <div className={styled.userAdventure}>
              {userInfo?.adventureName}
            </div>
          </div>

          <img
            className={styled.userImg}
            src={`https://img-api.neople.co.kr/df/servers/${params.get(
              "server"
            )}/characters/${params.get("charId")}?zoom=2`}
            alt="userImg"
          />
          <div className={styled.userJF}>
            <div>{userInfo?.jobGrowName}</div>
            <img
              className={styled.advenIcon}
              src="./icon/ico_fame.png"
              alt="userImg"
            />
            <div>{userInfo?.fame}</div>
          </div>
        </div>
        <div className={styled.userEquip}>
          장비
          {userEquipment.map((item) => (
            <div className={styled.itemSlot} key={item.slotId}>
              <div className={styled.itemInfo} key={item.itemId + "info"}>
                <img
                  key={item.itemId + "infoImg"}
                  src={`https://img-api.neople.co.kr/df/items/${item.itemId}`}
                  alt="itemImg"
                />
                <div className={styled.itemName} key={item.itemId + "infoId"}>
                  {item.itemName}
                  {/* {item.enchant.status[0].name} */}
                </div>
              </div>

              {item.enchant !== undefined ? (
                <div className={styled.enchantBox} key={item.enchant + "infoS"}>
                  {item.enchant.explain !== undefined ? (
                    <div className={styled.enchantBlock}>
                      {item.enchant.explain}
                    </div>
                  ) : (
                    <></>
                  )}

                  {item.enchant.status.map((magic, index) => (
                    <div
                      className={styled.enchantBlock}
                      key={item.enchant + "infoVal" + index}
                    >
                      {magic.name + " +" + magic.value}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

//돈이 들어가는 스펙업 요소.
//마법부여 / 크리쳐
