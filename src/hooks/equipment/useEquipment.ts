import { EquimentDTO, Status } from "../../api/neopleAPI/userInfoAPI";

export const enchantSum = (data: EquimentDTO) => {
  if (data.enchant === undefined) return;

  const newLs: Status[] = [];
  let newData = {
    ElementIncrease: 0,
    Stat: 0,
    Attack: 0,
    Critical: 0,
  };

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
};
