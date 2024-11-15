import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalItem = ({ report }) => {
  const navigate = useNavigate();

  console.log(report);
  return (
    <Container>
      <TitleBox>
        <Title mode={report.mode}>
          {report.mode === "lost" ? "분실물" : "습득물"}
        </Title>
      </TitleBox>
      <ContentBox>
        <ModalImg src={report.image} alt="" />
        <ModalRigth>
          {report ? (
            <>
              <h2>{report.name}</h2>
              <div>
                <CategoryBox>{report.category}</CategoryBox>
              </div>
              <h4>{report.location}</h4>
              <h4>{report.brand}</h4>
              <h4>{report.date}</h4>
              <DetailBtn
                onClick={() =>
                  navigate(`/detail/${report.name}`, { state: report })
                }
              >
                상세보기
              </DetailBtn>
            </>
          ) : (
            <p>신고 정보가 없습니다.</p>
          )}
        </ModalRigth>
      </ContentBox>
    </Container>
  );
};

export default ModalItem;

const Container = styled.div`
  margin: 10px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #000;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: end;
`;

const Title = styled.h5`
  background-color: ${(props) =>
    props.mode === "lost" ? "#ffb978" : "#FF0000"};
  color: #ffffff;
  width: 15%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalImg = styled.img`
  width: 40%;
  height: 40%;
  aspect-ratio: 1/1; // 가로세로비율. 1대1비율로 넣어야 정사각형이 된다
  border-radius: 10px;
`;

const ModalRigth = styled.div`
  width: 50%;
  text-align: end;

  h2,
  h4,
  h5 {
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const CategoryBox = styled.h5`
  background-color: #007cff;
  color: #ffffff;
  width: 40%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const DetailBtn = styled.button`
  width: 40%;
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 10px;
  border: none;
  color: white;
  font-weight: bold;
  background-color: #007cff;
`;
