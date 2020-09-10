import React, {useEffect} from "react";
import {connect} from "react-redux";
import {addArticles, isLoading} from "../../redux/action";
import {Button, List, Row, Col, Spin} from "antd";
import Article from "./Article";

const ListInfo = (props) => {
    useEffect(() => {
        props.loadMore(props.search, 0, 10)
    }, [])
    const loadMore = ()=> {
        if (!props.loading && props.being){
            return (
                <Button style={{width: "100%", color: "#1890ff", fontWeight: 700}} onClick={() => {
                    props.loadMore(props.search, props.articles.length, 10);
                }}>More</Button>
            )
        }
        else if (props.loading && props.being) {
            return (
                <Row justify="center"><Spin /></Row>

            )
        }
        else {
            return null;
        }
    }
    return (
        <div>
            <Row justify="center">
                <Col span={18} xs={{span: 22}} sm={{span: 22}} md={{span: 18}} lg={{span: 18}}>
                    <List
                        loading={false}
                        itemLayout="horizontal"
                        loadMore={loadMore()}
                        dataSource={props.articles}
                        split={false}
                        style={{margin: "18px 0"}}
                        renderItem={item => (
                            <List.Item>
                                <Article dataSource={item}/>
                            </List.Item>
                        )}
                    >
                    </List>
                </Col>
            </Row>
        </div>
    );
};
const stateToProps = (state) => {
    return {
        articles: state.articles.data,
        being: state.articles.isBeing,
        loading: state.articles.loading,
        search: state.search.content
    };
}

const dispatchToProps = (dispatch) => {
    return {
        loadMore(keys, index, length) {
            const loading = isLoading();
            dispatch(loading);
            const loadAction = addArticles(keys, index, length);
            dispatch(loadAction);
        }
    };
}

export default connect(stateToProps, dispatchToProps)(ListInfo);
