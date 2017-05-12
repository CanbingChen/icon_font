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
		this.state = {
			files : [],
			uploadSuccess : false
		};
		this.chooseFinish = this.chooseFinish.bind(this)
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
		var that = this;
		var files = event.target.files;
		var file = new FormData();
		for(var i = 0,len = files.length;i < len;i++){
			file.append(i,files[i]);
		}
		Tool.Fetch('/api/upload/','POST',file).then(function(response){

		});
	}
	chooseFinish(){
		Tool.Fetch('/api/choose_finish/','GET','').then(function(response){

		});
	}
	componentDidMount() {

	}
	render(){
		return (
			<div className="index-footer">
				<button className="btn btn-primary btn-large" onClick={this.chooseFinish}>选择图标结束</button>
				<button className="btn btn-primary btn-large" onClick={this.postDownload.bind(this)}>下载所有图标</button>
			</div>
		)
	}
}
class Content extends Component{
	constructor(props){
		super(props);
		// this.chooseIcon = this.chooseIcon.bind(this);
		this.state = {
			files : []
		};
	}
	componentWillMount(){
		var that = this;
		Tool.Fetch('/api/send_emil/','POST','').then(function(response){
			// var state = that.state;
			var files = response.data.files.map(function(name){
				return {
					name : name,
					choose : false
				}
			});
			that.setState({
				files : files
			});
		});
	}
	chooseIcon(icon,index){
		var files = this.state.files;
		files[index].choose = !files[index].choose;
		this.setState({
			files :files
		})
		Tool.Fetch('/api/choose_icon/','GET',{name : icon.name});
	}
	componentDidMount() {

	}
	render(){
		var arr = [];
		var that = this;
		this.state.files.forEach(function(icon,index){
			if(icon.choose){
				arr.push(
					<div key={index} className="svg-item active" onClick={that.chooseIcon.bind(that,icon,index)}>
						<img src={require('../svgs/'+icon.name)}/>
						<p>{icon.name}</p>
					</div>);
			}else{
				arr.push(
					<div className="svg-item"  key={index} onClick={that.chooseIcon.bind(that,icon,index)}>
						<img src={require('../svgs/'+icon.name)}/>
						<p>{icon.name}</p>
					</div>);
			}

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
