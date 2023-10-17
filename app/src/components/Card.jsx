import React, { useState } from "react";
function Card() {
  const [blockquotes, setBlockquotes] = useState([]);
  const addCard = () => {
    const newBlockquotes = [
      ...blockquotes,
      <blockquote key={blockquotes.length} contentEditable={true}>
        <p>Edit this content to add your own quote</p>
      </blockquote>,
    ];
    setBlockquotes(newBlockquotes);
  };
  return (
    <>
      <button onClick={addCard}>+</button>
      <div className="card">
        {blockquotes.map((blockquote, index) => (
          <div key={index}>{blockquote}</div>
        ))}
      </div>
    </>
  );
}
export default Card;
