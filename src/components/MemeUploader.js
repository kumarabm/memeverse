// import React, { useState } from 'react';  // Import useState

// const MemeUploader = () => {
//   const [meme, setMeme] = useState(null);  // Example of using useState

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setMeme(file);
//   };

//   return (
//     <div>
//       <h1>Upload your meme</h1>
//       <input type="file" onChange={handleFileChange} />
//       {meme && <p>Selected file: {meme.name}</p>}
//     </div>
//   );
// };

// export default MemeUploader;

import React, { useState } from "react";

const MemeUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [memes, setMemes] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle meme upload
  const handleUpload = () => {
    if (selectedFile) {
      const newMeme = {
        id: Date.now(),
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
      };
      setMemes([...memes, newMeme]);
      setSelectedFile(null); // Reset selection
    }
  };

  // Handle meme deletion
  const handleDelete = (id) => {
    setMemes(memes.filter((meme) => meme.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Upload Section */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && (
        <div className="mt-4">
          <p className="text-gray-700">Preview:</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <button
            onClick={handleUpload}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      )}

      {/* Uploaded Memes List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Uploaded Memes:</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {memes.map((meme) => (
            <div key={meme.id} className="relative group">
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <button
                onClick={() => handleDelete(meme.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeUploader;
