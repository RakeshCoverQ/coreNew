"use client"
import React, { useEffect, useState } from 'react'
import { useGetClaimsStatusMasterMutation } from '../../../../../lib/api/claimMasterApi'
import { AesCipher, IsEmpty } from '../../../../../utility/handler';
import styles from './claimStatusMaster.module.css'
import { Button } from 'antd';
import { IoIosAddCircle } from 'react-icons/io';
import { Tables } from '../../../../../components/Tables';
import { Forms } from '../../../../../components/Forms';
export default function claimStatusMaster() {
  const [FetchClaimsStatusList, ClaimsStatusList] = useGetClaimsStatusMasterMutation();
  const [open, setOpen] = useState(false);
  const handleFetchClaimsStatusList = () => {
    let payload = {
      "fromDate": "",
      "toDate": "",
      "pageCount": 10,
      "pageNumber": 1,
      "isSearch": false,
      "columnName": "",
      "value": "",
      "serviceType": "",
      "productId": "1001"
    }
    const encryptedData = AesCipher.encrypt(JSON.stringify(payload));
    FetchClaimsStatusList({ encryptData: encryptedData })
  }
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  useEffect(() => {
    console.log("handleFetchClaimsStatusList");
    handleFetchClaimsStatusList()
  }, [open])
  const columns = [
    {
      title: '#',
      dataIndex: '#',
      key: "#",
      width: 200,
    },
    {
      title: 'Code',
      dataIndex: 'CODE',
      key: "CODE",
      width: 200,
    },
    {
      title: 'CLASS CODE',
      dataIndex: 'CLASS_CODE',
      key: "CLASS_CODE",
      width: 200,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'DESCRIPTION',
      key: "DESCRIPTION",
      width: 200,
    },
    {
      title: 'EFFECTIVE FROM',
      dataIndex: 'EFFECTIVE_FROM',
      key: "EFFECTIVE_FROM",
      width: 200,
    },
    {
      title: 'EFFECTIVE FROM',
      dataIndex: 'EFFECTIVE_FROM',
      key: "EFFECTIVE_FROM",
      width: 200,
    },
    {
      title: 'EFFECTIVE TO',
      dataIndex: 'EFFECTIVE_TO',
      key: "EFFECTIVE_TO",
      width: 200,
    },
    {
      title: 'CLASS VALUE',
      dataIndex: 'CLASS_VALUE',
      key: "CLASS_VALUE",
      width: 200,
    },
  ]

  return (
    <div className={styles.container}>
      {!IsEmpty(ClaimsStatusList?.data?.data?.DATA) && (
        <>
          <div className={styles.AddButtonContainer}>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
              }}
              shape="circle"
              icon={<IoIosAddCircle size={25} />}
            />
          </div>
          <div className={styles.TableContainer}>
            <Tables.PrimaryTable
              data={ClaimsStatusList?.data?.data?.DATA}
              columns={columns}
            />
          </div>
          <>
            <Forms.AddClaimStatusMaster
              open={open}
              onCreate={onCreate}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </>
        </>
      )}
    </div>
  )
}
