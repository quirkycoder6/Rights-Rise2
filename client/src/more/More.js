import React from 'react';
import UploadVideo from "../create/uploadVideo"
import Gamess from "../components/Gamesmaker"
import Leftbar from '../components/leftbar';
const More = () => {
  return (
    <div className='flex flex-row'>
    <div className='pt-[68px] ml-5'>
      <Leftbar/>
    </div>
    <div>
      <div className='pt-18'>
      <UploadVideo/>
      </div>
      <div>
      <Gamess/>
      </div>
    </div>
    </div>
  );
}

export default More;


