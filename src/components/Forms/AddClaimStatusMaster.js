"use client"
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import { useGetMasterSubChildDataMutation } from '../../lib/api/masterSubChildDataApi';
import { AesCipher, IsEmpty } from '../../utility/handler';
import { useAddClaimsStatusMasterMutation } from '../../lib/api/claimMasterApi';

export const AddClaimStatusMaster = ({ open, onCreate, onCancel }) => {
    const [AddClaimsStatusMaster] = useAddClaimsStatusMasterMutation()
    const [form] = Form.useForm();
    const [applicable, setApplicable] = useState(false)

    const handleAddClaimsStatusMaster = async (value) => {
        console.log("values", value);
        console.log("applicable", applicable);
        let { 
            code,description,shortDescription,
            longDescription,effFromDate,effToDate,
            bilDescription,bilShortDescription,
            bilLongDescription
        } = value
        let payload = {
            "code": code,
            "description": description,
            "shortDescription": shortDescription,
            "longDescription": longDescription,
            "applicable": applicable,
            "applicableModule": "01",
            "effFromDate": effFromDate,
            "effToDate": effToDate,
            "bilDescription": bilDescription,
            "bilShortDescription": bilShortDescription,
            "bilLongDescription": bilLongDescription
        }
        const encryptedData = AesCipher.encrypt(JSON.stringify(payload));

        try {
            const response = await AddClaimsStatusMaster({ encryptData: encryptedData })
            console.log("handleAddClaimsStatusMaster", response);
            if (!response?.error) {
                form.resetFields();
                onCreate(value);
            }
        } catch (error) {

        }
    }
    const onCheckboxChange = (e) => {
        setApplicable(e.target.checked);
    };
    const FormField = [
        {
            name: "code",
            label: 'Code',
            required: true
        },
        {
            name: "description",
            label: 'DESCRIPTION',
            required: true
        },
        {
            name: "shortDescription",
            label: 'SHORT DESC',
            required: false
        },
        {
            name: "longDescription",
            label: 'LONG DESC',
            required: false
        },
    ]
    const BilingualFormField = [
        {
            name: "bilDescription",
            label: 'DESCRIPTION',
            required: true
        },
        {
            name: "bilShortDescription",
            label: 'SHORT DESC',
            required: false
        },
        {
            name: "bilLongDescription",
            label: 'LONG DESC',
            required: false
        },
    ]
    return (
        <Modal
            open={open}
            title="Add Claim Status Master"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        handleAddClaimsStatusMaster(values)
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
                    {FormField.map(item => {
                        return (
                            <Form.Item
                                name={item.name}
                                label={item.label}
                                rules={[
                                    {
                                        required: item.required,
                                        message: `Please input the ${item}!`,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        )
                    })}
                    <Form.Item>
                        <Checkbox checked={applicable} onChange={onCheckboxChange}>
                            CODE BY CLASS
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        label="EFFECTIVE FROM DATE"
                        name="effFromDate"
                        rules={[
                            {
                                required: true,
                                message: 'Please input EFFECTIVE FROM DATE!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="EFFECTIVE TO DATE"
                        name="effToDate"
                        rules={[
                            {
                                required: false,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <h4>{'Bilingual Details'}</h4>
                    {BilingualFormField.map(item => {
                        return (
                            <Form.Item
                                name={item.name}
                                label={item.label}
                                rules={[
                                    {
                                        required: item.required,
                                        message: `Please input the ${item}!`,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        )
                    })}
                </Form>
            </>

        </Modal>
    );
};