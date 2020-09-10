import React from "react";
import Router from "next/router";
import "../../static/index.css"
import {Row, Col, Space, Divider, Card} from "antd";
import {FireOutlined, MessageOutlined, CalendarOutlined} from "@ant-design/icons";

const Article = ({dataSource}) => {
    return (
        <Card hoverable className="article" onClick={()=>{
            Router.push("/detail?identifier="+dataSource.id);
        }}>
            <Row style={{width:"100%"}}>
                <Col>
                    <Row>
                        <h2 style={{color:"#1890ff"}}>{dataSource.title}</h2>
                    </Row>
                    <Row gutter={[10,18]}>
                        <Col>
                            <Space>
                                <FireOutlined />
                                {dataSource.view}
                                <Divider type="vertical"/>
                                <MessageOutlined />
                                {dataSource.message}
                                <Divider  type="vertical"/>
                                <CalendarOutlined />
                                {dataSource.date}
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={[10,10]}>
                        <Col>
                            <img src={dataSource.image} width="100%" style={{borderRadius:"5px"}}/>
                        </Col>
                    </Row>
                    <Row style={{color: "rgba(0,0,0,.65)"}}>
                        {dataSource.introduce}
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

export default Article;
