import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Particles from 'react-particles-js';
import { DataLoad, Nav } from './common/common_item';
import  Background from './background';
import Tool from '../unit/Tool';
import template from './common/template';

/**
 * 上传模块显示页
 */
class Upload extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {icons : []};
		this.postDownload = this.postDownload.bind(this)
	}
	componentWillMount(){

	}
	componentDidMount() {

	}
	postDownload(){
		window.open('/api/download/');
	}
	uploadIcons(event){
		var that = this;
		let target = event.target
		let files = target.files;
		var fileObj = new FormData();
		for(var i = 0,len = files.length;i < len;i++){
		}
		for(var i=0,len=files.length;i<len;i++){
			fileObj.append(i,files[i]);
			var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function(e) {
          that.setState({icons : that.state.icons.concat([this.result])});
      }
		}
		Tool.Fetch('/api/upload/','POST',fileObj).then(function(response){
			if(response.code === 10000){
				that.setState({
					uploadSuccess : true
				});
			}
		});
	}
	render()
	{
		var arr = [];
		this.state.icons.forEach(function(icon){
			arr.push(
				<div className="svg-item">
					<img src={icon} />
				</div>);
		});
		var result = arr;
		if(arr.length === 0){
			result = <div className="none-icon-block">
				请上传需要上传图标
			</div>;
		}
		return(
			<div className="upload-block">
					<h2>
					<span>
						选中图标
					</span>
					<label>
					<span className="select-button"><i className="icon-search"></i>选择图标</span>
					<input type="file" multiple onChange={this.uploadIcons.bind(this)}/>
					</label>
					{this.state.uploadSuccess&&<button className="btn btn-primary btn-large" onClick={this.postDownload.bind(this)}>下载文件</button>}
					</h2>
					<div>
					</div>
					<div className="upload-content">
						{result}
					</div>
			</div>
		)
	}
}


/**
 * 上传页面
 */
class test extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			settings : {
				dots : true,
				infinite : true,
				speed : 1000,
				slidesToShow : 1,
				slidesToScroll : 1,
				autoplay : true
			}
		};
	}

	componentWillUpdate(nextProps,nextState){
		this.state.title = '首页';
	}
	clickHandle(e){
		Tool.Fetch('/test','POST').then(function(response){
			console.log(response);
		});

	}
	componentDidMount(){
		console.log(this.props);
		// 获取数据

	}
	render(){
		return(
			<div className="">
				<Nav/>
				<div className="index-content">
					<Upload/>
				</div>
				<Background/>
			</div>
		)
	}
}



export default test;
