import React,{useEffect} from "react";
import {Provider} from "react-redux";
import store from "../redux/store";
import {getPage} from "../redux/action/head";
import RealHead from "../components/RealHead";
import Home from "../components/achieve";

const Achieve = () => {
    useEffect(()=>{
        store.dispatch(getPage("achieve"));
    },[])
    return (
        <Provider store={store}>
            <div>
                <RealHead />
            </div>
            <Home />
        </Provider>
    );
}

export default Achieve;
