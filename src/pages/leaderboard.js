// // pages/leaderboard.js
// import React from 'react';
// import Link from 'next/link'; // Import Link component from Next.js

// const Leaderboard = () => {
//   return (
//     <div className="leaderboard-container max-w-2xl mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

//       {/* Example leaderboard list */}
//       <ul>
//         <li className="p-2 border-b">1. Kumara123 - 1000 Points</li>
//         <li className="p-2 border-b">2. Kumarabm456 - 950 Points</li>
//         <li className="p-2 border-b">3. Kumaravel789 - 900 Points</li>
//       </ul>

//  {/* Back Button at the bottom */}
//  <div className="mt-4">
//         <button
//           onClick={() => router.back()} // Go to previous page
//           className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//         >
//           &larr; Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data (In a real app, this data would be fetched from an API or stored in a database)
  const memes = [
    { id: 1, title: 'Meme 1', image: '/memes/meme1.jpg', likes: 250, comments: 20, shares: 5 },
    { id: 2, title: 'Meme 2', image: '/memes/meme2.jpg', likes: 300, comments: 40, shares: 12 },
    { id: 3, title: 'Meme 3', image: '/memes/meme3.jpg', likes: 220, comments: 30, shares: 8 },
    { id: 4, title: 'Meme 4', image: '/memes/meme4.jpg', likes: 150, comments: 10, shares: 2 },
    { id: 5, title: 'Meme 5', image: '/memes/meme5.jpg', likes: 180, comments: 25, shares: 6 },
    { id: 6, title: 'Meme 6', image: '/memes/meme6.jpg', likes: 275, comments: 35, shares: 9 },
    { id: 7, title: 'Meme 7', image: '/memes/meme7.jpg', likes: 310, comments: 50, shares: 15 },
    { id: 8, title: 'Meme 8', image: '/memes/meme8.jpg', likes: 150, comments: 18, shares: 4 },
    { id: 9, title: 'Meme 9', image: '/memes/meme9.jpg', likes: 350, comments: 60, shares: 20 },
    { id: 10, title: 'Meme 10', image: '/memes/meme10.jpg', likes: 220, comments: 45, shares: 7 },
    // Add more memes as necessary...
  ];

  // Sorting memes by engagement: likes + comments + shares
  useEffect(() => {
    // Calculate engagement score for each meme (likes + comments + shares)
    const memesWithEngagement = memes.map((meme) => ({
      ...meme,
      engagementScore: meme.likes + meme.comments * 2 + meme.shares * 3, // Example of weighting
    }));

    // Sort memes by engagement score in descending order
    memesWithEngagement.sort((a, b) => b.engagementScore - a.engagementScore);

    // Top 10 memes
    setTopMemes(memesWithEngagement.slice(0, 10));
    setLoading(false);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="space-y-6">
            {topMemes.map((meme, index) => (
              <div key={meme.id} className="border p-4 rounded-md bg-white shadow-md flex items-center space-x-4">
                <span className="text-xl font-bold text-gray-700">{index + 1}</span>
                <img
                  src={meme.image}
                  alt={meme.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{meme.title}</h3>
                  <p className="text-sm text-gray-500">
                    {meme.likes} Likes, {meme.comments} Comments, {meme.shares} Shares
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{meme.engagementScore}</span>
                  <span className="text-sm text-gray-400">Engagement Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
