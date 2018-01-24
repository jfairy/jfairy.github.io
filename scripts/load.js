var deskmain=null;
var deskmainUl=null;
var aLi=null;
var zIndex;
var arrPos=[];
var aMainul=null;
var num=0;
window.onload=function()
{
	var sideMenuIcon=getId('s_menu_icon');
	var sideLi=getTag(sideMenuIcon,'li');
	deskmain=getId('deskmain');
	deskmainUl=getTag(deskmain,'ul');
	deskmainLi=getTag(deskmain,'li');
	
	var oMainBtn=getId("mainmenu");	
	aMainul = deskmain.children;
	var aMainBtn = getTag(oMainBtn,'li');
	
	aLi=getTag(aMainul[0],'li');

	var iLen = aMainul.length;
	
	zIndex=10;
	
	var oDial=getId("dial");
	var oHour=getId("hour");
	var oMin=getId("min");
	var oSec=getId("sec");
	
	
	
	
    // 左侧菜单
	appMenu(sideMenuIcon,0.7,64);
	// 桌面图标
    apppos(deskmainUl[0])
	// 焦点运动
	
	fnMove(iLen,aMainBtn,aMainul)
	
    // 钟表挂件
	toDial(oDial);
	toTime(oHour,oMin,oSec);
	setInterval(function(){
		toTime(oHour,oMin,oSec);
	},1000)
	
	//钟表挂件拖拽
	var oClockDiv=document.getElementById("clock");
	var oClock=new Drag(oClockDiv);
	oClock.init();
	

	
	// 桌面APP拖拽（有碰撞就交换，没有就回到原来的位置）

    arrPos=apppos(deskmainUl[0])
    for(var i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		dragApp(aLi[i],aLi,arrPos);
	}
    // 日历
	var d = new DatePicker();

	d.on('choosedate', function(ev) {

		oDate.value = ev.y + '-' + ev.m + '-' + ev.d;

	})


	var oDate = document.getElementById('date');

	oDate.onmouseover = function(ev) {
		var ev=ev||event;
		ev.cancelBubble = true;
		d.show(this);
	}

	oDate.onmouseout = function() {
		d.hide();
	}
	//弹窗
	var viewapp=[];
	for(var i=0;i<sideLi.length;i++)
	{
		viewapp.push(sideLi[i]);
	}
	for(var i=0;i<deskmainLi.length;i++)
	{
		viewapp.push(deskmainLi[i]);
	}
	for(var i=0;i<viewapp.length;i++)
	{
		viewapp[i].onclick=function(ev)
		{
			var ev=ev||event;
		   ev.cancelBubble = true;
		   
		    var oThis=this;
			viewpopapp(oThis);
		}
	}
    
   // 右键菜单
   var contextmenu=document.getElementById("contextmenu");
   var contextli=contextmenu.getElementsByTagName("li");
   for(var i=0;i<contextli.length;i++)
   {
	   contextli[i].onmouseover=function()
	   {
		   for(var i=0;i<contextli.length;i++)
		   {
			   contextli[i].className='';
		   }
		   this.className='active';
	   }
   }
   document.oncontextmenu=function(ev)
   {
	   var ev = ev || event;						
				
	   var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	   var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

	   contextmenu.style.left = ev.clientX +scrollLeft+ 'px';
	   contextmenu.style.top = ev.clientY + scrollTop+'px';
       contextmenu.style.display = 'block';
	   
	   return false; // 原生菜单不显示
   }
   document.onclick=function()
   {
	    contextmenu.style.display = 'none';
   }
   // 背景切换
   
	var oBgBtn=document.getElementById("arrow").getElementsByTagName("a");
	var oBg=document.getElementById("bg").getElementsByTagName("img")[0];
	var oBgimg=[
		'http://www.jq-school.com/upload/bg/blue_glow.jpg',
		'images/1988976_104452001914_2.jpg',
		'images/11272250_160719171142_2.jpg',
		'images/41.jpg',
		'images/u=2933727780,82599398&fm=21&gp=0.jpg'
	]
	var oBgNum=0;
	oBgBtn[0].onclick=function()
	{
		oBgNum--;
		if(oBgNum<0)
		{
			oBgNum=oBgimg.length-1;
		}
		oBg.src=oBgimg[oBgNum]
	}
	oBgBtn[1].onclick=function()
	{
		oBgNum++;
		if(oBgNum>oBgimg.length-1)
		{
			oBgNum=0;
		}
		oBg.src=oBgimg[oBgNum]
	}
}
//窗口改变大小的时APP重新排列位置
window.onresize=function()
{
	/*for(var i=0;i<deskmainUl.length;i++)
	{*/
		arrPos=apppos(deskmainUl[num]);
		aLi=getTag(aMainul[num],'li');
		//alert(arrPos)
	//}
	var aPos=[];
	for(i=0;i<aLi.length;i++)
	{
		aPos[i]={left: parseInt(aLi[i].style.left), top: parseInt(aLi[i].style.top)};
	}
	//arrPos=apppos(deskmainUl[0]);
			//alert(arrPos)
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		dragApp(aLi[i],aLi,arrPos);
	}
	
	
}