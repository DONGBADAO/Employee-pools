import React, { useEffect, useState } from "react";
import { Avatar, Layout, Skeleton, Table } from "antd";
import "./LeaderBoardPage.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { fetchAllUser } from "../reducers/users/user.actions";
import { reduce, concat, size, sortBy } from "lodash";
import { UserOutlined } from "@ant-design/icons";

const { Content } = Layout;

const columns = [
  {
    title: "Users",
    dataIndex: "user",
    key: "user",
    render: (_, { user }) => (
      <div className="user-contain">
        <Avatar
          src={user?.avatarURL}
          icon={<UserOutlined />}
          alt={user?.name}
        />
        <div className="user-info">
          <span className="fw-bold">{user?.name}</span>
          <span className="small text-secondary">{user?.userId}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Answered",
    dataIndex: "answered",
    key: "answered",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
];

const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const [leaderBoardData, setLeaderBoardData] = useState(null);
  const allUser = useSelector((state) => state.userState.allUser);

  useEffect(() => {
    if (allUser) {
      const data = reduce(
        allUser,
        (result = [], user) => {
          return concat(result, {
            key: user.id,
            user,
            answered: Object.keys(user.answers).length,
            created: size(user.questions),
          });
        },
        []
      );
      sortBy(data, ["answered", "created"]);
      setLeaderBoardData(data);
    }
  }, [allUser]);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  return (
    <Layout className="leader-board-page">
      <Header />
      <Content className="p-4">
        {leaderBoardData ? (
          <Table columns={columns} dataSource={leaderBoardData} bordered />
        ) : (
          <Skeleton />
        )}
      </Content>
    </Layout>
  );
};

export default LeaderBoardPage;
