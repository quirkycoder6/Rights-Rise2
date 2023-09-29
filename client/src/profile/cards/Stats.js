import React from "react";
import fire from "../asset/fire.png";
import badge from "../asset/badge.png";
import light from "../asset/light-bulb.png";
import coin from "../asset/star.png";
import "../css/stats.css";
import { useSelector } from "react-redux";

const Stats = () => {
  const exp = useSelector((state) => state.user.score);
  console.log(exp);
  
  var coins = exp / 10 + 40,
    count = 3,
    medal = "";
  if (exp < 300) {
    medal = "Bronze";
  } else if (exp >= 300 && exp < 700) {
    medal = "Silver";
  } else if (exp >= 700 && exp < 1000) {
    medal = "Gold";
  } else {
    medal = "Diamond";
  }
  return (
    <div className="stats">
      <div className="cards card1">
        <div className="icon">
          <img src={fire} alt="fire" style={{ height: 90, width: 90 }}></img>
        </div>
        <div className="desc">{count} DAY Streak</div>
      </div>
      <div className="cards card2">
        <div className="icon">
          <img src={light} alt="fire" style={{ height: 90, width: 90 }}></img>
        </div>
        <div className="desc">{exp} EXP</div>
      </div>
      <div className="cards card3">
        <div className="icon">
          <img src={badge} alt="fire" style={{ height: 90, width: 90 }}></img>
        </div>
        <div className="desc">{medal} League</div>
      </div>
      <div className="cards card4">
        <div className="icon">
          <img src={coin} alt="fire" style={{ height: 90, width: 90 }}></img>
        </div>
        <div className="desc">{coins} Points</div>
      </div>
    </div>
  );
};

export default Stats;
