import { Col, Row, Select } from "antd";
import "./main.css";
import Test1 from "./test1";
import Test2 from "./test2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

const App = () => {
  // use useTranslation to transtate th/en
  const { t } = useTranslation();

  //init state show showTest1/showTest2
  const [showTest1, setShowTest1] = useState(false);
  const [showTest2, setShowTest2] = useState(false);

  const { Option } = Select;

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

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <div>
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        <Select
          defaultValue={i18n.language}
          onChange={handleLanguageChange}
          size="small"
        >
          <Option value="en">ENG</Option>
          <Option value="th">THB</Option>
        </Select>
      </div>

      <button
        onClick={handlebackHome}
        style={{
          display: showTest1 || showTest2 ? "" : "none",
          position: "absolute",
          right: 10,
          top: "6%",
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
              <p>{t("test1")}</p>
              <p>{t("contentTest1")}</p>
            </div>
          </button>
        </Col>
        <Col span={3}>
          <button onClick={handleShowTest2} className="Button">
            <div style={{ textAlign: "start", marginLeft: "10px" }}>
              <p>{t("test2")}</p>
              <p>{t("contentTest1")}</p>
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
