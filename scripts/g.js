// 左侧菜单效果
function appMenu(oparent,minscale,maxwidth)
{
	var aImgs = getTag(oparent,'img');
	oparent.onmousemove=function(ev)
	{
		var ev=ev||event;
	
		for(var i=0;i<aImgs.length;i++)
		{
			// 图片中心点的位置
			var x=getPos(aImgs[i]).left+aImgs[i].offsetWidth/2;
			var y=getPos(aImgs[i]).top+aImgs[i].offsetHeight/2;
			
	
			// 鼠标到中心点x,y轴的距离
			var a=x-ev.clientX;
			var b=y-ev.clientY;
			
			// 根据勾股定理计算鼠标到图片中心点的距离
			var dis=Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
			// 计算比例
			var scale=1-dis/300;  
			// 限制最小范围
			if(scale<minscale)
			{
				scale=minscale;
			}
	        // 计算图片高度
			aImgs[i].width=scale*maxwidth;
		}	
		
	}
}
//APP自动竖排布局
function apppos(oParent)
{
	var aLi=oParent.getElementsByTagName('li');
	var oLh=aLi[0].offsetHeight;
	
	//获取所占用页面可视区高度
	var oH=viewHeight()-parseInt(getStyle(oParent.parentNode,'top'));
	// 根据页面可视区高度，计算出一竖排需要放的APP个数
	var n=parseInt(oH/oLh)-1; 
	// 限定最多排几个 
    if(n<1)
	{
		n=1;
	}
	arrPos=[];
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].style.position='absolute';
		//计算每一个app的top和left值
		move(aLi[i],{left:Math.floor(i/n)*108,top:(i%n)*108})

		arrPos.push([Math.floor(i/n)*108,(i%n)*108])

	}

	return arrPos;
}
// 焦点运动
function fnMove(iLen,btn,cont){
	var iCur = 0;
	for (var i=0; i<iLen; i++) {
		btn[i].index = i;
		btn[i].onclick = function() {
			
			for (var i=0; i<iLen; i++) {
				btn[i].className = '';
			}
			this.className = 'current';
			var iPrev = iCur;
			cont[iPrev].style.zIndex = 1;
			
			iCur = this.index;
			cont[iCur].style.zIndex = 2;
			num=iCur;
			aLi=getTag(aMainul[iCur],'li');
			arrPos=apppos(deskmainUl[iCur])
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].index=i;
				dragApp(aLi[i],aLi,arrPos);
			}
				if(iPrev==iCur)
				{
					return;
				}
				move(cont[iCur], {
					left : 0,
					opacity:100
				}, 500, 'easeIn', function() {
					cont[iPrev].style.left = '1160px';
					cont[iPrev].style.opacity =0;
				});
				
			}
		}	
}
// 钟表挂件
function toTime(oHour,oMin,oSec)
{
	var oDate=new Date(); // 获取日期对象
	var iSec=oDate.getSeconds(); // 获取日期对象的秒数
	var iMin=oDate.getMinutes()+iSec/60;
	var iHour=(oDate.getHours()%12)+iMin/60;
	// 刻度位置
	oSec.style.WebkitTransform="rotate("+(iSec*360/60)+"deg)";
	oMin.style.WebkitTransform="rotate("+(iMin*360/60)+"deg)";
	oHour.style.WebkitTransform="rotate("+(iHour*360/12)+"deg)";
	oSec.style.MozTransform="rotate("+(iSec*360/60)+"deg)";
	oMin.style.MozTransform="rotate("+(iMin*360/60)+"deg)";
	oHour.style.MozTransform="rotate("+(iHour*360/12)+"deg)";
}
function toDial(obj)
{
	var sHtml="";
	var iDeg=6;
	for(var i=0;i<60;i++)
	{
		sHtml+="<span style='-webkit-transform:rotate("+iDeg*i+"deg);-moz-transform:rotate("+iDeg*i+"deg)'></span>"
	}
	obj.innerHTML=sHtml;
}
// 桌面APP拖拽
function dragApp(obj,objarr,arrPos)
{
	
	obj.onmousedown=function(ev)
	{

		obj.style.zIndex=zIndex++;
		var ev=ev||event;
		var disX=ev.clientX-obj.offsetLeft;
		var disY=ev.clientY-obj.offsetTop;
		var x=obj.offsetLeft;
		var y=obj.offsetTop;
		document.onmousemove=function(ev)
		{
			var ev=ev||event;
			obj.style.left=ev.clientX-disX+'px';
			obj.style.top=ev.clientY-disY+'px';
		
		}
		document.onmouseup=function(ev)
		{
			document.onmousemove=null;
			document.onmouseup=null;
		    
			if(obj.offsetLeft==x&&obj.offsetTop==y)
			{
				obj.onclick=function(ev)
				{
					var ev=ev||event;
				   ev.cancelBubble = true;
				   var oThis=this;
					viewpopapp(oThis);
				}
				
			}else
			{
				obj.onclick=null;
			}
			
	        //拖拽元素与其他所有的元素进行检测，找到离拖拽元素最近的元素
			var nearobj=nearObj(obj,objarr);
		
			var tmp=0;
     
			// 如果存在碰撞元素就交换他们的位置
			if(nearobj)
			{
				// 交换拖拽和最近元素的位置
				move(nearobj,{left:arrPos[obj.index][0],top:arrPos[obj.index][1]},500,'linear');
				move(obj,{left:arrPos[nearobj.index][0],top:arrPos[nearobj.index][1]},500,'linear');
				//交换两个元素的索引值
				tmp=nearobj.index;
				nearobj.index=obj.index;
				obj.index=tmp;
			}else  // 如果不存在就回到自己原来的位置
			{
				
				move(obj,{left:arrPos[obj.index][0],top:arrPos[obj.index][1]},500,'linear');
			}
			
		}
		return false;
	}
}
// 找到离拖拽元素最近的碰撞元素
function nearObj(obj,objarr)
{
	var value=9999;
	var index=-1;
	for(var i=0;i<objarr.length;i++)
	{
		if(isCrash(obj,objarr[i])&&obj!=objarr[i])
		{
			//aLi[i] 碰撞元素
			//找到距离拖拽元素最近的碰撞元素,及这个元素所在的位置
			var c=dis(obj,objarr[i]);
			if(c<value)
			{
				c=value;
				index=i;
			}
		}
	}
	if(index!=-1)
	{
		return objarr[index]
	}else
	{
		return false;
	}
}
// 求两个坐标之间的距离
function dis(obj1,obj2)
{
	var a=obj1.offsetLeft-obj2.offsetLeft;
	var b=obj1.offsetTop-obj2.offsetTop;
	return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}
// 碰撞检测
function isCrash(obj1,obj2)
{
	var L1=obj1.offsetLeft;
	var R1=L1+obj1.offsetWidth;
	var T1=obj1.offsetTop;
	var B1=T1+obj1.offsetHeight;
	
	var L2=obj2.offsetLeft;
	var R2=L2+obj2.offsetWidth;
	var T2=obj2.offsetTop;
	var B2=T2+obj2.offsetHeight;
	
	if(L1>R2||T1>B2||R1<L2||B1<T2)
	{
		return false; // 没碰上
	}else
	{
		return true; // 碰上了
	}

}
// APP弹窗
function viewpopapp(oThis)
{
        
   var oTitle=oThis.title;
   var oIp=oThis.getAttribute('data-href');

	var oWapp=new Wapp();
	oWapp.init( {  // 配置参数
		iNow:3,
		drag:true,
		title:oTitle,
		ip:oIp
	 }
	);
}	
// 获取页面可视区高度
function viewHeight()
{
	
	return document.documentElement.clientHeight;
}

// 获取元素属性值
function getStyle(obj,sAttr)
{
	return obj.currentStyle?obj.currentStyle[sAttr]:getComputedStyle(obj)[sAttr];
}
// 获取ID元素
function getId(id)
{
	return document.getElementById(id);
}
// 获取标签元素
function getTag(obj,tagname)
{
	return obj.getElementsByTagName(tagname);
}
// 获取元素到页面的绝对距离
function getPos(obj)
{
	var pos={left:0,top:0};
	while(obj)
	{
	pos.left+=obj.offsetLeft;
	pos.top+=obj.offsetTop;
	obj=obj.offsetParent;
	}
	return pos;
	
}
//事件绑定
function bind(obj, evname, evfn) {
                if (obj.addEventListener) {
                    obj.addEventListener(evname, evfn, false);
                } else {
                    obj.attachEvent('on'+evname, function() {
                        evfn.call(obj);
                    })
                }
}
