import React from "react";
import { Button, Table } from "antd";
import { useSelector } from "react-redux";
import { FormDataState } from "./todoSlice";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

interface DataSourceItem {
  key: number;
  ชื่อ: string;
  เพศ: string;
  หมายเลขโทรศัพท์มือถือ: string;
  สัญชาติ: string;
  จัดการ: string;
}

const MyTable: React.FC = () => {
  // init form
  const formDataArray = useSelector(
    (state: any) => state.todoSlice.formDataArray
  );

  // use useTranslation to transtate th/en
  const { t } = useTranslation();

  // use date from form
  const dataSource: DataSourceItem[] = formDataArray.map(
    (formData: FormDataState, index: number) => ({
      key: index,
      ชื่อ: `${formData.prefix} ${formData.fname} ${formData.lname}`,
      เพศ: formData.gender,
      หมายเลขโทรศัพท์มือถือ: `${formData.prefixphone} ${formData.phone}`,
      สัญชาติ: formData.nationality,
      จัดการ: "ตัวอย่าง",
    })
  );

  // determine name and type colum
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "ชื่อ",
      dataIndex: "ชื่อ",
      key: "ชื่อ",
    },
    {
      title: "เพศ",
      dataIndex: "เพศ",
      key: "เพศ",
    },
    {
      title: "หมายเลขโทรศัพท์มือถือ",
      dataIndex: "หมายเลขโทรศัพท์มือถือ",
      key: "หมายเลขโทรศัพท์มือถือ",
    },
    {
      title: "สัญชาติ",
      dataIndex: "สัญชาติ",
      key: "สัญชาติ",
    },
    {
      title: "จัดการ",
      dataIndex: "จัดการ",
      key: "จัดการ",
    },
  ];

  const paginationConfig = {
    pageSize: 5,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <div>
      <Button style={{ marginBottom: 10 }}>{t("buttonDelete")}</Button>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default MyTable;
