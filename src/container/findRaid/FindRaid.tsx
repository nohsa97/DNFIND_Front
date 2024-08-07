import React, { Component } from "react";
import Navigator from "../../component/navigator/Navigator";
import styled from "./FindRaid.module.css";

export class FindRaid extends Component {
  render() {
    return (
      <div className={styled.mainBox}>
        {/* 헤더 부분 */}
        <div className={styled.header}>
          <Navigator />
        </div>

        <div className={styled.section}>
          {/* 박스 내용 */}
          <div className={styled.mainSection}>
            <h1 className={styled.title}>DNFIND</h1>
            <hr style={{ color: "black", width: "70%" }} />

            <p className={styled.text}>
              공대장을 위한 공대원 검색 사이트 입니다.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default FindRaid;
