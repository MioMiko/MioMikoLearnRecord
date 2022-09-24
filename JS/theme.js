const followSystem=body.querySelector('#follow-system-theme');
const light=body.querySelector('#light-theme');
const dark=body.querySelector('#dark-theme');
const pink=body.querySelector('#pink-theme');

const themeList=['dark','pink'];
const systemTheme=window.matchMedia('(prefers-color-scheme: light)');

const setTheme={
  light: ()=>{body.classList.remove(...themeList);},//清除所有标签，即恢复默认主题
  dark: ()=>{
    setTheme.light();
    body.classList.add('dark');
  },
  pink: ()=>{
    setTheme.light();
    body.classList.add('pink');
  },
  syncSystem: ()=>{
    if(systemTheme.matches){
      setTheme.light();
    } else {
      setTheme.light();
      setTheme.dark();
    }
  }
}

{
  let theme=localStorage.getItem('theme');
  if(theme===null){
    setTheme.syncSystem();
    localStorage.setItem('theme','followSystem');
  } else if (theme==='followSystem'){
    setTheme.syncSystem();
  } else if (theme==='dark'){
    setTheme.dark();
  } else if (theme==='pink'){
    setTheme.pink();
  }
}
//根据本地存储的主题偏好数据同步主题

followSystem.addEventListener('click',()=>{
  setTheme.syncSystem();
  localStorage.setItem('theme','followSystem');
});
light.addEventListener('click',()=>{
  setTheme.light();
  localStorage.setItem('theme','light');
});
dark.addEventListener('click',()=>{
  setTheme.dark();
  localStorage.setItem('theme','dark');
});
pink.addEventListener('click',()=>{
  setTheme.pink();
  localStorage.setItem('theme','pink');
});
systemTheme.addEventListener('change',()=>{
  if(localStorage.getItem('theme')==='followSystem'){
    setTheme.syncSystem();
}});