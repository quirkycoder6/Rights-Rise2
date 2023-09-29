// import React, { useState } from 'react';
import Games from './Games';
import VideoPlayer from '../video_player/VideoPlayer';
import Leftbar from './leftbar';
import Navbar from "../components/navbar";
const Module = () => {

  return (
    <>
    <div className="mb-20"  >
        <Navbar />
      </div>
    <div className='flex flex-row'>
        <div className='ml-4'>
          <Leftbar/>
        </div>
        <div className='flex flex-col justify-center items-center ml-20'>
          <div>
              <VideoPlayer videoFilename="vid.mp4"/>
          </div>
          <div>
            <Games/>
          </div>
      </div>
    </div>
    </>
  );
}

export default Module;
