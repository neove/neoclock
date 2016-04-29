
function $(v){
    if(typeof v==='function'){
        window.onload=v;
    }else if(typeof v==='string'){
        return document.getElementById(v);
    }else if(typeof v==='object'){
        return v;
    }
}
/**get the attribute of the element and the typeof of the attribute you get is string **/
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

//doMove 函数
function doMove ( obj, attr, dir, target, endFn ) {

    dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;

    clearInterval( obj.timer );

    obj.timer = setInterval(function () {

        var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长

        if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
            speed = target;
        }

        obj.style[attr] = speed + 'px';

        if ( speed == target ) {
            clearInterval( obj.timer );

            /*
             if ( endFn ) {
             endFn();
             }
             */
            endFn && endFn();

        }

    }, 30);

}

//抖函数
function shake ( obj, attr, endFn ) {
    if(obj.onOff){return}     //抖函数的解决方法
    obj.onOff=true;
    var pos = parseInt( getStyle(obj, attr) );			// 获取的属性值为字符串，要转为数字

    var arr = [];			// 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;

    for ( var i=20; i>0; i-=2 ) {
        arr.push( i, -i );
    }
    arr.push(0);

    clearInterval( obj.shake );
    obj.shake = setInterval(function (){
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if ( num === arr.length ) {
            clearInterval( obj.shake );
            endFn && endFn();
            obj.onOff=false;
        }
    }, 50);
}



//透明度函数
function opacity(obj,dir,target) {
    if(obj.onOff){return}
    obj.onOff=true;
    dir=getStyle(obj,'opacity')*100<target ? dir : -dir;
    clearInterval(obj.opacity);
    obj.opacity=setInterval(function(){
        //以下是重复执行的函数，要将递增属性变量的放在这里面！！！
        var speed=parseFloat(getStyle(obj,'opacity'))+dir/100;//经过html获得的全是属性值全是string
        if(speed>target/100 && dir>0 || speed<target && dir<0){//这里给speed增加之后先判断，在改属性值！！
            speed=target/100;
            clearInterval(obj.opacity);
            obj.onOff=false;
        }
        obj.style.opacity=speed;

    },20)
}


//获取和显示系统当前的时间

function fnTime(){
    var myTime=new Date();
    var iYear=myTime.getFullYear();
    var iMonth=myTime.getMonth()+1;
    var iDate=myTime.getDate();
    var iWeek=myTime.getDay();
    var iHours=myTime.getHours();
    var iMinu=myTime.getMinutes();
    var iSeco=myTime.getSeconds();
    if(iWeek==0) iWeek='星期天';
    if(iWeek==1) iWeek='星期一';
    if(iWeek==2) iWeek='星期二';
    if(iWeek==3) iWeek='星期三';
    if(iWeek==4) iWeek='星期四';
    if(iWeek==5) iWeek='星期五';
    if(iWeek==6) iWeek='星期六';

    var stri=iYear+'年'+iMonth+'月'+iDate+'日'+iWeek+toTwo(iHours)+': '+toTwo(iMinu)+': '+': '+toTwo(iSeco);
    return stri;

}
function toTwo(n){
    return n<10 ? '0'+n : ''+n;
}


//透明度函数
function fade(element, transparency, speed, callback){//透明度渐变：transparency:透明度 0(全透)-100(不透)；speed:速度1-100，默认为1
    if(typeof(element)=='string')element=document.getElementById(element);
    if(!element.effect){
        element.effect = {};
        element.effect.fade=0;
    }
    clearInterval(element.effect.fade);
    var speed=speed||1;
    var start=(function(elem){
        var alpha;
        if(navigator.userAgent.toLowerCase().indexOf('msie') != -1){
            alpha=elem.currentStyle.filter.indexOf("opacity=") >= 0?(parseFloat( elem.currentStyle.filter.match(/opacity=([^)]*)/)[1] )) + '':
                '100';
        }else{
            alpha=100*elem.ownerDocument.defaultView.getComputedStyle(elem,null)['opacity'];
        }
        return alpha;
    })(element);
    if(window.console&&window.console.log)console.log('start: '+start+" end: "+transparency);
    element.effect.fade = setInterval(function(){
        start = start < transparency ? Math.min(start + speed, transparency) : Math.max(start - speed, transparency);
        element.style.opacity =  start / 100;
        element.style.filter = 'alpha(opacity=' + start + ')';
        if(Math.round(start) == transparency){
            element.style.opacity =  transparency / 100;
            element.style.filter = 'alpha(opacity=' + transparency + ')';
            clearInterval(element.effect.fade);
            if(callback)callback.call(element);
        }
    }, 20);
};

//返回x到y的随机整数值
function Random(x,y){
    return Math.round( Math.random()*(y-x)+x );
}

//得到元素的绝对位置
function getPos(obj){
    var pos={left:0,top:0};
    while(obj){
        pos.left+=obj.offsetLeft;
        pos.top+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return pos;
}

//定义此函数是为了解决ie7及以下不支持getElementsByClassName()函数的兼容性问题。

function getElementsByClassName(parent,tagName,className){
    var aEl=parent.getElementsByTagName(tagName);
    var arr=[];//存放之后找到的元素数组
    for(var i=0;i<aEl.length;i++){
        var arrClassNames=aEl[i].className.split(' ');
        for( var j=0;j<arrClassNames.length;j++){
            if( arrClassNames[j]==className){
                arr.push(aEl[i]);
                break;
            }
        }
    }
    return arr;
}

//绑定事件函数
function bind(obj,evname,fn){  /** evname 是事件名称，不加on**/
    if(obj.addEventListener){
        obj.addEventListener(evname,fn,false);
    }else{
        obj.attachEvent('on'+evname,function(){
            fn.call(obj);   /**解决ie下this的指向问题 **/
        })
    }
}


//拖拽函数封装
function drag(obj) {

    obj.onmousedown = function (ev) {
        var ev = ev || event;
        var a = ev.clientX - this.offsetLeft;
        var b = ev.clientY - this.offsetTop;
        if (obj.setCapture) {  //  设置全局捕获，解决非标准ie下的问题
            obj.setCapture();
        }
        document.onmousemove = function (ev) {
            var ev = ev || event;
            obj.style.left = ev.clientX - a + 'px';
            obj.style.top = ev.clientY - b + 'px';
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            if(obj.releaseCapture){//取消全局捕获
                obj.releaseCapture();
            }
        };
        return false;/**取消默认行为，解决标准浏览器下的问题**/
    }

}



/****start function about the operation to cookies*****/
function getCookie(key){
    var arr1=document.cookie.split('; ');/**将document的所有cookie拆分为数组存放**/
    for( var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split('=');     /**将单个字符串cookie拆分为数组**/
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}

function setCookie(key,value,t){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+t);
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toGMTString();
}
//移除cookie
function removeCookie(key){
    setCookie(key,'',-1);
}
/****end function about the operation to cookies*****/




/*************start Move function,OOD,attr can be opacity********************/
function Move(id,attr,speed,target,endFn){      /*when attr is opacity,target is from 0 to 100;*/
    this.ele=document.getElementById(id);
    this.target=target;
    this.attr=attr;
    this.endFn=endFn;
    if(this.attr=='opacity'){         /**use ==  instead of =**/
        this.now=parseInt(parseFloat(getStyle(this.ele,this.attr))*100);/**防止小数的问题**/
    }else{
        this.now=parseInt(getStyle(this.ele,this.attr));/**这里的值是动态的，随着位置而改变,,不需要放在timer中**/
    }
    this.speed=this.target>this.now ? speed : -speed;/**接着定下speed的正负...**/

}
Move.prototype.doMove=function(){
    var that=this;
    clearInterval(this.ele.timer);
    this.ele.timer=setInterval(function(){                  /**add timer to this.ele**/
        that.go();
    },30);
};
Move.prototype.go=function(){
    this.now+=this.speed;
    if(this.now>this.target && this.speed>0 || this.now<this.target && this.speed<0){
        this.now=this.target;
    }
    if(this.attr=='opacity'){
        this.ele.style.opacity=this.now/100;
        this.ele.style.filter='alpha(opacity:'+(this.now)+')';/**adapt to the old version of ie**/
    }else{
        this.ele.style[this.attr]=this.now+'px';
    }
    if(this.now==this.target){
        clearInterval(this.ele.timer);
        this.endFn && this.endFn();                         /**Callback function**/
    }

};
/*************end Move function***********************/

/************start BufferMove ,OOD,inherit****************/
function BufferMove(id,attr,x,target,endFn){    /*x controls the velocity*/
    Move.call(this,id,attr,x,target,endFn);
    this.x=x;

}
for(var i in Move.prototype){
    BufferMove.prototype[i]=Move.prototype[i];
}
BufferMove.prototype.go=function(){
    if(this.speed>0){
        this.speed=Math.ceil((this.target-this.now)/this.x);
    }else{
        this.speed=Math.floor((this.target-this.now)/this.x);/**in case speed==0 before arriving the target**/
    }
    this.now+=this.speed;
    if(this.now>this.target && this.speed>0 || this.now<this.target && this.speed<0){
        this.now=this.target;
    }

    this.ele.style[this.attr]=this.now+'px';

    if(this.now==this.target){
        clearInterval(this.ele.timer);
        this.endFn && this.endFn();

    }
};
/************end BufferMove function ,inherit****************/
/************Start setStyle function  **********************/

function setStyle(obj,json){
    for( var attr in json){
        obj.style[attr]=json[attr];
    }
}
/************End setStyle function  **********************/
/************Start Frame of the perfect move *************/

function perfectMove(obj, json, rate,endFn) {/**opacity changes from 0 to 100**/
                                             /**为了兼容ff，使用margin时要写成'margin-left'，'margin-right' and so on .**/
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;
        for(var attr in json){
            /**1.Get the current value of the attribute**/
            var iCur = 0;
            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            /**2.Compute the speed and do move**/
            var iSpeed = (json[attr] - iCur) / rate;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }

            /**3.Judge if all arrive the target **/
            if (iCur != json[attr]) {
                bStop = false;
            }
        } /**end for loop**/
        if(bStop) {
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 30)
}

/************End Frame of the perfect move **********************/
/************Start elasticityMove function **********************/
function elasticityMove(obj,attr,target){
    obj.speed=0;
    obj.num=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        obj.speed+=(target-parseFloat(getStyle(obj,attr)))/5;
        obj.speed*=0.7;
        obj.num=obj.speed+parseFloat(getStyle(obj,attr));//解决小数点误差累积的问题
        obj.style[attr]=obj.num+'px';
        if(parseFloat(getStyle(obj,attr))==target ){
            obj.style[attr]=target+'px';
            clearInterval(obj.timer);
        }
    },30)
}
/************End elasticityMove function **********************/
/************Start elasticityPlus function ********************/
function elasticityMove(obj,json,endFn) {
    var speedX = 0;
    var num1 = 0;
    var num2=0;
    var x = json.left;
    var y = json.top;
    var a=parseFloat(getStyle(obj,'left'));
    var b=parseFloat(getStyle(obj,'top'));
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        speedX += (json.left - parseFloat(getStyle(obj,'left'))) / 5;
        speedX *= 0.7;
        num1 = speedX + parseFloat(getStyle(obj,'left'));//解决小数点误差累积的问题
        num2=y-(x-num1)/(x-a)*(y-b);
        obj.style.left = num1 + 'px';
        obj.style.top = num2 + 'px';
        if (parseFloat(getStyle(obj, 'left')) == x) {
            obj.style.left = x + 'px';
            obj.style.top = y + 'px';
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 30)
}
/************End elasticityPlus function **********************/
