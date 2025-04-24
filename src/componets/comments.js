import React, { useState } from "react";

const Comments = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [reply, setReply] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(comment.content);
  };

  const handleChange = (e) => {
    if (editMode) {
      setEditedContent(e.target.value);
    } else {
      setReply(e.target.value);
    }
  };

  const handleReplySubmit = () => {
    if (reply.trim()) {
      onSubmitComment(comment.id, reply.trim());
      setReply("");
    }
  };

  const handleEditSubmit = () => {
    if (editedContent.trim()) {
      onEditComment(comment.id, editedContent.trim());
      setEditMode(false);
    }
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-info">Votes: {comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div className="add-comment">
          <textarea
            value={editedContent}
            rows={3}
            cols={50}
            placeholder="Edit your comment"
            className="comment-textarea"
            onChange={handleChange}
          />
          <button className="comment-button" onClick={handleEditSubmit}>
            Save Edit
          </button>
          <button className="comment-button" onClick={toggleEditMode}>
            Cancel Edit
          </button>
        </div>
      )}

      <div className="comment-action">
        <button className="comment-button" onClick={() => setExpand(!expand)}>
          {expand ? "Hide" : "Reply"}
        </button>
        <button className="comment-button" onClick={toggleEditMode}>
          Edit
        </button>
        <button
          className="comment-button"
          onClick={() => onDeleteComment(comment.id)}
        >
          Delete
        </button>
      </div>

      {expand && (
        <>
          <div className="comment-replies">
            <div className="add-comment">
              <textarea
                value={reply}
                rows={3}
                cols={50}
                placeholder="Add a reply"
                className="comment-textarea"
                onChange={handleChange}
              />
              <button className="comment-button" onClick={handleReplySubmit}>
                Add reply
              </button>
            </div>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="nested-replies">
              {comment.replies.map((replyComment) => (
                <Comments
                  key={replyComment.id}
                  comment={replyComment}
                  onSubmitComment={onSubmitComment}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
