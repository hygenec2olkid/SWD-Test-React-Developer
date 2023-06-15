import React, { useEffect, useState } from "react";
import { Divider, Col, Row } from "antd";
import "./main.css";

const App = () => {
  const [buttonOrder, setButtonOrder] = useState(0);
  const [side, setSide] = useState("");

  const handleOnClickLeft = () => {
    // complete 1 round reset buttonOrder
    if (buttonOrder === -6) {
      setButtonOrder(-1);
    } else {
      setButtonOrder(buttonOrder - 1);
    }
    setSide("Left");
  };

  const handleOnClickRight = () => {
    // complete 1 round reset buttonOrder
    if (buttonOrder === 6) {
      setButtonOrder(1);
    } else {
      setButtonOrder(buttonOrder + 1);
    }
    setSide("Right");
  };

  const getOrder = (initialOrder: number) => {
    // Calculate the updated order based on buttonOrder
    let updatedOrder = initialOrder + buttonOrder;

    // Adjust the order based on the side value
    if (side === "Left") {
      if (updatedOrder > 6) {
        return updatedOrder - 6;
      } else if (updatedOrder < 1) {
        return updatedOrder + 6;
      } else {
        return updatedOrder;
      }
    } else if (side === "Right") {
      if (updatedOrder > 6) {
        return updatedOrder - 6;
      } else if (updatedOrder < 1) {
        return updatedOrder + 6;
      } else {
        return updatedOrder;
      }
    }

    // Default case
    return initialOrder;
  };

  return (
    <div>
      <header className="header">Layout & Style</header>
      <main className="container">
        <Row gutter={[10, 10]} justify="center">
          <Col span={4}>
            <button onClick={handleOnClickLeft} className="Button">
              <div id="triangle-left"></div>
            </button>
          </Col>
          <Col span={4}>
            <button className="Button">
              <div id="triangle-up"></div>
            </button>
          </Col>
          <Col span={4}>
            <button className="Button">
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
        <Row gutter={[12, 12]}>
          
          <Col span={8} order={getOrder(1)}>
            <button className="Button">
              <div id="parallelogram"></div>
            </button>
          </Col>
          <Col span={8} order={getOrder(2)}>
            <button className="Button">
              <div id="circle"></div>
            </button>
          </Col>
          <Col span={8} order={getOrder(3)}>
            <button className="Button">
              <div id="square"></div>
            </button>
          </Col>

          <Col span={8} order={getOrder(4)}>
            <button className="Button">
              <div id="rectangle"></div>
            </button>
          </Col>
          <Col span={8} order={getOrder(5)}>
            <button className="Button">
              <div id="oval"></div>
            </button>
          </Col>
          <Col span={8} order={getOrder(6)}>
            <button className="Button">
              <div id="trapezoid"></div>
            </button>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default App;
