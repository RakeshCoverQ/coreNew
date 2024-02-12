"use client"
import React, { useState } from 'react';
import {
    Card,
    Space,
    Button,
    message,
    Steps,
    theme,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
} from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import Step1Form from './Step1Form';
import Step3Form from './Step3Form';
import Step2Form from './Step2Form';
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};
const { RangePicker } = DatePicker;
const UnderwritingMultiForm = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        paddingTop: 10
    };
    return (
        <>
            <Space direction="vertical" size={16}>
                <Card
                    title="Multi Step Form"
                    style={{
                        width: 1000,
                    }}
                >
                    <Steps current={current} items={items} />
                    <div style={contentStyle}>
                        
                        {steps[current].title === "First" && <><Step2Form/></>}
                        {steps[current].title === "Second" && <><Step1Form/></>}
                        {steps[current].title === "Last" && <><Step3Form/></>}
                    </div>
                    <div
                        style={{
                            marginTop: 24,
                        }}
                    >
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => prev()}
                            >
                                Previous
                            </Button>
                        )}
                    </div>

                </Card>
            </Space>
        </>
    )

};
export default UnderwritingMultiForm;