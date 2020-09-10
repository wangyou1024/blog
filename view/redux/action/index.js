import axios from "axios";
import {DATA_URL} from "../../components/util";
import {message} from "antd";

export const addArticles = (keys, index, length) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: DATA_URL + "/article/findArticleList",
            withCredentials:true,
            params:{
                "keys":keys,
                "index":index,
                "length":length
            }

        }).then((res) => {
            const result = [];
            res.data.forEach(item=>{
                let article = {};
                article.id = item.aid;
                article.title = item.title;
                article.view = item.view;
                article.message = item.message;
                article.date = item.articleDate;
                article.image = item.articleImage;
                article.introduce = item.articleIntroduce;
                result.push(article);
            })
                dispatch({
                    type: "add_articles",
                    data: result
                })
        }).catch(error=>{
            message.error("网络错误");
        });
    };
}

export const isLoading = () => {
    return {
        type: "loading",
    }
}

export const clearData = () => {
    return {
        type: "clear_data"
    }
}
