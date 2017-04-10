import React, {Component, PropTypes} from 'react';
import Particles from 'react-particles-js';
import { DataLoad, Nav } from './common/common_item';
import {Link} from 'react-router';
import template from './common/template';
import Tool from '../unit/Tool';

class Content extends Component{
	constructor(props){
		super(props);
		this.state = {data : {songlist:[]}};
	}
	componentWillMount(){
		var that = this;
		Tool.Fetch('https://route.showapi.com/213-4?showapi_appid=25158&topid=5&showapi_sign=c0d685445898438f8c12ee8e93c2ee74','GET','').then(function(response){
			console.log(response);
			// this.state.pagebean = response.showapi_res_body.pagebean;
			that.setState({
				data : response.showapi_res_body.pagebean
			});
			console.log(that.state);
		});
	}
	componentDidMount() {

	}
	render(){
		var items = [];
		this.state.data.songlist.forEach(function(item){
			items.push(<div className="item" key={item.songid}>
			<img src={item.albumpic_small}/>
			{item.singername}
			</div>);
		});
		return (
			<div className="index-content">
				{items}
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
			title : '首页'
		};
	}

	componentWillUpdate(nextProps,nextState){
		this.state.title = '首页';
	}

	render(){
		return(
			<div className="index">
				<Nav/>
				<Content ccb="1234569"/>
				<Particles params={{
				   particles: {
					   line_linked: {
						   shadow: {
							   enable: true,
							   color: "#000000",
							   blur: 5
						   }
					   }
				   }
			   }}
			   style={{
				   position:"fixed",
				   top:0,
				   zIndex:-1,
				   left:0,
				   widthL:'100%',
				   height: "100%"
			   }}/>
		   	<span>{this.state.title}</span>
			</div>
		)
	}
}



export default Index;
