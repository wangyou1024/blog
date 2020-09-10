import React, {useEffect, useState} from "react";
import Head from "next/head";
import {Avatar, Col, Menu, Row, Popover, Modal, Divider, Input, Radio, Upload, Typography, message} from "antd";
import {connect} from "react-redux";
import {getPage, loginIn, loginOut, editSearch, editInfo, synchronizeInfo} from "../redux/action/head";
import {addArticles, clearData, isLoading} from "../redux/action/index";
import {HomeOutlined, TrophyOutlined} from "@ant-design/icons";
import Router from "next/router";
import "../static/head.css";
import {DATA_URL} from "./util";

const RealHead = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        props.loadUserInfo();
    }, [])

    const User = () => {
        const hadLogin = (
            <Popover content={
                <div>
                    <div className="action" onClick={() => {
                        setVisible(true);
                    }}>个人名片
                    </div>
                    <div className="action" onClick={() => {
                        props.quit();
                    }}>退出登录
                    </div>
                </div>
            }>
                <Avatar size={36} style={{cursor: "default"}}
                        src={props.user.image ? props.user.image : null}
                        alt={props.user.name ? props.user.name.substr(0, 1) : "帅"}
                        >帅</Avatar>
            </Popover>
        )
        const normal = <Avatar size={36} style={{cursor: "default"}} onClick={() => Router.push("/login")}>帅</Avatar>
        return props.user.login ? hadLogin : normal;
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            message.success("上传成功");
            props.loadUserInfo();
        }
    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/png' || file.type === 'image/jpeg';
        if (!isJpgOrPng) {
            message.error('您只能上传png/jpeg图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('图片最大为5MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    return (
        <div>
            <Head>
                <title>baiyou1024</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div>
                <Row align="middle" style={{borderBottom: "1px solid #f0f0f0"}}>
                    <Col span={3} xs={{span: 1}} sm={{span: 3}}></Col>
                    <Col span={3} xs={{span: 0}} sm={{span: 0}} md={{span: 5}} lg={{span: 3}}>
                        <div style={{margin: 0, fontWeight: 600, fontSize: 24, color: "#1890ff"}}>Baiyou1024</div>
                    </Col>
                    <Col span={8} xs={{span: 15}} sm={{span: 11}} md={{span: 6}} lg={{span: 8}}>
                        <Menu mode="horizontal" selectedKeys={[props.page]}
                              onClick={(e) => {
                                  props.pageHandleClick(e.key);
                                  if (e.key === "main") {
                                      props.clear();
                                      Router.push("/");
                                  } else if (e.key === "achieve") {
                                      Router.push("/achieve");
                                  }
                              }}>
                            <Menu.Item key="main" icon={<HomeOutlined/>}>
                                主页
                            </Menu.Item>
                            <Menu.Item key="achieve" icon={<TrophyOutlined/>}>
                                成就
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={5} xs={{span: 5}} sm={{span: 5}} md={{span: 5}} lg={{span: 5}}>
                        <Row>
                            <Col xs={{span: 0}} sm={{span: 24}}>
                                <Input.Search enterButton
                                              value={props.search.content}
                                              onChange={(e) => {
                                                  props.handleSearch(e.target.value)
                                              }}
                                              onSearch={() => {
                                                  props.clear();
                                                  if (props.page !== "main") {
                                                      props.pageHandleClick("main");
                                                      Router.push("/");
                                                  } else {
                                                      props.loadMore(props.search.content, 0, 10);
                                                  }
                                              }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}>
                        <Row justify="end">
                            <Col>
                                <User/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={3} xs={{span: 1}} sm={{span: 3}}></Col>
                </Row>
                <Modal
                    title={<div style={{fontWeight: 700}}>个人名片</div>}
                    visible={visible}
                    okText="保存"
                    cancelText="取消"
                    onOk={() => {
                        if (props.user.password == null || (props.user.password.length > 6 && props.user.password.length < 16)) {
                            props.sendInfo(props.user);
                            setVisible(false);
                        }else{
                            message.error("密码为6-16位字符");
                        }
                    }}
                    onCancel={() => {
                        // props.loadUserInfo();
                        setVisible(false);
                    }}
                >
                    <Row align="middle">
                        <Col span={11} xs={{span: 24}} sm={{span: 11}}>
                            <Row justify="center" gutter={[10, 20]}>
                                <Col>
                                    <Upload name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action={DATA_URL + "/user/upload"}
                                            beforeUpload={beforeUpload}
                                            onChange={handleChange}
                                            withCredentials={true}
                                            headers={{
                                                "Access-Control-Allow-Origin": DATA_URL,
                                                'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
                                                "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                                                "X-Powered-By": ' 3.2.1',
                                            }}
                                    >
                                        <Avatar size={96}
                                                style={{cursor: "default"}}
                                                src={props.user.image ? props.user.image : null}
                                                alt={props.user.name ? props.user.name.substr(0, 1) : "帅"}
                                        >帅</Avatar>
                                    </Upload>
                                </Col>
                            </Row>
                            <Row justify="center">
                                <h2><Typography.Paragraph editable={{
                                    onChange: (str) => {
                                        const newUser = JSON.parse(JSON.stringify(props.user));
                                        newUser.name = str;
                                        props.saveInfo(newUser);
                                    }
                                }}
                                >
                                    {props.user.name}
                                </Typography.Paragraph></h2>
                            </Row>
                        </Col>
                        <Col span={2} xs={{span: 0}} sm={{span: 1}}>
                            <Row justify="center">
                                <Divider type="vertical" style={{height: "250px"}}/>
                            </Row>
                        </Col>
                        <Col span={11} xs={{span: 24}} sm={{span: 12}}>
                            <Row gutter={[10, 10]} justify="center" align="middle">
                                <Col span={4}>密码</Col>
                                <Col span={16}><Input.Password
                                    value={props.user.password == null ? "******" : props.user.password}
                                    onChange={(e) => {
                                        const newUser = JSON.parse(JSON.stringify(props.user));
                                        if (newUser.password == null) {
                                            newUser.password = e.target.value.substr(-1, 1);
                                        } else {

                                            newUser.password = e.target.value;
                                        }
                                        props.saveInfo(newUser);
                                    }}/></Col>
                            </Row>
                            <Row gutter={[10, 10]} justify="center">
                                <Col span={4}>性别</Col>
                                <Col span={16}>
                                    <Radio.Group value={props.user.sex} onChange={(e) => {
                                        const newUser = JSON.parse(JSON.stringify(props.user));
                                        newUser.sex = e.target.value;
                                        props.saveInfo(newUser);
                                    }}>
                                        <Row>
                                            <Col span={12}>
                                                <Radio value="boy">boy</Radio>
                                            </Col>
                                            <Col span={12}>
                                                <Radio value="girl">girl</Radio>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <Radio value="man">man</Radio>
                                            </Col>
                                            <Col span={12}>
                                                <Radio value="woman">woman</Radio>
                                            </Col>
                                        </Row>
                                        <Radio value="secret">secret</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row gutter={[10, 10]} justify="center">
                                <Col span={4}>简介</Col>
                                <Col span={16}>
                                    <Input.TextArea value={props.user.introduce}
                                                    rows={5}
                                                    cols={23}
                                                    onChange={(e) => {
                                                        const newUser = JSON.parse(JSON.stringify(props.user));
                                                        newUser.introduce = e.target.value;
                                                        props.saveInfo(newUser);
                                                    }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal>
            </div>
        </div>
    );
}

const stateToProps = (state) => {
    return {
        page: state.page,
        user: state.user,
        search: state.search
    };
}

const dispatchToProps = (dispatch) => {
    return {
        // change menu
        pageHandleClick(page) {
            const action = getPage(page);
            dispatch(action);
        },
        // load user's info
        loadUserInfo() {
            const action = loginIn();
            dispatch(action);
        },
        //save personal information
        saveInfo(user) {
            const action = editInfo(user);
            dispatch(action);
        },
        sendInfo(user) {
            const action = synchronizeInfo(user);
            dispatch(action);
        },
        // login out
        quit() {
            const action = loginOut();
            dispatch(action);
        },
        // clear data
        clear() {
            const action = clearData();
            dispatch(action);
        },
        loadMore(keys, index, length) {
            const loading = isLoading();
            dispatch(loading);
            const loadAction = addArticles(keys, index, length);
            dispatch(loadAction);
        },
        handleSearch(content) {
            const action = editSearch(content);
            dispatch(action);
        }
    }
}

export default connect(stateToProps, dispatchToProps)(RealHead);
