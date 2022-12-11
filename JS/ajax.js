use_ajax = true;
{
	let xhr = null;
	let is_sending = false;
	let current_page = null;
	let article = body.querySelector('article');
	let directory = body.querySelector('#directory');

	function ScrollAnchor(targetId){
		if('' == targetId){
			return;
		}
		target = body.querySelector(`#${targetId}`);
		if(null != target){
			target.scrollIntoView(true);
		}
	}

	function ProcessPage(para){
		article.innerHTML = xhr.response;
		HideBlackScreen();
		GenerateDict(`${para[0]}|`);
		ScrollAnchor(para[1]);
	}

	function Request(path,Process){
		if(is_sending){
			xhr.absorb;
		}
		xhr = new XMLHttpRequest();
		is_sending = true;
		xhr.open('get',path);
		xhr.send();
		xhr.onreadystatechange = ()=>{
			if(4 === xhr.readyState){
				if(xhr.status >= 200 && xhr.status <= 300){
					is_sending = false;
					current_page = path;
					Process(arguments[2]);
				} else if(xhr.status == 404) {
					Request(`${location.protocol}//${location.host}/MioMikoLearnRecord/404_ajax.html`,()=>{article.innerHTML = xhr.response;});
				}
			}
		}
	}

	function Refresh(){
		let path = location.hash;
		let para = path.replace('#','').split('|');
		if('' != para[0]){
			path = `${para[0]}`;
		} else {
			path = defaultPath;
		}
		if(path !== current_page){
			Request(path,ProcessPage,para);
		} else {
			ScrollAnchor(para[1]);
		}
	}

	Refresh();
	window.onhashchange = Refresh;
}
