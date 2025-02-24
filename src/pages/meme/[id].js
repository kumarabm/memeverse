import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Link from 'next/link';

const MemeDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get meme ID from URL
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // Mock meme data (updated to have comments as an array)
  const memes = [
    { id: '1', image: '/images/meme1.jpg', title: 'Meme 1', description: 'Funny meme 1', likes: 120, comments: [] },
    { id: '2', image: '/images/meme2.jpg', title: 'Meme 2', description: 'Funny meme 2', likes: 200, comments: [] },
    // Add more meme data...
  ];

  // Find the meme based on the ID
  useEffect(() => {
    if (id) {
      const memeData = memes.find((m) => m.id === id);
      if (memeData) {
        setMeme(memeData);
        setLikes(memeData.likes);
        setComments(memeData.comments);
      }
    }
  }, [id]);

  // Handle comment input change (debounced)
  const handleCommentChange = debounce((e) => {
    setCommentText(e.target.value);
  }, 500);

  // Handle adding a comment
  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setCommentText('');
      localStorage.setItem(`meme_${id}_comments`, JSON.stringify(updatedComments)); // Store in localStorage
    }
  };

  // Handle like button click (with animation)
  const handleLike = () => {
    setIsLiked(!isLiked);
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`meme_${id}_likes`, newLikes); // Store in localStorage
  };

  // Load likes and comments from localStorage on page load
  useEffect(() => {
    if (id) {
      const storedLikes = localStorage.getItem(`meme_${id}_likes`);
      const storedComments = localStorage.getItem(`meme_${id}_comments`);
      if (storedLikes) setLikes(parseInt(storedLikes));
      if (storedComments) setComments(JSON.parse(storedComments)); // Ensure comments are parsed as an array
    }
  }, [id]);

  if (!meme) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Meme Details */}
      <div className="border p-6 rounded-md bg-white shadow-md">
        <img src={meme.image} alt={meme.title} className="w-full h-72 object-cover rounded-md mb-4" />
        <h2 className="text-2xl font-bold">{meme.title}</h2>
        <p className="text-gray-600">{meme.description}</p>

        {/* Like Button */}
        <div className="flex items-center my-4">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            style={{ animation: isLiked ? 'likeAnimation 0.3s ease-in-out' : '' }}
          >
            <span className="material-icons">thumb_up</span>
            <span>{likes} Likes</span>
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Comments</h3>
          <div className="mb-4">
            <textarea
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="border p-2 w-full rounded-md"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>

          <div>
            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2 p-2 bg-gray-100 rounded-md">
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="mt-6 text-center">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Share Meme
        </button>
      </div>

             {/* Back Button at the bottom */}
      <div className="mt-4">
        <button
          onClick={() => router.back()} // Go to previous page
          className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

export default MemeDetails;
