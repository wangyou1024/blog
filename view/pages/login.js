import React, {useEffect, useState} from "react";
import {Row, Col, Input, Button, message} from "antd";
import TweenOne from 'rc-tween-one';
import dynamic from "next/dynamic";
import QueueAnim from 'rc-queue-anim';
import {Provider} from "react-redux";
import store from "../redux/store";
import {getPage} from "../redux/action/head";
import "../static/login.css";
import axios from "axios";
import {BASE_URL, DATA_URL} from "../components/util";
import Router from "next/router";
import Head from "next/head";

const ParticlesBg = dynamic(() => import('particles-bg'), {ssr: false});

const Login = () => {

    const [user, setUser] = useState({email: "", password: "", code: ""});

    // show the login page or sign page
    const [login, setLogin] = useState(true);
    const [paused, setPaused] = useState(true);
    const [reserve, setReserve] = useState(false);


    useEffect(() => {
        store.dispatch(getPage("login"));
    }, [])

    const emailCheck = () => {
        if (user.email == "") {
            message.warn("请输入邮箱");
            return false;
        } else {
            const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!reg.test(user.email)) {
                message.error("邮箱格式错误")
                return false;
            }
        }
        return true;
    }
    const passwordCheck = () => {
        if (user.password.length < 6 || user.password.length > 16) {
            message.warn("密码为6-16为字符");
            return false;
        }
        return true;
    }
    const codeCheck = () => {
        const reg = /^[a-zA-Z0-9!@#\$%\^&\*\(\)]{4}$/;
        if (!reg.test(user.code)) {
            message.error("验证码格式错误");
            return false;
        }
        return true;
    }

    const userHandle = (type, data) => {
        const newUser = JSON.parse(JSON.stringify(user));
        switch (type) {
            case "email":
                newUser.email = data;
                break;
            case "password":
                newUser.password = data;
                break;
            case "code":
                newUser.code = data;
                break;
        }
        setUser(newUser);
    }

    const loginIn = () => {
        if (!(emailCheck() && passwordCheck())) {
            return;
        }
        axios({
            method: "post",
            url: DATA_URL + "/user/login",
            withCredentials: true,
            data: user
        }).then(res => {
            const result = res.data;
            switch (result) {
                case "success":
                    Router.push("/");
                    break;
                case "unknown account":
                    message.warn("没有该账户");
                    break;
                case "error password":
                    message.error("密码错误");
                    break;
                case "unknown exception":
                    message.warn("未知错误");
                    break;
            }
        }).catch(error => {
            message.error("网络异常");
        })
    }
    const signUp = () => {
        if (!(emailCheck() && passwordCheck() && codeCheck())) {
            return;
        }
        axios({
            method: "post",
            url: DATA_URL + "/user/register",
            withCredentials: true,
            data: {
                "email": user.email,
                "password": user.password,
                "code": user.code
            }
        }).then(res => {
            if (res.data === "success") {
                message.success("注册成功");
                setLogin(true);
                setReserve(true);
                setPaused(false);
            } else if (res.data === "error code") {
                message.error("验证码错误");
            } else if (res.data === "exit") {
                message.warn("用户已存在");
            } else {
                message.error("网络错误");
            }
        }).catch(error => {
            message.error("注册失败");
        })
    }
    const getCode = () => {
        if (!emailCheck()){
            return ;
        }
        axios({
            method: "get",
            url: DATA_URL + "/user/code",
            withCredentials: true,
            params:{"email":user.email}
        }).then(res => {
            if (res.data === "success") {
                message.success("验证码已经发送到邮箱")
            }
        }).catch(error => {
            message.error("验证码发送失败");
        });
    }

    const resetting = () => {
        if (!emailCheck()){
            return;
        }
        axios({
            method: "get",
            url: DATA_URL + "/user/launchResetting",
            withCredentials: true,
            // data: {"email":user.email}
            params: {"email": user.email}
        }).then(res => {
            if (res.data === "success") {
                message.success("请前往邮箱验证")
            }
        }).catch(error => {
            message.error("请求异常");
        })
    }

    return (
        <Provider store={store}>
            <Head>
                <title>baiyou1024</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <Row justify="center">
                <Col span={7}
                     xs={{span: 22}}
                     sm={{span: 18}}
                     md={{span: 7}}
                >
                    <TweenOne animation={{height: "460px", duration: 500}}
                              paused={paused}
                              reverse={reserve}
                              style={{
                                  borderRadius: "10px",
                                  height: "390px",
                                  marginTop: "64px",
                                  padding: "16px",
                                  // rgb(250, 255, 255, 0.625)
                                  backgroundColor: "rgba(224,238,238,0.62)",
                                  overflow: "hidden"
                              }}
                    >
                        <Row justify="center">
                            <Col span={login ? 22 : 0}>
                                <QueueAnim className="demo-content"
                                           animConfig={[
                                               {opacity: [1, 0], translateY: [0, 50]},
                                               {opacity: [1, 0], translateY: [0, -50]}
                                           ]}>
                                    {login ? [
                                        <Row justify="center">
                                            <Col style={{
                                                width: "40px",
                                                height: "40px",
                                                padding: "6px 8px",
                                                borderRadius: "20px",
                                                backgroundColor: "#f50057"
                                            }}>
                                                <img src="../static/img/lock.svg"/>
                                            </Col>
                                        </Row>,
                                        <Row justify="center" key="a">
                                            <h1>登录</h1>
                                        </Row>,
                                        <Row style={{padding: "20px"}} key="b">
                                            <Input placeholder="电子邮箱"
                                                   style={{height: "50px", borderRadius: "5px", background: "none"}}
                                                   value={user.email}
                                                   onChange={(e) => {
                                                       userHandle("email", e.target.value);
                                                   }}
                                            />
                                        </Row>,
                                        <Row style={{padding: "0px 20px 20px 20px"}} key="c">
                                            <Input.Password placeholder="密码"
                                                            style={{
                                                                height: "50px",
                                                                borderRadius: "5px",
                                                                background: "none"
                                                            }}
                                                            value={user.password}
                                                            onChange={(e) => {
                                                                userHandle("password", e.target.value);
                                                            }}
                                            />
                                        </Row>,
                                        <Row style={{padding: "20px 20px"}} key="d">
                                            <Button type="primary"
                                                    style={{
                                                        width: "100%",
                                                        height: "40px",
                                                        borderRadius: "5px"
                                                    }}
                                                    onClick={() => {
                                                        loginIn();
                                                    }}
                                            >登录</Button>
                                        </Row>,
                                        <Row style={{padding: "0 20px"}} justify="space-between" key="e">
                                            <div style={{color: "#1890ff", cursor: "default"}} onClick={() => {
                                                resetting();
                                            }}>
                                                忘记密码?
                                            </div>
                                            <div style={{color: "#1890ff", cursor: "default"}} onClick={() => {
                                                setReserve(false);
                                                setPaused(false);
                                                setLogin(false);
                                            }}>
                                                没有账户?
                                            </div>
                                        </Row>,
                                    ] : null}
                                </QueueAnim>
                            </Col>
                            <Col span={login ? 0 : 22}>
                                <QueueAnim className="demo-content"
                                           animConfig={[
                                               {opacity: [1, 0], translateY: [0, 50]},
                                               {opacity: [1, 0], translateY: [0, -50]}
                                           ]}>
                                    {login ? null : [
                                        <Row justify="center" key="a">
                                            <Col style={{
                                                width: "40px",
                                                height: "40px",
                                                padding: "6px 8px",
                                                borderRadius: "20px",
                                                backgroundColor: "#f50057"
                                            }}>
                                                <img src="../static/img/sign.svg"/>
                                            </Col>
                                        </Row>,
                                        <Row justify="center" key="b">
                                            <h1>注册</h1>
                                        </Row>,
                                        <Row style={{padding: "20px"}} key="c">
                                            <Input placeholder="电子邮箱"
                                                   style={{height: "50px", borderRadius: "5px", background: "none"}}
                                                   value={user.email}
                                                   onChange={(e) => {
                                                       userHandle("email", e.target.value);
                                                   }}
                                            />
                                        </Row>,
                                        <Row style={{padding: "0px 20px"}} key="d">
                                            <Input.Password placeholder="密码"
                                                            style={{
                                                                height: "50px",
                                                                borderRadius: "5px",
                                                                background: "none"
                                                            }}
                                                            value={user.password}
                                                            onChange={(e) => {
                                                                userHandle("password", e.target.value);
                                                            }}
                                            />
                                        </Row>,
                                        <Row style={{padding: "20px 20px 20px 20px"}}
                                             justify="space-between"
                                             key="e"
                                        >
                                            <Col span={15}>
                                                <Input placeholder="验证码"
                                                       style={{
                                                           width: "100%",
                                                           height: "50px",
                                                           borderRadius: "5px",
                                                           background: "none"
                                                       }}
                                                       value={user.code}
                                                       onChange={(e) => {
                                                           userHandle("code", e.target.value);
                                                       }}
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Button type="primary"
                                                        style={{
                                                            width: "100%",
                                                            height: "50px",
                                                            borderRadius: "5px"
                                                        }}
                                                        onClick={() => {
                                                            getCode();
                                                        }}
                                                >验证</Button>
                                            </Col>
                                        </Row>,
                                        <Row style={{padding: "20px 20px"}} key="f">
                                            <Button type="primary"
                                                    style={{
                                                        width: "100%",
                                                        height: "40px",
                                                        borderRadius: "5px"
                                                    }}
                                                    onClick={() => {
                                                        signUp();
                                                    }}
                                            >注册</Button>
                                        </Row>,
                                        <Row style={{padding: "0 20px"}} justify="end" key="g">
                                            <div style={{color: "#1890ff", cursor: "default"}} onClick={() => {
                                                setLogin(true);
                                                setReserve(true);
                                                setPaused(false);
                                            }}>
                                                已经有账户?
                                            </div>
                                        </Row>
                                    ]}
                                </QueueAnim>
                            </Col>
                        </Row>
                    </TweenOne>
                </Col>
            </Row>
            <ParticlesBg type="polygon" bg={true}/>
        </Provider>
    );
}

export default Login;
