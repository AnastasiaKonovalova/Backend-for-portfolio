!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=17)}([function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(e){var t=document.querySelector("#navButton"),n=document.querySelector("#closeNavButton"),r=document.querySelector("#scrollDownButton"),o=document.querySelector("#columnLeft"),i=document.querySelector("#columnRight"),c=document.querySelector("#menuNav");t.addEventListener("click",function(){o.classList.add("menu__column--left--visible"),i.classList.add("menu__column--right--visible"),n.classList.add("menu__button--visible"),c.classList.add("menu__nav--visible"),t.classList.add("header__hamburger--hidden"),document.body.style.overflow="hidden"}),n.addEventListener("click",function(){o.classList.remove("menu__column--left--visible"),i.classList.remove("menu__column--right--visible"),n.classList.remove("menu__button--visible"),c.classList.remove("menu__nav--visible"),t.classList.remove("header__hamburger--hidden"),document.body.style.overflow="auto"}),r.addEventListener("click",function(t){e.scrollIntoView()})}},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n(4);function r(e){return function(e){if(Array.isArray(e))return e}(e)||i(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.allImages=[].concat(o(t),o(n),o(this._createMockImagesFromBg(r))),this.textContainer=i}var t,n,i;return t=e,(n=[{key:"init",value:function(){var e=this;this.allImages.forEach(function(t){t.addEventListener("load",e._changeProgress(e.allImages))})}},{key:"_changeProgress",value:function(e){var t=this;return function(n){var r=+t.textContainer.textContent;t.textContainer.textContent=r>=98?"100":"".concat(Math.round(r+100/e.length))}}},{key:"_createMockImagesFromBg",value:function(e){return r(e).slice(0).reduce(function(e,t){var n=window.getComputedStyle(t).backgroundImage;if(!n)return e;if("none"!==n){var r=new Image;return r.src=n.slice(5,-2),[].concat(o(e),[r])}return e},[])}}])&&c(t.prototype,n),i&&c(t,i),e}(),u=document.querySelector("#wrapper"),s=document.querySelector(".enter"),l=document.querySelector("#preloader");window.addEventListener("load",function(e){l.parentElement===u?u.removeChild(l):s.removeChild(l)}),document.addEventListener("DOMContentLoaded",function(e){var t=document.getElementsByTagName("img"),n=document.getElementsByTagName("svg"),r=document.querySelectorAll(".has_bg_image"),o=document.querySelector(".preloader__text");new a(t,n,r,o).init()})},function(e,t,n){},function(e,t,n){"use strict";n(3);var r=document.querySelector(".author"),o=document.querySelector(".background__text"),i=document.querySelector(".enter__arrow");window.addEventListener("scroll",function(e){var t=window.pageYOffset;i.style.transform="translate(-50%, -".concat(t/8,"px)"),r.style.transform="translateY(-".concat(t/3,"px)"),o.style.transform="translate(-50%, -".concat(t/10,"px)")})},,,,,,,,,,,,function(e,t,n){"use strict";n.r(t);n(2),n(1),n(18);var r=n(0);n(5);function o(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}console.log("blog.js");var i,c,a,u=document.querySelector(".blog"),s=document.querySelector(".sidebar"),l=document.querySelector("#showSidebar"),d=o(document.querySelectorAll(".headers__item")).slice(0),f=o(document.querySelectorAll(".posts__item")).slice(0),m=new WeakMap(f.map(function(e,t){return[e,d[t]]}));window.addEventListener("touchstart",function(e){i=e.touches[0].clientX}),window.addEventListener("touchmove",function(e){e.preventDefault()}),window.addEventListener("touchend",function(e){if(c=e.changedTouches[0].clientX,a=i-c,Math.abs(a)>100)if(a>0)s.classList.remove("blog__sidebar--visible");else{if(!s.classList.contains("blog__sidebar--fixed"))return;s.classList.add("blog__sidebar--visible")}}),Object(r.a)(u),window.addEventListener("scroll",function(e){var t,n,r;!function(){var e;if((e=window.innerWidth<=768?document.elementFromPoint(window.innerWidth-35,window.innerHeight/3):document.elementFromPoint(window.innerWidth-120,window.innerHeight/3)).classList.contains("posts__item")){var t=m.get(e);d.forEach(function(e){return e.classList.remove("headers__item--active")}),t.classList.add("headers__item--active")}}(),t=u.getBoundingClientRect(),n=window.innerHeight,r=t.bottom-n,t.top<=0?s.classList.add("blog__sidebar--fixed"):t.top>0&&s.classList.remove("blog__sidebar--fixed","blog__sidebar--visible"),s.style.bottom=r<=0?"".concat(Math.abs(r)+1,"px"):"0px"}),l.addEventListener("click",function(e){s.classList.toggle("blog__sidebar--visible")})},function(e,t,n){}]);