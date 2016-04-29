# neoclock
####这是自己在平时做的一个练习，用原生js写的，网页时钟，今天拿出来把里面的知识点总结下，也算是一个回顾
:laughing:（才发现可以插表情，\(^o^)/~ :kissing_heart:）[点击这里查看在线效果](http://www.neove.cc/neoclock/index.html)

    首先说明下，因为是一个小的demo，所以平时的js代码都写在了head标签里，那个neo.js文件是自己平时封装的一个js库，在这里需要
    引用下

====
* 做任何东西，明白了原理，也就事半功倍了 ，js尤其如此，所以还是先看下实现的原理（如下）
![](https://github.com/neove/neoclock/raw/master/neoclock/oo.png)
  类似于大家写的单方向无缝滑动的效果
* 明白了原理下面就开始动手写了，这里总结下几个关键的点

====
1.  首先需要一个运动函数，这里用原生js封装了一个运动框架

    ```
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
            endFn && endFn();
        }
    }, 30);
}
```
2. 然后就是关于js的Date（）日期对象的使用以及定时器的相关操作，这个demo中，定时器每隔一秒执行一次 :bowtie:
3. 最后一点，就是如何实现动画上翻的效果，这里提供一个思路：将上一秒的时间存储下来，在每次函数执行之前，把现在的时间和上一秒的时间作比较，如果改变了，就是让数字滑上去，进行替换操作，否则不动作，就可以了，具体代码可以下载查看，如果有更好的思路，欢迎来交流哦O(∩_∩)O :stuck_out_tongue_closed_eyes:






