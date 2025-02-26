
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Simulate generating a caption (replace this with actual logic)
      const generatedCaption = "Funny meme caption generated!";
      res.status(200).json({ caption: generatedCaption });
    } else {
      res.status(405).json({ error: "Method Not Allowed" }); // Handle other HTTP methods (e.g., GET)
    }
  }
  