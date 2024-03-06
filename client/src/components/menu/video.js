import React, { useState } from 'react';
import video1 from '../../profile/asset/video1.mp4'
import video2 from '../../profile/asset/video2.mp4'
import video3 from '../../profile/asset/video3.mp4'
import video4 from '../../profile/asset/Video4.mp4'
import video5 from '../../profile/asset/Video5.mp4'

const Stories = () => {
  const videoData = [
    { title: 'Right to Education', src: video1 },
    { title: 'Right to protection from Abuse', src: video2 },
    { title: 'Right to protection from Child Labour', src: video3 },
    { title: 'Right to Health', src: video4 },
    { title: 'Right of protection from Social Injustice', src: video5 },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  const goBack = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      {selectedVideo ? (
        <div>
          <h3 class="text-center">{selectedVideo.title}</h3>
          <video class="rounded" width="640" height="480" controls autoPlay>
            <source src={selectedVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button class="ml-60 mt-5 max-w-50 rounded-2xl border-b-4 border-yellow-700 bg-yellow-600 px-10 py-3 text-center font-bold uppercase transition cursor-pointer hover:border-yellow-600 hover:bg-yellow-500 md:min-w-5" onClick={goBack}>Go Back</button>
        </div>
      ) : (
        <div>
          <h1 className="mt-5 ml-24 mb-3" style={{ fontSize: '24px' }}>Video Playlist</h1>
          <br/>
          <ul style={{ listStyleType: 'disc' }}>
            {videoData.map((video, index) => (
              <li key={index} onClick={() => playVideo(video)} style={{ cursor: 'pointer' }}>
                {video.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stories;
