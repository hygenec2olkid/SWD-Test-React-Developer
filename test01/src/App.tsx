import { Col, Row } from "antd";
import "./main.css";
import Test1 from "./test1";
import Test2 from "./test2";
import { useState } from "react";

const App = () => {
  const [showTest1, setShowTest1] = useState(false);
  const [showTest2, setShowTest2] = useState(false);
  const handleShowTest1 = () => {
    setShowTest1(true);
  };
  const handleShowTest2 = () => {
    setShowTest2(true);
  };
  const handlebackHome = () => {
    setShowTest1(false);
    setShowTest2(false);
  };
  return (
    <div>
      <button
        onClick={handlebackHome}
        style={{
          display: showTest1 || showTest2 ? "" : "none",
          position: "absolute",
          right: 10,
        }}
      >
        Home
      </button>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
          display: !showTest1 && !showTest2 ? "" : "none",
        }}
        gutter={[10, 0]}
      >
        <Col span={3}>
          <button onClick={handleShowTest1} className="Button">
            <div style={{ textAlign: "start", marginLeft: "10px" }}>
              <p>Test 1</p>
              <p>Layout & Style</p>
            </div>
          </button>
        </Col>
        <Col span={3}>
          <button onClick={handleShowTest2} className="Button">
            <div style={{ textAlign: "start", marginLeft: "10px" }}>
              <p>Test 2</p>
              <p>Form & Table</p>
            </div>
          </button>
        </Col>
      </Row>
      {showTest1 ? <Test1 /> : ""}
      {showTest2 ? <Test2 /> : ""}
    </div>
  );
};

export default App;
