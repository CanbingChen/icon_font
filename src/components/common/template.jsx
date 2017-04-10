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
			// console.log('this.props:====',this.props);
			return <this.props.seting.component {...this.props} backData={this.props.backData.toJS()} />
			// return <this.props.seting.component {...this.props} state={this.props.state} />
		}

		componentDidMount(){
			// 获取数据
			console.log(this.props);

			if(this.props.seting.url){
				this.props.fetchGets(this.props.seting.url, this.props.seting.data);
			}
		}

		componentWillReceiveProps(nextProps){

		}

		shouldComponentUpdate(nextProps,nextState){
			if(nextProps.backData.get('isFetching')){
				return false;
			}
			return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
		}
	}
	Index.defaultProps = { seting };

	return connect(state => {
		let {fetchData,requestData} = state;
		// console.log("state:=====",state);
		return {
			backData : state['fetchData'],
			fetchData,
			requestData
		}
	},action)(Index);
}

export default Main;
