// CommentItem.jsx
import React, { useState } from "react";
import axios from "axios";

const CommentItem = ({ comment }) => {
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);

  const handleReplySubmit = async () => {
    if (reply.trim()) {
      const updatedReplies = [...replies, { text: reply }];
      setReplies(updatedReplies);

      // 댓글 데이터 업데이트 요청
      await axios.put(`http://localhost:3001/findlist/${comment.id}`, {
        ...comment,
        replies: updatedReplies,
      });

      setReply(""); // 입력란 초기화
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        paddingLeft: "20px",
        borderLeft: "1px solid #ddd",
      }}
    >
      <p>{comment.text}</p>

      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
      />
      <button onClick={handleReplySubmit}>Reply</button>

      <div style={{ marginTop: "10px" }}>
        {replies.map((r, index) => (
          <div key={index} style={{ marginLeft: "20px", fontStyle: "italic" }}>
            - {r.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentItem;
