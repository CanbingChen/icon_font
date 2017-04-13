import React, {Component, PropTypes} from 'react';
import Particles from 'react-particles-js';
import { DataLoad, Nav } from './common/common_item';
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
		Tool.Fetch('/api/download_all/','GET','').then(function(response){
			
		});
	}
	componentDidMount() {

	}
	render(){
		return (
			<div className="index-footer">
				<button onClick={this.postDownload.bind(this)}>我是底部下载按钮</button>
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
				{arr}
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
				<Particles params={{
				   particles: {
					   line_linked: {
						   shadow: {
							   enable: true,
							   color: "#000000",
							   blur: 2
						   }
					   }
				   }
			   }}
			   style={{
				   position:"fixed",
				   top:0,
				   zIndex:-1,
				   left:0,
				   width:'100%',
				   height: "100%",
			   }}/>
		   <Footer/>
	   </div>
		)
	}
}



export default Index;
