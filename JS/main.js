const body=document.querySelector('body');
const nav=body.querySelector('nav');
const aside=body.querySelector('aside');
const article=body.querySelector('article');
const css=document.querySelector('#link');
//生成功能
//生成链接路径
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
  let cssInner=[];
  cssInner.push('<link rel="stylesheet" type="text/css" href="');
  cssInner.push(rootURL);
  cssInner.push('CSS/main.css"><link rel="stylesheet" type="text/css" href="');
  cssInner.push(rootURL);
  cssInner.push('CSS/theme.css">');
  css.innerHTML=cssInner.join('');
}

//生成导航栏
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
  navInner.push('copyright.html"><li id="copyright">版权声明</li></a></ul><ul id="tools"><a href="#top"><li>返回顶部</li></a><li id="hide-blackscreen">隐藏黑幕</li></ul><span id="collapse-aside">≡</span>');
  nav.innerHTML=navInner.join('');
}

const isNarrowScreen=window.matchMedia('(max-width: 1000px)');

const navSections=[nav.querySelector('#homepage'),nav.querySelector('#doc'),nav.querySelector('#examples'),nav.querySelector('#copyright')];

const hide_blackscreen=nav.querySelector('#hide-blackscreen');

const collapseAside=nav.querySelector('#collapse-aside');





//其他功能

//导航栏显示功能
//section: 0-homepage 1-doc 2-examples 3-copyright
if(section!==null){
  navSections[section].classList.add('current');
}
//折叠侧边栏功能
if(aside){
  if(!(isNarrowScreen.matches)){
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
  
  //隐藏黑幕功能
hide_blackscreen.addEventListener('click',()=>{
  body.classList.toggle('half-blackscreen');
});