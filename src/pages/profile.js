// // pages/profile.js
// import React, { useState, useEffect } from 'react';

// const Profile = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Simulating fetching user data (you can replace this with actual API call)
//     const fetchUserData = () => {
//       const dummyData = {
//         username: 'Kumara123',
//         email: 'kumara@gmail.com',
//         profilePic: 'https://via.placeholder.com/150',
//         bio: 'Hard Work Never Fail',
//       };
//       setUserData(dummyData);
//     };

//     fetchUserData();
//   }, []);  // Empty array ensures this runs once when component mounts

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container max-w-2xl mx-auto p-4">
//       <div className="flex items-center space-x-4">
//         {/* Profile picture */}
//         <img src={userData.profilePic} alt="Profile Picture" className="w-24 h-24 rounded-full" />
        
//         <div>
//           <h1 className="text-2xl font-bold">{userData.username}</h1>
//           <p className="text-sm text-gray-500">{userData.email}</p>
//         </div>
//       </div>

//       {/* Bio */}
//       <div className="mt-4">
//         <h2 className="text-lg font-semibold">Bio</h2>
//         <p className="text-gray-700">{userData.bio}</p>
//       </div>

//  {/* Back Button at the bottom */}
//  <div className="mt-4">
//         <button
//           onClick={() => router.back()} // Go to previous page
//           className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//         >
//           &larr; Back
//         </button>
//       </div>
//       {/* Optionally, you can add more sections like posts, followers, etc. */}
//     </div>
//   );
// };

// export default Profile;


import { useState, useEffect } from "react";

const Profile = () => {
  const DEFAULT_PROFILE_PICTURE = "/images/dp.jpg"; // Default image
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("/images/Profile1.jpg");
  const [userUploadedMemes, setUserUploadedMemes] = useState([]);

  // Load profile and uploaded memes from localStorage
  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setBio(localStorage.getItem("bio") || "");
    setProfilePicture(localStorage.getItem("profilePicture") || DEFAULT_PROFILE_PICTURE);
    setUserUploadedMemes(JSON.parse(localStorage.getItem("userUploadedMemes")) || []);
  }, []);

  // Handle profile updates
  const handleProfileUpdate = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
    alert("Profile updated successfully!");
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    if (e.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfilePicture(imageUrl);
      localStorage.setItem("profilePicture", imageUrl);
    }
  };

  // Handle resetting profile picture to default
  const handleResetProfilePicture = () => {
    setProfilePicture(DEFAULT_PROFILE_PICTURE);
    localStorage.setItem("profilePicture", DEFAULT_PROFILE_PICTURE);
  };

  // Handle meme deletion
  const handleDeleteMeme = (id) => {
    const updatedMemes = userUploadedMemes.filter((meme) => meme.id !== id);
    setUserUploadedMemes(updatedMemes);
    localStorage.setItem("userUploadedMemes", JSON.stringify(updatedMemes));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Section */}
      <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-md">
        {/* Profile Picture */}
        <div className="relative">
          <img src={profilePicture} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
          {profilePicture !== DEFAULT_PROFILE_PICTURE && (
            <button
              onClick={handleResetProfilePicture}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              ✕
            </button>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="border p-2 rounded-md w-full"
        />

        {/* Edit Name and Bio */}
        <div className="mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="border p-2 w-full rounded-md mb-2"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Your Bio"
            className="border p-2 w-full rounded-md mb-4"
          />
          <button
            onClick={handleProfileUpdate}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* User-Uploaded Memes Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Your Uploaded Memes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {userUploadedMemes.length === 0 ? (
            <p>No memes uploaded yet.</p>
          ) : (
            userUploadedMemes.map((meme) => (
              <div key={meme.id} className="border p-4 rounded-md bg-white shadow-md relative">
                <img src={meme.image} alt={meme.title} className="w-full h-48 object-cover rounded-md mb-2" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{meme.title}</h3>
                  <p className="text-sm text-gray-500">{meme.description}</p>
                  {/* Delete Meme Button */}
                  <button
                    onClick={() => handleDeleteMeme(meme.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


