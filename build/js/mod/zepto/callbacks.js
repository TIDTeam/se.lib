/*! Copyright (c) SESHENGHUO.COM - Author: LIJUN - Email: zwlijun@gmail.com */
!function(a){a.Callbacks=function(b){b=a.extend({},b);var c,d,e,f,g,h,i=[],j=!b.once&&[],k=function(a){for(c=b.memory&&a,d=!0,h=f||0,f=0,g=i.length,e=!0;i&&g>h;++h)if(i[h].apply(a[0],a[1])===!1&&b.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i.length=0:l.disable())},l={add:function(){if(i){var d=i.length,h=function(c){a.each(c,function(a,c){"function"==typeof c?b.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!=typeof c&&h(c)})};h(arguments),e?g=i.length:c&&(f=d,k(c))}return this},remove:function(){return i&&a.each(arguments,function(b,c){for(var d;(d=a.inArray(c,i,d))>-1;)i.splice(d,1),e&&(g>=d&&--g,h>=d&&--h)}),this},has:function(b){return!(!i||!(b?a.inArray(b,i)>-1:i.length))},empty:function(){return g=i.length=0,this},disable:function(){return i=j=c=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||d&&!j||(b=b||[],b=[a,b.slice?b.slice():b],e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!d}};return l}}(Zepto);