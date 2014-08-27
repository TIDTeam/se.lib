/*! Copyright (c) SESHENGHUO.COM - Author: LIJUN - Email: zwlijun@gmail.com */
define(function(require,exports,module){require("lib/extra/iscroll5/iscroll"),require("mod/zepto/fx"),require("mod/se/raf");var a=require("mod/se/listener"),b=window.IScroll,c={DRAWCARD:"drawcard",WATERFALL:"waterfall"},d={VERTICAL:"vertical",HORIZONTAL:"horizontal"},e={ONCE:"once",EVERYTIME:"everytime"},f=function(a,module,b,c){this.app=a,this.module=module,this.widget=b,this.source=c,this.times=1,this.current=0,this.animation=null,this.easing="ease",this.tid=null,this.queue=this.parse()};f.prototype={parse:function(){for(var a=this.source,b=a.split("::"),c=b[0],d=b[1],e=d.indexOf("#"),f=e>-1?d.substring(0,e):d,g=e>-1?d.substring(e+1):1,h=g.split(","),i=h[0],j=h[1]||"ease",k=[],l=f.split(">"),m=l.length,n=0;m>n;n++)k.push(this.parseProperties(l[n]));return this.times=i,this.animation=c,this.easing=j,k},parseProperties:function(a){for(var b=a.split("@"),c=b[0],d=b[1],e=d.split(","),f=c.split(";"),g=f.length,h=/^([a-zA-Z]+):([a-zA-Z0-9%\(\)\.\-_]+),([a-zA-Z0-9%\(\)\.\-_]+)(,([a-zA-Z0-9%\(\)\.\-_]+))?(,([a-zA-Z0-9%\(\)\.\-_]+))?$/g,i=null,j=null,k=null,l=null,m=null,n="50%",o="50%",p={widget:this.widget,runtime:{duration:Number(e[0]),delay:Math.max(Number(e[1]),0)},normal:{},restore:{}},q=0;g>q;q++)for(j=f[q];null!=(i=h.exec(j));)k=i[1],l=i[2],m=i[3],void 0!==i[5]&&void 0!==i[7]&&(n=i[5],o=i[7],p.normal.transformOrigin=p.restore.transformOrigin=n+" "+o),"rotate"==k?(p.normal.transform="rotate("+m+"deg)",p.restore.transform="rotate("+l+"deg)"):(p.normal[k]=m,p.restore[k]=l);return p},animate:function(a,b,c,d,e){var f=c[b],g="normal"==a?b+1:b-1,h=!!c[g],i=f.widget,j=f.runtime,k=f[a],l=this,m=function(){d.exec("widget",[l.module,i,a,h]),h?l.animate(a,g,c,d,e):!0===e&&("cycle"==l.times||Number(l.times)>1&&l.current<=Number(l.times))&&(l.current++,"normal"==a?l.animate("restore",c.length-1,c,d,e):l.animate("normal",0,c,d,e))},n=function(){return j.duration<=0?(i.css(k),void m()):void i.animate(k,j.duration,l.easing,function(){m()})};j.delay>0?l.tid=setTimeout(n,j.delay):n()},next:function(){var a=this;a.current=0,a.animate("normal",0,a.queue,a.app,!0)},restore:function(){var a=this;a.tid&&(clearTimeout(a.tid),a.tid=null),a.current=0,a.animate("restore",a.queue.length-1,a.queue,a.app,!1)}};var g=function(b,f,g,h){var i=$("#"+b),j=$("#"+f),k=$("#"+g),l=$("#"+h);if(!b||!f||1!=i.length||1!=j.length)throw new Error("APP is not valid, appId = "+b+", viewId = "+f);if(g&&1!=k.length)throw new Error("APP's `header` is not found("+g+")");if(h&&1!=l.length)throw new Error("APP's `footer` is not found("+h+")");1!=k.length&&(k=null),1!=l.length&&(l=null),this.appId=b,this.viewId=f,this.headerId=g,this.footerId=h,this.app=i,this.view=j,this.header=k,this.footer=l,this.modules=null,this.moduleSize=0,this.widgets={},this.viewport=null,this.mode=c.WATERFALL,this.scroll=d.VERTICAL,this.widgetMode=e.ONCE,this.fps=0,this.moduleSnap=[],this.snapRangeOffset=20,this.listener=new a({oninit:null,onbefore:null,onbegin:null,onend:null,onwidget:null,onenterframe:null})};g.prototype={exec:function(a,b){return this.listener.exec(a,b)},set:function(a,b){this.listener.set(a,b)},remove:function(a){this.listener.remove(a)},get:function(a){return this.listener.get(a)},clear:function(){this.listener.clear()},setFPS:function(a){this.fps=a},calcModulePanelOffset:function(){var a=$(".webapp-modules"),b=a.offset();a.css({width:b.width+"px",height:b.height+"px"}),a.attr("data-x",b.left).attr("data-y",b.top).attr("data-width",b.width).attr("data-height",b.height)},calcModuleOffset:function(){var a=this,b=this.header?this.header.offset():{width:0,height:0};$.each(this.modules,function(c,module){var d=$(module),e=d.offset();d.attr("data-index",c).attr("data-x",e.left).attr("data-y",e.top).attr("data-width",e.width).attr("data-height",e.height),a.moduleSnap.push({index:c,x:e.left,y:e.top-b.height,width:e.width,height:e.height}),a.queryModuleWidget(c,d)})},calcViewportOffset:function(){var a=window.innerWidth,b=window.innerHeight,c=this.header?this.header.offset():{width:0,height:0},d=this.footer?this.footer.offset():{width:0,height:0};b=b-c.height-d.height,this.view.css({width:a+"px",height:b+"px"})},adjusted:function(){var a=window.innerWidth,b=window.innerHeight,c=this.header?this.header.offset():{width:0,height:0},d=this.footer?this.footer.offset():{width:0,height:0};b=b-c.height-d.height,this.modules.css({width:a+"px",height:b+"px"}),this.calcModuleOffset(),this.calcModulePanelOffset()},preventTouchMove:function(){$(document).on("touchmove",function(a){a.preventDefault()})},getCurrentModuleIndex:function(){var a=this,b=a.viewport.currentPage,c=0;return b&&(c=a.scroll==d.VERTICAL?b.pageY:b.pageX),c},getModuleSnapRange:function(){for(var a=this,b=a.viewport,c=Math.abs(b.x),e=Math.abs(b.y),f=[],g=a.moduleSnap,h=g.length,i=null,j=a.view.offset(),k=c+j.width,l=e+j.height,m=a.snapRangeOffset,n=0;h>n;n++)i=g[n],a.scroll==d.VERTICAL?i.y+m>=e&&i.y+m<=l&&f.push(i):i.x+m>=c&&i.x+m<=k&&f.push(i);return f},queryModuleWidget:function(a,module){var b=this,c=null,d=String(a);b.widgets[d]||(c=module.children("[data-widget]"),b.widgets[d]=[],$.each(c,function(a,c){var e=$(c),g=e.attr("data-widget");b.widgets[d].push(new f(b,module,e,g))}))},showModuleWidget:function(a){var b=this,c=b.widgets[String(a)]||[],module=$(b.modules[a]),d=module.attr("data-setted");if(e.EVERYTIME==b.widgetMode||"1"!=d){for(var f=0,g=c.length;g>f;f++)!function(a){a.next()}(c[f]);module.attr("data-setted","1")}},restoreModuleWidget:function(a){var b=this,c=b.widgets[String(a)]||[];if(e.EVERYTIME==b.widgetMode)for(var d=0,f=c.length;f>d;d++)c[d].restore()},displayViewportWidget:function(){for(var a=this.getModuleSnapRange(),b=a.length,c=0;b>c;c++)this.showModuleWidget(a[c].index)},initViewport:function(a){var c=this,e={mouseWheel:!0,scrollbars:!1,scrollX:d.HORIZONTAL==c.scroll,scrollY:d.VERTICAL==c.scroll};c.viewport=new b(this.view[0],$.extend(e,a)),c.viewport.refresh()},createWaterfallViewport:function(){var a=this;a.calcModuleOffset(),a.calcModulePanelOffset(),a.initViewport({}),a.viewport.on("beforeScrollStart",function(){a.exec("before",[a.viewport])}),a.viewport.on("scrollStart",function(){a.exec("start",[a.viewport])}),a.viewport.on("scrollEnd",function(){a.displayViewportWidget(),a.exec("end",[a.viewport])})},createDrawCardViewport:function(){var a=this;a.adjusted(),a.initViewport({momentum:!1,snap:"section",snapSpeed:400,mouseWheel:!1}),a.viewport.on("beforeScrollStart",function(){a.exec("before",[a.viewport])}),a.viewport.on("scrollStart",function(){a.restoreModuleWidget(a.getCurrentModuleIndex()),a.exec("start",[a.viewport])}),a.viewport.on("scroll",function(){a.exec("scroll",[a.viewport])}),a.viewport.on("scrollEnd",function(){a.showModuleWidget(a.getCurrentModuleIndex()),a.exec("end",[a.viewport])})},createViewport:function(){var a=this;switch(a.calcViewportOffset(),a.mode){case c.WATERFALL:a.createWaterfallViewport();break;case c.DRAWCARD:a.createDrawCardViewport();break;default:throw new Error("Unkonwn View Mode("+a.mode+")")}},enterframe:function(){var a=this,b=0,c=0;requestAnimationFrame(function(){c=(new Date).getTime(),(a.fps<=0||c-b>1e3/a.fps)&&(b=c,a.exec("enterframe",[]),requestAnimationFrame(arguments.callee))})},init:function(){var a=this;a.modules=$(".webapp-modules section"),a.moduleSize=a.modules.length,a.mode=a.app.attr("data-mode")||c.WATERFALL,a.scroll=a.app.attr("data-scroll")||d.VERTICAL,a.widgetMode=e.ONCE,a.createViewport(),a.enterframe()}};var h={newInstance:function(a,b,f,h){var i=new g(a,b,f,h);return{viewport:null,mode:c.DRAWCARD,scroll:d.VERTICAL,widgetMode:e.ONCE,create:function(){i.init(),this.viewport=i.viewport,this.mode=i.mode,this.scroll=i.scroll,this.widgetMode=i.widgetMode,i.exec("init",[])},set:function(a,b){return i.set(a,b),this},setFPS:function(a){return i.setFPS(a),this},setSnapRangeOffset:function(a){return i.snapRangeOffset=a,this},getCurrentModuleIndex:function(){return i.getCurrentModuleIndex()},getModuleSnapRange:function(){return i.getModuleSnapRange()},displayViewportWidget:function(){i.displayViewportWidget()},showModuleWidget:function(a){i.showModuleWidget(a)},restoreModuleWidget:function(a){i.restoreModuleWidget(a)},refresh:function(){this.viewport.refresh()},scrollTo:function(a,b,c,d){this.viewport.scrollTo(a,b,c,IScroll.utils.ease[d])},scrollBy:function(a,b,c,d){this.viewport.scrollBy(a,b,c,IScroll.utils.ease[d])},scrollToElement:function(a,b,c,d,e){this.viewport.scrollToElement(a,b,c,d,IScroll.utils.ease[e])},goToPage:function(a,b,c,d){this.viewport.goToPage(a,b,c,IScroll.utils.ease[d])},next:function(){this.viewport.next()},prev:function(){this.viewport.prev()}}}};module.exports=h});