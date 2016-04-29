
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

//doMove ����
function doMove ( obj, attr, dir, target, endFn ) {

    dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;

    clearInterval( obj.timer );

    obj.timer = setInterval(function () {

        var speed = parseInt(getStyle( obj, attr )) + dir;			// ����

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

//������
function shake ( obj, attr, endFn ) {
    if(obj.onOff){return}     //�������Ľ������
    obj.onOff=true;
    var pos = parseInt( getStyle(obj, attr) );			// ��ȡ������ֵΪ�ַ�����ҪתΪ����

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



//͸���Ⱥ���
function opacity(obj,dir,target) {
    if(obj.onOff){return}
    obj.onOff=true;
    dir=getStyle(obj,'opacity')*100<target ? dir : -dir;
    clearInterval(obj.opacity);
    obj.opacity=setInterval(function(){
        //�������ظ�ִ�еĺ�����Ҫ���������Ա����ķ��������棡����
        var speed=parseFloat(getStyle(obj,'opacity'))+dir/100;//����html��õ�ȫ������ֵȫ��string
        if(speed>target/100 && dir>0 || speed<target && dir<0){//�����speed����֮�����жϣ��ڸ�����ֵ����
            speed=target/100;
            clearInterval(obj.opacity);
            obj.onOff=false;
        }
        obj.style.opacity=speed;

    },20)
}


//��ȡ����ʾϵͳ��ǰ��ʱ��

function fnTime(){
    var myTime=new Date();
    var iYear=myTime.getFullYear();
    var iMonth=myTime.getMonth()+1;
    var iDate=myTime.getDate();
    var iWeek=myTime.getDay();
    var iHours=myTime.getHours();
    var iMinu=myTime.getMinutes();
    var iSeco=myTime.getSeconds();
    if(iWeek==0) iWeek='������';
    if(iWeek==1) iWeek='����һ';
    if(iWeek==2) iWeek='���ڶ�';
    if(iWeek==3) iWeek='������';
    if(iWeek==4) iWeek='������';
    if(iWeek==5) iWeek='������';
    if(iWeek==6) iWeek='������';

    var stri=iYear+'��'+iMonth+'��'+iDate+'��'+iWeek+toTwo(iHours)+': '+toTwo(iMinu)+': '+': '+toTwo(iSeco);
    return stri;

}
function toTwo(n){
    return n<10 ? '0'+n : ''+n;
}


//͸���Ⱥ���
function fade(element, transparency, speed, callback){//͸���Ƚ��䣺transparency:͸���� 0(ȫ͸)-100(��͸)��speed:�ٶ�1-100��Ĭ��Ϊ1
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

//����x��y���������ֵ
function Random(x,y){
    return Math.round( Math.random()*(y-x)+x );
}

//�õ�Ԫ�صľ���λ��
function getPos(obj){
    var pos={left:0,top:0};
    while(obj){
        pos.left+=obj.offsetLeft;
        pos.top+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return pos;
}

//����˺�����Ϊ�˽��ie7�����²�֧��getElementsByClassName()�����ļ��������⡣

function getElementsByClassName(parent,tagName,className){
    var aEl=parent.getElementsByTagName(tagName);
    var arr=[];//���֮���ҵ���Ԫ������
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

//���¼�����
function bind(obj,evname,fn){  /** evname ���¼����ƣ�����on**/
    if(obj.addEventListener){
        obj.addEventListener(evname,fn,false);
    }else{
        obj.attachEvent('on'+evname,function(){
            fn.call(obj);   /**���ie��this��ָ������ **/
        })
    }
}


//��ק������װ
function drag(obj) {

    obj.onmousedown = function (ev) {
        var ev = ev || event;
        var a = ev.clientX - this.offsetLeft;
        var b = ev.clientY - this.offsetTop;
        if (obj.setCapture) {  //  ����ȫ�ֲ��񣬽���Ǳ�׼ie�µ�����
            obj.setCapture();
        }
        document.onmousemove = function (ev) {
            var ev = ev || event;
            obj.style.left = ev.clientX - a + 'px';
            obj.style.top = ev.clientY - b + 'px';
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            if(obj.releaseCapture){//ȡ��ȫ�ֲ���
                obj.releaseCapture();
            }
        };
        return false;/**ȡ��Ĭ����Ϊ�������׼������µ�����**/
    }

}



/****start function about the operation to cookies*****/
function getCookie(key){
    var arr1=document.cookie.split('; ');/**��document������cookie���Ϊ������**/
    for( var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split('=');     /**�������ַ���cookie���Ϊ����**/
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
//�Ƴ�cookie
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
        this.now=parseInt(parseFloat(getStyle(this.ele,this.attr))*100);/**��ֹС��������**/
    }else{
        this.now=parseInt(getStyle(this.ele,this.attr));/**�����ֵ�Ƕ�̬�ģ�����λ�ö��ı�,,����Ҫ����timer��**/
    }
    this.speed=this.target>this.now ? speed : -speed;/**���Ŷ���speed������...**/

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
                                             /**Ϊ�˼���ff��ʹ��marginʱҪд��'margin-left'��'margin-right' and so on .**/
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
        obj.num=obj.speed+parseFloat(getStyle(obj,attr));//���С��������ۻ�������
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
        num1 = speedX + parseFloat(getStyle(obj,'left'));//���С��������ۻ�������
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
