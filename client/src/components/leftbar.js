import React from "react";
import { useNavigate } from "react-router-dom";
import {HomeSvg, LeaderboardSvg, MoreOptionsSvg, MoreSvg, ProfileSvg } from "./svgs";
import stories_icon from '../profile/asset/stories.png'
import games_icon from '../profile/asset/games.png'
import legal_icon from '../profile/asset/legal.png'
import WordGuess from '../components/wordguess/wordguess'

const Leftbar = () => {

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/lawquest/profile')
  }
  const handlePuzzlesGamesClick = () => {
    navigate('/lawquest/puzzles')
  }
  const handleLegalABCsClick = () => {
    navigate('/lawquest/legal')
  }
  const handleLeaderboardClick = () => {
    navigate('/lawquest/leaderboard')
  }
  const handleStoriesClick = () => {
    navigate('/lawquest')
  }
  const handleMoreClick = () => {
    navigate('/lawquest/more')
  }

  return (
    <div className="flex md:flex-col gap-3">
      <div onClick={handleStoriesClick}  style={{ cursor: "pointer" }} className="flex lg:flex-col border-blue-500 border-2 rounded-2xl bg-blue-100">
        <div className="flex items-center py-1 md:py-2 px-1 md:px-2 gap-3">
          <img src={stories_icon} className="h-[50px] w-[50px]" style={{width: "32", height:"32", viewBox:"0 0 32 32", fill:"none"}}/>
          <h1 className="text-sm font-bold hidden lg:block text-blue-400">
            STORIES
          </h1>
        </div>
      </div>
      <div onClick={handlePuzzlesGamesClick}  style={{ cursor: "pointer" }} className="flex lg:flex-col border-blue-500 border-2 rounded-2xl bg-blue-100">
        <div className="flex items-center py-1 md:py-2 px-1 md:px-2 gap-3">
          <img src={games_icon} className="h-[50px] w-[50px]" style={{width: "32", height:"32", viewBox:"0 0 32 32", fill:"none"}}/>
          <h1 className="text-sm font-bold hidden lg:block text-blue-400">
            Puzzles & Games
          </h1>
        </div>
      </div>
      <div onClick={handleLegalABCsClick}  style={{ cursor: "pointer" }} className="flex lg:flex-col border-blue-500 border-2 rounded-2xl bg-blue-100">
        <div className="flex items-center py-1 md:py-2 px-1 md:px-2 gap-3">
          <img src={legal_icon} className="h-[50px] w-[50px]" style={{width: "32", height:"32", viewBox:"0 0 32 32", fill:"none"}}/>
          <h1 className="text-sm font-bold hidden lg:block text-blue-400">
            Legal ABCs
          </h1>
        </div>
      </div>
      <div onClick={handleLeaderboardClick}  style={{ cursor: "pointer" }} className="flex lg:flex-col  border-2 rounded-2xl bg-blue-100">
        <div className="flex items-center py-1 md:py-2 px-1 md:px-2 gap-3">
          <LeaderboardSvg />
          <h1 className="text-sm font-bold hidden lg:block text-blue-400">
            LEADERBOARD
          </h1>
        </div>
      </div>
      <div onClick={handleProfileClick}  style={{ cursor: "pointer" }} className="flex lg:flex-col  border-2 rounded-2xl bg-blue-100">
        <div className="flex items-center py-1 md:py-2 px-1 md:px-2 gap-3">
          <ProfileSvg />
          <h1 className="text-sm font-bold hidden lg:block text-blue-400">
            PROFILE
          </h1>
        </div>
      </div>
      <div onClick={handleMoreClick}  style={{ cursor: "pointer" }} className="flex lg:flex-col  border-2 rounded-2xl bg-blue-100">
        <div className="flex items-center py-1 md:py-2 px-1 md:px-2 gap-3">
          <MoreSvg />
          <h1 className="text-sm font-bold hidden lg:block text-blue-400">
            MORE
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
