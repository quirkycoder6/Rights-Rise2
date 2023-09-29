import React from "react";
import "../css/user.css";
import userImg from "../asset/user.png";
import { useSelector } from "react-redux";

const UserCard = () => {
  const fullName = useSelector((state) => state.user.name);
  const userName = useSelector((state) => state.user.email);
  var userImage = "";
  return (
    <div className="userSec">
      <div className="userPic">
        <img className="userImg" src={userImage || userImg} alt="userimg"></img>
      </div>
      <div className="info">
        <p
          id="fname"
          style={{
            fontSize: 33,
            position: "relative",
            bottom: 7,
            color: "#fff",
          }}
        >
          {fullName}
        </p>
        <p
          style={{
            fontSize: 18,
            position: "relative",
            bottom: 0,
            color: "#fff",
          }}
        >
          {userName}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
