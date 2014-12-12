/*! Copyright (c) SESHENGHUO.COM - Author: LIJUN - Email: zwlijun@gmail.com - Git: https://github.com/zwlijun/se.lib */
define(function(require,exports,module){require("mod/zepto/touch.e960be16676e977765ed45c5f7aaed29eb0160d4"),require("mod/se/raf.f12274d2329a19c00b6b3a12a35ba1e3bace9239");var a=require("mod/se/listener.263f38898829bcbd37b39b7743be119a9db33581"),b=$.Util=require("mod/se/util.5418ba8bf71f527f29091bc874d170aac4af716b"),c=require("mod/sa/lightanimation.739ed5f9626be415ae5bbc5bebac5fc49c33fbd6"),d=require("mod/sa/scenetransitions.84f14a51c720476e0644f822b0115b45c3a2c5d7"),e={VERTICAL:"vertical",HORIZONTAL:"horizontal"},f={ONCE:"once",EVERYTIME:"everytime"},g={NONE:"none",AUTO:"auto",X:"x",Y:"y"},h={ADAPTIVE:"adaptive",HIDDEN:"hidden",HIDDEN_X:"hidden-x",HIDDEN_Y:"hidden-y"},i=function(a,module,b,c){this.app=a,this.module=module,this.widget=b,this.source=c,this.effect=this.createAnimate(c)};i.prototype={createAnimate:function(a){var b=c.newInstance(this.widget,a);return b.set("complete",{callback:function(){this.app.exec("widget",[this.module,this.widget])},context:this}),b},next:function(){this.effect.play()},restore:function(){this.effect.reset()}};var j=function(b,c,d,i){var j=$("#"+b),k=$("#"+c),l=$("#"+d),m=$("#"+i);if(!b||!c||1!=j.length||1!=k.length)throw new Error("APP is not valid, appId = "+b+", viewId = "+c);if(d&&1!=l.length)throw new Error("APP's `header` is not found("+d+")");if(i&&1!=m.length)throw new Error("APP's `footer` is not found("+i+")");1!=l.length&&(l=null),1!=m.length&&(m=null),this.root=$("html"),this.appId=b,this.viewId=c,this.headerId=d,this.footerId=i,this.app=j,this.view=k,this.header=l,this.footer=m,this.scroller=null,this.modules=null,this.innerboxes=null,this.widgets={},this.mode=TransitionEffect.ROTATE,this.scroll=e.VERTICAL,this.widgetMode=f.ONCE,this.adaptive=g.NONE,this.overflow=h.ADAPTIVE,this.design={width:640,height:960},this.viewport={width:"device-width",height:"device-height",user_scalable:"no"},this.currentIndex=0,this.lazyLoading=2,this.fps=0,this.locked=!1,this.sceneDeg=28,this.sceneDuration=.28,this.sceneTiming="ease",this.scenePerspective="300px",this.sceneTransition=null,this.listener=new a({oninit:null,onstart:null,onscrolling:null,onend:null,onexit:null,onwidget:null,onresize:null,onorientationchange:null,onenterframe:null}),this.parseDesignSize(),this.parseViewportInfo()};j.prototype={exec:function(a,b){return this.listener.exec(a,b)},set:function(a,b){this.listener.set(a,b)},remove:function(a){this.listener.remove(a)},get:function(a){return this.listener.get(a)},clear:function(){this.listener.clear()},setFPS:function(a){this.fps=a},setLocked:function(a){this.locked=a,this.sceneTransition&&this.sceneTransition.setLocked(this.locked)},layout:function(a,c,d,e){$.each(a,function(a,f){var g=$(f);g.css({width:((c.width||d.width)+"px").replace("%px","%"),height:((c.height||d.height)+"px").replace("%px","%")}),offset=g.offset(),g.attr("data-index",a).attr("data-x",offset.left).attr("data-y",offset.top).attr("data-width",offset.width).attr("data-height",offset.height),b.execAfterMergerHandler(e,[a,g]),g=null})},updateViewportMeta:function(a){var b=this,c=b.viewport,d=[],e=$('meta[name="viewport"]'),f=$.extend(!0,{},c,a||{}),g=null;for(var h in f)f.hasOwnProperty(h)&&(g=f[h],h=h.replace(/_/g,"-"),g?"REMOVE"!=g&&d.push(h+"="+g):d.push(h));e.attr("content",d.join(", "))},update:function(){var a=this,b=a.viewport,c=a.design,d=a.view.offset(),e=d.width,f=d.height,i=c.width,j=c.height,k=0,l=0;"device-width"==b.width||isNaN(Number(b.width))||(k=Number(b.width)),"device-height"==b.height||isNaN(Number(b.height))||(l=Number(b.height));var m=this.header?this.header.offset():{width:0,height:0},n=this.footer?this.footer.offset():{width:0,height:0};f=f-m.height-n.height;var o={width:a.adaptive==g.AUTO||a.adaptive==g.X?e:k||e,height:a.adaptive==g.AUTO||a.adaptive==g.Y?f:l||f},p={width:a.overflow==h.HIDDEN||a.overflow==h.HIDDEN_X?Math.max(e,i):e,height:a.overflow==h.HIDDEN||a.overflow==h.HIDDEN_Y?Math.max(f,j):f};a.layout(a.view,o,o,null),a.layout(a.modules,o,o,{callback:function(a,module){this.queryModuleWidget(a,module)},context:a}),a.layout(a.scroller,a.scroller.offset(),o,null),a.layout(a.innerboxes,p,p,null)},preventTouchMove:function(){$(document).on("touchmove",function(a){a.preventDefault()})},queryModuleWidget:function(a,module){var b=this,c=null,d=String(a);b.widgets[d]||(c=module.find("[data-widget]"),b.widgets[d]=[],$.each(c,function(a,c){var e=$(c),f=e.attr("data-widget");b.widgets[d].push(new i(b,module,e,f))}))},showModuleWidget:function(a){var b=this,c=b.widgets[String(a)]||[],module=$(b.modules[a]),d=module.attr("data-setted");if(f.EVERYTIME==b.widgetMode||"1"!=d){for(var e=0,g=c.length;g>e;e++)!function(a){a.next()}(c[e]);module.attr("data-setted","1")}},restoreModuleWidget:function(a){var b=this,c=b.widgets[String(a)]||[];if(f.EVERYTIME==b.widgetMode)for(var d=0,e=c.length;e>d;d++)c[d].restore()},restoreExceptModuleWidget:function(a){var b=this,c=String(a);if(f.EVERYTIME==b.widgetMode)for(var d in b.widgets)c!=d&&b.restoreModuleWidget(d)},configure:function(){var a=this,b=null;a.preventTouchMove(),b=a.sceneTransition=d.newInstance("section",a.mode,a.scroll),b.setDeg(a.sceneDeg),b.setDuration(a.sceneDuration),b.setTiming(a.sceneTiming),b.setPerspective(a.scenePerspective),b.set("start",{callback:function(a,b,c,d,e,f,g){this.currentIndex=g,this.exec("start",[a,b,c,d,e,f,g])},context:a}),b.set("move",{callback:function(a,b,c,d,e,f,g){this.currentIndex=g,this.exec("scrolling",[a,b,c,d,e,f,g])},context:a}),b.set("end",{callback:function(a,b,c,d,e,f,g){this.currentIndex=g,this.exec("exit",[a,b,c,d,e,f,g])},context:a}),b.set("complete",{callback:function(a,b){var c=this;c.currentIndex=b,c.showModuleWidget(b),c.restoreExceptModuleWidget(b),c.execLazyLoading(b),c.exec("end",[a,b])},context:a})},createViewport:function(){var a=this;a.update(),a.configure()},resize:function(){var a=this;a.view.css({width:"100%",height:"100%"}),a.update()},enterframe:function(){var a=this,b=0,c=0;requestAnimationFrame(function(){c=(new Date).getTime(),(a.fps<=0||c-b>1e3/a.fps)&&(b=c,a.exec("enterframe",[]),requestAnimationFrame(arguments.callee))})},parseDesignSize:function(){var a=this.app.attr("data-design")||"640/960",b=a.split("/"),c=Number(b[0]),d=Number(b[1]);this.design={width:c,height:d}},parseViewportInfo:function(){var a=$('meta[name="viewport"]'),b=a.attr("content"),c=null,d=null,e=null,f=null,g=null,h=0;b=b.replace(/,\s*/g,",").replace(/\s*=\s*/g,"="),c=b.split(",");for(var i=0,j=c.length;j>i;i++)d=c[i],h=d.indexOf("="),e=d.substring(0,h),g=d.substring(h+1),f=(e||g).replace(/\-/g,"_"),g=e?g:"",this.viewport[f]=g},setLazyLoading:function(a){this.lazyLoading=a||0},execLazyLoading:function(a){var b=this.modules||[],c=b.length,module=null;if(this.lazyLoading>0)for(var d=a;d<a+this.lazyLoading&&c>d;d++)module=$(b[d]),"1"!=module.attr("data-lazy")&&(this.lazy(module),module.attr("data-lazy","1"))},lazy:function(module){var a=module.find("[data-lazysrc]");$.each(a,function(a,b){var c=$(b),d=c.attr("data-lazysrc"),e=d.indexOf("!"),f=-1!=e?d.substring(0,e):"src",g=-1!=e?d.substring(e+1):d;"src"==f?c.attr("src",g):c.css("background-image","url("+g+")")})},init:function(a){var b=this;b.currentIndex=0,b.scroller=$(".webapp-modules"),b.modules=$(".webapp-modules>section"),b.innerboxes=$(".webapp-modules>section>.innerbox"),b.mode=b.app.attr("data-mode")||TransitionEffect.ROTATE,b.scroll=b.app.attr("data-scroll")||e.VERTICAL,b.widgetMode=b.app.attr("data-widget-mode")||f.ONCE,b.adaptive=b.app.attr("data-adaptive")||g.NONE,b.overflow=b.app.attr("data-overflow")||h.ADAPTIVE,b.createViewport(),!1!==a&&(b.showModuleWidget(0),b.restoreExceptModuleWidget(0)),b.execLazyLoading(0),b.exec("end",[null,0]),b.enterframe();var c=$(".webapp-loading");c.length>0&&c.addClass("hide"),$(window).on("resize","",b,function(a){var b=a.data;b.exec("resize",[])}).on("orientationchange","",b,function(a){var b=a.data;b.exec("orientationchange",[])})}};var k={newInstance:function(a,b,c,d){var i=new j(a,b,c,d);return{mode:TransitionEffect.ROTATE,scroll:e.VERTICAL,widgetMode:f.ONCE,adaptive:g.NONE,overflow:h.ADAPTIVE,design:i.design,app:i.app,view:i.view,header:i.header,footer:i.footer,scroller:null,modules:null,innerboxes:null,viewport:i.viewport,create:function(a){i.init(a),this.mode=i.mode,this.scroll=i.scroll,this.widgetMode=i.widgetMode,this.adaptive=i.adaptive,this.overflow=i.overflow,this.design=i.design,this.scroller=i.scroller,this.modules=i.modules,this.innerboxes=i.innerboxes,i.exec("init",[])},getCurrentIndex:function(){return i.currentIndex},set:function(a,b){return i.set(a,b),this},setFPS:function(a){return i.setFPS(a),this},setLocked:function(a){return i.setLocked(a),this},setLazyLoading:function(a){return i.setLazyLoading(a),this},execLazyLoading:function(a){return i.execLazyLoading(a),this},showModuleWidget:function(a){return i.showModuleWidget(a),this},restoreModuleWidget:function(a){return i.restoreModuleWidget(a),this},restoreExceptModuleWidget:function(a){return i.restoreExceptModuleWidget(a),this},setSceneDeg:function(a){return i.sceneDeg=a,this},setSceneDuration:function(a){return i.sceneDuration=a,this},setSceneTiming:function(a){return i.sceneTiming=a,this},setScenePerspective:function(a){return i.scenePerspective=a,this},updateViewportMeta:function(a){return i.updateViewportMeta(a),this},resize:function(){return i.resize(),this}}}};module.exports=k});
