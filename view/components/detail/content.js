import React from "react";
import {connect} from "react-redux"
import {Col, Divider, Row} from "antd";

const Content = (props) => {
    return (
        <Row justify="center">
            <Col span={18} xs={{span: 22}} sm={{span: 22}} md={{span: 18}} lg={{span: 18}}
                 >
                <div dangerouslySetInnerHTML={{__html: props.detail}}></div>
                <Divider/>
            </Col>
        </Row>
    )
}

const stateToProps = (state) => {
    return {
        detail: state.detail
    };
}

export default connect(stateToProps, null)(Content)
