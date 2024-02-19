"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import { useGetMasterSubChildDataMutation } from '../../lib/api/masterSubChildDataApi';
import { AesCipher, IsEmpty } from '../../utility/handler';
import { useAddStateMutation } from '../../lib/api/addGeneralApi';

export const AddBank = ({ open, onCreate, onCancel }) => {
    const [AddState] = useAddStateMutation()
    const [form] = Form.useForm();

    const handleAddState = async (value) => {
        let { BankCode, BankName } = value
        let payload = {
            "countryCode": null,
            "stateCode": null,
            "bankCode": BankCode,
            "makeCode": null,
            "id": null,
            "serviceType": "List of Banks",
            "description": BankName
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
    return (
        <Modal
            open={open}
            title="Add New Bank"
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
                        name="BankCode"
                        label="Bank Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Bank Code!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="BankName"
                        label="Bank Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Bank Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </>

        </Modal>
    );
};