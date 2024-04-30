import React from "react";
import { Rating } from '@mui/material';

const CommentsCard = ({ comment }) => {
  const options = {
    value: comment.rating,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <div className="commentCard">
      <p>{comment?.name}</p>
      <Rating {...options} />
      <span className="commmentCardComment">{comment.comment}</span>
    </div>
  );
};

export default CommentsCard;