/*! Copyright (c) SESHENGHUO.COM - Author: LIJUN - Email: zwlijun@gmail.com - Git: https://github.com/zwlijun/se.lib */
define(function(require,exports,module){$.Action={};var a=function(a){var b=$(a.currentTarget),c=b.attr("data-action")||"",d=/^([a-zA-Z0-9_]+):\/\/([a-zA-Z0-9_\/]+)(#([^#]+))?$/,e=d.exec(c),f=null,g=null,h=null,i=null,j=null;if(e&&(g=e[1],h=e[2],j=e[4]||null,f=$[g]||null)){if(-1==h.indexOf("/"))i=h;else{var k=h.split("/"),l=k.length;f=function(a,b,c){for(var d=null,e=0;c-1>e;e++){if(d=b[e],!(null!=a&&d in a))return null;a=a[d]||null}return a}(f,k,l),i=k[l-1]}null!=f&&i in f&&f[i].apply(null,[j,b,a])}return!1},b={CLICK_EVENT:"ontouchstart"in window?"tap":"click",RequestStatus:{timeout:{status:65025,text:"亲，网络不给力啊~~"},error:{status:65026,text:"亲，系统出了点小问题，请稍候片刻再试"},abort:{status:65027,text:"抱歉，您的请求被中断，请重新发起"},parsererror:{status:65028,text:"数据处理异常"},success:{status:0,text:"OK"}},checkBitFlag:function(a,b){return!!(a&b)&&b>0},formatData:function(a,b,c){var d="",e=null;c=void 0===c?"\\$":c?"\\"+c:"",a=a||"",b=b||{};for(var f in b)b.hasOwnProperty(f)&&(e=new RegExp(c+"\\!?\\{"+f+"\\}","gm"),d=a=a.replace(e,b[f]),e=null);return d=d||a,e=new RegExp(c+"\\!\\{[^\\{\\}]+\\}","gm"),d=d.replace(e,""),e=null,d},hideAddressBar:function(){setTimeout(function(){window.scrollTo(0,1)},0)},getOrientation:function(){var a=window.orientation;return 0===a||180==a?0:90==a||-90==a?1:0},execHandler:function(a){if(a&&a instanceof Object){var b=a.callback||null,c=a.args||[],d=a.context||null,e=a.delay||-1;b&&b instanceof Function&&("number"==typeof e&&e>=0?setTimeout(function(){b.apply(d,c)},e):b.apply(d,c))}},execAfterMergerHandler:function(a,b){var c=$.extend(!0,{},a);if(a&&a instanceof Object){{var d=(a.callback||null,a.args||[]);a.context||null}c.args=b.concat(d)}this.execHandler(c)},decodeHTML:function(a){var b=a.replace(/&#60;/g,"<");return b=b.replace(/&#62;/g,">"),b=b.replace(/&#34;/g,'"'),b=b.replace(/&#39;/g,"'"),b=b.replace(/&#38;/g,"&")},encodeHTML:function(a){var b=a.replace(/&/g,"&#38;");return b=b.replace(/>/g,"&#62;"),b=b.replace(/"/g,"&#34;"),b=b.replace(/'/g,"&#39;"),b=b.replace(/</g,"&#60;")},getCursorPosition:function(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else"number"==typeof a.selectionStart&&(b=a.selectionStart);return b},setCursorPosition:function(a,b){setTimeout(function(){if("number"==typeof a.selectionStart)a.selectionStart=a.selectionEnd=b;else if(a.setSelectionRange)a.focus(),a.setSelectionRange(b,b);else if(a.createTextRange){var c=a.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",b),c.select()}},15)},setActionHook:function(c,d){var e=$(c||"body"),f=e.attr("data-actionhook"),g=d?d:b.CLICK_EVENT;"1"!=f&&(e.on(g,"[data-action]",a),e.attr("data-actionhook","1"),"click"!=g&&e.on("click","[data-action]",!1)),e=null},injectAction:function(a){$.extend(!0,$.Action,a)},getDevicePixelRatio:function(){return window.devicePixelRatio||1}};module.exports=b});