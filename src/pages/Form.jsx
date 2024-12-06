import React, { useState } from "react";
import TopNavBack from "./TopNavBack";
import { useReportContext } from "../apis/ReportContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePostFindItem } from "../apis/Postapi";
import { revise_gpt } from "../apis/Revise_gpt";

const Form = () => {
  // 전역으로 관리되어 ReportMode.jsx에 저장되었던 mode와 posistion 데이터를 가져옴
  const { reportInfo } = useReportContext(); // Context에서 reportInfo 가져오기
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태
  const [description, setDescription] = useState(""); // 설명 상태

  const { mutate, isLoading, isError, error } = usePostFindItem(); // 훅 사용

  const navigate = useNavigate();

  // 업로드한 파일을 미리보기 할 수 있게  setSelectedImage상태저장
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // 미리보기 이미지 설정
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // 카테고리 상태 업데이트
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // 설명 상태 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    console.log("여기 아래가 target");
    console.log(e.target);

    let message;
    message = {
      name: e.target.name.value ?? "",
      brand: e.target.brand.value ?? "",
      location: e.target.location.value ?? "",
      color: e.target.color.value ?? "",
    };

    //console.log(message)

    const gptResponse = await revise_gpt(JSON.stringify(message));

    console.log(gptResponse);
    //console.log(gptResponse.name)

    let data;
    if (reportInfo.mode === "lost") {
      data = {
        name: e.target.name.value ?? "",
        description: description ?? "",
        category: e.target.category.value ?? "",
        color: e.target.color.value ?? "",
        brand: e.target.brand.value ?? "",
        reportDate: e.target.date.value ?? "",
        latitude: reportInfo.position.lat ?? 0,
        longitude: reportInfo.position.lng ?? 0,
        address: e.target.location.value ?? "",
        rewardAmount: Number(e.target.point.value) || 0, // 숫자는 0을 기본값으로
        status: "REGISTERED",
        image: selectedImage ?? "",
        revisedName: gptResponse.name,
        revisedBrand: gptResponse.brand,
        revisedColor: gptResponse.color,
        revisedAddress: gptResponse.location,
      };
    } else if (reportInfo.mode === "found") {
      data = {
        name: e.target.name.value ?? "",
        description: description ?? "",
        category: selectedCategory ?? "",
        reportDate: e.target.date.value ?? "",
        color: e.target.color.value ?? "",
        brand: e.target.brand.value ?? "",
        date: e.target.date.value ?? "",
        latitude: reportInfo.position.lat ?? 0,
        longitude: reportInfo.position.lng ?? 0,
        address: e.target.location.value ?? "",
        image: selectedImage ?? "",
        revisedName: gptResponse.name,
        revisedBrand: gptResponse.brand,
        revisedColor: gptResponse.color,
        revisedAddress: gptResponse.location,
      };
    }

    mutate(
      {
        apiUrl:
          reportInfo.mode === "found"
            ? "https://findit.p-e.kr:8443/api/items/found/report"
            : "https://findit.p-e.kr:8443/api/items/lost/register",
        data: data, // FormData 객체
      },
      {
        onSuccess: async () => {
          alert("등록 성공!");
          navigate("/"); // 메인 화면으로 이동
        },
        onError: (error) => {
          console.error("등록 실패:", error);
          alert("등록에 실패했습니다.");
        },
      }
    );

    // 메인 화면으로 네비게이트
    // navigate("/");
  };

  // 이미지 미리보기 클릭 시 파일 입력창 열기
  const handleImagePreviewClick = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <Container>
      <TopNavBack />
      <FormBox>
        <form onSubmit={handleSubmit}>
          <Title mode={reportInfo.mode}>
            {reportInfo.mode === "lost" ? "분실물 신고" : "습득물 신고"}
          </Title>
          <ImagePreview onClick={handleImagePreviewClick}>
            {selectedImage ? (
              <img src={selectedImage} alt="미리보기" />
            ) : (
              <>
                <ImgIcon src="/img/UploadIconBlue.png" alt="이미지 아이콘" />
                <h3>Upload Your Image File</h3>
              </>
            )}
          </ImagePreview>
          <InputFile
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="fileUpload"
          />
          <InputBox>
            <InputLabel for="name">명칭</InputLabel>
            <InputText type="text" id="name" placeholder="명칭" required />
          </InputBox>
          <InputBox>
            <InputLabel for="brand">브랜드</InputLabel>
            <InputText type="text" id="brand" placeholder="브랜드" required />
          </InputBox>
          <InputBox>
            <InputLabel for="location">위치</InputLabel>
            <InputText type="text" id="location" placeholder="위치" required />
          </InputBox>
          <InputBox>
            <InputLabel for="category">카테고리</InputLabel>
            <SelectCategory
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">카테고리 선택</option>
              <option value="전자기기">전자기기</option>
              <option value="귀금속">귀금속</option>
              <option value="지갑">지갑</option>
              <option value="가방">가방</option>
              <option value="의류">의류</option>
              <option value="악기">악기</option>
              <option value="현금">현금</option>
              <option value="기타">기타</option>
            </SelectCategory>
          </InputBox>
          <InputBox>
            <InputLabel for="color">색상</InputLabel>
            <InputText type="text" id="color" placeholder="색상" required />
          </InputBox>
          <InputBox>
            <InputLabel for="date">날짜</InputLabel>
            <InputDate type="date" id="date" required />
          </InputBox>
          {reportInfo.mode === "lost" && (
            <InputBox>
              <InputLabel for="point">포인트</InputLabel>
              <InputDate type="number" id="point" required />
            </InputBox>
          )}

          <TextArea
            placeholder="내용을 입력하세요"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <SubmitButton type="submit">제출</SubmitButton>
        </form>
      </FormBox>
    </Container>
  );
};

export default Form;

const Container = styled.div`
  position: relative; // 버튼을 위치시키기 위해 relative 설정
  width: 100%;
  // 이렇게 하니까 위의 TopNav도 이전 제보 위치 마커 화면과 아이콘 배치위치가 동일해짐
  height: 100vh; /* 전체 화면 높이로 설정 */
  overflow: hidden; /* 전체 컨테이너에서 스크롤 숨기기 */
`;

const FormBox = styled.div`
  position: relative;
  margin-top: 8vh; /* TopNavBack 높이만큼 마진 추가 */
  max-height: calc(
    100vh - 8vh - 40px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  overflow-y: auto; /* 세로 스크롤 가능 */
  padding: 20px; /* 상단 패딩 추가 */
  box-sizing: border-box; /* 패딩이 포함되도록 설정 */

  border-radius: 10px; /* 모서리 둥글게 */

  display: flex;
  flex-direction: column;
  align-items: center;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }

  form {
    width: 90%;
  }
`;

const Title = styled.h4`
  background-color: ${(props) =>
    props.mode === "lost" ? "#ffb978" : "#FF0000"};
  color: #ffffff;
  width: 30%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  margin: 1rem 0;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px; /* 미리보기 영역 높이 */
  border: 1px dashed #ccc; /* 테두리 스타일 */
  border-radius: 10px; /* 모서리 둥글게 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* 입력 필드와 간격 추가 */
  cursor: pointer;

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px; /* 이미지 둥글게 */
  }
  h2 {
    text-aling: center;
  }
`;

const ImgIcon = styled.img`
  width: 50px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem; /* 입력 필드 간격 */
`;

const InputLabel = styled.label`
  width: 20%;
  font-weight: bold;
`;

const InputFile = styled.input`
  display: none; /* 기본 파일 입력 숨기기 */
`;

const InputText = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc; /* 테두리 스타일 */
  border-radius: 0px; /* 모서리 둥글게 */
  font-size: 16px;

  &:focus {
    border-bottom: 1px solid #000000; /* 테두리 스타일 */
    outline: none; /* 포커스 상태에서도 테두리를 보이지 않게 설정 */
  }
`;

const SelectCategory = styled.select`
  width: 80%;
  padding: 10px;
  margin-bottom: 15px; /* 입력 필드 간격 */
  border: 1px solid #ccc; /* 테두리 스타일 */
  border-radius: 5px; /* 모서리 둥글게 */
  font-size: 16px;
`;

const InputDate = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc; /* 테두리 스타일 */
  border-radius: 5px; /* 모서리 둥글게 */
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 1rem; /* 입력 필드 간격 */
  // border: 1px solid #ccc; /* 파란색 테두리 */
  border-radius: 5px; /* 모서리 둥글게 */
  border: none;
  font-size: 16px;
  background-color: #f9f9f9;
  resize: none; // 크기 고정
  min-height: 120px; /* 최소 높이 설정 */
  box-sizing: border-box; /* 패딩이 포함되도록 설정 */

  &:focus {
    border: none;
    outline: none; /* 포커스 상태에서도 테두리를 보이지 않게 설정 */
  }

  &::placeholder {
    font-weight: bold;
  }

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007cff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #0051a8; /* hover 시 색상 변경 */
  }
`;
