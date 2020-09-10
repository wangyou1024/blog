import React, {useState} from "react";
import Router from "next/router";
import {connect} from "react-redux";
import {Avatar, Button, Col, Divider, Input, List, message, Modal, Radio, Row} from "antd";
import {loadComment, addMainComment, addOtherComment, loadOtherPerson} from "../../redux/action/detail";
import "../../static/detail.css";

const Comment = (props) => {
    const [visible, setVisible] = useState(false);
    const [mainComment, setMainComment] = useState("");
    const [otherComment, setOtherComment] = useState({index: -1, latter: null, lname: null, content: ""});

    function handleComment(index, latter, lname) {
        const newOther = JSON.parse(JSON.stringify(otherComment));
        newOther.index = index;
        newOther.latter = latter;
        newOther.lname = lname;
        newOther.content = "";
        setOtherComment(newOther);
    }

    function addOtherComment() {
        if (otherComment.content != "") {
            props.handleOtherComment(
                Router.query.identifier,
                props.comments[otherComment.index].cid,
                otherComment.latter,
                otherComment.lname,
                otherComment.content);
        } else {
            message.warn("请输入内容后评论");
        }
        handleComment(-1, null, null)
    }

    return (
        <Row>
            <Col span={18} xs={{offset: 1, span: 22}} sm={{offset: 3, span: 18}}>
                <Row>
                    <Col xs={{span: 3}} sm={{span: 3}} md={{span: 2}} lg={{span: 1}}>
                        <Avatar size={36} src={props.user.image} alt="帅">帅</Avatar>
                    </Col>
                    <Col xs={{span: 21}} sm={{span: 21}} md={{span: 22}} lg={{span: 23}}>
                        <Row gutter={[, 10]}>
                            <Input.TextArea rows={4}
                                            value={mainComment}
                                            onChange={(e) => {
                                                setMainComment(e.target.value);
                                            }}
                            />
                        </Row>
                        <Row>
                            <Button type="primary" onClick={() => {
                                if (mainComment != ""){

                                props.handleMainComment(Router.query.identifier, mainComment);
                                setMainComment("");
                                }else{
                                    message.warn("请输入内容后评论");
                                }
                            }}>评论</Button>
                        </Row>
                    </Col>
                </Row>
                <List itemLayout="horizontal"
                      dataSource={props.comments}
                      split={false}
                      renderItem={(item, index) => (
                          <List.Item>
                              <Row style={{width: "100%"}}>
                                  <Col xs={{span: 3}} sm={{span: 3}} md={{span: 2}} lg={{span: 1}}>
                                      <Avatar size={36} src={item.image} alt="帅" onClick={() => {
                                          props.handlePerson(item.uid);
                                          setVisible(true);
                                      }}>帅</Avatar>
                                  </Col>
                                  <Col xs={{span: 21}} sm={{span: 21}} md={{span: 22}} lg={{span: 23}}>
                                      <Row gutter={[, 10]} onClick={() => {
                                          props.handlePerson(item.uid);
                                          setVisible(true);
                                      }}>
                                          <div style={{
                                              fontWeight: 600,
                                              fontSize: 16,
                                              cursor: "default"
                                          }}>{item.name}</div>
                                      </Row>
                                      <Row className="grayColor comment" gutter={[, 10]}>
                                          {item.content}
                                          <div className="blueColor comment-button" onClick={() => {
                                              handleComment(index, item.uid, item.name);
                                          }}>回复
                                          </div>
                                      </Row>
                                      {item.list != 0 ? (<Row gutter={[, 10]}>
                                          <Col span={24}>
                                              <List dataSource={item.list}
                                                    split={false}
                                                    renderItem={smallItem => (
                                                        <List.Item style={{padding: "2px 0px"}}>
                                                            <Row justify="start comment">
                                                                <div className="blueColor" onClick={() => {
                                                                    props.handlePerson(smallItem.former);
                                                                    setVisible(true);
                                                                }}>{smallItem.fname}</div>
                                                                <div>回复</div>
                                                                <div className="blueColor" onClick={() => {
                                                                    props.handlePerson(smallItem.latter);
                                                                    setVisible(true);
                                                                }}>{smallItem.lname}</div>
                                                                <div>:</div>
                                                                <div className="grayColor">{smallItem.sonContent}</div>
                                                                <div className="blueColor comment-button"
                                                                     onClick={() => {
                                                                         handleComment(index, smallItem.former, smallItem.fname);
                                                                     }}>回复
                                                                </div>
                                                            </Row>
                                                        </List.Item>
                                                    )}
                                              />
                                          </Col>
                                      </Row>) : null}
                                      {index == otherComment.index ? (
                                          <Row gutter={[, 10]}>
                                              <Col xs={{span: 3}} sm={{span: 3}} md={{span: 2}} lg={{span: 1}}>
                                                  <Avatar size={36} src={props.user.image} alt={"帅"}>帅</Avatar>
                                              </Col>
                                              <Col xs={{span: 21}} sm={{span: 21}} md={{span: 22}} lg={{span: 23}}>
                                                  <Row>
                                                      <Input.TextArea rows={4}
                                                                      value={otherComment.content}
                                                                      onChange={(e) => {
                                                                          const newOther = JSON.parse(JSON.stringify(otherComment));
                                                                          newOther.content = e.target.value;
                                                                          setOtherComment(newOther);
                                                                      }}
                                                      />
                                                  </Row>
                                                  <Row>
                                                      <Button type="primary"
                                                              style={{marginTop: "5px"}}
                                                              onClick={() => {
                                                                  addOtherComment();
                                                              }}>评论</Button>
                                                  </Row>
                                              </Col>
                                          </Row>
                                      ) : null}
                                  </Col>
                              </Row>
                          </List.Item>
                      )}
                />
            </Col>
            <Modal
                title={<div style={{fontWeight: 700}}>个人名片</div>}
                visible={visible}
                footer={<Button onClick={() => {
                    setVisible(false);
                }}>关闭</Button>}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <Row align="middle">
                    <Col span={11} xs={{span: 24}} sm={{span: 11}}>
                        <Row justify="center" gutter={[10, 20]}>
                            <Col>
                                <Avatar size={96}
                                        style={{cursor: "default"}}
                                        src={props.otherPerson.image ? props.otherPerson.image : null}
                                        alt={props.otherPerson.name ? props.otherPerson.name.substr(0, 1) : "帅"}
                                >帅</Avatar>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <h2 style={{borderBottom: "0px"}}>
                                {props.otherPerson.name}
                            </h2>
                        </Row>
                    </Col>
                    <Col span={2} xs={{span: 0}} sm={{span: 1}}>
                        <Row justify="center">
                            <Divider type="vertical" style={{height: "250px"}}/>
                        </Row>
                    </Col>
                    <Col span={11} xs={{span: 24}} sm={{span: 12}}>
                        <Row gutter={[10, 10]} justify="center" align="middle">
                            <Col span={4}>邮箱</Col>
                            <Col span={16}><Input value={props.otherPerson.email} disabled/></Col>
                        </Row>
                        <Row gutter={[10, 10]} justify="center">
                            <Col span={4}>性别</Col>
                            <Col span={16}>
                                <Radio.Group value={props.otherPerson.sex}>
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
                                <Input.TextArea value={props.otherPerson.introduce}
                                                rows={5}
                                                cols={23}

                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </Row>
    )
}

const stateToProps = (state) => {
    return {
        user: state.user,
        comments: state.comments,
        otherPerson: state.otherPerson
    };
}
const dispatchToProps = (dispatch) => {
    return {
        handleComment(identifier) {
            const action = loadComment(identifier)
            dispatch(action);
        },
        handleMainComment(identifier, content) {
            const action = addMainComment(identifier, content);
            dispatch(action);
        },
        handleOtherComment(identifier, cid, latter, lname, content) {
            const action = addOtherComment(identifier, cid, latter, lname, content);
            dispatch(action);
        },
        handlePerson(id) {
            const action = loadOtherPerson(id);
            dispatch(action);
        }
    };
}

export default connect(stateToProps, dispatchToProps)(Comment);
