import React,{Component, PropTypes} from 'react';


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