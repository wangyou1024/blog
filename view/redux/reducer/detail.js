import React from "react";

const initDetail = "<div>哈哈</div>";
const initComments = [];
const initOtherPerson = {
    name:null,
    image:null,
    email:null,
    sex:null,
    introduce:null
};

export let detail = (state=initDetail, action)=>{
    if (action.type === "load_detail"){
        return action.data;
    }
    return state;
}

export let comments = (state=initComments, action) =>{
    if (action.type === "load_comment"){
        return action.data;
    }
    else if(action.type === "main_comment") {
        const newState = JSON.parse(JSON.stringify(state));
        newState.push(action.data);
        return newState;
    }
    else if (action.type === "other_comment"){
        const newState = JSON.parse(JSON.stringify(state));
        for (let i = 0; i < newState.length; i++) {
            if (newState[i].cid === action.cid){
                newState[i].list.push(action.data);
                return newState;
            }
        }
    }
    else{
        return state;
    }
}

export let otherPerson = (state=initOtherPerson, action) =>{
    if (action.type === "load_other_person"){
        return action.data;
    }else{
        return state;
    }
}
