import React from "react";
import Leftbar from "../components/leftbar";
import Dailyquest from "../components/dailyquest";
import Navbar from "../components/navbar";
import Video from "../components/menu/video";

const Dashboard = () => {
  return (
    <div className="flex-col flex" style={{overflow:"hidden"}}>
      <div className="my-5">
        <Navbar />
      </div>
      <div className="flex justify-around gap-3 mt-7 px-5">
        <div className="hidden md:block">
          <Leftbar />
        </div>
        <div className="flex justify-center lg:justify-around sm:gap-3 flex-grow">
          <div className="rounded-2x1 flex h-1 items-center flex-col gap-4">
            <Video/>
            {/* <Units module="" chapter="Right to Education" />
            <Units module="2" chapter="Child Labour"/>
            <Units module="3" chapter="IT Rules"/> */}
          </div>
          <div className="flex items-center flex-col gap-5">
            <Dailyquest />
            <Dailyquest />
            <Dailyquest />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full mb-3 md:hidden bg-white border-gray-300">
        <div className="flex justify-around items-center">
          <Leftbar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
