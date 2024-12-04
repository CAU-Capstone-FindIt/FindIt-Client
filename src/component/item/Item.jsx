import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Item = ({ findReports, pageType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.includes("detail") && pageType){
    if (pageType == "find"){
      pageType = "lost"

    } else {
      pageType = "find"
    }
  }

  console.log(pageType);

  return (
    <>
      {findReports.map((report, index) => (
        <ReportItem
          key={index}
          onClick={() =>{
            navigate(`/detail/${report.name}?pageType=${pageType}`, {
              state: report,
            })
            window.location.reload();
          }}
          isReturned={report.status === "RETURNED"} // 'RETURNED' 상태 체크
        >
          {report.status === "RETURNED" && (
            <CompletedBadge src="/img/ClosedIcon.png" /> /* 거래 완료 배지 */
          )}
          <ListImg src={report.image} alt={report.name} loading="lazy" />
          <Content>
            <TitleBox>
              <h2>{report.name}</h2>
            </TitleBox>
            <div>
              <CategoryBox>{report.category}</CategoryBox>
            </div>
            <div>{report.address}</div>
            <div>{report.createdDate.slice(0, 10)}</div>
          </Content>
        </ReportItem>
      ))}
    </>
  );
};

export default Item;

const ReportItem = styled.div`
  position: relative;
  width: 100%;
  height: 25vh;
  max-height: 180px;
  background: white;
  margin: 1rem 0;
  padding: 18px 36px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  // pointer-events: ${(props) => (props.isReturned ? "none" : "auto")};
  cursor: ${(props) => (props.isReturned ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.isReturned ? 0.4 : 1)}; /* 흐리게 만들기 */

  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    opacity: ${(props) => (props.isReturned ? 0.4 : 1)}; /* 흐리게 만들기 */
  }

  div {
    font-weight: bold;
    color: #555;
  }
`;

const CompletedBadge = styled.img`
  position: absolute;
  top: 10px;
  left: 5px;
  width: 70px;
  transform: rotate(-30deg);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;

  @media (max-width: 600px) {
    width: 60px;
  }
`;

const ListImg = styled.img`
  background-image: ${(props) =>
    props.mode === "lost" ? "#ffb978" : "#FF0000"};
  width: 35%;
  height: 100%;
  object-fit: contain;
  border-radius: 10%;
`;

const Content = styled.div`
  width: 65%;
  text-align: end;

  h2 {
    font-size: 1.8rem;
  }
  h4 {
    margin-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 35px;
  margin-bottom: 15px;
`;

const CategoryBox = styled.h6`
  background-color: #1876d2;
  color: white;
  width: 25%;
  padding: 5px 10px;
  border-radius: 1.5rem;
  text-align: center;
  margin: 1rem 0 0.5rem 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  font-size: 1rem;

  @media (max-width: 600px) {
    width: 40%;
  }
`;
