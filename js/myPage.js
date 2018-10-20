// 使用jQuery进行初始化，将fullpage.js作为jQuery插件使用！
$(document).ready(function () {
    // 获取当前屏幕的高度
    var s_h = $(window).height();
    // 设置初始标识符--2屏入场动画是否执行完毕
    var flag=true;   //控制每次过渡到新节时next按钮淡出的前提条件
    var flag2 = true;//控制2节动画的执行次数
    var flag3 = true; //控制2节向3节滚动时的动画执行次数
    var flag4 = true; //控制3节向4节滚动时的动画执行次数
    var flag5 = true; //控制4节向5节滚动时的动画执行次数
    var flag6 = true; //控制5节向6节滚动时的动画执行次数

    // 使用jQuery初始化fullpage.js
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

        /*调用github下载的fullpage.js，回调函数、方法的使用规则与视频案例中的使用规则不同，这里参考github下的readme文档*/
        // 事件afterLoad--滚动结束之后，一旦加载了节，就会触发回调。参数1：起始部分，参数2：终点部分，参数3：滚动方向
        afterLoad: function (origin, destination, direction) {
            var loadedSection = this;
            console.dir(arguments); //结果显示第一个、第三个实参均为null，所以使用if (origin.index)作为判断第2屏条件会报错null
            // 第2屏入场动画
            if (destination.index == 1 && flag2 == true) { //第2屏加载完成判断条件，destination.index从0开始的
                console.log("222222");
                // 先淡出next按钮，等动画执行完毕(回调)才淡入
                $(".next").fadeOut();

                $(".search").show().stop().animate({
                    "right": 370
                }, 1500, "easeInOutBack", function () {
                    // 平移进来后沙发2个字开始逐渐显示
                    $(".search-wrods").animate({
                        "opacity": 1
                    }, 500, function () {
                        //沙发字显示后原search块隐藏，新search背景图显示，并逐渐变小移到右上角
                        $(".search").hide();
                        // 几个动画同时执行完毕，故时间统一500ms
                        $(".search-02-1").show().animate({
                            "height": 30,
                            "right": 250,
                            "bottom": 452
                        }, 500, function () {
                            //2屏所有入场动画执行完毕，flag2为false
                            flag2 = false;//控制2屏动画执行次数
                        });
                        //同时，沙发货品背景图从隐藏到变大显示
                        $(".goods-02").show().animate({
                            "height": 218
                        }, 500);
                        //同时，白色文字渐渐显示出来
                        $(".words-02").animate({
                            "opacity": 1
                        }, 500, function () {
                            // 动画执行完毕，淡入next按钮
                            $(".next").fadeIn();
                        });
                    });

                });
            }
        },

        // 事件 onLeave--一旦用户离开某个节，过渡到新节，就会触发此回调。
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;
            // 如果是向下过渡到新节，并且是第一次执行过渡动画
            // 先淡出next按钮，每一节动画执行完毕后再淡入
            if(direction == 'down' && flag==true){
                $(".next").fadeOut(); 
            }

            // 2节前往第3节判断条件且2节向3节滚动动画尚未执行过,/*2节入场动画已执行完毕，*/
            if (origin.index == 1 && direction == 'down' && flag3 == true /*&& flag2==false*/) {
                console.dir(arguments);
                // 2屏沙发下移到3屏沙发后的位置,250为3屏中沙发离屏幕底部的距离
                $(".sofa-02").show().animate({
                    "bottom": -(s_h - 250),
                    "width": 207,
                    "left": 260
                }, 2000, function () {
                    // 下落到指定位置后，切换参数选择状态--显示-active类图片
                    $(".img-active").animate({
                        "opacity": 1
                    }, 500);
                    $(".btn-active").animate({
                        "opacity": 1
                    }, 500, function () {
                        // 动画执行完毕
                        flag3 = false;//控制2节向3节滚动动画的执行次数
                        $(".next").fadeIn();//淡入next按钮
                    });
                });
                // 2屏沙发掉落后白色遮罩
                $(".cover").show();
            }

            // 3节前往第4节-动画在第4节
            if (origin.index == 2 && direction == 'down' && flag4 == true) {
                $(".sofa-02").hide();
                // .sofa-03-skew是相对main定位的，main离屏底50px，故要+50
                $(".sofa-03-skew").show().animate({
                    "bottom": -(s_h - 250 + 50),
                    "left": 248
                }, 2000, function () {
                    // 下落完成后隐藏下落的沙发
                    $(".sofa-03-skew").hide();
                    // 显示购物车中的沙发
                    $(".car-good").show();
                    // 沙发进入购物车后，购物车移出屏幕动画---调用视频案例下提供的easing缓动效果jq插件（直接在jQuery animate()方法的第3个参数写上动画曲线名）
                    $(".car").animate({
                        "left": "150%"
                    }, 3000, "easeInElastic", function () {
                        // 购物车移出后显示收货地址
                        $(".addr").show();
                        $(".addr-info , .words-04-active").animate({
                            "opacity": 1
                        }, 1000, function () {
                            // 动画执行完毕
                            flag4 = false;//控制3节向4节滚动动画的执行次数
                            $(".next").fadeIn();//淡入next按钮
                        });
                    });
                });
            }

            // 4节前往第5节
            if (origin.index == 3 && direction == 'down') {
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
                            // 动画执行完毕
                            flag5 = false;//控制4节向5节滚动动画的执行次数
                            $(".next").fadeIn();//淡入next按钮
                        });
                    });
                });
            }

            // 5节前往第6节
            if (origin.index == 4 && direction == 'down' && flag6 == true) {
                // 第5节的沙发下落到第6节，下落的过程逐渐变小并落入快递盒中，落入后沙发隐藏
                $(".sofa-05").animate({ "bottom": -(s_h - 500), "left": "40%", "width": 65 }, 1500, function () {
                    $(".sofa-05").hide();
                });
                // 快递盒与沙发下落保持同样的右移节奏,接住落下的沙发,接住沙发后快递盒开始下落到配送车中
                $(".box-06").animate({ "left": "38%" }, 1500, function () {
                    // 快递盒落入配送车后消失，车子开始移动
                    $(".box-06").animate({ "bottom": 40 }, 500, function () {
                        $(".box-06").hide();
                        // 车子移动实际是背景图片的位置在移动，车子停下后，快递员下车
                        // jQuery里背景改变比较麻烦，"backgroundPosition":"100% 100%" 不起作用，使用"backgroundPositionX":"100%"写法才行
                        $(".section6").animate({ "backgroundPositionX": "100%" }, 4000, function () {
                            // 快递员下车后先向上走(同时人变大)，再向右走
                            $(".courier").animate({ "bottom": 116, "height": 305 }, 500, function () {
                                // 向右走到门口，模拟门打开(图片显示)
                                $(".courier").animate({ "right": 500 }, 500, function () {
                                    // 门打开，女孩出来（同时人变大）
                                    $(".the-open-door").animate({ "opacity": 1 }, 500, function () {
                                        // 女孩出门，同时人变大后，显示"请收货"
                                        $(".girl").show().animate({ "height": 306, "right": 350 }, 500, function () {
                                            $(".accept-goods").show();
                                            // 动画执行完毕
                                            flag6 = false;//控制5节向6节滚动动画的执行次数
                                            $(".next").fadeIn();//淡入next按钮
                                        });
                                    });
                                });
                            });
                        });
                        // 车子移动的同时，收货地址显示，slogan显示并向右移动
                        $(".shipping-address").show();
                        $(".slogan").show().animate({ "left": "32%" }, 2000);
                    });
                });
            }
            // 6节前往第7节
            if (origin.index == 5 && direction == 'down') {
                // 白色五星逐渐显示--这里做法是让白色五星所在的外层容器宽度逐渐变大来实现效果
                var timeId = setTimeout(function () {
                    $(".star-07").animate({ "width": 120 }, 500, function () {
                        // 同时，显示好评
                        $(".hp-07").show();
                        // 动画执行完毕，淡入next按钮
                        $(".next").fadeIn();
                        flag=false;   //之后再次过渡到新节 next按钮不再淡出--因为所有过渡动画只执行一次，之后再淡出缺乏淡入
                    });
                    clearTimeout(timeId);
                }, 1000);
            }

        },

    });
    //methods--允许滚动
    $.fn.fullpage.setAllowScrolling(true);

    // 第8屏动画
    // 鼠标移入移出 开始购物 按钮切换
    $(".startShopping").on("mouseenter", function () {
        $(".btn-08-active").show();
        $(".startShopping").on("mouseleave", function () {
            $(".btn-08-active").hide();
        });
    });
    //再来一次：1、回到第1屏 ; 2、还原所有动画
    $(".replay").on("click", function () {
        //滚动到网站的第一节--调用fullpage.js的方法
        // 参数1：sectionAnchor(节：从1开始),参数2：slideAnchor(幻灯片：从0开始，第一张幻灯片，默认情况下，将有索引0。)
        fullpage_api.moveTo(1);
        console.dir(fullpage_api.moveTo);
        //还原所有动画
        //思路1：将所有动画后设置的行内样式置空(即回归动画前初始样式)(所有的img动画和其他设置动画的元素（.animate类）)
        // $("img,.animate").attr("style", "");
        // flag=flag2 = flag3 = flag4 = flag5 = flag6 = true;
        // 另一种思路：回到第一屏后，reload页面，测试也是可行的
        location.reload();
    });
    //手随鼠标移动
    $(document).on("mousemove", function (event) {
        // console.dir(arguments);
        // var x=event.pageX;
        // var y=event.pageY;
        // 优化：使鼠标在图片的上面中间
        var x = event.pageX - $(".hand-08").width() / 2;
        var y = event.pageY + 10;
        // 限制鼠标y轴移动范围--离top侧最小值为当前屏幕宽度-手的高度
        var minY = s_h - $(".hand-08").height();
        if (y < minY) {
            y = minY;
        }
        $(".hand-08").css({ "left": x, "top": y });
    });

    // 点击 继续往下 进入下一节
    $(".next").on("click", function () {
        // 调用fullpage.js的方法
        fullpage_api.moveSectionDown();
    });

});