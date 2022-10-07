const body=document.querySelector('body');

//生成根目录路径
let rootURL=null;
{
  let rootURLArr=[];
  for(let i=0;i<rootDistance;i++){
    rootURLArr.push('../');
  }
  rootURL=rootURLArr.join('');
}

//生成CSS文件链接
{
  const css=document.querySelector('#link');
  let cssInner=[];
  cssInner.push('<link rel="stylesheet" type="text/css" href="');
  cssInner.push(rootURL);
  cssInner.push('CSS/main.css"><link rel="stylesheet" type="text/css" href="');
  cssInner.push(rootURL);
  cssInner.push('CSS/theme.css">');
  css.innerHTML=cssInner.join('');
}

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
    byString: function(theme){
      switch(theme){
      case null:
        localStorage.setItem('theme','followSystem');
        localStorage.setItem('defaultLightTheme','light');
        localStorage.setItem('defaultDarkTheme','dark');
        this.defaultLightTheme='light';
        this.defaultDarkTheme='dark';
        this.followSystem();
        break;
      case 'followSystem':
        this.followSystem();
        break;
      case 'light':
        this.light();
        break;
      case 'dark':
        this.dark();
        break;
      case 'pink':
        this.pink();
        break;
      }
    },
    syncSystem: function(){
      if(systemTheme.matches){
        this.byString(this.defaultLightTheme);
      } else {
        this.byString(this.defaultDarkTheme);
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
  setTheme.byString(localStorage.getItem('theme'));
}

//以下加载完毕执行
document.addEventListener('DOMContentLoaded',()=>{

  //生成导航栏
  const nav=body.querySelector('nav');
  const aside=body.querySelector('aside');
  const article=body.querySelector('article');
  {
    let navInner=[]
    navInner.push('<ul id="header"><a href="');
    navInner.push(rootURL);
    navInner.push('index.html"><li id="homepage">首页</li></a><a href="');
    navInner.push(rootURL);
    navInner.push('doc/doc_index.html"><li id="doc">文档</li></a><a href="');
    navInner.push(rootURL);
    navInner.push('examples/examples_index.html"><li id="examples">实例</li></a><a href="');
    navInner.push(rootURL);
    navInner.push('copyright.html"><li id="copyright">版权声明</li></a><li id="filler"></li><a href="');
    navInner.push(rootURL);
    navInner.push('setting.html"><li><div>设置</div></li></a></ul><ul id="tools"><a href="#top"><li>返回顶部</li></a><li id="hide-blackscreen">隐藏黑幕</li></ul><span id="collapse-aside">≡</span>');
    nav.innerHTML=navInner.join('');
  }

  const isNarrowScreen=window.matchMedia('(max-width: 1000px)');

  //获取导航栏头部的分区存在数组内
  const navSections=[nav.querySelector('#homepage'),nav.querySelector('#doc'),nav.querySelector('#examples'),nav.querySelector('#copyright'),nav.querySelector('#header :last-child li')];

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
})