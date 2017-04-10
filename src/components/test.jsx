import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Tool} from '../Config/Tool';
import template from './common/template';

/**
 * 首页
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
		console.log(e);
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
			<div className="index">
				这里个是测试页
				<span onClick={this.clickHandle.bind(this)}>
					点击按钮事件
				</span>
			</div>
		)
	}
}



export default test;
