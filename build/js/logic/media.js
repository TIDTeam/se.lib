/*! Copyright (c) SESHENGHUO.COM - Author: LIJUN - Email: zwlijun@gmail.com - Git: https://github.com/zwlijun/se.lib */
define(function(require){var a=require("mod/se/media"),b=a.newInstance(MediaType.AUDIO,"audio","/example/audio/baby.mp3");b.insert("#a1",{controls:"controls",preload:"auto"}),b.setProperty("volume",.65);var c=a.newInstance(MediaType.VIDEO,"video","/example/video/movie.mp4");c.insert("#a2",{controls:"controls",preload:"auto"}),c.setProperty("volume",.65)});