import axios from "axios"
import {DATA_URL} from "../../components/util";
import {message} from "antd";

export const loadDetail = (identifier) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: DATA_URL + "/article/findDetail",
            withCredentials: true,
            params: {"aId": identifier}
        }).then((res) => {
            if (res.data.detail != null) {

                dispatch({
                    type: "load_detail",
                    data: res.data.detail
                })
            } else {
                message.warn("无此作品");
            }
        }).catch(error => {
            message.error("网络错误");
        })
    }
}

export const loadComment = (identifier) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: DATA_URL + "/comment/findComment",
            withCredentials: true,
            params: {"aId": identifier}
        }).then((res) => {
            dispatch({
                type: "load_comment",
                data: res.data
            })
            /*            {
                            cid: "1",
                            uid: "1",
                            image: "../../static/img/300.png",
                            name: "1号",
                            content: "写得不错",
                            list: [
                                {former: "2", fname: "2号", latter: "1", lname: "1号", sonContent: "回复原信息"},
                                {former: "1", fname: "1号", latter: "2", lname: "2号", sonContent: "评价信息"},
                            ]
                        },*/
        }).catch(error => {
            message.error("网络异常");
        })
    }
}

export const addMainComment = (identifier, content) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: DATA_URL + "/comment/addMainComment",
            withCredentials: true,
            data: {
                "aId": identifier,
                "content": content
            }
        }).then((res) => {
            if (res.data.cid != undefined) {
                dispatch({
                    type: "main_comment",
                    data: {
                        cid: res.data.cid,
                        uid: res.data.uid,
                        image: res.data.image,
                        name: res.data.name,
                        content: res.data.content,
                        list: []
                    }
                })
            } else {
                message.warn("评论异常");
            }
        }).catch(error => {
            message.error("未登录/网络异常");
        })
    }
}

export const addOtherComment = (aid, cid, latter, lName, content) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: DATA_URL + "/comment/addOtherComment",
            withCredentials: true,
            data: {
                "aId": aid,
                "cId": cid,
                "latter": latter,
                "lName": lName,
                "content": content
            }
        }).then((res) => {
            if (res.data.cid != undefined) {
                dispatch({
                    type: "other_comment",
                    cid: res.data.cid,
                    data: {
                        former: res.data.former, fname: res.data.fname,
                        latter: res.data.latter, lname: res.data.lname, sonContent: res.data.sonContent
                    },
                })
            } else {
                message.warn("评论异常");
            }
        }).catch(error => {
            message.error("未登录/网络异常");
        })
    }
}

export const loadOtherPerson = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: DATA_URL + "/user/findOther",
            withCredentials: true,
            params: {"id": id}
        }).then((res) => {
            dispatch({
                type: "load_other_person",
                data: {
                    name: res.data.uname,
                    image: res.data.headImage,
                    email: res.data.email,
                    sex: res.data.sex,
                    introduce: res.data.userIntroduce
                },
            })
        }).catch(error => {
            message.error("网络异常");
        })
    }
}

