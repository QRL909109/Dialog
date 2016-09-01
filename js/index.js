/**
 * Created by Administrator on 2016/8/31 0031.
 */
;(function($){
    var Dialog = function(config){
        var _this = this;
        this.config = {
            //按钮组
            buttons:null,
            //类型
            type:'waiting',
            //延迟多久关闭
            delay:null,
            //提示信息
            message : null,
            //高
            height : 'auto',
            //宽
            width : 'auto',
            //遮罩透明度
            maskOpacity:null,
            effect : false,
            delayCallback :null,
            maskClose:null
        };

        //默认参数扩展
        if(config && $.isPlainObject(config)){
            $.extend(this.config,config);
        }else{
            this.isConfig = true;
        }

        /*创建基本的DOM*/
        this.body = $('body');
        this.mask = $('<div class="g-dialog-container">');
        this.win= $('<div class="dialog-window">');
        this.winHeader = $('<div class="dialog-header"></div>');
        this.winContent = $('<div class="dialog-content">');
        this.winFooter = $('<div class="dialog-footer">');
        //渲染DOM
        this.create();
    };
    Dialog.zIndex = 1000;
    Dialog.prototype ={
        animate:function(){
            var _this = this;
            this.win.css('-webkit-transform','scale(0,0)');
            window.setTimeout(function(){
                console.log(this)
                console.log(_this)
                _this.win.css('-webkit-transform','scale(1,1)')
            },100)
        },
        create : function(){
            var _this = this,
                config = this.config,
                mask = this.mask,
                win = this.win,
                header = this.winHeader,
                content = this.winContent,
                footer = this.winFooter,
                body = this.body;

            this.mask.css('zIndex',++Dialog.zIndex)
            //没有传递配置参数 弹出等待图标
            if(this.isConfig){
                win.append(header.addClass('waiting'));
                if(config.effect){
                    this.animate();
                }

                mask.append(win);
                body.append(mask);
            }else{
                header.addClass(config.type)
                win.append(header)
                if(config.message){
                    win.append(content.html(config.message));
                }
                if(config.buttons){
                    this.createButtons(footer ,config.buttons);
                    win.append(footer)
                }
                mask.append(win);
                body.append(mask);
                if(config.width != 'auto'){
                    win.width(config.width)
                }
                if(config.height != 'auto'){
                    win.height(config.height)
                }
                if(config.maskOpacity){
                    mask.css('backgroundColor' ,"rgba(0,0,0,"+config.maskOpacity+")");
                }
                if(config.delay && config.delay !=0){
                    window.setTimeout(function(){
                        _this.close();
                        config.delayCallback&&config.delayCallback();
                    },config.delay)
                }
                if(config.effect){
                    this.animate();
                }
                if(config.maskClose){
                    mask.tap(function(){
                        _this.close
                    })
                }
            }
        },
        close  :function () {
            this.mask.remove();
        },
        createButtons : function (footer ,buttons) {
            var _this =this;
            $(buttons).each(function (i) {
                var type = this.type ? 'class='+this.type +'':'';
                var btnText = this.text?this.text:'按钮'+(++i);
                var callback = this.callback ? this.callback :null;
                var button = $('<button '+type+'>'+btnText+'</button>');
                if(callback){
                    button.tap(function(){
                        var isClose = callback();
                        //阻止时间冒泡
                        e.stopPropagation();
                        if(isClose != false){
                            _this.close();
                        }
                    })
                }else{
                    button.tap(function(){
                        e.stopPropagation();
                        _this.close();
                    })
                }
                footer.append(button)
            })
        }
    }
    window.Dialog = Dialog;
    $.dialog = function(config){
        return new Dialog(config);
    }
})(Zepto)