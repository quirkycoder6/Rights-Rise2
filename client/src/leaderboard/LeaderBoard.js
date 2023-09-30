import React, { useEffect, useState } from 'react';
import Leftbar from '../components/leftbar';
import Dailyquest from "../components/dailyquest";
import Navbar from "../components/navbar";

const LeaderBoard = () => {

  const [board, setBoard] = useState(null);

useEffect(() => {
  async function leaderboardPoints() {
    const response = await fetch("http://localhost:3001/api/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setBoard(data);
      console.log(data);
    } else {
      const data = await response.json();
      alert(data.error);
    }
  }

  leaderboardPoints();
}, []);

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
          <div className="flex  flex-grow justify-center items-center">
              <div id="profile" className="flex justify-center items-center">
                  {board ? <Items data={board} /> : <p>Loading...</p>}
              </div>
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
    // </div>
  );
}

function Items({ data }) {
  return (
    <div className='flex flex-col items-center justify-center mb-12'>
    <div className=' mb-4'><h1 className='text-[31px]'>LeaderBoard</h1></div>
    <div>
    <table className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-200 font-semibold text-gray-700">
            Name
          </th>
          <th className="py-2 px-4 bg-gray-200 font-semibold text-gray-700">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => (
          <tr  key={index}>
            <td className="py-2 px-4 border-b border-gray-200 text-center w-72">{value.username}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center w-72">{value.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
}

export default LeaderBoard;
