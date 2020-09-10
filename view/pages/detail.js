import React, {useEffect} from "react";
import RealHead from "../components/RealHead";
import {Provider} from "react-redux";
import store from "../redux/store";
import {getPage} from "../redux/action/head";
import {loadComment, loadDetail} from "../redux/action/detail";
import {withRouter} from "next/router";
import Content from "../components/detail/content";
import Comment from "../components/detail/comment";

const Detail = ({router}) => {
    useEffect(() => {
        store.dispatch(getPage("detail"));
        if (router.query.identifier != undefined) {
            store.dispatch(loadDetail(router.query.identifier));
            store.dispatch(loadComment(router.query.identifier))
        }
    }, [router])
    return (
        <Provider store={store}>
            <div>
                <RealHead/>
                <Content/>
                <Comment />
            </div>
        </Provider>
    );
}

export default withRouter(Detail);
