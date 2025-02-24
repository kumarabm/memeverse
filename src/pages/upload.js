import { useState } from 'react';
import MemeUploader from '../components/MemeUploader';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file)); // Show preview
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Upload Your Meme</h1>
      <input type="file" onChange={handleFileChange} />
      {file && <img src={file} alt="Preview" className="mt-4" />}
      <MemeUploader file={file} />
    </div>
  );
};

export default Upload;
