import React,{Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';

/**
 * 爆料的item
 */
class BaoliaoItem extends Component {
	constructor(props){
		super(props);
	}
	render(){
		let {imageUrl,title,sendFree,newPrice,oldPrice,from,time} = this.props;
		return(
			<li>
				<a href="#">
					<div className="img">
						<img src={imageUrl} />
					</div>
					<div className="list-detail">
						<div className="new-title">{title}</div>
						<div className="phone">手机端:<span>{sendFree}</span>元包邮</div>
						<div className="tag">
							<div className="price">
								<div className="new">$<span>{newPrice}</span></div>
								<div className="old">$<span>{oldPrice}</span></div>
							</div>
							<time>{time}</time>
							<div className="from">{from}</div>
						</div>
					</div>
				</a>
			</li>
		)
	}
}

export {BaoliaoItem};
/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

//头部
export class Nav extends Component{
	render(){
		return (
			<nav className="index-nav">
                <ul >
                    <li className="nav-item">
						<Link to="/all"  activeClassName="active">
							<i className="icon-index"></i>全部图标
						</Link>
                    </li>
                    <li className="nav-item" >
						<Link to="/test" activeClassName="active">
							<i className="icon-upload"></i>生成图标
						</Link>

                    </li>
                </ul>
            </nav>
		)
	}
}
/**
 * 暂无记录
 *
 * @export
 * @class DataNull
 * @extends {Component}
 */
export class DataNull extends Component {
    render() {
        return (
            <div>暂无记录</div>
        );
    }
}
