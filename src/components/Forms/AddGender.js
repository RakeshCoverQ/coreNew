"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import { useGetMasterSubChildDataMutation } from '../../lib/api/masterSubChildDataApi';
import { AesCipher, IsEmpty } from '../../utility/handler';
import { useAddStateMutation } from '../../lib/api/addGeneralApi';

export const AddGender = ({ open, onCreate, onCancel }) => {
    const [AddState] = useAddStateMutation()
    const [form] = Form.useForm();

    const handleAddState = async (value) => {
        let { Gender } = value
        let payload = {
            "countryCode": null,
            "stateCode": null,
            "bankCode": null,
            "makeCode": null,
            "id": null,
            "serviceType": "Gender Master",
            "description": Gender
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
            title="Add new Gender"
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
                        name="Gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Gender name!',
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