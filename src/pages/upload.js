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
import TextEditor from "../components/TextEditor"; // Import the text editor

const Upload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(""); // Caption from text editor
  const [aiCaption, setAiCaption] = useState(""); // AI-generated caption
  const router = useRouter();

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file)); // Show preview
  };

  // Generate AI Caption
  const generateAICaption = async () => {
    try {
      const response = await fetch("/api/generateCaption", { method: "POST" });
      const data = await response.json();
      setAiCaption(data.caption); // Update AI-generated caption
    } catch (error) {
      console.error("Error generating AI caption:", error);
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold">Upload Your Meme</h1>

      {/* File input */}
      <input type="file" onChange={handleFileChange} className="mt-4" accept="image/*,video/*" />
      
      {/* File Preview */}
      {file && <img src={file} alt="Preview" className="mt-4 max-w-full h-auto" />}

      {/* Caption Text Editor */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Add a Caption:</h2>
        <TextEditor content={caption} setContent={setCaption} />
      </div>

      {/* AI-generated Caption */}
      <div className="mt-4">
        <button onClick={generateAICaption} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Generate AI Caption
        </button>
        {aiCaption && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-white">
              <strong>AI Generated Caption:</strong> {aiCaption}
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {file && <MemeUploader file={file} caption={caption || aiCaption} />}

      {/* Back Button */}
      <div className="mt-4">
        <button onClick={() => router.back()} className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          &larr; Back
        </button>
      </div>

      {/* Link to Meme Explorer */}
      <div className="mt-4">
        <Link href="/memeExplorer" legacyBehavior>
          <a className="block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            View Meme Explorer
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Upload;

