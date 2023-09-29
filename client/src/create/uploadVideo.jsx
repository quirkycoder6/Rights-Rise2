import React, { useState } from 'react';
import { useSelector } from "react-redux";
function UploadVideo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.user._id);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append("userId", userId);

      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // Handle the response from the server
          if (response.ok) {
            console.log('File uploaded successfully');
            setMessage("Video Uploaded successfully.");
          } else {
            setMessage("Error in uploading video.");
            console.error('Failed to upload file');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setMessage("An error occurred.");
        });
    }
  };

  return (
    <div className='container'>
      <input type="file" accept="video/*" onChange={handleFileChange} /> <br></br>
      <button onClick={handleUpload}>Upload</button>
      {message && <p className="error">{message}</p>}
    </div>
    
  );
}

export default UploadVideo;