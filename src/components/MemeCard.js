const MemeCard = ({ meme }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <img src={meme.url} alt={meme.name} className="w-full h-auto rounded-lg" />
        <h3 className="text-xl font-semibold mt-2">{meme.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{meme.box_count} text boxes</p>
      </div>
    );
  };
  
  export default MemeCard;
  