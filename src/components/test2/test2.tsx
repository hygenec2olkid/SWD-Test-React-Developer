import "./test2.css";
import { Form, Input, Select, Row, Col, DatePicker, Radio, Button } from "antd";
import { createFormData } from "../../stores/formSlide";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import MyTable from "./table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Test2 = () => {
  // use useDispatch to update state in data using redux
  const dispatch = useDispatch();

  // init form
  const [form] = Form.useForm();

  //use useTranslation to transtate th/en
  const { t } = useTranslation();

  const { Option } = Select;

  // init form from formSliceReducer
  const formDataArray = useSelector(
    (state: any) => state.formSlice.formDataArray
  );

  // create localFormDataArray to keep data in localStorage
  const [localFormDataArray, setLocalFormDataArray] = useState(formDataArray);

  // use useEffect to detect dispatch when get new data from form
  useEffect(() => {
    const savedFormDataArray = localStorage.getItem("formDataArray");
    if (savedFormDataArray) {
      const parsedFormDataArray = JSON.parse(savedFormDataArray);
      setLocalFormDataArray(parsedFormDataArray);
      dispatch(createFormData(parsedFormDataArray));
    }
  }, [dispatch]);

  // save data in localStorage
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
      <header className="header">{t("contentTest2")}</header>
      <div className="Form">
        <Form form={form} onFinish={onSubmit}>
          <Row gutter={[16, 16]} justify="start">
            <Col span={5}>
              <Form.Item
                name="prefix"
                label={t("prefix")}
                rules={[{ required: true }]}
              >
                <Select placeholder={t("prefix")} allowClear>
                  <Option value={t("prefixNameChoice1")}>
                    {t("prefixNameChoice1")}
                  </Option>
                  <Option value={t("prefixNameChoice2")}>
                    {t("prefixNameChoice2")}
                  </Option>
                  <Option value={t("prefixNameChoice3")}>
                    {t("prefixNameChoice3")}
                  </Option>
                  <Option value={t("prefixNameChoice4")}>
                    {t("prefixNameChoice4")}
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fname"
                label={t("fname")}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lname"
                label={t("lname")}
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
                label={t("birthday")}
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={8}>
              {" "}
              <Form.Item
                name="nationality"
                label={t("nationality")}
                rules={[{ required: true }]}
              >
                <Select placeholder={t("nationalityPlaceholder")} allowClear>
                  <Option value={t("nationalityChoice1")}>
                    {t("nationalityChoice1")}
                  </Option>
                  <Option value={t("nationalityChoice2")}>
                    {t("nationalityChoice2")}
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={5}>
              <Form.Item name="citizenID" label={t("citizenID")}>
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
          <Form.Item
            label={t("gender")}
            name="gender"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={t("genderChoice1")}> {t("genderChoice1")}</Radio>
              <Radio value={t("genderChoice2")}> {t("genderChoice2")} </Radio>
              <Radio value={t("genderChoice3")}> {t("genderChoice3")} </Radio>
            </Radio.Group>
          </Form.Item>
          <Row>
            <Col style={{ marginRight: 7 }}>
              <Form.Item
                name="prefixphone"
                label={t("phoneNumber")}
                rules={[{ required: true }]}
              >
                <Select style={{ width: 70 }}>
                  <Option value="+66">+66</Option>
                  <Option value="+77">+77</Option>
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
          <Form.Item name="booking" label={t("booking")} style={{ width: 400 }}>
            <Input />
          </Form.Item>

          <Row>
            <Form.Item
              name="salary"
              label={t("salary")}
              style={{ width: 400 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ marginLeft: 120 }}>
              <Button htmlType="button" onClick={onReset}>
                {t("buttonClear")}
              </Button>
            </Form.Item>
            <Form.Item style={{ marginLeft: 60 }}>
              <Button htmlType="submit">{t("buttonSubmit")}</Button>
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
