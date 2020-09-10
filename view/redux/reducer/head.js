// the main is the default page
const initPage = "main";
// user's info
const initUser = {
    login:false,
    name:null,
    image:null,
    email:null,
    password:null,
    sex:null,
    introduce:null
};
const initSearch = {loading:false,content:""};


// change page sign
export let page = (state=initPage,action)=>{
    if (action.type === "change_page" && action.data != null){
        return action.data;
    }
    return state;
}

export let user = (state=initUser,action)=>{
    // console.log(state);
    if (action.type === "login_in"){
        if (action.data != null){
            return action.data;
        }
        else{
            return initUser;
        }
    }
    else if(action.type === "login_out"){
        return initUser;
    }
    else if (action.type === "edit_personal"){
        return action.data;
    }
    else if (action.type === "synchronize_info") {
        return action.data;
    }
    else{
        return state;
    }
}

export let search = (state=initSearch, action) =>{
    const newState = JSON.parse(JSON.stringify(state));
    if (action.type === "exchange_searching"){
        newState.loading = !state.loading;
    }
    else if(action.type === "edit_search"){
        newState.content = action.data;
    }
    return newState;
}
