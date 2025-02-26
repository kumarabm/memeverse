// import { useState } from 'react';
// import Link from 'next/link'; // Import Link component from Next.js
// import MemeUploader from '../components/MemeUploader';

// const Upload = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(URL.createObjectURL(file)); // Show preview
//   };

//   return (
//     <div className="p-4 min-h-screen flex flex-col">
//       <h1 className="text-2xl font-bold">Upload Your Meme</h1>

//       <input type="file" onChange={handleFileChange} className="mt-4" />
//       {file && <img src={file} alt="Preview" className="mt-4" />}
//       <MemeUploader file={file} />

//       {/* Back Button at the bottom of the page */}
//       <div className="mt-9">
//         <Link href="/" className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
//           &larr; Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Upload;


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MemeUploader from "../components/MemeUploader";
import TextEditor from "../components/TextEditor";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [aiCaption, setAiCaption] = useState("");
  const router = useRouter();

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Generate AI Caption (Dummy API Call)
  const generateAICaption = async () => {
    try {
      const response = await fetch("/api/generateCaption", { method: "POST" });
      const data = await response.json();
      setAiCaption(data.caption);
    } catch (error) {
      console.error("Error generating AI caption:", error);
    }
  };

  // Handle Meme Upload
  const handleUpload = () => {
    if (file) {
      const newMeme = {
        id: Date.now(),
        image: URL.createObjectURL(file), // Temporary preview URL
        title: caption || aiCaption || "Untitled Meme",
        description: "Uploaded meme",
      };

      // Retrieve existing memes from localStorage
      const storedMemes = JSON.parse(localStorage.getItem("userUploadedMemes")) || [];

      // Update state and localStorage
      const updatedMemes = [...storedMemes, newMeme];
      localStorage.setItem("userUploadedMemes", JSON.stringify(updatedMemes));

      // Reset state after upload
      setFile(null);
      setCaption("");
      setAiCaption("");
      alert("Meme uploaded successfully!");
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold">Upload Your Meme</h1>

      {/* File input */}
      <input type="file" onChange={handleFileChange} className="mt-4" accept="image/*,video/*" />

      {/* File Preview */}
      {file && (
        <div className="mt-4">
          <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-full h-auto" />
        </div>
      )}

      {/* Caption Text Editor */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Add a Caption:</h2>
        <TextEditor content={caption} setContent={setCaption} />
      </div>

      {/* AI Caption Generator */}
      <div className="mt-4">
        <button onClick={generateAICaption} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Generate AI Caption
        </button>
        {aiCaption && <p className="mt-2 text-gray-700 dark:text-white"><strong>AI Generated:</strong> {aiCaption}</p>}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Upload Meme
      </button>

      {/* Back Button */}
      <button onClick={() => router.back()} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
        &larr; Back
      </button>

      {/* Link to Meme Explorer */}
      <div className="mt-4">
        <Link href="/memeExplorer" legacyBehavior>
          <a className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            View Meme Explorer
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Upload;


