/*! Copyright (c) SESHENGHUO.COM - Author: LIJUN - Email: zwlijun@gmail.com - Git: https://github.com/zwlijun/se.lib */
!function(a){a.fn.end=function(){return this.prevObject||a()},a.fn.andSelf=function(){return this.add(this.prevObject||a())},"filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=c.apply(this,arguments);return a.prevObject=this,a}})}(Zepto);