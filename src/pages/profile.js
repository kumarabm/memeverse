// pages/profile.js
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulating fetching user data (you can replace this with actual API call)
    const fetchUserData = () => {
      const dummyData = {
        username: 'Kumara123',
        email: 'kumara@gmail.com',
        profilePic: 'https://via.placeholder.com/150',
        bio: 'Hard Work Never Fail',
      };
      setUserData(dummyData);
    };

    fetchUserData();
  }, []);  // Empty array ensures this runs once when component mounts

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container max-w-2xl mx-auto p-4">
      <div className="flex items-center space-x-4">
        {/* Profile picture */}
        <img src={userData.profilePic} alt="Profile Picture" className="w-24 h-24 rounded-full" />
        
        <div>
          <h1 className="text-2xl font-bold">{userData.username}</h1>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p className="text-gray-700">{userData.bio}</p>
      </div>

      {/* Optionally, you can add more sections like posts, followers, etc. */}
    </div>
  );
};

export default Profile;
