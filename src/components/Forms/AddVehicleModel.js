"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import { useGetMasterSubChildDataMutation } from '../../lib/api/masterSubChildDataApi';
import { AesCipher, IsEmpty } from '../../utility/handler';
import { useAddStateMutation } from '../../lib/api/addGeneralApi';

export const AddVehicleModel = ({ open, onCreate, onCancel }) => {
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
        FetchMasterSubChildData({ encryptData: encryptedData, SessionType: "Vehicle Make" })

    }
    const handleAddState = async (value) => {
        let { VehicleModel, makeCode } = value
        let payload = {
            "countryCode": null,
            "stateCode": null,
            "bankCode": null,
            "makeCode": makeCode,
            "id": null,
            "serviceType": "Vehicle Model",
            "description": VehicleModel
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
            title="Add New Vehicle Model"
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
                            label="Select Vehicle Make"
                            name="makeCode"
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
                            name="VehicleModel"
                            label="Vehicle Model"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the Vehicle Model!',
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