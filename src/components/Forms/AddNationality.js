"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import { useGetMasterSubChildDataMutation } from '../../lib/api/masterSubChildDataApi';
import { AesCipher, IsEmpty } from '../../utility/handler';
import { useAddStateMutation } from '../../lib/api/addGeneralApi';

export const AddNationality = ({ open, onCreate, onCancel }) => {
    const [FetchMasterSubChildData, MasterSubChildData] = useGetMasterSubChildDataMutation()
    const [AddState] = useAddStateMutation()
    const [form] = Form.useForm();
    const handleFetchMasterSubChildData = () => {
        let payload = {
            "fromDate": "",
            "toDate": "",
            "pageCount": 100,
            "pageNumber": 1,
            "isSearch": false,
            "columnName": "",
            "value": ""
        }
        const encryptedData = AesCipher.encrypt(JSON.stringify(payload));
        FetchMasterSubChildData({ encryptData: encryptedData, SessionType: "Country" })

    }
    const handleAddState = async (value) => {
        let { Nationality, countryCode } = value
        let payload = {
            "countryCode": countryCode,
            "stateCode": null,
            "bankCode": null,
            "makeCode": null,
            "id": null,
            "serviceType": "Nationality",
            "description": Nationality
        }
        const encryptedData = AesCipher.encrypt(JSON.stringify(payload));

        try {
            const response = await AddState({ encryptData: encryptedData })
            console.log("handleAddState", response);
            if (!response?.error) {
                form.resetFields();
                onCreate(value);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        handleFetchMasterSubChildData()
    }, [])
    return (
        <Modal
            open={open}
            title="Add New Nationality"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        handleAddState(values)
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            {!IsEmpty(MasterSubChildData?.data?.data?.DATA) && (
                <>
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                    >
                        <Form.Item
                            label="Select Country"
                            name="countryCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Select >
                                {MasterSubChildData?.data?.data?.DATA.map(item => {
                                    return (
                                        <Option value={item.ID}>{item.Description}</Option>
                                    )
                                })}

                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="Nationality"
                            label="Nationality"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the Nationality!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </>
            )}

        </Modal>
    );
};