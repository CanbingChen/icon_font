const Tool = {};

/**
 * 弹出框提示
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
Tool.alert = (msg,time) => {
	let alertMsg = msg || '操作有误';
	time = time || 3000;

	let alertBg = document.createElement('div');
	alertBg.setAttribute('class','alert-bg');
	let alertDom = document.createElement('div');
	alertDom.setAttribute('class','alert-block');
	alertBg.appendChild(alertDom);
	document.body.appendChild(alertBg);
	alertDom.innerHTML = `<div class="alert-content">
							<img src="/public/iconfont-zhanghuanquan.png" />
							<span>${alertMsg}</span>
						</div>`;

	let timer = '';

	// 点击dom任意区域后消失
	alertBg.onclick = () => {
		clearTimeout(timer);
		alertBg.parentNode.removeChild(alertBg);
	}

	// 3 秒钟后销毁
	timer = setTimeout(() => {
		alertBg.parentNode.removeChild(alertBg);
		clearTimeout(timer);
	},time);

}

export default Tool;