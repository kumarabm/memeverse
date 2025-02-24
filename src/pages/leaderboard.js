// pages/leaderboard.js
import React from 'react';
import Link from 'next/link'; // Import Link component from Next.js

const Leaderboard = () => {
  return (
    <div className="leaderboard-container max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

      {/* Example leaderboard list */}
      <ul>
        <li className="p-2 border-b">1. Kumara123 - 1000 Points</li>
        <li className="p-2 border-b">2. Kumarabm456 - 950 Points</li>
        <li className="p-2 border-b">3. Kumaravel789 - 900 Points</li>
      </ul>

      {/* Back Button at the bottom */}
      <div className="mt-4">
        <Link href="/" className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
