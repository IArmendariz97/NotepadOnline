// Home.js
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import CreateNote from "./CreateNote";
import MyNotes from "./MyNotes";
import ArchivedNotes from "./ArchivedNotes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../store/store";
import { clearUser } from "../../features/user/userSlice";
const { Header, Content } = Layout;

const Home = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("createNote");
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("User");
    persistor.purge();
    dispatch(clearUser());
    setTimeout(() => {
      // window.location.reload();
      navigate("/");
    }, 1000);

    if (onLogout) {
      onLogout();
    }
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case "createNote":
        return <CreateNote />;
      case "myNotes":
        return <MyNotes />;
      case "archivedNotes":
        return <ArchivedNotes />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Header style={{ width: "100%" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedTab]}
          style={{ padding: 0, margin: 0 }}
        >
          <Menu.Item
            key="createNote"
            onClick={() => setSelectedTab("createNote")}
          >
            Create Note
          </Menu.Item>
          <Menu.Item key="myNotes" onClick={() => setSelectedTab("myNotes")}>
            My Notes
          </Menu.Item>
          <Menu.Item
            key="archivedNotes"
            onClick={() => setSelectedTab("archivedNotes")}
          >
            Archived Notes
          </Menu.Item>

          <Menu.Item
            key="logout"
            onClick={handleLogout}
            style={{ float: "right", position: "absolute", right: "3%" }}
          >
            LOGOUT
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ height: "89vh", padding: "0px" }}>
        {renderComponent()}
      </Content>
    </Layout>
  );
};

export default Home;
