import React, { useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FormDataState, deleteFormData } from "../../stores/formSlide";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

interface DataSourceItem {
  key: number;
  name: string;
  gender: string;
  phoneNumber: string;
  nationality: string;
  handle: string;
}

const MyTable: React.FC = () => {
  //keep track of the selected row keys
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  // init form from formSlice
  const formDataArray = useSelector(
    (state: any) => state.formSlice.formDataArray
  );

  // use useTranslation to transtate th/en
  const { t } = useTranslation();

  //use useDispatch to call function deleteFormData
  const dispatch = useDispatch();

  // use date from form
  const dataSource: DataSourceItem[] = formDataArray.map(
    (formData: FormDataState, index: number) => ({
      key: index,
      name: `${formData.prefix} ${formData.fname} ${formData.lname}`,
      gender: formData.gender,
      phoneNumber: `${formData.prefixphone} ${formData.phone}`,
      nationality: formData.nationality,
      handle: "ตัวอย่าง",
    })
  );

  // determine name and type colum
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
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
        const _gender = record.gender;
        return (
          _gender === value ||
          (_gender === "ผู้ชาย" && value === "ผู้ชาย || male") ||
          (_gender === "male" && value === "ผู้ชาย || male") ||
          (_gender === "ผู้หญิง" && value === "ผู้หญิง || female") ||
          (_gender === "female" && value === "ผู้หญิง || female") ||
          (_gender === "ไม่ระบุ" && value === "ไม่ระบุ || anonymous") ||
          (_gender === "anonymous" && value === "ไม่ระบุ || anonymous")
        );
      },
    },
    {
      title: t("phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
        record.phoneNumber.indexOf(value as string) === 0,
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      filters: [
        {
          text: "ไทย/Thai",
          value: "ไทย || Thai",
        },
        {
          text: "อื่นๆ/Other",
          value: "อื่นๆ || Other",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        const nation = record.nationality;
        return (
          nation === value ||
          (nation === "ไทย" && value === "ไทย || Thai") ||
          (nation === "Thai" && value === "ไทย || Thai") ||
          (nation === "อื่นๆ" && value === "อื่นๆ || Other") ||
          (nation === "Other" && value === "อื่นๆ || Other")
        );
      },
    },
    {
      title: t("handle"),
      dataIndex: "handle",
      key: "handle",
    },
  ];

  const handleDelete = () => {
    const updatedDataArray = formDataArray.filter(
      (_: any, index: number) => !selectedRowKeys.includes(index)
    );

    // // Delete data from local storage
    localStorage.setItem("formDataArray", JSON.stringify(updatedDataArray));

    // // Update the Redux store
    dispatch(deleteFormData(selectedRowKeys));

    // // Clear the selected row keys
    setSelectedRowKeys([]);
  };

  const paginationConfig = {
    pageSize: 5,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <div>
      <Button onClick={handleDelete} style={{ marginBottom: 10 }}>
        {t("buttonDelete")}
      </Button>
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedKeys: React.Key[]) =>
            setSelectedRowKeys(selectedKeys as number[]),
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default MyTable;
