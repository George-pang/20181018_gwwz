// 使用jQuery进行初始化，将fullpage.js作为jQuery插件使用！
$(document).ready(function () {
    // 获取当前屏幕的高度
    var s_h = $(window).height();
    // 设置初始标识符--2屏入场动画是否执行完毕
    var flag = false;
    $('#fullpage').fullpage({
        //options here 配置对象
        autoScrolling: true,
        scrollHorizontally: true,
        scrollingSpeed: 1200,
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifththPage', 'sixthPage', 'seventhPage', 'lastPage'],
        // 显示导航滑块
        navigation: true,
        navigationPosition: 'right',
        // 许可秘钥：开源
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

        /*调用github下载的fullpage.js*/

        // 第2屏入场动画
        // 事件afterLoad--加载完成后，参数1：起始部分，参数2：终点部分，参数3：滚动方向
        afterLoad: function (origin, destination, direction) {
            var loadedSection = this;

            console.dir(arguments); //结果显示第一个、第三个实参均为null，所以使用if (origin.index)作为判断第2屏条件会报错null

            if (destination.index == 1 && flag == false) { //第2屏加载完成判断条件，destination.index从0开始的
                $(".search").show().stop().animate({
                    "right": 370
                }, 1500, "easeInOutBack", function () {
                    // 平移进来后沙发2个字开始逐渐显示
                    $(".search-wrods").animate({
                        "opacity": 1
                    }, 500, function () {
                        //沙发字显示后原search块隐藏，新search背景图显示，并逐渐变小移到右上角
                        $(".search").hide();
                        // 几个动画同时执行完毕，时间统一500ms
                        $(".search-02-1").show().animate({
                            "height": 30,
                            "right": 250,
                            "bottom": 452
                        }, 500, function () {
                            //2屏所有入场动画执行完毕，flag为true
                            flag = true;
                        });
                        //同时，沙发货品背景图从隐藏到变大显示
                        $(".goods-02").show().animate({
                            "height": 218
                        }, 500);
                        //同时，白色文字渐渐显示出来
                        $(".words-02").animate({
                            "opacity": 1
                        }, 500);
                    });

                });
            }
        },

        // 第2屏向第3屏滚动沙发掉落动画
        // 事件 onLeave
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;
            // 2节前往第3节判断条件且2节入场动画执行完毕
            if (origin.index == 1 && direction == 'down' && flag == true) {
                console.dir(arguments);
                // 2屏沙发下移到3屏沙发后的位置,250为3屏中沙发离屏幕底部的距离
                $(".sofa-02").show().animate({
                    "bottom": -(s_h - 250),
                    "width": 207,
                    "left": 260
                }, 2000, function () {
                    $(".img-active").animate({
                        "opacity": 1
                    }, 500);
                    $(".btn-active").animate({
                        "opacity": 1
                    }, 500);
                });
                // 2屏沙发掉落后白色遮罩
                $(".cover").show();
            }

            // 3节前往第4节
            if (origin.index == 2 && direction == 'down') {
                console.dir(arguments);
                $(".sofa-02").hide();
                // .sofa-03-skew是相对main定位的，main离屏底50px，故要+50
                $(".sofa-03-skew").show().animate({
                    "bottom": -(s_h - 250 + 50),
                    "left": 248
                }, 2000, function () {
                    $(".sofa-03-skew").hide();
                    $(".car-good").show();
                    // 沙发进入购物车后，购物车移出屏幕动画---调用视频案例下提供的easing缓动效果jq插件（直接在jQuery animate()方法的第3个参数写上动画曲线名）
                    $(".car").animate({
                        "left": "150%"
                    }, 3000, "easeInElastic", function () {
                        // 购物车移出后显示收货地址
                        $(".addr").show();
                        $(".addr-info , .words-04-active").animate({
                            "opacity": 1
                        }, 1000);
                    });
                });
            }

            // 4节前往第5节
            if (origin.index == 3 && direction == 'down') {
                console.dir(arguments);
                $(".hand-05").animate({
                    "bottom": 0
                }, 2000, function () {
                    // 手上移到鼠标处后
                    // 鼠标切换active状态图
                    $(".mouse-05-a").animate({
                        "opacity": 1
                    });
                    // 沙发显示并下落，下落完成后订单上移
                    $(".sofa-05").show().animate({
                        "bottom": 70
                    }, 1000, function () {
                        //订单上移,移动结束后顶部文字翻转
                        $(".order-05").animate({
                            "bottom": 390
                        }, function () {
                            $(".words-05").addClass("animation-3d-rotate");
                        });
                    });
                });
            }

            // 5节前往第6节
            if (origin.index == 4 && direction == 'down') {
                console.dir(arguments);
                // 第5节的沙发下落到第6节，下落的过程逐渐变小并落入快递盒中，落入后沙发隐藏
                $(".sofa-05").animate({"bottom":-(s_h-500),"left":"40%","width":65},1500,function(){
                    $(".sofa-05").hide();
                });
                // 快递盒与沙发下落保持同样的右移节奏,接住落下的沙发,接住沙发后快递盒开始下落到配送车中
                $(".box-06").animate({"left":"38%"},1500,function(){
                    // 快递盒落入配送车后消失，车子开始移动
                    $(".box-06").animate({"bottom":40},500,function(){
                        $(".box-06").hide();
                        // 车子移动实际是背景图片的位置在移动，车子停下后，快递员下车
                        // jQuery里背景改变比较麻烦，"backgroundPosition":"100% 100%" 不起作用，使用"backgroundPositionX":"100%"写法才行
                        $(".section6").animate({"backgroundPositionX":"100%"},4000,function(){
                            // 快递员下车后先向上走(同时人变大)，再向右走
                            $(".courier").animate({"bottom": 116,"height":305},500,function(){
                                // 向右走到门口，模拟门打开(图片显示)
                                $(".courier").animate({"right": 500},500,function(){
                                    // 门打开，女孩出来（同时人变大）
                                    $(".the-open-door").animate({"opacity":1},500,function(){
                                        // 女孩出门，同时人变大后，显示"请收货"
                                        $(".girl").show().animate({"height":306,"right":350},500,function(){
                                            $(".accept-goods").show();
                                        });
                                    });
                                });
                            });
                        });
                        // 车子移动的同时，收货地址显示，slogan显示并向右移动
                        $(".shipping-address").show();
                        $(".slogan").show().animate({"left":"30%"},2000);
                    });
                });
            }
        },


        /*如果调用视频案例中的fullpage.js，使用规则如下：*/

        // // 回调函数滚动到第二屏后的回调函数，接收 anchorLink 和 index 两个参数，anchorLink 是锚链接的名称，index 是序号，从1开始计算
        // afterLoad: function(anchorLink, index) {
        //     console.log("1111");
        // 	if(index == 2) {
        //         console.log("2222");
        //         //右侧search块从右向左平移
        //         $(".search").show().stop().animate({"right":370},1500,function () {
        //             // 平移进来后沙发2个字开始逐渐显示
        //             $(".search-wrods").animate({"opacity":1},1000,function(){
        //                 //沙发字显示后原search块隐藏，新search背景图显示，并逐渐变小移到右上角
        //                 $(".search").hide();
        //                 $(".search-02-1").show().animate({"height":30,"right":250,"bottom":452},1000);
        //                 //同时，沙发货品背景图从隐藏到变大显示
        //                 $(".goods-02").show().animate({"height":218},1000);
        //                 //同时，白色文字渐渐显示出来
        //                 $(".words-02").animate({"opacity":1},1000)
        //             });
        //         });
        // 	}
        // },

        // 刚开始滚动屏幕就触发的回调函数 onLeave
        // 滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：index 是离开的“页面”的序号，从1开始计算；nextIndex 是滚动到的“页面”的序号，从1开始计算；direction 判断往上滚动还是往下滚动，值是 up 或 down。
        // onLeave: function (index, nextIndex, direction) {
        //     $(".next").fadeOut();
        //     if (index == 2 && nextIndex == 3) {
        //         // 当第二屏幕往第三屏幕滚动的时候， 沙发显示并且往第三屏幕跑  白色盒子显示
        //         // 沙发要往第三屏幕走，  走的距离 就是  当前哦屏幕的高度 - main 到底部的高度 - 沙发到main的距离    (当前屏幕的高度  - 250 )
        //         $(".shirt-02").show().animate({
        //             "bottom": -(k - 250),
        //             "width": 207,
        //             "left": 260
        //         }, 2000, function () {
        //             $(".img-01-a").animate({
        //                 "opacity": 1
        //             }, 500, function () {
        //                 $(".btn-01-a").animate({
        //                     "opacity": 1
        //                 }, 500, function () {
        //                     $(".next").fadeIn();
        //                 });
        //             })
        //         });
        //         $(".cover").show();
        //     }
        // }


    });

    //methods--允许滚动
    $.fn.fullpage.setAllowScrolling(true);


});