import React, { useState } from 'react';  // Import useState

const MemeUploader = () => {
  const [meme, setMeme] = useState(null);  // Example of using useState

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setMeme(file);
  };

  return (
    <div>
      <h1>Upload your meme</h1>
      <input type="file" onChange={handleFileChange} />
      {meme && <p>Selected file: {meme.name}</p>}
    </div>
  );
};

export default MemeUploader;
