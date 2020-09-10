import React,{useEffect} from "react";
import {BackTop} from "antd";
import {Provider} from "react-redux";
import store from "../redux/store";
import RealHead from "../components/RealHead";
import ListInfo from "../components/index/ListInfo";
import {getPage} from "../redux/action/head";
import {withRouter} from "next/router";


const Index = ({router}) => {
    useEffect(() => {
        store.dispatch(getPage("main"));
    }, [router])
    return (
        <Provider store={store}>
            <BackTop />
            <div>
                <RealHead/>
                <ListInfo/>
            </div>
        </Provider>
    )
}

export default withRouter(Index);
