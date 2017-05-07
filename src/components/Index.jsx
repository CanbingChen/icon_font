import React, {Component, PropTypes} from 'react';
import Particles from 'react-particles-js';
import { DataLoad, Nav } from './common/common_item';
import  Background from './background';
import {Link} from 'react-router';
import template from './common/template';
import Tool from '../unit/Tool';

class Footer extends Component{
	constructor(props){
		super(props);
		this.state = {files : []};
	}
	componentWillMount(){

	}
	postDownload(){
		window.open('/api/download_all/');
		// Tool.Fetch('/api/download_all/','GET','').then(function(response){
		//
		// });
	}
	upload(event){
		var files = event.target.files;
		var file = new FormData();
		for(var i = 0,len = files.length;i < len;i++){
			file.append(i,files[i]);
		}
		Tool.Fetch('/api/upload/','POST',file).then();
	}
	componentDidMount() {

	}
	render(){
		var options={
        baseUrl:'/api/upload/',
    }
		return (
			<div className="index-footer">
				<button className="btn btn-primary btn-large" onClick={this.postDownload.bind(this)}>下载所有图标</button>
			</div>
		)
	}
}
class Content extends Component{
	constructor(props){
		super(props);
		this.state = {files : []};
	}
	componentWillMount(){
		var that = this;

		Tool.Fetch('/api/send_emil/','POST','').then(function(response){
			var state = that.state;
			state.files = response.data.files;
			that.setState(state);
		});
	}
	componentDidMount() {

	}
	render(){
		var arr = [];
		this.state.files.forEach(function(icon){
			arr.push(
				<div className="svg-item">
					<img src={require('../svgs/'+icon)}/>
					<p>{icon}</p>
				</div>);
		});
		return (
			<div className="index-content">
				<div className="icons-block">{arr}</div>
				<Footer/>
			</div>

		)
	}
}
/**
 * 首页
 */
class Index extends Component{
	constructor(props){
		super(props);
		this.state = {
			settings : {
				dots : true,
				infinite : true,
				speed : 1000,
				slidesToShow : 1,
				slidesToScroll : 1,
				autoplay : true
			},
			title : '首页',

		};
	}
	clickHandle(){
		var that = this;

	}
	componentWillUpdate(nextProps,nextState){
		this.state.title = '首页';
	}

	render(){
		return(
			<div className="index">
				<Nav/>
				<Content/>
				<Background/>

	   </div>
		)
	}
}



export default Index;
