import React, {Component} from 'react';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {login} from "../utils";
class LoginForm extends Component {
    state = {
        loading: false
    }

    onFinish = (values) => {
        //set button loading
        this.setState({loading: true})
        login(values)
            .then( () => {
                //login successfully
                //inform users
                //inform parent component App logged in
                message.success("Login Successful");
                this.props.onSuccess();
            })
            .catch( err => {
                //login failed
                //inform users
                message.error(err.message);
            })
            .finally( () => {
                //always do
                //set button not loading
                this.setState( { loading: false});
            })
    };

    render() {
        return (
            <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true, message: 'Please input your Username!'
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true, message: 'Please input your Password!'
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;