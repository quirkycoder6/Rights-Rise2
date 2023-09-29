import React from 'react'
import { useState, useEffect } from 'react';
const VideoPlayer = ({videoFilename}) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Fetch the video URL from the backend
    fetch(`http://localhost:3001/api/videos/${videoFilename}`)
      .then((response) => {
        if (response.status === 200) {
          return response.blob();
        } else {
          throw new Error('Video not found');
        }
      })
      .then((videoBlob) => {
        // Create a URL for the video blob
        const videoObjectURL = URL.createObjectURL(videoBlob);
        setVideoUrl(videoObjectURL);
      })
      .catch((error) => {
        console.error('Error fetching video:', error);
      });

    // Cleanup the video URL when the component unmounts
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoFilename]);

  return (
    <div>
      {videoUrl ? (
        <video className='ml-10 rounded-lg' controls width="640" height="360">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPlayer