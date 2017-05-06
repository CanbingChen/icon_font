import React, {Component,PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Index from '../components/Index';
import test from '../components/test';           // 首页

/**
 * 路由的根目录组件
 */
class Roots extends Component {
    render(){
        return(
            <div>{this.props.children}</div>
        );
    }
}

var history = browserHistory;

const RouteConfig = (
    <Router history = {history}>
        <Route path='/' component={Roots}>
            <IndexRoute component={Index} />
             <Route path="all" component={Index} />
             <Route path="test" component={test} />
        </Route>
    </Router>
);

export default RouteConfig;
