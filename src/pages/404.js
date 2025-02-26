import Link from 'next/link';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const [randomMeme, setRandomMeme] = useState(null);

  // Array of meme image URLs or meme objects
  const memes = [
    '/memes/404meme1.jpg', // Add meme image paths or URLs
    '/memes/404meme2.jpg',
    '/memes/404meme3.jpg',
    '/memes/404meme4.jpg',
    '/memes/404meme5.jpg',
  ];

  // Select a random meme when the page loads
  useEffect(() => {
    const memeIndex = Math.floor(Math.random() * memes.length);
    setRandomMeme(memes[memeIndex]);
  }, []);

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gray-100 text-center p-4">
      {/* Meme Image */}
      <div className="mb-8">
        <img
          src={randomMeme}
          alt="404 Meme"
          className="w-72 h-72 object-cover rounded-lg shadow-xl"
        />
      </div>
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Oops! This Page Does Not Exist!
      </h1>

      {/* Funny Message */}
      <p className="text-xl text-gray-600 mb-8">
        It seems like you've ventured into the void... 
        Don't worry, we'll get you back to meme heaven!
      </p>

      {/* Link to Home Page */}
      <Link href="/">
        <a className="text-lg text-blue-500 hover:text-blue-700">
          Back to the Memes 🡆
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
