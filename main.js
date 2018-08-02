window.onload = init;

var dataInt = {
	data:[
		{src:'imgs/1.jpg'},
		{src:'imgs/2.jpg'},
		{src:'imgs/3.jpg'},
		{src:'imgs/4.jpg'},
		{src:'imgs/5.jpg'},
		{src:'imgs/6.jpg'},
		{src:'imgs/7.jpg'},
		{src:'imgs/8.jpg'},
		{src:'imgs/9.jpg'},
		{src:'imgs/10.jpg'},
	]
}

function init(){
	waterfall('main','box');
	// window.onresize = resizeInit;
	//window.onscroll = scrollInit;
}
function resizeInit(){
	waterfall('main','box');
}
function scrollInit(){

	if( checkScrollSlide() ){ //将数据块渲染到页面尾部
		// console.log(1)
		var oParent = document.getElementById('main');

		for(var i=0;i<dataInt.data.length;i++){
			var oBox = document.createElement('div');
			oBox.className = 'box';
			var oPic = document.createElement('div');
			oPic.className = 'pic';
			var oImg = document.createElement('img');
			oImg.src = dataInt.data[i].src;
			oPic.appendChild(oImg);
			oBox.appendChild(oPic);
			oParent.appendChild(oBox);
		}
	}/*else {
		// console.log(2)
	}*/
	waterfall('main','box');	
	// checkScrollSlide();
}

function waterfall(parent,cls){
	var oParent = document.getElementById(parent);
	var oBoxs =  getByClass(oParent,cls);

	var oBoxW = oBoxs[0].offsetWidth;
	// 计算列数
	var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
	// console.log(oBoxW,cols)
	// 设置main 的宽度
	oParent.style.cssText = ` width:${oBoxW*cols}px;margin:20px auto `;

	var hArr = []; // 存放每列元素的高度
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);

			oBoxs[i].style.position = 'static'
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinHindex(hArr,minH);

			oBoxs[i].style.cssText = ` position:absolute;top:${minH}px;left:${index*oBoxW}px `;
			// oBoxs[i].style.cssText = ` position:absolute;top:${minH}px;left:${oBoxs[index].offsetLeft}px `;

			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	// var lastBox = oBoxs[oBoxs.length-1]
	//var lastBoxH  = lastBox.offsetTop + Math.floor(lastBox.offsetHeight); 
	//oParent.style.height = lastBoxH + 'px'
	// console.log(hArr,Math.min.apply(null,hArr))
}
function checkScrollSlide(){
	//检查是否满足加载 数据块的条件 
	var oParent = document.getElementById('main');
	var oBoxs =  getByClass(oParent,'box');
	var lastBox = oBoxs[oBoxs.length-1];

	//满足条件的高度
	var lastBoxH  = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2); 
	// 浏览器滚动的距离
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	// 页面的高度
	var height = document.body.clientHeight || document.documentElement.clientHeight;

	return (lastBoxH<(scrollTop+height))?true:false;
}

function getByClass(parent,cls){
	var boxArr = [],
		oElements = parent.getElementsByTagName('*');
	for(var i=0,l=oElements.length;i<l;i++){
		if(oElements[i].className==cls){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr; 
}
function getMinHindex(arr,val){
	for(var i in arr ){
		if(arr[i]==val){
			return i;
		}
	}
}