import React from 'react';
import Leftbar from '../components/leftbar';
import Dailyquest from "../components/dailyquest";
import Navbar from "../components/navbar";

const LeaderBoard = () => {
  return (
    <div>
      <div className="flex-col flex">
        <div className="my-5">
          <Navbar />
        </div>
        <div className="flex justify-between gap-3 mt-7 px-5">
          <div>
            <Leftbar />
          </div>
          <div className="flex justify-between flex-grow">
            <div className="bg-white p-4 rounded shadow-md">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Player 1</td>
                    <td>1000</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-5">
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
    </div>
  );
}

export default LeaderBoard;
