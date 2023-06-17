import { Col, Row } from "antd";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./main.css";
import Test1 from "./test1";
import Test2 from "./test2";

const App = () => {
  return (
    <Router>
      <div>
        <Row
          justify="center"
          align="middle"
          style={{ height: "100vh" }}
          gutter={[10, 0]}
        >
          <Col span={3}>
            <Link to="/test1" className="Button">
              <div style={{ textAlign: "start", marginLeft: "10px" }}>
                <p>Test 1</p>
                <p>Layout & Style</p>
              </div>
            </Link>
          </Col>
          <Col span={3}>
            <Link to="/test2" className="Button">
              <div style={{ textAlign: "start", marginLeft: "10px" }}>
                <p>Test 2</p>
                <p>Form & Table</p>
              </div>
            </Link>
          </Col>
        </Row>

        <Routes>
          <Route path="/test1" element={<Test1 />} />
          <Route path="/test2" element={<Test2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
