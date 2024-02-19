"use client"
import React, { useEffect, useState } from 'react'
import styles from './masterModuleSubChildDetail.module.css'
import { useSearchParams } from 'next/navigation';
import { useGetMasterSubChildDataMutation } from '../../../../../../../lib/api/masterSubChildDataApi';
import { IsEmpty } from '../../../../../../../utility/handler';
import AesUtil from '../../../../../../../utility/AesUtil';
import { Tables } from '../../../../../../../components/Tables';
import { Button, Tooltip, Form, Input, Modal, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IoIosAddCircle } from "react-icons/io";
import { Forms } from '../../../../../../../components/Forms';
import { useSelector } from 'react-redux';

export default function MasterModuleSubChildDetail() {
  const Data = useSelector(state => state?.userInfo?.userData?.DATA)
  const [open, setOpen] = useState(false);
  const [FetchMasterSubChildData, MasterSubChildData] = useGetMasterSubChildDataMutation()
  const searchParams = useSearchParams()
  const data = JSON.parse(searchParams.get('data'));
  const AesCipher = new AesUtil({
    key: "859aa1127c96a7da",
    iv: "1b554da30e64f609",
  });
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const handleFetchMasterSubChildData = () => {
    if (!IsEmpty(data?.MODULE_NAME)) {
      let payload = {
        "fromDate": "",
        "toDate": "",
        "pageCount": 10000,
        "pageNumber": 1,
        "isSearch": false,
        "columnName": "",
        "value": ""
      }
      const encryptedData = AesCipher.encrypt(JSON.stringify(payload));
      const decryptData = AesCipher.decrypt(encryptedData);
      console.log("encryptedData", encryptedData);
      console.log("decryptData", decryptData);
      FetchMasterSubChildData({ encryptData: encryptedData, SessionType: data?.MODULE_NAME })
    }
  }
  useEffect(() => {
    console.log("hhdsavjhvbjfs", JSON.stringify(Data));
    if (!IsEmpty(data)) {
      handleFetchMasterSubChildData()
    }
  }, [open])
  const createColumn = (value) => {
    const columns = [
      {
        title: '#',
        dataIndex: '#',
        key: "#",
        width: 200,
      },
      {
        title: data?.MODULE_NAME,
        dataIndex: 'Description',
        key: "Description",
        width: 200,
      },
      {
        title: 'Code',
        dataIndex: 'Code',
        key: "Code",
        width: 200,
      },
    ]
    return columns
  }

  return (
    <div className={styles.container}>
      {!IsEmpty(MasterSubChildData?.data?.data?.DATA) && (
        <>
          <div className={styles.AddButtonContainer}>
            <Button
              type="primary"
              onClick={() => {
                console.log(data?.MODULE_NAME)
                setOpen(true);
              }}
              shape="circle"
              icon={<IoIosAddCircle size={25} />}
            />
          </div>
          <div className={styles.TableContainer}>
            <Tables.PrimaryTable
              data={MasterSubChildData?.data?.data?.DATA}
              columns={createColumn(MasterSubChildData?.data?.data?.DATA)}
            />
          </div>
          {data?.MODULE_NAME === "State" && (
            <>
              <Forms.AddStateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "City" && (
            <>
              <Forms.AddCityForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "Gender Master" && (
            <>
              <Forms.AddGender
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "Cause Of Loss" && (
            <>
              <Forms.AddCauseOfLoss
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "List of Nature of Loss" && (
            <>
              <Forms.AddNatureOfLoss
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "List of Banks" && (
            <>
              <Forms.AddBank
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "List of Professions" && (
            <>
              <Forms.AddProfession
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "Nationality" && (
            <>
              <Forms.AddNationality
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "Vehicle Make" && (
            <>
              <Forms.AddVehicleMake
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "Vehicle Model" && (
            <>
              <Forms.AddVehicleModel
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          {data?.MODULE_NAME === "Vehicle Type" && (
            <>
              <Forms.AddVehicleType
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}

        </>
      )}
    </div>
  )
}