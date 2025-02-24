import { useState } from 'react';
import Link from 'next/link'; // Import Link component from Next.js
import MemeUploader from '../components/MemeUploader';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file)); // Show preview
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold">Upload Your Meme</h1>

      <input type="file" onChange={handleFileChange} className="mt-4" />
      {file && <img src={file} alt="Preview" className="mt-4" />}
      <MemeUploader file={file} />

      {/* Back Button at the bottom of the page */}
      <div className="mt-9">
        <Link href="/" className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Upload;
