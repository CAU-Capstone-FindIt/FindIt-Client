import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Comments = ({ report, pageType }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyIndex, setReplyIndex] = useState(null); // 대댓글 입력 상태를 관리할 인덱스
  const [newReply, setNewReply] = useState(""); // 대댓글 텍스트 상태

  const [value, setValue] = useState("");

  // 댓글을 가져오는 함수
  const fetchComments = async () => {
    let url;
    if (pageType === "find") {
      url = `http://findit.p-e.kr:8080/api/items/found/${report.id}`;
    } else {
      url = `http://findit.p-e.kr:8080/api/items/lost/${report.id}`;
    }

    try {
      const accessToken = localStorage.getItem("access");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글을 제출하는 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    let commentData;

    console.log(commentData);
    let url;
    if (pageType === "find") {
      commentData = {
        foundItemId: report.id,
        content: newComment,
        parentCommentId: null,
      };
      url = `http://findit.p-e.kr:8080/api/items/found/comment`;
    } else {
      commentData = {
        lostItemId: report.id,
        content: newComment,
        parentCommentId: null,
      };
      url = `http://findit.p-e.kr:8080/api/items/lost/comment`;
    }

    try {
      // 댓글 등록 API 요청
      const accessToken = localStorage.getItem("access");
      const response = await axios.post(url, commentData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      setComments((prevComments) => [
        ...prevComments,
        {
          ...response.data,
          childComments: response.data.childComments || [],
        },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 등록 오류:", error);
    }
  };

  // 대댓글 제출 함수
  const handleReplySubmit = async (e, parentCommentId) => {
    e.preventDefault();

    let replyData;

    let url;
    if (pageType === "find") {
      replyData = {
        foundItemId: report.id, // 현재 신고된 물품 ID
        content: newReply, // 대댓글 내용
        parentCommentId: parentCommentId, // 부모 댓글 ID
      };
      url = `http://findit.p-e.kr:8080/api/items/found/comment`;
    } else {
      replyData = {
        lostItemId: report.id, // 현재 신고된 물품 ID
        content: newReply, // 대댓글 내용
        parentCommentId: parentCommentId, // 부모 댓글 ID
      };
      url = `http://findit.p-e.kr:8080/api/items/lost/comment`;
    }

    try {
      const accessToken = localStorage.getItem("access");
      const response = await axios.post(url, replyData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                childComments: [...comment.childComments, response.data],
              }
            : comment
        )
      );

      setNewReply(""); // 대댓글 입력 필드 초기화
      setReplyIndex(null); // 대댓글 입력 상태 초기화
    } catch (error) {
      console.error("대댓글 제출 오류:", error);
    }
  };

  const handleInput = (event) => {
    event.target.style.height = "auto"; // 높이를 자동으로 초기화
    event.target.style.height = `${event.target.scrollHeight}px`; // 내용에 맞게 높이 설정
    setValue(event.target.value);
  };

  useEffect(() => {
    fetchComments();
  }, [report]);

  return (
    <>
      <CommentsContainer>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <UserContainer>
                <UserNameIconBox>
                  <UserIcon src="/img/User.png" alt="User Icon" />
                  <span>
                    <strong>이름</strong>
                  </span>
                </UserNameIconBox>
                <ReplyButton onClick={() => setReplyIndex(comment.id)}>
                  <img src="/img/ChatIconBlue.png" alt="ChatIconBlue" />
                </ReplyButton>
              </UserContainer>
              <div>
                <div>{comment.content}</div>
                <TimestampComment>
                  {new Date(comment.createdDate).toLocaleString()}
                </TimestampComment>
                {comment.childComments && comment.childComments.length > 0 && (
                  <ReplyList>
                    {comment.childComments.map(
                      (childComment, childCommentIndex) => (
                        <ReplyContainer>
                          <ReplyIcon src="/img/ReplyIcon.png" alt="ReplyIcon" />
                          <ReplyItem key={childCommentIndex}>
                            <UserContainer>
                              <UserNameIconBox>
                                <UserIcon src="/img/User.png" alt="User Icon" />
                                <span>
                                  <strong>이름</strong>
                                </span>
                              </UserNameIconBox>
                            </UserContainer>
                            <div> {childComment.content}</div>
                            <TimestampReply>
                              {new Date(
                                childComment.createdDate
                              ).toLocaleString()}
                            </TimestampReply>
                          </ReplyItem>
                        </ReplyContainer>
                      )
                    )}
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
              onInput={handleInput} // 입력 시마다 높이를 조정
              placeholder="댓글을 입력하세요"
            />
            <SubmitButton type="submit">
              <img src="/img/SendBlue.png" alt="SendIcon" />
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
              onInput={handleInput} // 입력 시마다 높이를 조정
              placeholder="대댓글을 입력하세요"
            />
            <CancelReplyButton
              type="button"
              onClick={() => setReplyIndex(null)} // 댓글 입력창으로 돌아가기
            >
              <img src="/img/ReturnIcon.png" alt="ReturnIcon" />
            </CancelReplyButton>
            <SubmitButton
              type="submit"
              onClick={(e) => handleReplySubmit(e, replyIndex)}
            >
              <img src="/img/SendBlue.png" alt="SendIcon" />
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
  max-height: 3.9rem;
  overflow: auto; /* 기본적으로 스크롤 가능하게 설정 */

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 2px; /* 얇은 스크롤바 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b4b4b4; /* 스크롤thumb의 색상 */
    border-radius: 4px; /* thumb에 둥근 모서리 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* hover 시 색상 변경 */
  }

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
  max-height: 3.9rem;
  overflow: auto; /* 기본적으로 스크롤 가능하게 설정 */

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px; /* 얇은 스크롤바 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤thumb의 색상 */
    border-radius: 4px; /* thumb에 둥근 모서리 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* hover 시 색상 변경 */
  }

  &:focus {
    border: none;
    outline: none; /* 포커스 상태에서도 테두리를 보이지 않게 설정 */
  }
  &::placeholder {
    font-weight: bold;
    font-family: Arial, sans-serif; /* Adjust font family */
  }
`;

const SubmitButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  img {
    width: 2rem;
  }
`;

const CommentItem = styled.div`
  padding: 10px;
  border-top: 1px solid #ccc;
  margin-top: 5px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center; /* 아이콘과 이름을 수직 중앙 정렬 */
  justify-content: space-between;
`;

const UserNameIconBox = styled.div`
  display: flex;
  align-items: center; /* 아이콘과 이름을 수직 중앙 정렬 */
`;

const UserIcon = styled.img`
  width: 1.8rem;
  margin-right: 5px; /* 아이콘과 이름 사이 여백 추가 */
`;

const ReplyButton = styled.div`
  width: 4%;
  background-color: white;
  color: white; /* 버튼 글자색 */
  border: none; /* 테두리 없애기 */
  cursor: pointer; /* 커서 포인터로 변경 */
  padding: 5px; /* 버튼 패딩 */

  img {
    width: 100%;
  }
`;

const ReplyList = styled.div`
  margin-top: 5px;
`;

const ReplyContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0.5rem 0;
`;

const ReplyIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;
const ReplyItem = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: #f7f7f7;
  margin-top: 2px;
  border-radius: 0.5rem;
`;

const TimestampComment = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const TimestampReply = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const CancelReplyButton = styled.button`
  color: white; /* 취소 버튼 글자색 */
  border: none; /* 테두리 없애기 */
  cursor: pointer; /* 커서 포인터로 변경 */
  background: none;

  img {
    margin-right: 1rem;
    width: 2rem;
  }
`;

export default Comments;
