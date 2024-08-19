import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import userInfoAPI, {
  EquimentDTO,
  Status,
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

      const equimentList: EquimentDTO[] = [];

      for (const key in result.equipment) {
        const tempData: EquimentDTO = {
          slotId: result.equipment[key].slotId,
          itemId: result.equipment[key].itemId,
          itemName: result.equipment[key].itemName,
          enchant: result.equipment[key].enchant,
        };

        const fixData = enchantSum(tempData);

        equimentList.push(fixData);
      }

      setUserEquipment(equimentList);
    }
  };

  const enchantSum = (data: EquimentDTO) => {
    for (const key in data) {
      const newLs: Status[] = [];
      let newData = {
        ElementIncrease: 0,
        Stat: 0,
        Attack: 0,
        Critical: 0,
      };

      if (data.enchant === undefined) continue;

      const temp = data.enchant.status;
      for (const key in temp) {
        if (
          [
            "명속성강화",
            "화속성강화",
            "수속성강화",
            "암속성강화",
            "모든 속성 강화",
          ].includes(temp[key].name)
        ) {
          newData.ElementIncrease = temp[key].value;
        } else if (
          ["물리 공격력", "마법 공격력", "독립 공격력"].includes(temp[key].name)
        )
          newData.Attack = temp[key].value;
        else if (["힘", "지능", "정신력", "체력"].includes(temp[key].name))
          newData.Stat = temp[key].value;
        else if (
          ["물리 크리티컬 히트", "마법 크리티컬 히트"].includes(temp[key].name)
        ) {
          newData.Critical = temp[key].value;
        } else {
          newLs.push(temp[key]);
        }
      }

      if (newData.ElementIncrease > 0) {
        const newList: Status = {
          name: "속성 강화",
          value: newData.ElementIncrease,
        };
        newLs.push(newList);
      }
      if (newData.Attack > 0) {
        const newList: Status = {
          name: "공격력",
          value: newData.Attack,
        };
        newLs.push(newList);
      }

      if (newData.Stat > 0) {
        const newList: Status = {
          name: "스탯",
          value: newData.Stat,
        };
        newLs.push(newList);
      }

      if (newData.Critical !== 0) {
        const newList: Status = {
          name: "크리티컬",
          value: newData.Critical,
        };
        newLs.push(newList);
      }

      data.enchant.status = newLs;
    }

    return data;
  };

  useEffect(() => {
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
            <div className={styled.itemSlot} key={item.slotId}>
              <div className={styled.itemInfo} key={item.itemId + "info"}>
                <img
                  key={item.itemId + "infoImg"}
                  src={`https://img-api.neople.co.kr/df/items/${item.itemId}`}
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
