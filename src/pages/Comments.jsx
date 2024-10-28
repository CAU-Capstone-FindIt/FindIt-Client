import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Comments = ({ report }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyIndex, setReplyIndex] = useState(null); // 대댓글 입력 상태를 관리할 인덱스
  const [newReply, setNewReply] = useState(""); // 대댓글 텍스트 상태

  // 댓글을 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/findlist/${report.id}`
      );
      const commentsData = response.data.comments || [];
      const updatedComments = commentsData.map((comment) => ({
        ...comment,
        replies: comment.replies || [], // replies가 없을 경우 빈 배열 설정
      }));
      setComments(updatedComments);
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글을 제출하는 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();

    const updatedComments = [
      ...comments,
      { text: newComment, timestamp: timestamp, replies: [] },
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

      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      console.error("댓글 제출 오류:", error);
    }
  };

  // 대댓글 제출 함수
  const handleReplySubmit = async (e, index) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();

    // 기존 댓글의 replies 배열에 추가
    const updatedComments = [...comments];
    updatedComments[index].replies.push({ text: newReply, timestamp });

    const updatedReportData = {
      ...report,
      comments: updatedComments,
    };

    try {
      await axios.put(
        `http://localhost:3001/findlist/${report.id}`,
        updatedReportData
      );

      setComments(updatedComments);
      setNewReply(""); // 대댓글 입력 필드 초기화
      setReplyIndex(null); // 대댓글 입력 상태 초기화
    } catch (error) {
      console.error("대댓글 제출 오류:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [report]);

  return (
    <>
      <CommentsContainer>
        <CommentList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <UserContainer>
                <UserIcon src="/img/User.png" alt="User Icon" />
                <span>이름</span>
              </UserContainer>
              <div>
                {comment.text}
                <Timestamp>
                  {new Date(comment.timestamp).toLocaleString()}
                </Timestamp>
                <ReplyButton onClick={() => setReplyIndex(index)}>
                  답글
                </ReplyButton>
                {comment.replies && comment.replies.length > 0 && (
                  <ReplyList>
                    {comment.replies.map((reply, replyIndex) => (
                      <ReplyItem key={replyIndex}>
                        {reply.text}
                        <Timestamp>
                          {new Date(reply.timestamp).toLocaleString()}
                        </Timestamp>
                      </ReplyItem>
                    ))}
                  </ReplyList>
                )}
              </div>
            </CommentItem>
          ))}
        </CommentList>
      </CommentsContainer>
      {/* 여기서 댓글 입력창과 대댓글 입력창을 조건에 따라 표시 */}
      {replyIndex === null ? (
        <InputContainer onSubmit={handleCommentSubmit}>
          <InputBox>
            <CommentInput
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <SubmitButton type="submit">
              {" "}
              <img src="/img/SendBlue.png" alt="" />
            </SubmitButton>
          </InputBox>
        </InputContainer>
      ) : (
        <InputContainer>
          <InputBox>
            <ReplyInput
              type="text"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="대댓글을 입력하세요"
            />
            <CancelReplyButton
              type="button"
              onClick={() => setReplyIndex(null)} // 댓글 입력창으로 돌아가기
            >
              댓글 입력으로 돌아가기
            </CancelReplyButton>
            <SubmitButton
              type="button"
              onClick={(e) => handleReplySubmit(e, replyIndex)}
            >
              <img src="/img/SendBlue.png" alt="" />
            </SubmitButton>
          </InputBox>
        </InputContainer>
      )}
    </>
  );
};

// 스타일링 컴포넌트들
const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
`;

const CommentList = styled.div`
  overflow-y: auto; /* 댓글 목록 스크롤 가능하도록 설정 */
  margin-bottom: 70px; /* 입력창 높이만큼 여유 공간 추가 */
`;

const InputContainer = styled.form`
  position: fixed; /* 화면 하단에 고정 */
  width: 100%;
  max-width: 600px;
  bottom: 0; /* 하단에 위치 */
  display: flex; /* 입력창과 버튼을 가로로 배치 */
  padding: 1rem; /* 여백 추가 */
  background-color: white; /* 배경색 설정 */
  z-index: 100;
  box-sizing: border-box;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const CommentInput = styled.textarea`
  flex: 1; /* 입력 필드가 가능한 공간을 다 차지하도록 설정 */
  height: 100%;
  border-radius: 4px; /* 모서리 둥글게 */
  background-color: #f5f5f5; /* 배경색 설정 */
  border: none;
  resize: none; // 크기 고정
  font-family: Arial, sans-serif; /* Adjust font family */
  &:focus {
    border: none;
    outline: none; /* 포커스 상태에서도 테두리를 보이지 않게 설정 */
  }
  &::placeholder {
    font-weight: bold;
    font-family: Arial, sans-serif; /* Adjust font family */
  }
`;

const ReplyInput = styled.textarea`
  flex: 1; /* 입력 필드가 가능한 공간을 다 차지하도록 설정 */
  height: 100%;
  border-radius: 4px; /* 모서리 둥글게 */
  background-color: #f5f5f5; /* 배경색 설정 */
  border: none;
  resize: none; // 크기 고정
  font-family: Arial, sans-serif; /* Adjust font family */

  &:focus {
    border: none;
    outline: none; /* 포커스 상태에서도 테두리를 보이지 않게 설정 */
  }
  &::placeholder {
    font-weight: bold;
    font-family: Arial, sans-serif; /* Adjust font family */
  }
`;

const SubmitButton = styled.div`
  width: 10%;
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  img {
    width: 50%;
  }
`;

const CommentItem = styled.div`
  padding: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
  border-radius: 5px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center; /* 아이콘과 이름을 수직 중앙 정렬 */
`;

const UserIcon = styled.img`
  width: 25px; /* 아이콘 크기 조정 */
  height: 25px; /* 아이콘 크기 조정 */
  margin-right: 5px; /* 아이콘과 이름 사이 여백 추가 */
`;

const ReplyButton = styled.button`
  margin-left: 10px; /* 답글 버튼과 댓글 사이 여백 */
  background-color: #007bff; /* 버튼 배경색 */
  color: white; /* 버튼 글자색 */
  border: none; /* 테두리 없애기 */
  border-radius: 4px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 포인터로 변경 */
  padding: 5px; /* 버튼 패딩 */
`;

const ReplyList = styled.div`
  margin-top: 5px;
  padding-left: 20px; /* 대댓글 들여쓰기 */
`;

const ReplyItem = styled.div`
  padding: 5px;
  border: 1px solid #e0e0e0;
  margin-top: 2px;
  border-radius: 5px;
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: gray;
  margin-left: 10px;
`;

const CancelReplyButton = styled.button`
  margin-left: 10px; /* 버튼 사이 여백 추가 */
  background-color: #dc3545; /* 취소 버튼 배경색 */
  color: white; /* 취소 버튼 글자색 */
  border: none; /* 테두리 없애기 */
  border-radius: 4px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 포인터로 변경 */
  padding: 5px; /* 버튼 패딩 */
`;

export default Comments;
