import React, {Component} from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {signup} from "../utils";

class SignupForm extends Component {
    state = {
        displayModal: false
    };

    handleCancel = () => {
        this.setState({
            displayModal: false,
        });
    };

    signupOnClick = () => {
        this.setState({
            displayModal: true,
        });
    };

    onFinish = (data) => {
        //inform server to register
        signup(data)
            .then(() => {
                message.success(`Successfully signed up`);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                this.handleCancel();
            });
    };

    render() {
        return (
            <>
                <Button type={"primary"} onClick={this.signupOnClick}>
                    Register Here Meow~
                </Button>
                <Modal title="Register"
                       visible={this.state.displayModal}
                       onCancel={this.handleCancel}
                       destroyOnClose={true}
                >
                    <Form
                        name="normal_register"
                        onFinish={this.onFinish}
                        preserve={false}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Meow, please input your email" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Meow, please input your password" },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                                type="password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Meow, confirm your password please',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Meow, Your passwords don\'t match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="firstName"
                            rules={[
                                { required: true, message: "Meow, I want to know your first name meow~" },
                            ]}
                        >
                            <Input placeholder="Firstname" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            rules={[
                                { required: true, message: "Meow, I want to know your last name~~" },
                            ]}
                        >
                            <Input placeholder="Lastname" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>

            </>
        );
    }
}

export default SignupForm;