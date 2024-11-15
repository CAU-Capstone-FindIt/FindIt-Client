import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item = ({ findReports }) => {
  const navigate = useNavigate();

  return (
    <>
      {findReports.map((report, index) => (
        <ReportItem
          key={index}
          onClick={() => navigate(`/detail/${report.name}`, { state: report })}
        >
          <ListImg src={report.image} alt="" />
          <Content>
            <TitleBox>
              <h2>{report.name}</h2>
            </TitleBox>
            <div>
              <CategoryBox>{report.category}</CategoryBox>
            </div>
            <div>{report.location}</div>
            <div>{report.date}</div>
          </Content>
        </ReportItem>
      ))}
    </>
  );
};

export default Item;

const ReportItem = styled.div`
  width: 100%;
  height: 25vh;
  max-height: 180px;
  background: white;
  margin: 1rem 0;
  padding: 18px 36px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  div {
    font-weight: bold;
    color: #555;
  }
`;

const ListImg = styled.img`
  width: 35%;
  height: 100%;
  object-fit: cover;
  border-radius: 10%;
`;

const Content = styled.div`
  width: 55%;
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
