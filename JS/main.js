const body=document.querySelector('body');

//根据本地存储数据同步主题
{
  //获取系统主题
  const systemTheme=window.matchMedia('(prefers-color-scheme: light)');
  //定义设置主题函数对象
  const setTheme={
    defaultLightTheme: localStorage.getItem('defaultLightTheme'),
    defaultDarkTheme: localStorage.getItem('defaultDarkTheme'),
    light: ()=>{body.setAttribute('data-theme','light');},
    dark: ()=>{body.setAttribute('data-theme','dark');},
    pink: ()=>{body.setAttribute('data-theme','pink');},
    null: function(){
        localStorage.setItem('theme','followSystem');
        localStorage.setItem('defaultLightTheme','light');
        localStorage.setItem('defaultDarkTheme','dark');
        this.defaultLightTheme='light';
        this.defaultDarkTheme='dark';
        this.followSystem();
    },
    syncSystem: function(){
      if(systemTheme.matches){
        this[this.defaultLightTheme]();
      } else {
        this[this.defaultDarkTheme]();
      }
    },
    followSystem: function(){
      this.syncSystem();
      systemTheme.addEventListener('change',()=>{
        this.syncSystem();
      });
    }
  }
  //同步主题
  setTheme[localStorage.getItem('defaultLightTheme')]();
}

//以下加载完毕执行
document.addEventListener('DOMContentLoaded',()=>{

  //生成导航栏
  const nav=body.querySelector('nav');
  const aside=body.querySelector('aside');
  const article=body.querySelector('article');

	nav.innerHTML='\
		<ul id="header">\
			<a href="/index.html">\
				<li id="homepage">首页</li>\
			</a>\
			<a href="/doc/doc_index.html">\
				<li id="doc">文档</li>\
			</a>\
			<a href="/examples/examples_index.html">\
				<li id="examples">实例</li>\
			</a>\
			<a href="/copyright.html">\
				<li id="copyright">版权声明</li>\
			</a>\
			<li id="filler"></li>\
			<a href="/setting.html">\
				<li><div>设置</div></li>\
			</a>\
		</ul>\
		<ul id="directory" class="collapsed">\
		</ul>\
		<ul id="tools">\
			<a href="#top"><li>返回顶部</li></a>\
			<li id="hide-blackscreen" class="cursor-pointer">隐藏黑幕</li>\
		</ul>\
		<span id="collapse-aside" class="cursor-pointer">≡</span>\
	';

  const isNarrowScreen=window.matchMedia('(max-width: 1000px)');

  //获取导航栏头部的分区存在数组内
	const navSections=[
		nav.querySelector('#homepage'),
		nav.querySelector('#doc'),
		nav.querySelector('#examples'),
		nav.querySelector('#copyright'),
		nav.querySelector('#header :last-child li'),
	];

  //搜索到黑幕，则is_blackscreen_exist为真，否则为undefined为假
  const is_blackscreen_exist=article.querySelector('.blackscreen');
  const hide_blackscreen=nav.querySelector('#hide-blackscreen');

  const collapseAside=nav.querySelector('#collapse-aside');





  //其他功能

  //根据html内嵌的JavaScript定义的分区来高亮显示目前分区
  //section: 0-homepage 1-doc 2-examples 3-copyright 4-setting
  if(section!==null){
    navSections[section].classList.add('current');
  }
  //折叠侧边栏功能，若存在侧边栏，则执行侧边栏折叠相关操作，否则隐藏折叠侧边栏按钮
  if(aside){
    if(!(isNarrowScreen.matches)){//如果不是窄屏幕，则默认打开侧边栏
      aside.classList.add('expanded');
      article.classList.add('collapsed');
    }
    collapseAside.addEventListener('click',()=>{
      aside.classList.toggle('expanded');
      article.classList.toggle('collapsed');
    });
  } else {
    collapseAside.classList.add('hide');
  }
  
  //隐藏黑幕功能，若当前页面无黑幕，隐藏隐藏黑幕按钮
  if(is_blackscreen_exist){//如果当前页面黑幕存在
    hide_blackscreen.addEventListener('click',()=>{
      //若body的自定义属性data-half-blackscreen存在，则移除，否则添加
      if('halfBlackscreen' in body.dataset){
        body.removeAttribute('data-half-blackscreen');//移除属性
      } else {
        body.dataset.halfBlackscreen='';//添加属性，此属性只要存在即为真，无论值为多少
      }
    });
  } else {
    hide_blackscreen.classList.add('invisible');//隐藏隐藏黑幕按钮
  }

	//生成目录功能
	directory=nav.querySelector('#directory');

	{
		let directoryInner=[];
		let index=0;
		//检索正文内容所有子标签
		for(let item of article.children){
			//当标签名是标题标签
			if(true===/^H[1-6]$/.test(item.tagName)){
				//给标题标签添加索引并在目录中添加相应锚点链接
				item.id=index;
				directoryInner.push(`<a href="#${index}"><div class="${item.tagName}">${item.innerHTML}</div></a>`);
				index++;
			}
		}
		directory.innerHTML=directoryInner.join('');
	}

})
