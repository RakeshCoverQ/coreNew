"use client"
import React from 'react';
import { Card, Space, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';


export default function Cards() {
    const ImageStyle = {
        // height: 200,
        borderRadius: 5,
        // width: 400,
    };

    const overlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        height: '95%',
        background: 'rgba(255, 255, 255, 0.2)', 
        backdropFilter: 'blur(2.5px)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft:'2.5%',
        border: '1px solid #FFF',
    };

    const container = {
        overflow: 'hidden',
        height: '200px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const fontColor = {
        color: '#FFF'
    }

    return (
        <>
            <Space direction="vertical" size={16}>
                <Card
                    hoverable
                    bordered
                    style={{
                        width: 400,
                        height: 200,
                        position: 'relative',
                        marginLeft: 30,
                        marginBottom: 30
                    }}
                    cover={
                        <div style={container}>
                            <img
                                alt="example"
                                style={ImageStyle}
                                src="https://images.unsplash.com/photo-1553532434-5ab5b6b84993?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                            <div style={overlayStyle}>
                                <Avatar
                                    style={{
                                        backgroundColor: '#1677ff',
                                    }}
                                    icon={<AntDesignOutlined />}
                                />
                                <h3 style={fontColor}>Title</h3>
                                <h5 style={fontColor}>
                                    Ipsum nisi fugiat dolor mollit incididunt ea veniam 
                                    proident exercitation labore non fugiat qui .
                                </h5>
                            </div>
                        </div>
                    }
                ></Card>
            </Space>
        </>
    );
}
