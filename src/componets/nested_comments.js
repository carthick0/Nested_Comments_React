import React, { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import Comments from "./comments";

import "./styles.css";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [comment, setComment] = useState("");
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
    onSubmit(content);
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
    onDelete(commentId);
  };
  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          rows={2}
          cols={50}
          placeholder="Add a new comment"
          className="comment-textarea"
          onChange={handleChange}
        />
        <button className="comment-button" onClick={handleSubmit}>
          Add comment
        </button>
      </div>

      {commentsData.map((comment) => {
        return (
          <Comments
            key={comment.id}
            comment={comment}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
          />
        );
      })}
    </>
  );
};

export default NestedComments;
