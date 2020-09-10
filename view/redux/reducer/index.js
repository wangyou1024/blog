const initArticles = {data:[],isBeing:true,loading:true}

export let articles = (state=initArticles, action)=>{
    const newState = JSON.parse(JSON.stringify(state));
    if (action.type === "add_articles") {
        if (action.data.length > 0) {
            newState.data = state.data.concat(action.data);
            newState.loading = false;
        }
        if (action.data.length < 10){
            newState.isBeing = false;
            newState.loading = false;
        }
        return newState;
    } else if(action.type === "loading"){
        newState.loading = true;
        return newState;
    } else if(action.type === "clear_data"){
        newState.data = [];
        newState.isBeing = true;
        newState.loading = true;
        return newState;
    }
    return state;
}
