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


import { useState, useEffect } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [likedMemes, setLikedMemes] = useState([]);
  const [userUploadedMemes, setUserUploadedMemes] = useState([]);

  // Load profile and liked memes from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBio = localStorage.getItem('bio');
    const storedProfilePicture = localStorage.getItem('profilePicture');
    const storedLikedMemes = JSON.parse(localStorage.getItem('likedMemes')) || [];
    const storedUserUploadedMemes = JSON.parse(localStorage.getItem('userUploadedMemes')) || [];

    if (storedName) setName(storedName);
    if (storedBio) setBio(storedBio);
    if (storedProfilePicture) setProfilePicture(storedProfilePicture);
    if (storedLikedMemes) setLikedMemes(storedLikedMemes);
    if (storedUserUploadedMemes) setUserUploadedMemes(storedUserUploadedMemes);
  }, []);

  // Handle profile updates
  const handleProfileUpdate = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('bio', bio);
    localStorage.setItem('profilePicture', profilePicture);
    alert('Profile updated successfully!');
  };

  // Handle meme liking (this could be from the Meme Explorer or other pages)
  const handleLikeMeme = (memeId) => {
    const updatedLikedMemes = [...likedMemes, memeId];
    setLikedMemes(updatedLikedMemes);
    localStorage.setItem('likedMemes', JSON.stringify(updatedLikedMemes));
  };

  // Handle meme upload (this could be done from an Upload Meme form)
  const handleUploadMeme = (meme) => {
    const updatedUserUploadedMemes = [...userUploadedMemes, meme];
    setUserUploadedMemes(updatedUserUploadedMemes);
    localStorage.setItem('userUploadedMemes', JSON.stringify(updatedUserUploadedMemes));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        {/* Profile Picture */}
        <img
          src={profilePicture || '/default-profile.jpg'}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))}
          className="border p-2 rounded-md"
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

      {/* User-Uploaded Memes */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Your Uploaded Memes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {userUploadedMemes.length === 0 ? (
            <p>No memes uploaded yet.</p>
          ) : (
            userUploadedMemes.map((meme, index) => (
              <div key={index} className="border p-4 rounded-md bg-white shadow-md">
                <img src={meme.image} alt={meme.title} className="w-full h-48 object-cover rounded-md mb-2" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{meme.title}</h3>
                  <p className="text-sm text-gray-500">{meme.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Liked Memes */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Liked Memes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {likedMemes.length === 0 ? (
            <p>No liked memes yet.</p>
          ) : (
            likedMemes.map((memeId, index) => (
              <div key={index} className="border p-4 rounded-md bg-white shadow-md">
                <img
                  src={`/memes/${memeId}.jpg`} // You would replace this with the actual meme data
                  alt={`Meme ${memeId}`}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">Meme {memeId}</h3>
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
