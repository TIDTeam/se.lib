/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * Polyfill
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.lib
 * @date 2014.9
 */
;define(function (require, exports, module){
    var vendors = ["webkit", "Moz", "ms", "O", ""];
    var vendorLength = vendors.length;
    var nodeStyle = document.createElement("div").style;
    var funcs = /^((translate|rotate|scale)(X|Y|Z|3d)?|skew(X|Y)|matrix(3d)?|perspective)$/;

    var vendor = (function(){
        var key = "";
        var prefix = "";

        for(var i = 0; i < vendorLength; i++){
            prefix = vendors[i];
            key = (prefix ? prefix + "T" : "t") + "ransform";

            if(key in nodeStyle){
                return prefix;
            }
        }

        return undefined;
    })();

    var hasProperty = function(property){
        var rt = getRealStyle(property);

        return ((property in nodeStyle) || (rt in nodeStyle));
    };

    var getRealStyle = function(style){
        if(undefined === vendor) return undefined;
        if("" === vendor || (style in nodeStyle)) return style;
        return vendor + style.charAt(0).toUpperCase() + style.substr(1);
    };

    var getPrefixStyle = function(style){
        if(undefined === vendor) return undefined;
        if("" === vendor || (style in nodeStyle)) return style;
        return "-" + vendor.toLowerCase() + "-" + cssname(style);
    };

    var getVendorHackKey = function(){
        var key = (vendor || "").toLowerCase();

        return key ? "-" + key + "-" : "";
    };

    var getRealPropertyName = function(name){
        var prefix = getPrefixStyle(name);

        if((undefined === prefix || prefix == name)){
            return name;
        }else{
            return prefix;
        }
    };

    var cssname = function(property){
        var tmp = property.replace(/([A-Z])/g, "-$1").toLowerCase();

        return tmp;
    };

    var css = function(el, name, value){
        el.css(getRealPropertyName(name), value);
    };

    var isTransformMethod = function(name){
        return funcs.test(name);
    };

    module.exports = {
        "hasProperty" : hasProperty,
        "getRealStyle": getRealStyle,
        "getPrefixStyle": getPrefixStyle,
        "getRealPropertyName": getRealPropertyName,
        "getVendorHackKey": getVendorHackKey,
        "cssname": cssname,
        "css": css,
        "isTransformMethod": isTransformMethod
    };
});