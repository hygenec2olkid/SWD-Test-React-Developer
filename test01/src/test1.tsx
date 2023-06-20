import React, { useState } from "react";
import { Divider, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import "./main.css";

const Test1 = () => {
  //init row 
  const [row, setRow] = useState([
    ["parallelogram", "circle", "square"],
    ["rectangle", "oval", "trapezoid"],
  ]);

  //use useTranslation to transtate th/en
  const { t } = useTranslation();

  // init const to control about change position top/bottom
  const [swap, setSwap] = useState(false);

  // function about movement
  function moveLeft(prevRow: string[][]) {
    const firstItemRow1 = prevRow[0].shift();
    const firstItemRow2 = prevRow[1].shift();

    prevRow[0].push(firstItemRow2 || "");
    prevRow[1].push(firstItemRow1 || "");
    return [...prevRow];
  }

  function moveRight(prevRow: string[][]) {
    const firstItemRow1 = prevRow[0].pop();
    const firstItemRow2 = prevRow[1].pop();

    prevRow[0].unshift(firstItemRow2 || "");
    prevRow[1].unshift(firstItemRow1 || "");
    return [...prevRow];
  }

  // function about shuffleItem 
  function shuffleItem(prevRow: string[][]) {
    const newRow = prevRow.map((subArray) => {
      const shuffledSubArray = [...subArray];

      for (let i = shuffledSubArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSubArray[i], shuffledSubArray[j]] = [
          shuffledSubArray[j],
          shuffledSubArray[i],
        ];
      }

      return shuffledSubArray;
    });

    return newRow;
  }

  const handleOnClickLeft = () => {
    setRow(moveLeft(row));
  };

  const handleOnClickRight = () => {
    setRow(moveRight(row));
  };

  const handlePosition = () => {
    setSwap(!swap);
  };

  const handleShuffle = () => {
    setRow(shuffleItem(row));
  };

  return (
    <div>
      <header className="header">{t("contentTest1")}</header>
      <main className="container">
        <Row gutter={[10, 10]} justify="center">
          <Col span={4}>
            <button onClick={handleOnClickLeft} className="Button">
              <div id="triangle-left"></div>
            </button>
          </Col>
          <Col span={4}>
            <button onClick={handlePosition} className="Button">
              <div id="triangle-up"></div>
            </button>
          </Col>
          <Col span={4}>
            <button onClick={handlePosition} className="Button">
              <div id="triangle-down"></div>
            </button>
          </Col>
          <Col span={4}>
            <button onClick={handleOnClickRight} className="Button">
              <div id="triangle-right"></div>
            </button>
          </Col>
        </Row>
        <Divider />

        <Row
          gutter={[12, 12]}
          justify={swap ? "center" : "end"}
          style={{ marginBottom: "10px" }}
        >
          {row[0].map((item, index) => (
            <Col span={6} order={index + 1} key={item}>
              <button onClick={handleShuffle} className="Button">
                <div id={item}></div>
              </button>
            </Col>
          ))}
        </Row>

        <Row gutter={[12, 12]} justify={swap ? "end" : "center"}>
          {row[1].map((item, index) => (
            <Col span={6} order={index + 1} key={item}>
              <button onClick={handleShuffle} className="Button">
                <div id={item}></div>
              </button>
            </Col>
          ))}
        </Row>
      </main>
    </div>
  );
};

export default Test1;
