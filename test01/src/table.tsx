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
      sorter: (a, b) => a.ชื่อ.length - b.ชื่อ.length,
      sortDirections: ["descend"],
    },
    {
      title: "เพศ",
      dataIndex: "เพศ",
      key: "เพศ",
      filters: [
        {
          text: "ผู้ชาย/male",
          value: "ผู้ชาย || male",
        },
        {
          text: "ผู้หญิง/female",
          value: "ผู้หญิง || female",
        },
        {
          text: "ไม่ระบุ/anonymous",
          value: "ไม่ระบุ || anonymous",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        const gender = record.เพศ;
        return (
          gender === value ||
          (gender === "ผู้ชาย" && value === "ผู้ชาย || male") ||
          (gender === "male" && value === "ผู้ชาย || male") ||
          (gender === "ผู้หญิง" && value === "ผู้หญิง || female") ||
          (gender === "female" && value === "ผู้หญิง || female") ||
          (gender === "ไม่ระบุ" && value === "ไม่ระบุ || anonymous") ||
          (gender === "anonymous" && value === "ไม่ระบุ || anonymous")
        );
      },
    },
    {
      title: "หมายเลขโทรศัพท์มือถือ",
      dataIndex: "หมายเลขโทรศัพท์มือถือ",
      key: "หมายเลขโทรศัพท์มือถือ",
      filters: [
        {
          text: "+66",
          value: "+66",
        },
        {
          text: "+77",
          value: "+77",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.หมายเลขโทรศัพท์มือถือ.indexOf(value as string) === 0,
    },
    {
      title: "สัญชาติ",
      dataIndex: "สัญชาติ",
      key: "สัญชาติ",
      filters: [
        {
          text: "ไทย/thai",
          value: "ไทย || thai",
        },
        {
          text: "อื่นๆ/other",
          value: "อื่นๆ || other",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        const nation = record.สัญชาติ;
        return (
          nation === value ||
          (nation === "ไทย" && value === "ไทย || thai") ||
          (nation === "thai" && value === "ไทย || thai") ||
          (nation === "อื่นๆ" && value === "อื่นๆ || other") ||
          (nation === "other" && value === "อื่นๆ || other") 
);
      },
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
