"use client"
import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
export const AddStateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Add new state"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
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
                    name="Select"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Select >
                        <Option value="Nigeria">Nigeria</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="StateName"
                    label="State Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the state name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};