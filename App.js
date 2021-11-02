import React from 'react';
import { Layout, Typography } from "antd";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import FoodList from "./components/FoodList";
import MyCart from "./components/MyCart"
import './App.css';
import SignupForm from "./components/SignupForm";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
    const [ authed, setAuthed ] = useState(false);
    return (
        <Layout style={{ height: "100vh" }}>
            <Header>
                <div className="header">
                    <Title level={2}
                           style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
                    >
                        Doubao(my cat)'s Canteen
                    </Title>
                    <img src="https://www.pinclipart.com/picdir/big/558-5581758_how-to-draw-pusheen-the-cat-easy-pusheen.png"
                         alt="cartoon-cat-icon"
                         width="63"
                         height="63"
                    />
                    <div>
                        { authed
                            ?
                            <MyCart />
                            :
                            <SignupForm />
                        }
                    </div>
                </div>
            </Header>
            <Content style={{
                padding: "50px",
                maxHeight: "calc(100% - 64px)",
                overflowY: "auto",
            }}>
                {
                    authed ?
                    <FoodList />
                    :
                    <LoginForm onSuccess={ () => setAuthed(true) }/>
                }
            </Content>
        </Layout>
    );
}

export default App;
