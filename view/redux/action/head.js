import axios from "axios";
import {DATA_URL} from "../../components/util";
import {message} from "antd";

export const getPage = (page) => {
    return {
        type: "change_page",
        data: page,
    };
}
export const loginIn = () => {
    // get remote info
    return (dispatch) => {
        axios({
            method: "post",
            url: DATA_URL + "/user/getSelf",
            withCredentials: true
        }).then((res) => {
                let user = {}
                if (res.data.email != undefined) {
                    user.login = true;
                } else {
                    user.login = false;
                }
                user.name = res.data.uname;
                user.image = res.data.headImage;
                user.email = res.data.email;
                user.password = null;
                user.sex = res.data.sex;
                user.introduce = res.data.userIntroduce;
                dispatch({
                    type: "login_in",
                    data: user
                });
            }
        ).catch(error => {
            message.warn("请及时登录");
        })
    };
}

export const loginOut = () => {
    // clear the session
    return (dispatch) => {
        axios({
            method: "get",
            url: DATA_URL + "/user/logout",
            withCredentials: true,
            params: {}
        }).then((res) => {
            if (res.data === "success") {
                dispatch({
                    type: "login_out"
                })
            }
        })
    };
}

export const exchangeSearching = () => {
    // exchange search state
    return {
        type: "exchange_searching"
    }
}

export const editSearch = (content) => {
    // change the content of search
    return {
        type: "edit_search",
        data: content
    }
}

export const editInfo = (user) => {
    // edit personal information
    return {
        type: "edit_personal",
        data: user
    };
}

export const synchronizeInfo = (user) => {
    // if the request is normal, the information will save mysql,
    // or you need the old information and message the info
    return (dispatch) => {
        axios({
            method: "post",
            url: DATA_URL + "/user/updateInfo",
            withCredentials: true,
            data: {
                // "uName":user.name,
                "password": user.password,
                "sex": user.sex,
                "userIntroduce": user.introduce,
                "uname": user.name
            }
        }).then((res) => {
            if (res.data === "success") {
                message.success("修改成功");
                user.password = null;
                dispatch({
                    type: "synchronize_info",
                    data: user
                })
            }
        }).catch(error => {
            message.error("网络错误");
        })
    };
}
