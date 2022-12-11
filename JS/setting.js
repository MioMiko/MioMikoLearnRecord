{
	class Setting{
		constructor(){
			this.select = body.querySelectorAll('select');
			this.submit = body.querySelector('#submit');
			this.cancel = body.querySelector('#cancel');
			this.themeOption = body.querySelector('#theme');
			this.themeFollowSystem = body.querySelector('#followSystem');
			this.defaultLightTheme = body.querySelector('#defaultLightThemeOption');
			this.defaultDarkTheme = body.querySelector('#defaultDarkThemeOption');
			this.Init();
			this.Submit();
			this.cancel.addEventListener('click',()=>{
				this.Init();
				alert('设置已取消');
			});
			this.Theme();
		}
		Init(){
			for(let key of this.select){
				for(let option of key.children){
					if(option.id === localStorage.getItem(key.id)){
						option.selected = true;
					}
				}
			}
			this.HideDefaultTheme();
		}
		Submit(){
			this.submit.addEventListener('click',()=>{
				for(let key of this.select){
					let value = '';
					for(let option of key.children){
						if(option.selected){
							value = option.id;
						}
					}
					localStorage.setItem(key.id,value);
				}
				alert('设置成功');
				window.location.reload();
			});
		}
		HideDefaultTheme(){//当跟随系统选项被选择时，才展示默认主题选项
			if(this.themeFollowSystem.selected){
				this.defaultLightTheme.className = '';
				this.defaultDarkTheme.className = '';
			} else {
				this.defaultLightTheme.className = 'hide';
				this.defaultDarkTheme.className = 'hide';
			}
		}
		Theme(){
			this.themeOption.addEventListener('change',()=>{this.HideDefaultTheme()});
		}
	}
	
	new Setting();
}
