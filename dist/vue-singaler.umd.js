(function(n,u){typeof exports=="object"&&typeof module<"u"?u(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],u):(n=typeof globalThis<"u"?globalThis:n||self,u(n.EventBus={},n.Vue))})(this,function(n,u){"use strict";function o(){let e=new Map;return{all:e,on:function(t,i){let s=e.get(t);s?s.push(i):e.set(t,[i])},off:function(t){e.get(t)&&e.set(t,[])},emit:function(t,i){let s=e.get(t);s&&s.map(function(d){d(i)})}}}const l={install(e){e.provide("eventBus",o())}};function r(){return{eventBus:u.inject("eventBus")}}n.eventBus=l,n.useEventBus=r,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
