import "./main.css";
import { Form, Input, Select, Row, Col, DatePicker, Radio, Button } from "antd";
import { createFormData } from "./todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import MyTable from "./table";
import { useEffect, useState } from "react";

const { Option } = Select;

const Test2 = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formDataArray = useSelector(
    (state: any) => state.todoSlice.formDataArray
  );
  const [localFormDataArray, setLocalFormDataArray] = useState(formDataArray);

  useEffect(() => {
    const savedFormDataArray = localStorage.getItem("formDataArray");
    if (savedFormDataArray) {
      const parsedFormDataArray = JSON.parse(savedFormDataArray);
      setLocalFormDataArray(parsedFormDataArray);
      dispatch(createFormData(parsedFormDataArray));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("formDataArray", JSON.stringify(localFormDataArray));
  }, [localFormDataArray]);

  const onSubmit = () => {
    const formValues = form.getFieldsValue();
    const birthday = formValues.birthday ? new Date(formValues.birthday) : null;
    const serializedFormValues = {
      ...formValues,
      birthday: birthday ? format(birthday, "yyyy-MM-dd") : null,
    };

    const updatedFormDataArray = [...localFormDataArray, serializedFormValues];
    setLocalFormDataArray(updatedFormDataArray);
    dispatch(createFormData(updatedFormDataArray));

    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <header className="header">Form & Table </header>
      <div className="Form">
        <Form form={form} onFinish={onSubmit}>
          <Row gutter={[16, 16]} justify="start">
            <Col span={5}>
              <Form.Item
                name="prefix"
                label="คำนำหน้า"
                rules={[{ required: true }]}
              >
                <Select placeholder="คำนำหน้า" allowClear>
                  <Option value="นาย">นาย</Option>
                  <Option value="นาง">นาง</Option>
                  <Option value="นางสาว">นางสาว</Option>
                  <Option value="อื่นๆ">อื่นๆ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fname"
                label="ชื่อจริง"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lname"
                label="นามสกุล"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                name="birthday"
                label="วันเกิด"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={8}>
              {" "}
              <Form.Item
                name="nationality"
                label="สัญชาติ"
                rules={[{ required: true }]}
              >
                <Select placeholder="-- กรุณาเลือก --" allowClear>
                  <Option value="ไทย">ไทย</Option>
                  <Option value="อื่นๆ">อื่นๆ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={5}>
              <Form.Item name="citizenID" label="เลขบัตรประชาชน">
                <Input />
              </Form.Item>
            </Col>
            -
            <Col span={5}>
              <Form.Item name="citizenID_1">
                <Input />
              </Form.Item>
            </Col>
            -
            <Col span={4}>
              <Form.Item name="citizenID_2">
                <Input />
              </Form.Item>
            </Col>
            -
            <Col span={3}>
              <Form.Item name="citizenID_3">
                <Input />
              </Form.Item>
            </Col>
            -
            <Col span={2}>
              <Form.Item name="citizenID_4">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="เพศ" name="gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="ผู้ชาย"> ผู้ชาย </Radio>
              <Radio value="ผู้หญิง"> ผู้หญิง </Radio>
              <Radio value="ไม่ระบุ"> ไม่ระบุ </Radio>
            </Radio.Group>
          </Form.Item>
          <Row>
            <Col span={6} style={{ marginRight: 7 }}>
              <Form.Item
                name="prefixphone"
                label="หมายเลขโทรศัพท์มือถือ"
                rules={[{ required: true }]}
              >
                <Select style={{ width: 70 }}>
                  <Option value="66">+66</Option>
                  <Option value="77">+77</Option>
                </Select>
              </Form.Item>
            </Col>
            -
            <Col span={6} style={{ marginLeft: 7 }}>
              <Form.Item name="phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="booking"
            label="หนังสือเดินทาง"
            style={{ width: 400 }}
          >
            <Input />
          </Form.Item>

          <Row>
            <Form.Item
              name="salary"
              label="เงินเดือนที่คาดหวัง"
              style={{ width: 400 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ marginLeft: 120 }}>
              <Button htmlType="button" onClick={onReset}>
                ล้างข้อมูล
              </Button>
            </Form.Item>
            <Form.Item style={{ marginLeft: 60 }}>
              <Button htmlType="submit">ส่งข้อมูล</Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="Table">
        <MyTable />
      </div>
    </div>
  );
};

export default Test2;
