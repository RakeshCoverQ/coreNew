"use client"
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './login.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../../lib/api/loginApi';
import { AES, SHA256, enc } from 'crypto-js';
import { useGetIpAddressQuery } from '../../lib/api/IPApi';
import { encryptData, getDeviceType } from '../../utility/handler';
import AesUtil from '../../utility/AesUtil';
import { useDispatch } from 'react-redux';
import { userInfoAction } from '../../lib/slice/loginSlice';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [login, { isLoading: loginLoading, isError: loginError }] = useLoginMutation();
  const { data: ipAddress, isLoading: ipLoading, isError: ipError } = useGetIpAddressQuery();
  const [deviceType, setDeviceType] = useState('');
  const AesCipher = new AesUtil({
    key: "859aa1127c96a7da",
    iv: "1b554da30e64f609",
  });
  useEffect(() => {
    const type = getDeviceType();
    setDeviceType(type);
  }, []);
  const onFinish = (values) => {
    const payload = {
      userId: values.username,
      password: SHA256(values.password).toString(enc.Hex),
      ipAddress: ipAddress?.ip,
      deviceType: deviceType,
      browserType: "application",
      applicationVersion: "0.1"
    };
    const encryptedData = AesCipher.encrypt(JSON.stringify(payload));
    const decryptData = AesCipher.decrypt(encryptedData);
    handleLogin(encryptedData);
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      if (response?.data?.data) {
        let decryptData = AesCipher.decrypt(response?.data?.data);
        let userData = JSON.parse(decryptData)
        console.log('Login Success:', response);
        dispatch(userInfoAction(userData))
        Cookies.set("loggedin", true);
        router.push('/dashboard/master');
        console.log('Login Success:', JSON.parse(decryptData));
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loginLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
