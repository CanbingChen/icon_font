import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import template from './common/template';

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
			}
		};
	}

	componentWillUpdate(nextProps,nextState){
		this.state.title = '首页';
	}

	render(){
		return(
			<div className="index">
				这里是首页
			</div>
		)
	}
}



export default Index;
