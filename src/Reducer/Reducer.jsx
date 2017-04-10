import Immutable from 'immutable';

const defaultlState = Immutable.fromJS({data: {}, isFetching: false});
const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const GET_DATA_START = 'GET_DATA_START';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';


//首次渲染时获取数据
export const fetchData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case REQUEST_POSTS:
            return state.set('isFetching',true);
        case RECEIVE_POSTS:
            return Immutable.Map({'data':action.json,'isFetching':false});//返回一个新的state
        default:
            return state
    }
}


//手动获取数据
export const requestData = (state = {}, action = {}) => {
    switch(action.type){
        case GET_DATA_START:
            return state;
        case GET_DATA_SUCCESS:
            action.success(action.json);
            state[action.name] = action.json;
            return state;
        default:
            return state;
    }
}

// 提交数据
export const postData = (state = {},action = {}) => {
    switch(action.type){
        case POST_DATA:
            return Immutable.Map({'data':action.json});
        default:
            return state;
    }
}

export default {fetchData,requestData}
