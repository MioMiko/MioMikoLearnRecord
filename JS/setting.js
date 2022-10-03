{
  const submit=body.querySelector('#submit');
  const cancel=body.querySelector('#cancel');

  class Setting{
    constructor(){
      this.select=body.querySelectorAll('select');
      this.init();
      this.submit();
      cancel.addEventListener('click',()=>{
        this.init();
        alert('设置已取消');
      });
    }
    init(){
      for(let i=0; i<this.select.length; i++){
        for(let j=0; j<this.select[i].children.length; j++){
          if(this.select[i].children[j].id===localStorage.getItem(this.select[i].id)){
            this.select[i].children[j].selected=true;
          }
        }
      }
    }
    submit(){
      submit.addEventListener('click',()=>{
        for(let i=0; i<this.select.length; i++){
          let value='';
          for(let j=0; j<this.select[i].children.length; j++){
            if(this.select[i].children[j].selected){
              value=this.select[i].children[j].id;
            }
          }
          localStorage.setItem(this.select[i].id,value);
        }
        alert('设置成功');
        window.location.reload();
      });
    }
  }
  new Setting();
}