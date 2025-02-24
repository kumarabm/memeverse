// pages/api/memes.js
export default function handler(req, res) {
    const { page = 1, filter = 'Trending', search = '', sortBy = 'likes' } = req.query;
  
    // Mock meme data
    const memes = [
      { id: 1, image: '/images/meme1.jpg', title: 'Meme 1', description: 'Meme description 1', likes: 120, comments: 10 },
      { id: 2, image: '/images/meme2.jpg', title: 'Meme 2', description: 'Meme description 2', likes: 200, comments: 15 },
      // Add more memes...
    ];
  
    // Filter memes based on search (you can improve the filter logic)
    const filteredMemes = memes.filter(
      (meme) => meme.title.toLowerCase().includes(search.toLowerCase()) || meme.description.toLowerCase().includes(search.toLowerCase())
    );
  
    // Apply sorting logic
    const sortedMemes = filteredMemes.sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'comments') return b.comments - a.comments;
      return 0;
    });
  
    // Paginate the results
    const memesToShow = sortedMemes.slice((page - 1) * 10, page * 10);
  
    res.status(200).json({ memes: memesToShow });
  }
  