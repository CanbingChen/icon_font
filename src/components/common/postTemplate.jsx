import React, {Component, PropTypes} from 'react';
// import pureRender from 'pure-render-decorator';
import {connect} from 'react-redux';
import {is,fromJS} from 'immutable';
import * as action from '../../Action/action';

/**
 * 获取数据模板
 * @param  {[type]} mySeting [description]
 * @return {[type]}          [description]
 */
const Main = mySeting => {
	let seting = {
		id : '',
		url : '',
		data : {},
		component : <div></div>,
	};

	for(let key in mySeting){
		seting[key] = mySeting[key];
	}

	class Index extends Component {

		constructor(props,context){
			super(props,context);
		}

		render(){
			return <this.props.seting.component {...this.props} backData={this.props.backData.toJS()} />
		}

		componentWillReceiveProps(nextProps){

		}

		shouldComponentUpdate(nextProps,nextState){
			if(nextProps.backData.get('isFetching')){
				this.props.fetchPosts(this.props.seting.url,this.props.seting.data);
				return false;
			}
			return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
		}
	}
	Index.defaultProps = { seting };

	return connect(state => {
		return {
			backData : state['fetchData']
		}
	},action)(Index);
}

export default Main;