import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./router/MainPage";

import FindRaid from "./container/findRaid/FindRaid";
import FindUserPage from "./router/FindUserPage";
import UserInfoPage from "./router/UserInfoPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/findUser" element={<FindUserPage />}></Route>
          <Route path="/findRaid" element={<FindRaid />}></Route>
          <Route path="/userInfo" element={<UserInfoPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
