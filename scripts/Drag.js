// 拖拽
function Drag(obj)
{
	
	this.oBox=obj;
	this.disX=0;
	this.disY=0;
}

Drag.prototype.init=function()
{
	var _this=this;
	this.oBox.onmousedown=function(ev)
	{
		var ev=ev||event;
		_this.fnDown(ev);
		document.onmousemove=function(ev)
		{
			var ev=ev||event;
			_this.fnMove(ev);
		}
		document.onmouseup=function()
		{
			_this.fnUp();
		}
		return false;
	}
}

Drag.prototype.fnDown=function(ev)
{
	// 鼠标到元素的距离
	this.disX=ev.clientX-this.oBox.offsetLeft;
	this.disY=ev.clientY-this.oBox.offsetTop;
}
Drag.prototype.fnMove=function(ev)
{
		// 元素到页面的距离
	    var l=ev.clientX-this.disX;
		var t=ev.clientY-this.disY;
		// 限定在可视区内移动
		if(l<0)
		{
			l=0
		}else if(l>document.documentElement.clientWidth-this.oBox.offsetWidth)
		{
			l=document.documentElement.clientWidth-this.oBox.offsetWidth
		}
		
		
		if(t<0)
		{
			t=0
		}else if(t>document.documentElement.clientHeight-this.oBox.offsetHeight)
		{
			t=document.documentElement.clientHeight-this.oBox.offsetHeight
		}
	    
		this.oBox.style.left=l+'px';
		this.oBox.style.top=t+'px';
}
Drag.prototype.fnUp=function()
{
	document.onmousemove=null;
	document.onmouseup=null;
}