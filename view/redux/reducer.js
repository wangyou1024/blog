import {combineReducers} from "redux";
import {page,user,search} from "./reducer/head";
import {articles} from "./reducer/index";
import {detail,comments,otherPerson} from "./reducer/detail";

export default combineReducers({
    page,
    user,
    articles,
    search,
    detail,
    comments,
    otherPerson
});
