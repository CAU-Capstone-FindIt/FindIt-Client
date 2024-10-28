import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Comments = ({ report }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 댓글을 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/findlist/${report.id}`
      );
      setComments(response.data.comments || []); // comments가 없을 경우 빈 배열 설정
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글을 제출하는 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // 현재 날짜와 시간을 ISO 형식으로 생성
    const timestamp = new Date().toISOString();

    // 새로운 댓글 데이터에 timestamp 추가
    const updatedComments = [
      ...comments,
      { text: newComment, timestamp: timestamp },
    ];

    const updatedReportData = {
      ...report,
      comments: updatedComments,
    };

    try {
      await axios.put(
        `http://localhost:3001/findlist/${report.id}`,
        updatedReportData
      );

      setComments(updatedComments); // 로컬 상태 업데이트
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 제출 오류:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    console.log(report);
  }, [report]);

  return (
    <CommentsContainer>
      <h2>댓글</h2>
      <form onSubmit={handleCommentSubmit}>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <SubmitButton type="submit">댓글 작성</SubmitButton>
      </form>
      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>
            {comment.text}{" "}
            <Timestamp>
              {new Date(comment.timestamp).toLocaleString()}
            </Timestamp>
          </CommentItem>
        ))}
      </CommentList>
    </CommentsContainer>
  );
};

export default Comments;

const CommentsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const CommentInput = styled.input`
  width: 80%;
  padding: 10px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
`;

const CommentList = styled.div`
  margin-top: 1rem;
`;

const CommentItem = styled.div`
  padding: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
  border-radius: 5px;
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: gray;
  margin-left: 10px;
`;
