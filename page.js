function openLinkWithPassword(event) {
	passward = ".20120587";
    event.preventDefault(); // 阻止默认行为，即阻止打开链接
    var password = prompt('请输入密码：'); // 弹出输入密码的对话框
      // 检查密码是否正确
    if (password === passward) {
    	window.location.href = event.target.href; // 密码正确，打开链接
    	} else {
    	alert('密码错误，请重试。');
     }
}