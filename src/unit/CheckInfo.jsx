const Check = {};

/**
 * 检查用户名
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
Check.username = user => {
	let regexp = /^\w{6,20}$/ig;
	user = Check.trim(user);
	if(regexp.test(user)){
		return true;
	}else{
		return false;
	}
}

/**
 * 检查密码
 * @param  {[type]} pwd [description]
 * @return {[type]}     [description]
 */
Check.password = pwd => {
	let regexp = /^\w{6,20}$/ig;
	pwd = Check.trim(pwd);
	if(regexp.test(pwd)){
		return true;
	}else{
		return false;
	}
}

/**
 * 检查字符串是否为空
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
Check.empty = (str) => {
	str = Check.trim(str);
	return str.length ? true : false;
}

/**
 * 去除首位空格
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
Check.trim = str => {
	return str.replace(/(^\s*)|(\s*$)/,'');
}

export default Check;