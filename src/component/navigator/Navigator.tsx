import {
  Box,
  Button,
  createTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import styled from "./Navigator.module.css";
import React from "react";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigate = useNavigate();

  // 드로워 오픈 설정
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  //드로워 스타일
  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#032759",
            color: "white",
          },
        },
      },
    },
  });

  //드로워에 들어가는 아이콘 스타일
  const iconsStyle = { color: "white" };
  const icons = [
    <PersonIcon sx={iconsStyle} />,
    <GroupsIcon sx={iconsStyle} />,
  ];

  //드로워에 들어가는 링크
  const links = ["/findUser", "/findRaid"];

  //드로워 실제
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["홈으로"].map((text) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              ":hover": {
                backgroundColor: "#5a86c4",
              },
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {["캐릭터 정보", "공대원 검색"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              ":hover": {
                backgroundColor: "#5a86c4",
              },
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate(links[index]);
              }}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={styled.header}>
      {/* 로고 */}
      <div>
        <Button onClick={toggleDrawer(true)}>
          <ListIcon sx={{ fontSize: "3.5rem" }} />
        </Button>
        <ThemeProvider theme={theme}>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </ThemeProvider>
      </div>

      <div className={styled.topBox}>
        <img className={styled.logo} src="./img/logo.jpg" alt="배경" />
        <span className={styled.title}>DNFIND</span>
      </div>
    </div>
  );
};

export default Navigator;

// 공대장에게 필요한 기능
// 개인 검색 & 전체 검색 & 해당 모험단에 컷이 적당한 캐릭터가 존재하는지 검색.
