import fetch from 'isomorphic-fetch';
import {Tool} from '../Config/Tool';

const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
// 开始获取数据
const requestPosts = path => {
	return {
		type : REQUEST_POSTS,
		path
	}
}

// 获取数据成功
const receivePosts = (path,json) => {
	return {
		type : RECEIVE_POSTS,
		path,
		json
	}
}

// 页面初次渲染时获取数据
export const fetchGets = (path, postData) => {
	// var target = 'http://dev.fe.ptdev.cn';
	var target = 'http://localhost:3333';
	let url = target + path + Tool.paramType(postData);

	// console.log(url);

	return dispatch => {
		dispatch(requestPosts(postData));
		return fetch(url,{
			mode : 'cors',
			"Content-Type":"application/json",
		})
		.then(response => {
			if(response.ok){
				response.json().then(json => dispatch(receivePosts(path,json)));
			}else{
				console.log('status:  ',response.status);
			}
		})
		.catch(error => console.log(error))
	}
}

// 页面初次渲染时获取数据
export const fetchPosts = (path, postData) => {
	// var target = 'http://dev.fe.ptdev.cn';
	var target = 'http://127.0.0.1:3333';
	let url = target + path + Tool.paramType(postData);

	console.log(url);

	return dispatch => {
		dispatch(requestPosts(postData));
		return fetch(url,{
			mode : 'cors',
			method : 'post',
			"Content-Type":"application/json",
		})
		.then(response => {
			if(response.ok){
				response.json().then(json => dispatch(receivePosts(path,json)));
			}else{
				console.log('status:  ',response.status);
			}
		})
		.catch(error => console.log(error))
	}
}

export const signinAction = (postData) => {
	return dispatch => {
		dispatch(requestPosts(postData));
	}
}
