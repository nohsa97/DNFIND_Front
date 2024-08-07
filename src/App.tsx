import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./router/MainPage";
import FindUser from "./container/findUser/FindUser";
import FindRaid from "./container/findRaid/FindRaid";
import UserInfo from "./container/userInfo/UserInfo";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/findUser" element={<FindUser />}></Route>
          <Route path="/findRaid" element={<FindRaid />}></Route>
          <Route path="/userInfo" element={<UserInfo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
