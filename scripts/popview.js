// 弹出框
function Wapp()  
{
	this.oWapp=null;
	this.setting={// 默认参数
		w:800,
		h:400,
		dis:'center',
		title:'提示',
		mark:false,
		drag:false,
		bigoff:true,
		ip:''
	}
}
Wapp.prototype.json={}
Wapp.prototype.init=function(opt)
{
	entend(this.setting,opt);
	
	if(this.json[opt.iNow]==undefined)
	{
		this.json[opt.iNow]=true;
	}
	
	if(this.json[opt.iNow])
	{
		this.createapp();
		this.closewindow();
        this.bigwindow();
		
		if(this.setting.mark)
		{
			this.fnMark();
		}
		if(this.setting.drag)
		{
			this.fnDrag();
		}
		this.json[opt.iNow]=false;
	}
}
// 创建弹窗元素
Wapp.prototype.createapp=function()
{
	this.oWapp=document.createElement('div');
	this.oWapp.className='wapp';
	this.oWapp.innerHTML='<div class="wmenu"><a href="javascript:;" class="bigmenu"></a><a href="javascript:;" class="closemenu"></a></div><div class="wtitle"><p>'+this.setting.title+'</p></div><div class="wcont"><iframe src='+this.setting.ip+'></iframe></div>';
	document.body.appendChild(this.oWapp);
	
	this.setdate();
	
}
// 设置弹窗样式
Wapp.prototype.setdate=function()
{
	this.oWapp.style.width=this.setting.w+'px';
	this.oWapp.style.height=this.setting.h+'px';
	if(this.setting.dis=='center')
	{
		this.oWapp.style.left=(viewwidth()-this.oWapp.offsetWidth)/2+'px';
		this.oWapp.style.top=(viewheight()-this.oWapp.offsetHeight)/2+'px';
	}else if(this.setting.dis=='right')
	{
		this.oWapp.style.left=(viewwidth()-this.oWapp.offsetWidth)+'px';
		this.oWapp.style.top=(viewheight()-this.oWapp.offsetHeight)+'px';
	}
	else if(this.setting.dis=='left')
	{
		this.oWapp.style.left=0;
		this.oWapp.style.top=0;
	}
}
// 放大窗口
Wapp.prototype.bigwindow=function()
{
	var bigBtn=this.oWapp.children[0].children[0];
	var This=this;
	bigBtn.onclick=function()
	{
		var cthis=this;
		if(This.setting.bigoff)
		{
			move(This.oWapp, {width:viewwidth(),height:viewheight(),left:0,top:0},1000,'linear',function()
			{
				This.setting.bigoff=false;
				cthis.style.backgroundPosition='0 0'
			}
			)
		}else
		{
	
			move(This.oWapp, {width:This.setting.w,height:This.setting.h,left:((viewwidth()-This.setting.w)/2),top:((viewheight()-This.setting.h)/2)},1000,'linear',function()
			{
				This.setting.bigoff=true;
				cthis.style.backgroundPosition='-30px 0'
			}
			)
		}
	}
}
// 关闭弹窗
Wapp.prototype.closewindow=function()
{
	var closeBtn=this.oWapp.children[0].children[1];
	var This=this;
	closeBtn.onclick=function()
	{
		document.body.removeChild(This.oWapp);
		if(This.setting.mark)
		{
			document.body.removeChild(This.oMark);
		}
		This.json[This.setting.iNow]=true;
	}
	
}
// 添加遮罩层
Wapp.prototype.fnMark=function()
{
	this.oMark=document.createElement('div');
	this.oMark.id='mark';
	this.oMark.style.width=viewwidth()+'px';
	this.oMark.style.height=viewheight()+'px';
	document.body.appendChild(this.oMark);
}
// 拖拽
Wapp.prototype.fnDrag=function()
{
	var oD=new Drag(this.oWapp);
	oD.init();
}
function entend(obj1,obj2)
{
	for(var attr in obj2)
	{
		obj1[attr]=obj2[attr]
	}
}

// 页面可视区宽
function viewwidth()
{
	return document.documentElement.clientWidth;
}
// 页面可视区高
function viewheight()
{
	return document.documentElement.clientHeight;
}