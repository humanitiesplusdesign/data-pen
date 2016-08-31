/*
 AngularJS v1.5.7
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(E){'use strict';function O(a){return function(){var b=arguments[0],d;d="["+(a?a+":":"")+b+"] http://errors.angularjs.org/1.5.7/"+(a?a+"/":"")+b;for(b=1;b<arguments.length;b++){d=d+(1==b?"?":"&")+"p"+(b-1)+"=";var c=encodeURIComponent,e;e=arguments[b];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;d+=c(e)}return Error(d)}}function oa(a){if(null==a||Wa(a))return!1;if(J(a)||F(a)||B&&a instanceof B)return!0;
var b="length"in Object(a)&&a.length;return S(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"==typeof a.item)}function r(a,b,d){var c,e;if(a)if(z(a))for(c in a)"prototype"==c||"length"==c||"name"==c||a.hasOwnProperty&&!a.hasOwnProperty(c)||b.call(d,a[c],c,a);else if(J(a)||oa(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==r)a.forEach(b,d,a);else if(sc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&
b.call(d,a[c],c,a);else for(c in a)sa.call(a,c)&&b.call(d,a[c],c,a);return a}function tc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function uc(a){return function(b,d){a(d,b)}}function Zd(){return++pb}function Pb(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(H(g)||z(g))for(var h=Object.keys(g),k=0,l=h.length;k<l;k++){var m=h[k],n=g[m];d&&H(n)?ia(n)?a[m]=new Date(n.valueOf()):Xa(n)?a[m]=new RegExp(n):n.nodeName?a[m]=n.cloneNode(!0):
Qb(n)?a[m]=n.clone():(H(a[m])||(a[m]=J(n)?[]:{}),Pb(a[m],[n],!0)):a[m]=n}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function R(a){return Pb(a,ta.call(arguments,1),!1)}function $d(a){return Pb(a,ta.call(arguments,1),!0)}function aa(a){return parseInt(a,10)}function Rb(a,b){return R(Object.create(a),b)}function A(){}function Ya(a){return a}function da(a){return function(){return a}}function vc(a){return z(a.toString)&&a.toString!==ka}function w(a){return"undefined"===typeof a}function x(a){return"undefined"!==
typeof a}function H(a){return null!==a&&"object"===typeof a}function sc(a){return null!==a&&"object"===typeof a&&!wc(a)}function F(a){return"string"===typeof a}function S(a){return"number"===typeof a}function ia(a){return"[object Date]"===ka.call(a)}function z(a){return"function"===typeof a}function Xa(a){return"[object RegExp]"===ka.call(a)}function Wa(a){return a&&a.window===a}function Za(a){return a&&a.$evalAsync&&a.$watch}function Ea(a){return"boolean"===typeof a}function ae(a){return a&&S(a.length)&&
be.test(ka.call(a))}function Qb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function ce(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function ua(a){return M(a.nodeName||a[0]&&a[0].nodeName)}function $a(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function Z(a,b){function d(a,b){var d=b.$$hashKey,e;if(J(a)){e=0;for(var f=a.length;e<f;e++)b.push(c(a[e]))}else if(sc(a))for(e in a)b[e]=c(a[e]);else if(a&&"function"===typeof a.hasOwnProperty)for(e in a)a.hasOwnProperty(e)&&
(b[e]=c(a[e]));else for(e in a)sa.call(a,e)&&(b[e]=c(a[e]));d?b.$$hashKey=d:delete b.$$hashKey;return b}function c(a){if(!H(a))return a;var b=f.indexOf(a);if(-1!==b)return g[b];if(Wa(a)||Za(a))throw za("cpws");var b=!1,c=e(a);void 0===c&&(c=J(a)?[]:Object.create(wc(a)),b=!0);f.push(a);g.push(c);return b?d(a,c):c}function e(a){switch(ka.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(c(a.buffer));
case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(z(a.cloneNode))return a.cloneNode(!0)}var f=[],
g=[];if(b){if(ae(b)||"[object ArrayBuffer]"===ka.call(b))throw za("cpta");if(a===b)throw za("cpi");J(b)?b.length=0:r(b,function(a,d){"$$hashKey"!==d&&delete b[d]});f.push(a);g.push(b);return d(a,b)}return c(a)}function na(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d==typeof b&&"object"==d)if(J(a)){if(!J(b))return!1;if((d=a.length)==b.length){for(c=0;c<d;c++)if(!na(a[c],b[c]))return!1;return!0}}else{if(ia(a))return ia(b)?na(a.getTime(),b.getTime()):
!1;if(Xa(a))return Xa(b)?a.toString()==b.toString():!1;if(Za(a)||Za(b)||Wa(a)||Wa(b)||J(b)||ia(b)||Xa(b))return!1;d=T();for(c in a)if("$"!==c.charAt(0)&&!z(a[c])){if(!na(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&x(b[c])&&!z(b[c]))return!1;return!0}return!1}function ab(a,b,d){return a.concat(ta.call(b,d))}function bb(a,b){var d=2<arguments.length?ta.call(arguments,2):[];return!z(b)||b instanceof RegExp?b:d.length?function(){return arguments.length?b.apply(a,ab(d,arguments,
0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function de(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=void 0:Wa(b)?d="$WINDOW":b&&E.document===b?d="$DOCUMENT":Za(b)&&(d="$SCOPE");return d}function cb(a,b){if(!w(a))return S(b)||(b=b?2:null),JSON.stringify(a,de,b)}function xc(a){return F(a)?JSON.parse(a):a}function yc(a,b){a=a.replace(ee,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+a)/6E4;return isNaN(d)?b:d}function Sb(a,b,d){d=d?
-1:1;var c=a.getTimezoneOffset();b=yc(b,c);d*=b-c;a=new Date(a.getTime());a.setMinutes(a.getMinutes()+d);return a}function va(a){a=B(a).clone();try{a.empty()}catch(b){}var d=B("<div>").append(a).html();try{return a[0].nodeType===Na?M(d):d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+M(b)})}catch(c){return M(d)}}function zc(a){try{return decodeURIComponent(a)}catch(b){}}function Ac(a){var b={};r((a||"").split("&"),function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),
-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=zc(e),x(e)&&(f=x(f)?zc(f):!0,sa.call(b,e)?J(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function Tb(a){var b=[];r(a,function(a,c){J(a)?r(a,function(a){b.push(ja(c,!0)+(!0===a?"":"="+ja(a,!0)))}):b.push(ja(c,!0)+(!0===a?"":"="+ja(a,!0)))});return b.length?b.join("&"):""}function qb(a){return ja(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ja(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,
":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function fe(a,b){var d,c,e=Oa.length;for(c=0;c<e;++c)if(d=Oa[c]+b,F(d=a.getAttribute(d)))return d;return null}function ge(a,b){var d,c,e={};r(Oa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});r(Oa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":","\\:")+"]"))&&(d=e,c=e.getAttribute(b))});d&&(e.strictDi=null!==fe(d,"strict-di"),b(d,c?[c]:[],e))}function Bc(a,
b,d){H(d)||(d={});d=R({strictDi:!1},d);var c=function(){a=B(a);if(a.injector()){var c=a[0]===E.document?"document":va(a);throw za("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=db(b,d.strictDi);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,d,c){a.$apply(function(){b.data("$injector",c);d(b)(a)})}]);
return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;E&&e.test(E.name)&&(d.debugInfoEnabled=!0,E.name=E.name.replace(e,""));if(E&&!f.test(E.name))return c();E.name=E.name.replace(f,"");ea.resumeBootstrap=function(a){r(a,function(a){b.push(a)});return c()};z(ea.resumeDeferredBootstrap)&&ea.resumeDeferredBootstrap()}function he(){E.name="NG_ENABLE_DEBUG_INFO!"+E.name;E.location.reload()}function ie(a){a=ea.element(a).injector();if(!a)throw za("test");return a.get("$$testability")}function Cc(a,
b){b=b||"_";return a.replace(je,function(a,c){return(c?b:"")+a.toLowerCase()})}function ke(){var a;if(!Dc){var b=rb();(pa=w(b)?E.jQuery:b?E[b]:void 0)&&pa.fn.on?(B=pa,R(pa.fn,{scope:Pa.scope,isolateScope:Pa.isolateScope,controller:Pa.controller,injector:Pa.injector,inheritedData:Pa.inheritedData}),a=pa.cleanData,pa.cleanData=function(b){for(var c,e=0,f;null!=(f=b[e]);e++)(c=pa._data(f,"events"))&&c.$destroy&&pa(f).triggerHandler("$destroy");a(b)}):B=U;ea.element=B;Dc=!0}}function sb(a,b,d){if(!a)throw za("areq",
b||"?",d||"required");return a}function Qa(a,b,d){d&&J(a)&&(a=a[a.length-1]);sb(z(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ra(a,b){if("hasOwnProperty"===a)throw za("badname",b);}function Ec(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&z(a)?bb(e,a):a}function tb(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=B(ta.call(a,0,e))),
c.push(b);return c||a}function T(){return Object.create(null)}function le(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=O("$injector"),c=O("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||O;return b(a,"module",function(){var a={};return function(f,g,h){if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,d,e,f){f||(f=c);return function(){f[e||"push"]([b,d,arguments]);return V}}function b(a,d){return function(b,e){e&&
z(e)&&(e.$$moduleName=f);c.push([a,d,arguments]);return V}}if(!g)throw d("nomod",f);var c=[],e=[],p=[],s=a("$injector","invoke","push",e),V={_invokeQueue:c,_configBlocks:e,_runBlocks:p,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider",
"register"),directive:b("$compileProvider","directive"),component:b("$compileProvider","component"),config:s,run:function(a){p.push(a);return this}};h&&s(h);return V})}})}function ga(a,b){if(J(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(H(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function me(a){R(a,{bootstrap:Bc,copy:Z,extend:R,merge:$d,equals:na,element:B,forEach:r,injector:db,noop:A,bind:bb,toJson:cb,fromJson:xc,identity:Ya,isUndefined:w,
isDefined:x,isString:F,isFunction:z,isObject:H,isNumber:S,isElement:Qb,isArray:J,version:ne,isDate:ia,lowercase:M,uppercase:ub,callbacks:{counter:0},getTestability:ie,$$minErr:O,$$csp:Fa,reloadWithDebugInfo:he});Ub=le(E);Ub("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:oe});a.provider("$compile",Fc).directive({a:pe,input:Gc,textarea:Gc,form:qe,script:re,select:se,style:te,option:ue,ngBind:ve,ngBindHtml:we,ngBindTemplate:xe,ngClass:ye,ngClassEven:ze,ngClassOdd:Ae,ngCloak:Be,ngController:Ce,
ngForm:De,ngHide:Ee,ngIf:Fe,ngInclude:Ge,ngInit:He,ngNonBindable:Ie,ngPluralize:Je,ngRepeat:Ke,ngShow:Le,ngStyle:Me,ngSwitch:Ne,ngSwitchWhen:Oe,ngSwitchDefault:Pe,ngOptions:Qe,ngTransclude:Re,ngModel:Se,ngList:Te,ngChange:Ue,pattern:Hc,ngPattern:Hc,required:Ic,ngRequired:Ic,minlength:Jc,ngMinlength:Jc,maxlength:Kc,ngMaxlength:Kc,ngValue:Ve,ngModelOptions:We}).directive({ngInclude:Xe}).directive(vb).directive(Lc);a.provider({$anchorScroll:Ye,$animate:Ze,$animateCss:$e,$$animateJs:af,$$animateQueue:bf,
$$AnimateRunner:cf,$$animateAsyncRun:df,$browser:ef,$cacheFactory:ff,$controller:gf,$document:hf,$exceptionHandler:jf,$filter:Mc,$$forceReflow:kf,$interpolate:lf,$interval:mf,$http:nf,$httpParamSerializer:of,$httpParamSerializerJQLike:pf,$httpBackend:qf,$xhrFactory:rf,$location:sf,$log:tf,$parse:uf,$rootScope:vf,$q:wf,$$q:xf,$sce:yf,$sceDelegate:zf,$sniffer:Af,$templateCache:Bf,$templateRequest:Cf,$$testability:Df,$timeout:Ef,$window:Ff,$$rAF:Gf,$$jqLite:Hf,$$HashMap:If,$$cookieReader:Jf})}])}function eb(a){return a.replace(Kf,
function(a,d,c,e){return e?c.toUpperCase():c}).replace(Lf,"Moz$1")}function Nc(a){a=a.nodeType;return 1===a||!a||9===a}function Oc(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(Vb.test(a)){d=d||e.appendChild(b.createElement("div"));c=(Mf.exec(a)||["",""])[1].toLowerCase();c=ha[c]||ha._default;d.innerHTML=c[1]+a.replace(Nf,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=ab(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});
return e}function Pc(a,b){var d=a.parentNode;d&&d.replaceChild(b,a);b.appendChild(a)}function U(a){if(a instanceof U)return a;var b;F(a)&&(a=W(a),b=!0);if(!(this instanceof U)){if(b&&"<"!=a.charAt(0))throw Wb("nosel");return new U(a)}if(b){b=E.document;var d;a=(d=Of.exec(a))?[b.createElement(d[1])]:(d=Oc(a,b))?d.childNodes:[]}Qc(this,a)}function Xb(a){return a.cloneNode(!0)}function wb(a,b){b||fb(a);if(a.querySelectorAll)for(var d=a.querySelectorAll("*"),c=0,e=d.length;c<e;c++)fb(d[c])}function Rc(a,
b,d,c){if(x(c))throw Wb("offargs");var e=(c=xb(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];x(d)&&$a(c||[],d);x(d)&&c&&0<c.length||(a.removeEventListener(b,f,!1),delete e[b])};r(b.split(" "),function(a){g(a);yb[a]&&g(yb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f,!1),delete e[b]}function fb(a,b){var d=a.ng339,c=d&&gb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),Rc(a)),delete gb[d],a.ng339=void 0))}function xb(a,b){var d=
a.ng339,d=d&&gb[d];b&&!d&&(a.ng339=d=++Pf,d=gb[d]={events:{},data:{},handle:void 0});return d}function Yb(a,b,d){if(Nc(a)){var c=x(d),e=!c&&b&&!H(b),f=!b;a=(a=xb(a,!e))&&a.data;if(c)a[b]=d;else{if(f)return a;if(e)return a&&a[b];R(a,b)}}}function zb(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Ab(a,b){b&&a.setAttribute&&r(b.split(" "),function(b){a.setAttribute("class",W((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g,
" ").replace(" "+W(b)+" "," ")))})}function Bb(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(b.split(" "),function(a){a=W(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",W(d))}}function Qc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function Sc(a,b){return Cb(a,"$"+(b||"ngController")+"Controller")}function Cb(a,
b,d){9==a.nodeType&&(a=a.documentElement);for(b=J(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(x(d=B.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function Tc(a){for(wb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Db(a,b){b||wb(a);var d=a.parentNode;d&&d.removeChild(a)}function Qf(a,b){b=b||E;if("complete"===b.document.readyState)b.setTimeout(a);else B(b).on("load",a)}function Uc(a,b){var d=Eb[b.toLowerCase()];return d&&Vc[ua(a)]&&d}function Rf(a,b){var d=function(c,
d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=b[d||c.type],g=f?f.length:0;if(g){if(w(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var k=f.specialHandlerWrapper||Sf;1<g&&(f=ga(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||k(a,c,f[l])}};d.elem=
a;return d}function Sf(a,b,d){d.call(a,b)}function Tf(a,b,d){var c=b.relatedTarget;c&&(c===a||Uf.call(a,c))||d.call(a,b)}function Hf(){this.$get=function(){return R(U,{hasClass:function(a,b){a.attr&&(a=a[0]);return zb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Ab(a,b)}})}}function Ga(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"==d||"object"==d&&null!==a?a.$$hashKey=
d+":"+(b||Zd)():d+":"+a}function Sa(a,b){if(b){var d=0;this.nextUid=function(){return++d}}r(a,this.put,this)}function Wc(a){a=(Function.prototype.toString.call(a)+" ").replace(Vf,"");return a.match(Wf)||a.match(Xf)}function Yf(a){return(a=Wc(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function db(a,b){function d(a){return function(b,c){if(H(b))r(b,uc(a));else return a(b,c)}}function c(a,b){Ra(a,"service");if(z(b)||J(b))b=p.instantiate(b);if(!b.$get)throw Ha("pget",a);return n[a+"Provider"]=
b}function e(a,b){return function(){var c=I.invoke(b,this);if(w(c))throw Ha("undef",a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){sb(w(a)||J(a),"modulesToLoad","not an array");var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=p.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{F(a)?(c=Ub(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):z(a)?b.push(p.invoke(a)):J(a)?b.push(p.invoke(a)):
Qa(a,"module")}catch(e){throw J(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ha("modulerr",a,e.stack||e.message||e);}}});return b}function h(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===k)throw Ha("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=k,a[b]=c(b,e)}catch(f){throw a[b]===k&&delete a[b],f;}finally{l.shift()}}function e(a,c,f){var g=[];a=db.$$annotate(a,b,f);for(var h=0,k=a.length;h<k;h++){var l=a[h];
if("string"!==typeof l)throw Ha("itkn",l);g.push(c&&c.hasOwnProperty(l)?c[l]:d(l,f))}return g}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);J(a)&&(a=a[a.length-1]);d=11>=Ba?!1:"function"===typeof a&&/^(?:class\s|constructor\()/.test(Function.prototype.toString.call(a)+" ");return d?(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=J(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,
a))},get:d,annotate:db.$$annotate,has:function(b){return n.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var k={},l=[],m=new Sa([],!0),n={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,da(b),!1)}),constant:d(function(a,b){Ra(a,"constant");n[a]=b;s[a]=b}),decorator:function(a,b){var c=p.get(a+"Provider"),d=c.$get;c.$get=function(){var a=I.invoke(d,c);return I.invoke(b,null,
{$delegate:a})}}}},p=n.$injector=h(n,function(a,b){ea.isString(b)&&l.push(b);throw Ha("unpr",l.join(" <- "));}),s={},V=h(s,function(a,b){var c=p.get(a+"Provider",b);return I.invoke(c.$get,c,void 0,a)}),I=V;n.$injectorProvider={$get:da(V)};var q=g(a),I=V.get("$injector");I.strictDi=b;r(q,function(a){a&&I.invoke(a)});return I}function Ye(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,
function(a){if("a"===ua(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;z(c)?c=c():Qb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):S(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=F(a)?a:d.hash();var b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===
b&&""===a||Qf(function(){c.$evalAsync(g)})});return g}]}function hb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;J(a)&&(a=a.join(" "));J(b)&&(b=b.join(" "));return a+" "+b}function Zf(a){F(a)&&(a=a.split(" "));var b=T();r(a,function(a){a.length&&(b[a]=!0)});return b}function Ia(a){return H(a)?a:{}}function $f(a,b,d,c){function e(a){try{a.apply(null,ta.call(arguments,1))}finally{if(V--,0===V)for(;I.length;)try{I.pop()()}catch(b){d.error(b)}}}function f(){y=null;g();h()}function g(){q=P();
q=w(q)?null:q;na(q,D)&&(q=D);D=q}function h(){if(v!==k.url()||K!==q)v=k.url(),K=q,r(L,function(a){a(k.url(),q)})}var k=this,l=a.location,m=a.history,n=a.setTimeout,p=a.clearTimeout,s={};k.isMock=!1;var V=0,I=[];k.$$completeOutstandingRequest=e;k.$$incOutstandingRequestCount=function(){V++};k.notifyWhenNoOutstandingRequests=function(a){0===V?a():I.push(a)};var q,K,v=l.href,u=b.find("base"),y=null,P=c.history?function(){try{return m.state}catch(a){}}:A;g();K=q;k.url=function(b,d,e){w(e)&&(e=null);l!==
a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=K===e;if(v===b&&(!c.history||f))return k;var h=v&&Ja(v)===Ja(b);v=b;K=e;!c.history||h&&f?(h||(y=b),d?l.replace(b):h?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b,l.href!==b&&(y=b)):(m[d?"replaceState":"pushState"](e,"",b),g(),K=q);y&&(y=b);return k}return y||l.href.replace(/%27/g,"'")};k.state=function(){return q};var L=[],C=!1,D=null;k.onUrlChange=function(b){if(!C){if(c.history)B(a).on("popstate",f);B(a).on("hashchange",
f);C=!0}L.push(b);return b};k.$$applicationDestroyed=function(){B(a).off("hashchange popstate",f)};k.$$checkUrlChange=h;k.baseHref=function(){var a=u.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};k.defer=function(a,b){var c;V++;c=n(function(){delete s[c];e(a)},b||0);s[c]=!0;return c};k.defer.cancel=function(a){return s[a]?(delete s[a],p(a),e(A),!0):!1}}function ef(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new $f(a,c,b,d)}]}function ff(){this.$get=
function(){function a(a,c){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,f(a.n,a.p),f(a,n),n=a,n.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw O("$cacheFactory")("iid",a);var g=0,h=R({},c,{id:a}),k=T(),l=c&&c.capacity||Number.MAX_VALUE,m=T(),n=null,p=null;return b[a]={put:function(a,b){if(!w(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in k||g++;k[a]=b;g>l&&this.remove(p.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},
remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==p&&(p=b.n);f(b.n,b.p);delete m[a]}a in k&&(delete k[a],g--)},removeAll:function(){k=T();g=0;m=T();n=p=null},destroy:function(){m=h=k=null;delete b[a]},info:function(){return R({},h,{size:g})}}}var b={};a.info=function(){var a={};r(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function Bf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Fc(a,b){function d(a,
b,c){var d=/^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/,e=T();r(a,function(a,f){if(a in n)e[f]=n[a];else{var g=a.match(d);if(!g)throw fa("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f};g[4]&&(n[a]=e[f])}});return e}function c(a){var b=a.charAt(0);if(!b||b!==M(b))throw fa("baddir",a);if(a!==a.trim())throw fa("baddir",a);}function e(a){var b=a.require||a.controller&&a.name;!J(b)&&H(b)&&r(b,function(a,
c){var d=a.match(l);a.substring(d[0].length)||(b[c]=d[0]+c)});return b}var f={},g=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,h=/(([\w\-]+)(?:\:([^;]+))?;?)/,k=ce("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,m=/^(on[a-z]+|formaction)$/,n=T();this.directive=function I(b,d){Ra(b,"directive");F(b)?(c(b),sb(d,"directiveFactory"),f.hasOwnProperty(b)||(f[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];r(f[b],function(f,g){try{var h=a.invoke(f);z(h)?h={compile:da(h)}:
!h.compile&&h.link&&(h.compile=da(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=e(h);h.restrict=h.restrict||"EA";h.$$moduleName=f.$$moduleName;d.push(h)}catch(k){c(k)}});return d}])),f[b].push(d)):r(b,uc(I));return this};this.component=function(a,b){function c(a){function e(b){return z(b)||J(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:b}var f=b.template||b.templateUrl?b.template:"",g={controller:d,controllerAs:Xc(b.controller)||b.controllerAs||"$ctrl",
template:e(f),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require};r(b,function(a,b){"$"===b.charAt(0)&&(g[b]=a)});return g}var d=b.controller||function(){};r(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a,z(d)&&(d[b]=a))});c.$inject=["$injector"];return this.directive(a,c)};this.aHrefSanitizationWhitelist=function(a){return x(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=
function(a){return x(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var p=!0;this.debugInfoEnabled=function(a){return x(a)?(p=a,this):p};var s=10;this.onChangesTtl=function(a){return arguments.length?(s=a,this):s};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,b,c,e,n,y,P,L,C,D){function G(){try{if(!--oa)throw Z=void 0,fa("infchng",s);P.$apply(function(){for(var a=
[],b=0,c=Z.length;b<c;++b)try{Z[b]()}catch(d){a.push(d)}Z=void 0;if(a.length)throw a;})}finally{oa++}}function Aa(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a}function Q(a,b,c){la.innerHTML="<span "+b+">";b=la.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);d.value=c;a.attributes.setNamedItem(d)}function N(a,b){try{a.addClass(b)}catch(c){}}function ba(a,b,c,d,e){a instanceof B||(a=B(a));for(var f=/\S+/,g=0,h=a.length;g<
h;g++){var k=a[g];k.nodeType===Na&&k.nodeValue.match(f)&&Pc(k,a[g]=E.document.createElement("span"))}var l=t(a,b,a,c,d,e);ba.$$addScopeClass(a);var n=null;return function(b,c,d){sb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var f=d.parentBoundTranscludeFn,g=d.transcludeControllers;d=d.futureParentElement;f&&f.$$boundTransclude&&(f=f.$$boundTransclude);n||(n=(d=d&&d[0])?"foreignobject"!==ua(d)&&ka.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==n?B(ca(n,B("<div>").append(a).html())):
c?Pa.clone.call(a):a;if(g)for(var h in g)d.data("$"+h+"Controller",g[h].instance);ba.$$addScopeInfo(d,b);c&&c(d,b);l&&l(b,d,d,f);return d}}function t(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,n,m,v,q;if(p)for(q=Array(c.length),n=0;n<h.length;n+=3)f=h[n],q[f]=c[f];else q=c;n=0;for(m=h.length;n<m;)k=q[h[n++]],c=h[n++],f=h[n++],c?(c.scope?(l=a.$new(),ba.$$addScopeInfo(B(k),l)):l=a,v=c.transcludeOnThisElement?wa(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?wa(a,b):null,c(f,l,k,d,v)):f&&f(a,
k.childNodes,void 0,e)}for(var h=[],k,l,n,m,p,v=0;v<a.length;v++){k=new Aa;l=$b(a[v],[],k,0===v?d:void 0,e);(f=l.length?Ta(l,a[v],k,b,c,null,[],[],f):null)&&f.scope&&ba.$$addScopeClass(k.$$element);k=f&&f.terminal||!(n=a[v].childNodes)||!n.length?null:t(n,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(v,f,k),m=!0,p=p||f;f=null}return m?g:null}function wa(a,b,c){function d(e,f,g,h,k){e||(e=a.$new(!1,k),e.$$transcluded=!0);return b(e,f,{parentBoundTranscludeFn:c,
transcludeControllers:g,futureParentElement:h})}var e=d.$$slots=T(),f;for(f in b.$$slots)e[f]=b.$$slots[f]?wa(a,b.$$slots[f],c):null;return d}function $b(a,b,c,d,e){var f=c.$attr,k;switch(a.nodeType){case 1:Da(b,xa(ua(a)),"E",d,e);for(var l,n,m,p=a.attributes,v=0,q=p&&p.length;v<q;v++){var s=!1,L=!1;l=p[v];k=l.name;n=W(l.value);l=xa(k);if(m=ya.test(l))k=k.replace(Yc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});(l=l.match(za))&&S(l[1])&&(s=k,L=k.substr(0,k.length-5)+"end",k=
k.substr(0,k.length-6));l=xa(k.toLowerCase());f[l]=k;if(m||!c.hasOwnProperty(l))c[l]=n,Uc(a,l)&&(c[l]=!0);ia(a,b,n,l,m);Da(b,l,"A",d,e,s,L)}a=a.className;H(a)&&(a=a.animVal);if(F(a)&&""!==a)for(;k=h.exec(a);)l=xa(k[2]),Da(b,l,"C",d,e)&&(c[l]=W(k[3])),a=a.substr(k.index+k[0].length);break;case Na:if(11===Ba)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===Na;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);aa(b,a.nodeValue);break;case 8:try{if(k=g.exec(a.nodeValue))l=
xa(k[1]),Da(b,l,"M",d,e)&&(c[l]=W(k[2]))}catch(C){}}b.sort(Y);return b}function Zc(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw fa("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return B(d)}function O(a,b,c){return function(d,e,f,g,h){e=Zc(e[0],b,c);return a(d,e,f,g,h)}}function ac(a,b,c,d,e,f){var g;return a?ba(b,c,d,e,f):function(){g||(g=ba(b,c,d,e,f),b=c=f=null);return g.apply(this,
arguments)}}function Ta(a,b,d,e,f,g,h,k,l){function n(a,b,c,d){if(a){c&&(a=O(a,c,d));a.require=u.require;a.directiveName=G;if(s===u||u.$$isolateScope)a=ga(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=O(b,c,d));b.require=u.require;b.directiveName=G;if(s===u||u.$$isolateScope)b=ga(b,{isolateScope:!0});k.push(b)}}function m(a,e,f,g,l){function n(a,b,c,d){var e;Za(a)||(d=c,c=b,b=a,a=void 0);y&&(e=N);c||(c=y?G.parent():G);if(d){var f=l.$$slots[d];if(f)return f(a,b,e,c,t);if(w(f))throw fa("noslot",d,va(G));
}else return l(a,b,e,c,t)}var p,C,u,D,I,N,Q,G;b===f?(g=d,G=d.$$element):(G=B(f),g=new Aa(G,d));I=e;s?D=e.$new(!0):v&&(I=e.$parent);l&&(Q=n,Q.$$boundTransclude=l,Q.isSlotFilled=function(a){return!!l.$$slots[a]});q&&(N=ag(G,g,Q,q,D,e,s));s&&(ba.$$addScopeInfo(G,D,!0,!(L&&(L===s||L===s.$$originalDirective))),ba.$$addScopeClass(G,!0),D.$$isolateBindings=s.$$isolateBindings,C=ha(e,g,D,D.$$isolateBindings,s),C.removeWatches&&D.$on("$destroy",C.removeWatches));for(p in N){C=q[p];u=N[p];var Zb=C.$$bindings.bindToController;
u.bindingInfo=u.identifier&&Zb?ha(I,g,u.instance,Zb,C):{};var P=u();P!==u.instance&&(u.instance=P,G.data("$"+C.name+"Controller",P),u.bindingInfo.removeWatches&&u.bindingInfo.removeWatches(),u.bindingInfo=ha(I,g,u.instance,Zb,C))}r(q,function(a,b){var c=a.require;a.bindToController&&!J(c)&&H(c)&&R(N[b].instance,ib(b,c,G,N))});r(N,function(a){var b=a.instance;if(z(b.$onChanges))try{b.$onChanges(a.bindingInfo.initialChanges)}catch(d){c(d)}if(z(b.$onInit))try{b.$onInit()}catch(e){c(e)}z(b.$onDestroy)&&
I.$on("$destroy",function(){b.$onDestroy()})});p=0;for(C=h.length;p<C;p++)u=h[p],ja(u,u.isolateScope?D:e,G,g,u.require&&ib(u.directiveName,u.require,G,N),Q);var t=e;s&&(s.template||null===s.templateUrl)&&(t=D);a&&a(t,f.childNodes,void 0,l);for(p=k.length-1;0<=p;p--)u=k[p],ja(u,u.isolateScope?D:e,G,g,u.require&&ib(u.directiveName,u.require,G,N),Q);r(N,function(a){a=a.instance;z(a.$postLink)&&a.$postLink()})}l=l||{};for(var p=-Number.MAX_VALUE,v=l.newScopeDirective,q=l.controllerDirectives,s=l.newIsolateScopeDirective,
L=l.templateDirective,C=l.nonTlbTranscludeDirective,D=!1,I=!1,y=l.hasElementTranscludeDirective,N=d.$$element=B(b),u,G,Q,P=e,t,Ca=!1,wa=!1,x,A=0,E=a.length;A<E;A++){u=a[A];var F=u.$$start,Ta=u.$$end;F&&(N=Zc(b,F,Ta));Q=void 0;if(p>u.priority)break;if(x=u.scope)u.templateUrl||(H(x)?(X("new/isolated scope",s||v,u,N),s=u):X("new/isolated scope",s,u,N)),v=v||u;G=u.name;if(!Ca&&(u.replace&&(u.templateUrl||u.template)||u.transclude&&!u.$$tlb)){for(x=A+1;Ca=a[x++];)if(Ca.transclude&&!Ca.$$tlb||Ca.replace&&
(Ca.templateUrl||Ca.template)){wa=!0;break}Ca=!0}!u.templateUrl&&u.controller&&(x=u.controller,q=q||T(),X("'"+G+"' controller",q[G],u,N),q[G]=u);if(x=u.transclude)if(D=!0,u.$$tlb||(X("transclusion",C,u,N),C=u),"element"==x)y=!0,p=u.priority,Q=N,N=d.$$element=B(ba.$$createComment(G,d[G])),b=N[0],da(f,ta.call(Q,0),b),Q[0].$$parentNode=Q[0].parentNode,P=ac(wa,Q,e,p,g&&g.name,{nonTlbTranscludeDirective:C});else{var M=T();Q=B(Xb(b)).contents();if(H(x)){Q=[];var S=T(),Da=T();r(x,function(a,b){var c="?"===
a.charAt(0);a=c?a.substring(1):a;S[a]=b;M[b]=null;Da[b]=c});r(N.contents(),function(a){var b=S[xa(ua(a))];b?(Da[b]=!0,M[b]=M[b]||[],M[b].push(a)):Q.push(a)});r(Da,function(a,b){if(!a)throw fa("reqslot",b);});for(var Y in M)M[Y]&&(M[Y]=ac(wa,M[Y],e))}N.empty();P=ac(wa,Q,e,void 0,void 0,{needsNewScope:u.$$isolateScope||u.$$newScope});P.$$slots=M}if(u.template)if(I=!0,X("template",L,u,N),L=u,x=z(u.template)?u.template(N,d):u.template,x=ra(x),u.replace){g=u;Q=Vb.test(x)?$c(ca(u.templateNamespace,W(x))):
[];b=Q[0];if(1!=Q.length||1!==b.nodeType)throw fa("tplrt",G,"");da(f,N,b);E={$attr:{}};x=$b(b,[],E);var aa=a.splice(A+1,a.length-(A+1));(s||v)&&ad(x,s,v);a=a.concat(x).concat(aa);U(d,E);E=a.length}else N.html(x);if(u.templateUrl)I=!0,X("template",L,u,N),L=u,u.replace&&(g=u),m=$(a.splice(A,a.length-A),N,d,f,D&&P,h,k,{controllerDirectives:q,newScopeDirective:v!==u&&v,newIsolateScopeDirective:s,templateDirective:L,nonTlbTranscludeDirective:C}),E=a.length;else if(u.compile)try{t=u.compile(N,d,P);var Z=
u.$$originalDirective||u;z(t)?n(null,bb(Z,t),F,Ta):t&&n(bb(Z,t.pre),bb(Z,t.post),F,Ta)}catch(ea){c(ea,va(N))}u.terminal&&(m.terminal=!0,p=Math.max(p,u.priority))}m.scope=v&&!0===v.scope;m.transcludeOnThisElement=D;m.templateOnThisElement=I;m.transclude=P;l.hasElementTranscludeDirective=y;return m}function ib(a,b,c,d){var e;if(F(b)){var f=b.match(l);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e=g?c.inheritedData(h):
c.data(h)}if(!e&&!f)throw fa("ctreq",b,a);}else if(J(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=ib(a,b[g],c,d);else H(b)&&(e={},r(b,function(b,f){e[f]=ib(a,b,c,d)}));return e||null}function ag(a,b,c,d,e,f,g){var h=T(),k;for(k in d){var l=d[k],n={$scope:l===g||l.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},m=l.controller;"@"==m&&(m=b[l.name]);n=y(m,n,!0,l.controllerAs);h[l.name]=n;a.data("$"+l.name+"Controller",n.instance)}return h}function ad(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Rb(a[d],
{$$isolateScope:b,$$newScope:c})}function Da(b,e,g,h,k,l,n){if(e===k)return null;k=null;if(f.hasOwnProperty(e)){var m;e=a.get(e+"Directive");for(var p=0,v=e.length;p<v;p++)try{if(m=e[p],(w(h)||h>m.priority)&&-1!=m.restrict.indexOf(g)){l&&(m=Rb(m,{$$start:l,$$end:n}));if(!m.$$bindings){var q=m,s=m,L=m.name,u={isolateScope:null,bindToController:null};H(s.scope)&&(!0===s.bindToController?(u.bindToController=d(s.scope,L,!0),u.isolateScope={}):u.isolateScope=d(s.scope,L,!1));H(s.bindToController)&&(u.bindToController=
d(s.bindToController,L,!0));if(H(u.bindToController)){var C=s.controller,D=s.controllerAs;if(!C)throw fa("noctrl",L);if(!Xc(C,D))throw fa("noident",L);}var N=q.$$bindings=u;H(N.isolateScope)&&(m.$$isolateBindings=N.isolateScope)}b.push(m);k=m}}catch(G){c(G)}}return k}function S(b){if(f.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,e=c.length;d<e;d++)if(b=c[d],b.multiElement)return!0;return!1}function U(a,b){var c=b.$attr,d=a.$attr;r(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===
e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,e){a.hasOwnProperty(e)||"$"===e.charAt(0)||(a[e]=b,"class"!==e&&"style"!==e&&(d[e]=c[e]))})}function $(a,b,c,d,f,g,h,k){var l=[],n,m,p=b[0],s=a.shift(),q=Rb(s,{templateUrl:null,transclude:null,replace:null,$$originalDirective:s}),L=z(s.templateUrl)?s.templateUrl(b,c):s.templateUrl,u=s.templateNamespace;b.empty();e(L).then(function(e){var v,C;e=ra(e);if(s.replace){e=Vb.test(e)?$c(ca(u,W(e))):[];v=e[0];if(1!=e.length||1!==v.nodeType)throw fa("tplrt",
s.name,L);e={$attr:{}};da(d,b,v);var D=$b(v,[],e);H(s.scope)&&ad(D,!0);a=D.concat(a);U(c,e)}else v=p,b.html(e);a.unshift(q);n=Ta(a,v,c,f,b,s,g,h,k);r(d,function(a,c){a==v&&(d[c]=b[0])});for(m=t(b[0].childNodes,f);l.length;){e=l.shift();C=l.shift();var I=l.shift(),G=l.shift(),D=b[0];if(!e.$$destroyed){if(C!==p){var y=C.className;k.hasElementTranscludeDirective&&s.replace||(D=Xb(v));da(I,B(C),D);N(B(D),y)}C=n.transcludeOnThisElement?wa(e,n.transclude,G):G;n(m,e,D,d,C)}}l=null});return function(a,b,
c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(n.transcludeOnThisElement&&(a=wa(b,n.transclude,e)),n(m,b,c,d,a)))}}function Y(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function X(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw fa("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,va(d));}function aa(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&ba.$$addBindingClass(a);
return function(a,c){var e=c.parent();b||ba.$$addBindingClass(e);ba.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function ca(a,b){a=M(a||"html");switch(a){case "svg":case "math":var c=E.document.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function ea(a,b){if("srcdoc"==b)return L.HTML;var c=ua(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return L.RESOURCE_URL}function ia(a,
c,d,e,f){var g=ea(a,e);f=k[e]||f;var h=b(d,!0,g,f);if(h){if("multiple"===e&&"select"===ua(a))throw fa("selmulti",va(a));c.push({priority:100,compile:function(){return{pre:function(a,c,k){c=k.$$observers||(k.$$observers=T());if(m.test(e))throw fa("nodomevents");var l=k[e];l!==d&&(h=l&&b(l,!0,g,f),d=l);h&&(k[e]=h(a),(c[e]||(c[e]=[])).$$inter=!0,(k.$$observers&&k.$$observers[e].$$scope||a).$watch(h,function(a,b){"class"===e&&a!=b?k.$updateClass(a,b):k.$set(e,a)}))}}}})}}function da(a,b,c){var d=b[0],
e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=E.document.createDocumentFragment();for(g=0;g<e;g++)a.appendChild(b[g]);B.hasData(d)&&(B.data(c,B.data(d)),B(d).off("$destroy"));B.cleanData(a.querySelectorAll("*"));for(g=1;g<e;g++)delete b[g];b[0]=c;b.length=1}function ga(a,b){return R(function(){return a.apply(null,arguments)},
a,b)}function ja(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,va(d))}}function ha(a,c,d,e,f){function g(b,c,e){z(d.$onChanges)&&c!==e&&(Z||(a.$$postDigest(G),Z=[]),m||(m={},Z.push(h)),m[b]&&(e=m[b].previousValue),m[b]=new Fb(e,c))}function h(){d.$onChanges(m);m=void 0}var k=[],l={},m;r(e,function(e,h){var m=e.attrName,p=e.optional,v,s,L,C;switch(e.mode){case "@":p||sa.call(c,m)||(d[h]=c[m]=void 0);c.$observe(m,function(a){if(F(a)||Ea(a))g(h,a,d[h]),d[h]=a});c.$$observers[m].$$scope=a;v=c[m];F(v)?d[h]=
b(v)(a):Ea(v)&&(d[h]=v);l[h]=new Fb(bc,d[h]);break;case "=":if(!sa.call(c,m)){if(p)break;c[m]=void 0}if(p&&!c[m])break;s=n(c[m]);C=s.literal?na:function(a,b){return a===b||a!==a&&b!==b};L=s.assign||function(){v=d[h]=s(a);throw fa("nonassign",c[m],m,f.name);};v=d[h]=s(a);p=function(b){C(b,d[h])||(C(b,v)?L(a,b=d[h]):d[h]=b);return v=b};p.$stateful=!0;p=e.collection?a.$watchCollection(c[m],p):a.$watch(n(c[m],p),null,s.literal);k.push(p);break;case "<":if(!sa.call(c,m)){if(p)break;c[m]=void 0}if(p&&!c[m])break;
s=n(c[m]);var D=d[h]=s(a);l[h]=new Fb(bc,d[h]);p=a.$watch(s,function(a,b){if(b===a){if(b===D)return;b=D}g(h,a,b);d[h]=a},s.literal);k.push(p);break;case "&":s=c.hasOwnProperty(m)?n(c[m]):A;if(s===A&&p)break;d[h]=function(b){return s(a,b)}}});return{initialChanges:l,removeWatches:k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}}var ma=/^\w/,la=E.document.createElement("div"),oa=s,Z;Aa.prototype={$normalize:xa,$addClass:function(a){a&&0<a.length&&C.addClass(this.$$element,a)},$removeClass:function(a){a&&
0<a.length&&C.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=bd(a,b);c&&c.length&&C.addClass(this.$$element,c);(c=bd(b,a))&&c.length&&C.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=Uc(this.$$element[0],a),g=cd[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Cc(a,"-"));f=ua(this.$$element);if("a"===f&&("href"===a||"xlinkHref"===a)||"img"===f&&"src"===a)this[a]=b=D(b,"src"===a);else if("img"===
f&&"srcset"===a&&x(b)){for(var f="",g=W(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(g)?k:/(,)/,g=g.split(k),k=Math.floor(g.length/2),l=0;l<k;l++)var n=2*l,f=f+D(W(g[n]),!0),f=f+(" "+W(g[n+1]));g=W(g[2*l]).split(/\s/);f+=D(W(g[0]),!0);2===g.length&&(f+=" "+W(g[1]));this[a]=b=f}!1!==d&&(null===b||w(b)?this.$$element.removeAttr(e):ma.test(e)?this.$$element.attr(e,b):Q(this.$$element[0],e,b));(a=this.$$observers)&&r(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,
d=c.$$observers||(c.$$observers=T()),e=d[a]||(d[a]=[]);e.push(b);P.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||w(c[a])||b(c[a])});return function(){$a(e,b)}}};var pa=b.startSymbol(),qa=b.endSymbol(),ra="{{"==pa&&"}}"==qa?Ya:function(a){return a.replace(/\{\{/g,pa).replace(/}}/g,qa)},ya=/^ngAttr[A-Z]/,za=/^(.+)Start$/;ba.$$addBindingInfo=p?function(a,b){var c=a.data("$binding")||[];J(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:A;ba.$$addBindingClass=p?function(a){N(a,"ng-binding")}:
A;ba.$$addScopeInfo=p?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:A;ba.$$addScopeClass=p?function(a,b){N(a,b?"ng-isolate-scope":"ng-scope")}:A;ba.$$createComment=function(a,b){var c="";p&&(c=" "+(a||"")+": ",b&&(c+=b+" "));return E.document.createComment(c)};return ba}]}function Fb(a,b){this.previousValue=a;this.currentValue=b}function xa(a){return eb(a.replace(Yc,""))}function bd(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=
c[f],h=0;h<e.length;h++)if(g==e[h])continue a;d+=(0<d.length?" ":"")+g}return d}function $c(a){a=B(a);var b=a.length;if(1>=b)return a;for(;b--;)8===a[b].nodeType&&bg.call(a,b,1);return a}function Xc(a,b){if(b&&F(b))return b;if(F(a)){var d=dd.exec(a);if(d)return d[3]}}function gf(){var a={},b=!1;this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,c){Ra(b,"controller");H(b)?R(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,
b,c,d){if(!a||!H(a.$scope))throw O("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,g,h,k){var l,m,n;h=!0===h;k&&F(k)&&(n=k);if(F(f)){k=f.match(dd);if(!k)throw cg("ctrlfmt",f);m=k[1];n=n||k[3];f=a.hasOwnProperty(m)?a[m]:Ec(g.$scope,m,!0)||(b?Ec(c,m,!0):void 0);Qa(f,m,!0)}if(h)return h=(J(f)?f[f.length-1]:f).prototype,l=Object.create(h||null),n&&e(g,n,l,m||f.name),R(function(){var a=d.invoke(f,l,g,m);a!==l&&(H(a)||z(a))&&(l=a,n&&e(g,n,l,m||f.name));return l},{instance:l,identifier:n});l=
d.instantiate(f,g,m);n&&e(g,n,l,m||f.name);return l}}]}function hf(){this.$get=["$window",function(a){return B(a.document)}]}function jf(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function cc(a){return H(a)?ia(a)?a.toISOString():cb(a):a}function of(){this.$get=function(){return function(a){if(!a)return"";var b=[];tc(a,function(a,c){null===a||w(a)||(J(a)?r(a,function(a){b.push(ja(c)+"="+ja(cc(a)))}):b.push(ja(c)+"="+ja(cc(a))))});return b.join("&")}}}function pf(){this.$get=
function(){return function(a){function b(a,e,f){null===a||w(a)||(J(a)?r(a,function(a,c){b(a,e+"["+(H(a)?c:"")+"]")}):H(a)&&!ia(a)?tc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):d.push(ja(e)+"="+ja(cc(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function dc(a,b){if(F(a)){var d=a.replace(dg,"").trim();if(d){var c=b("Content-Type");(c=c&&0===c.indexOf(ed))||(c=(c=d.match(eg))&&fg[c[0]].test(d));c&&(a=xc(d))}}return a}function fd(a){var b=T(),d;F(a)?r(a.split("\n"),function(a){d=
a.indexOf(":");var e=M(W(a.substr(0,d)));a=W(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):H(a)&&r(a,function(a,d){var f=M(d),g=W(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function gd(a){var b;return function(d){b||(b=fd(a));return d?(d=b[M(d)],void 0===d&&(d=null),d):b}}function hd(a,b,d,c){if(z(c))return c(a,b,d);r(c,function(c){a=c(a,b,d)});return a}function nf(){var a=this.defaults={transformResponse:[dc],transformRequest:[function(a){return H(a)&&"[object File]"!==ka.call(a)&&"[object Blob]"!==
ka.call(a)&&"[object FormData]"!==ka.call(a)?cb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ga(ec),put:ga(ec),patch:ga(ec)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},b=!1;this.useApplyAsync=function(a){return x(a)?(b=!!a,this):b};var d=!0;this.useLegacyPromiseExtensions=function(a){return x(a)?(d=!!a,this):d};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",
function(e,f,g,h,k,l){function m(b){function c(a){var b=R({},a);b.data=hd(a.data,a.headers,a.status,f.transformResponse);a=a.status;return 200<=a&&300>a?b:k.reject(b)}function e(a,b){var c,d={};r(a,function(a,e){z(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}if(!H(b))throw O("$http")("badreq",b);if(!F(b.url))throw O("$http")("badreq",b.url);var f=R({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer},b);f.headers=function(b){var c=
a.headers,d=R({},b.headers),f,g,h,c=R({},c.common,c[M(b.method)]);a:for(f in c){g=M(f);for(h in d)if(M(h)===g)continue a;d[f]=c[f]}return e(d,ga(b))}(b);f.method=ub(f.method);f.paramSerializer=F(f.paramSerializer)?l.get(f.paramSerializer):f.paramSerializer;var g=[function(b){var d=b.headers,e=hd(b.data,gd(d),void 0,b.transformRequest);w(e)&&r(d,function(a,b){"content-type"===M(b)&&delete d[b]});w(b.withCredentials)&&!w(a.withCredentials)&&(b.withCredentials=a.withCredentials);return n(b,e).then(c,
c)},void 0],h=k.when(f);for(r(V,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||a.responseError)&&g.push(a.response,a.responseError)});g.length;){b=g.shift();var m=g.shift(),h=h.then(b,m)}d?(h.success=function(a){Qa(a,"fn");h.then(function(b){a(b.data,b.status,b.headers,f)});return h},h.error=function(a){Qa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=id("success"),h.error=id("error"));return h}function n(c,d){function g(a){if(a){var c=
{};r(a,function(a,d){c[d]=function(c){function d(){a(c)}b?h.$applyAsync(d):h.$$phase?d():h.$apply(d)}});return c}}function l(a,c,d,e){function f(){n(c,a,d,e)}D&&(200<=a&&300>a?D.put(Q,[a,c,fd(d),e]):D.remove(Q));b?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function n(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?L.resolve:L.reject)({data:a,status:b,headers:gd(d),config:c,statusText:e})}function y(a){n(a.data,a.status,ga(a.headers()),a.statusText)}function V(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,
1)}var L=k.defer(),C=L.promise,D,G,Aa=c.headers,Q=p(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);C.then(V,V);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(D=H(c.cache)?c.cache:H(a.cache)?a.cache:s);D&&(G=D.get(Q),x(G)?G&&z(G.then)?G.then(y,y):J(G)?n(G[1],G[0],ga(G[2]),G[3]):n(G,200,{},"OK"):D.put(Q,C));w(G)&&((G=jd(c.url)?f()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(Aa[c.xsrfHeaderName||a.xsrfHeaderName]=G),e(c.method,Q,d,l,Aa,c.timeout,c.withCredentials,
c.responseType,g(c.eventHandlers),g(c.uploadEventHandlers)));return C}function p(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var s=g("$http");a.paramSerializer=F(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var V=[];r(c,function(a){V.unshift(F(a)?l.get(a):l.invoke(a))});m.pendingRequests=[];(function(a){r(arguments,function(a){m[a]=function(b,c){return m(R({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){m[a]=function(b,
c,d){return m(R({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=a;return m}]}function rf(){this.$get=function(){return function(){return new E.XMLHttpRequest}}}function qf(){this.$get=["$browser","$window","$document","$xhrFactory",function(a,b,d,c){return gg(a,c,a.defer,b.angular.callbacks,d[0])}]}function gg(a,b,d,c,e){function f(a,b,d){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",
m,!1);e.body.removeChild(f);f=null;var g=-1,s="unknown";a&&("load"!==a.type||c[b].called||(a={type:"error"}),s=a.type,g="error"===a.type?404:200);d&&d(g,s)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,n,p,s,V,I){function q(){u&&u();y&&y.abort()}function K(b,c,e,f,g){x(L)&&d.cancel(L);u=y=null;b(c,e,f,g);a.$$completeOutstandingRequest(A)}a.$$incOutstandingRequestCount();h=h||a.url();if("jsonp"==M(e)){var v="_"+(c.counter++).toString(36);
c[v]=function(a){c[v].data=a;c[v].called=!0};var u=f(h.replace("JSON_CALLBACK","angular.callbacks."+v),v,function(a,b){K(l,a,c[v].data,"",b);c[v]=A})}else{var y=b(e,h);y.open(e,h,!0);r(m,function(a,b){x(a)&&y.setRequestHeader(b,a)});y.onload=function(){var a=y.statusText||"",b="response"in y?y.response:y.responseText,c=1223===y.status?204:y.status;0===c&&(c=b?200:"file"==qa(h).protocol?404:0);K(l,c,b,y.getAllResponseHeaders(),a)};e=function(){K(l,-1,null,null,"")};y.onerror=e;y.onabort=e;r(V,function(a,
b){y.addEventListener(b,a)});r(I,function(a,b){y.upload.addEventListener(b,a)});p&&(y.withCredentials=!0);if(s)try{y.responseType=s}catch(P){if("json"!==s)throw P;}y.send(w(k)?null:k)}if(0<n)var L=d(q,n);else n&&z(n.then)&&n.then(q)}}function lf(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(n,a).replace(p,
b)}function h(a,b,c,d){var e;return e=a.$watch(function(a){e();return d(a)},b,c)}function k(f,k,n,p){function r(a){try{var b=a;a=n?e.getTrusted(n,b):e.valueOf(b);var d;if(p&&!x(a))d=a;else if(null==a)d="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=cb(a)}d=a}return d}catch(g){c(Ka.interr(f,g))}}if(!f.length||-1===f.indexOf(a)){var v;k||(k=g(f),v=da(k),v.exp=f,v.expressions=[],v.$$watchDelegate=h);return v}p=!!p;var u,y,P=0,L=[],C=[];v=f.length;for(var D=[],G=[];P<
v;)if(-1!=(u=f.indexOf(a,P))&&-1!=(y=f.indexOf(b,u+l)))P!==u&&D.push(g(f.substring(P,u))),P=f.substring(u+l,y),L.push(P),C.push(d(P,r)),P=y+m,G.push(D.length),D.push("");else{P!==v&&D.push(g(f.substring(P)));break}n&&1<D.length&&Ka.throwNoconcat(f);if(!k||L.length){var Aa=function(a){for(var b=0,c=L.length;b<c;b++){if(p&&w(a[b]))return;D[G[b]]=a[b]}return D.join("")};return R(function(a){var b=0,d=L.length,e=Array(d);try{for(;b<d;b++)e[b]=C[b](a);return Aa(e)}catch(g){c(Ka.interr(f,g))}},{exp:f,expressions:L,
$$watchDelegate:function(a,b){var c;return a.$watchGroup(C,function(d,e){var f=Aa(d);z(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=a.length,m=b.length,n=new RegExp(a.replace(/./g,f),"g"),p=new RegExp(b.replace(/./g,f),"g");k.startSymbol=function(){return a};k.endSymbol=function(){return b};return k}]}function mf(){this.$get=["$rootScope","$window","$q","$$q","$browser",function(a,b,d,c,e){function f(f,k,l,m){function n(){p?f.apply(null,s):f(q)}var p=4<arguments.length,s=p?ta.call(arguments,4):
[],r=b.setInterval,I=b.clearInterval,q=0,K=x(m)&&!m,v=(K?c:d).defer(),u=v.promise;l=x(l)?l:0;u.$$intervalId=r(function(){K?e.defer(n):a.$evalAsync(n);v.notify(q++);0<l&&q>=l&&(v.resolve(q),I(u.$$intervalId),delete g[u.$$intervalId]);K||a.$apply()},k);g[u.$$intervalId]=v;return u}var g={};f.cancel=function(a){return a&&a.$$intervalId in g?(g[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete g[a.$$intervalId],!0):!1};return f}]}function fc(a){a=a.split("/");for(var b=a.length;b--;)a[b]=
qb(a[b]);return a.join("/")}function kd(a,b){var d=qa(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=aa(d.port)||hg[d.protocol]||null}function ld(a,b){var d="/"!==a.charAt(0);d&&(a="/"+a);var c=qa(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=Ac(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&"/"!=b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function la(a,b){if(0===b.lastIndexOf(a,0))return b.substr(a.length)}function Ja(a){var b=
a.indexOf("#");return-1==b?a:a.substr(0,b)}function jb(a){return a.replace(/(#.+)|#$/,"$1")}function gc(a,b,d){this.$$html5=!0;d=d||"";kd(a,this);this.$$parse=function(a){var d=la(b,a);if(!F(d))throw Gb("ipthprfx",a,b);ld(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Tb(this.$$search),d=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=fc(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1)};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),
!0;var f,g;x(f=la(a,c))?(g=f,g=x(f=la(d,f))?b+(la("/",f)||f):a+g):x(f=la(b,c))?g=b+f:b==c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function hc(a,b,d){kd(a,this);this.$$parse=function(c){var e=la(a,c)||la(b,c),f;w(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",w(e)&&(a=c,this.replace())):(f=la(d,e),w(f)&&(f=e));ld(f,this);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;0===f.lastIndexOf(e,0)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=
Tb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=fc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?d+this.$$url:"")};this.$$parseLinkUrl=function(b,d){return Ja(a)==Ja(b)?(this.$$parse(b),!0):!1}}function md(a,b,d){this.$$html5=!0;hc.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a==Ja(c)?f=c:(g=la(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=Tb(this.$$search),
e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=fc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url}}function Hb(a){return function(){return this[a]}}function nd(a,b){return function(d){if(w(d))return this[a];this[a]=b(d);this.$$compose();return this}}function sf(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return x(b)?(a=b,this):a};this.html5Mode=function(a){return Ea(a)?(b.enabled=a,this):H(a)?(Ea(a.enabled)&&(b.enabled=a.enabled),Ea(a.requireBase)&&
(b.requireBase=a.requireBase),Ea(a.rewriteLinks)&&(b.rewriteLinks=a.rewriteLinks),this):b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function h(a,b,d){var e=l.url(),f=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(g){throw l.url(e),l.$$state=f,g;}}function k(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,b)}var l,m;m=c.baseHref();var n=c.url(),p;if(b.enabled){if(!m&&b.requireBase)throw Gb("nobase");p=n.substring(0,n.indexOf("/",
n.indexOf("//")+2))+(m||"/");m=e.history?gc:md}else p=Ja(n),m=hc;var s=p.substr(0,Ja(p).lastIndexOf("/")+1);l=new m(p,s,"#"+a);l.$$parseLinkUrl(n,n);l.$$state=c.state();var r=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(b.rewriteLinks&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!=a.which&&2!=a.button){for(var e=B(a.target);"a"!==ua(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),k=e.attr("href")||e.attr("xlink:href");H(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=
qa(h.animVal).href);r.test(h)||!h||e.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(h,k)||(a.preventDefault(),l.absUrl()!=c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});jb(l.absUrl())!=jb(n)&&c.url(l.absUrl(),!0);var I=!0;c.onUrlChange(function(a,b){w(la(s,a))?g.location.href=a:(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,f;a=jb(a);l.$$parse(a);l.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===a&&(f?(l.$$parse(c),l.$$state=
e,h(c,!1,e)):(I=!1,k(c,e)))}),d.$$phase||d.$digest())});d.$watch(function(){var a=jb(c.url()),b=jb(l.absUrl()),f=c.state(),g=l.$$replace,n=a!==b||l.$$html5&&e.history&&f!==l.$$state;if(I||n)I=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,f).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=f):(n&&h(b,g,f===l.$$state?null:l.$$state),k(a,f)))});l.$$replace=!1});return l}]}function tf(){var a=!0,b=this;this.debugEnabled=function(b){return x(b)?
(a=b,this):a};this.$get=["$window",function(d){function c(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||A;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];r(arguments,function(b){a.push(c(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),
debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Ua(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===a||"__proto__"===a)throw ca("isecfld",b);return a}function ig(a){return a+""}function ra(a,b){if(a){if(a.constructor===a)throw ca("isecfn",b);if(a.window===a)throw ca("isecwindow",b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw ca("isecdom",b);if(a===Object)throw ca("isecobj",b);}return a}function od(a,
b){if(a){if(a.constructor===a)throw ca("isecfn",b);if(a===jg||a===kg||a===lg)throw ca("isecff",b);}}function Ib(a,b){if(a&&(a===(0).constructor||a===(!1).constructor||a==="".constructor||a==={}.constructor||a===[].constructor||a===Function.constructor))throw ca("isecaf",b);}function mg(a,b){return"undefined"!==typeof a?a:b}function pd(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function $(a,b){var d,c;switch(a.type){case t.Program:d=!0;r(a.body,function(a){$(a.expression,b);d=
d&&a.expression.constant});a.constant=d;break;case t.Literal:a.constant=!0;a.toWatch=[];break;case t.UnaryExpression:$(a.argument,b);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case t.BinaryExpression:$(a.left,b);$(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case t.LogicalExpression:$(a.left,b);$(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case t.ConditionalExpression:$(a.test,
b);$(a.alternate,b);$(a.consequent,b);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case t.Identifier:a.constant=!1;a.toWatch=[a];break;case t.MemberExpression:$(a.object,b);a.computed&&$(a.property,b);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=[a];break;case t.CallExpression:d=a.filter?!b(a.callee.name).$stateful:!1;c=[];r(a.arguments,function(a){$(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});
a.constant=d;a.toWatch=a.filter&&!b(a.callee.name).$stateful?c:[a];break;case t.AssignmentExpression:$(a.left,b);$(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case t.ArrayExpression:d=!0;c=[];r(a.elements,function(a){$(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=c;break;case t.ObjectExpression:d=!0;c=[];r(a.properties,function(a){$(a.value,b);d=d&&a.value.constant&&!a.computed;a.value.constant||c.push.apply(c,a.value.toWatch)});
a.constant=d;a.toWatch=c;break;case t.ThisExpression:a.constant=!1;a.toWatch=[];break;case t.LocalsExpression:a.constant=!1,a.toWatch=[]}}function qd(a){if(1==a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:void 0}}function rd(a){return a.type===t.Identifier||a.type===t.MemberExpression}function sd(a){if(1===a.body.length&&rd(a.body[0].expression))return{type:t.AssignmentExpression,left:a.body[0].expression,right:{type:t.NGValueParameter},operator:"="}}function td(a){return 0===
a.body.length||1===a.body.length&&(a.body[0].expression.type===t.Literal||a.body[0].expression.type===t.ArrayExpression||a.body[0].expression.type===t.ObjectExpression)}function ud(a,b){this.astBuilder=a;this.$filter=b}function vd(a,b){this.astBuilder=a;this.$filter=b}function Jb(a){return"constructor"==a}function ic(a){return z(a.valueOf)?a.valueOf():ng.call(a)}function uf(){var a=T(),b=T(),d={"true":!0,"false":!1,"null":null,undefined:void 0},c,e;this.addLiteral=function(a,b){d[a]=b};this.setIdentifierFns=
function(a,b){c=a;e=b;return this};this.$get=["$filter",function(f){function g(c,d,e){var g,k,C;e=e||K;switch(typeof c){case "string":C=c=c.trim();var D=e?b:a;g=D[C];if(!g){":"===c.charAt(0)&&":"===c.charAt(1)&&(k=!0,c=c.substring(2));g=e?q:I;var G=new jc(g);g=(new kc(G,f,g)).parse(c);g.constant?g.$$watchDelegate=p:k?g.$$watchDelegate=g.literal?n:m:g.inputs&&(g.$$watchDelegate=l);e&&(g=h(g));D[C]=g}return s(g,d);case "function":return s(c,d);default:return s(A,d)}}function h(a){function b(c,d,e,f){var g=
K;K=!0;try{return a(c,d,e,f)}finally{K=g}}if(!a)return a;b.$$watchDelegate=a.$$watchDelegate;b.assign=h(a.assign);b.constant=a.constant;b.literal=a.literal;for(var c=0;a.inputs&&c<a.inputs.length;++c)a.inputs[c]=h(a.inputs[c]);b.inputs=a.inputs;return b}function k(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=ic(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function l(a,b,c,d,e){var f=d.inputs,g;if(1===f.length){var h=k,f=f[0];return a.$watch(function(a){var b=f(a);k(b,h)||(g=d(a,void 0,
void 0,[b]),h=b&&ic(b));return g},b,c,e)}for(var l=[],n=[],m=0,p=f.length;m<p;m++)l[m]=k,n[m]=null;return a.$watch(function(a){for(var b=!1,c=0,e=f.length;c<e;c++){var h=f[c](a);if(b||(b=!k(h,l[c])))n[c]=h,l[c]=h&&ic(h)}b&&(g=d(a,void 0,void 0,n));return g},b,c,e)}function m(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;z(b)&&b.apply(this,arguments);x(a)&&d.$$postDigest(function(){x(f)&&e()})},c)}function n(a,b,c,d){function e(a){var b=!0;r(a,function(a){x(a)||(b=
!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;z(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function p(a,b,c,d){var e;return e=a.$watch(function(a){e();return d(a)},b,c)}function s(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,c=c!==n&&c!==m?function(c,e,f,g){f=d&&g?g[0]:a(c,e,f,g);return b(f,c,e)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return x(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==l?c.$$watchDelegate=a.$$watchDelegate:
b.$stateful||(c.$$watchDelegate=l,d=!a.inputs,c.inputs=a.inputs?a.inputs:[a]);return c}var V=Fa().noUnsafeEval,I={csp:V,expensiveChecks:!1,literals:Z(d),isIdentifierStart:z(c)&&c,isIdentifierContinue:z(e)&&e},q={csp:V,expensiveChecks:!0,literals:Z(d),isIdentifierStart:z(c)&&c,isIdentifierContinue:z(e)&&e},K=!1;g.$$runningExpensiveChecks=function(){return K};return g}]}function wf(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return wd(function(b){a.$evalAsync(b)},b)}]}function xf(){this.$get=
["$browser","$exceptionHandler",function(a,b){return wd(function(b){a.defer(b)},b)}]}function wd(a,b){function d(){this.$$state={status:0}}function c(a,b){return function(c){b.call(a,c)}}function e(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,a(function(){var a,d,e;e=c.pending;c.processScheduled=!1;c.pending=void 0;for(var f=0,g=e.length;f<g;++f){d=e[f][0];a=e[f][c.status];try{z(a)?d.resolve(a(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),b(h)}}}))}
function f(){this.promise=new d}var g=O("$q",TypeError);R(d.prototype,{then:function(a,b,c){if(w(a)&&w(b)&&w(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&e(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}});R(f.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?
this.$$reject(g("qcycle",a)):this.$$resolve(a))},$$resolve:function(a){function d(a){k||(k=!0,h.$$resolve(a))}function f(a){k||(k=!0,h.$$reject(a))}var g,h=this,k=!1;try{if(H(a)||z(a))g=a&&a.then;z(g)?(this.promise.$$state.status=-1,g.call(a,d,f,c(this,this.notify))):(this.promise.$$state.value=a,this.promise.$$state.status=1,e(this.promise.$$state))}catch(l){f(l),b(l)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=
2;e(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&a(function(){for(var a,e,f=0,g=d.length;f<g;f++){e=d[f][0];a=d[f][3];try{e.notify(z(a)?a(c):c)}catch(h){b(h)}}})}});var h=function(a,b){var c=new f;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{z(c)&&(d=c())}catch(e){return h(e,!1)}return d&&z(d.then)?d.then(function(){return h(a,b)},function(a){return h(a,!1)}):h(a,b)},l=function(a,b,c,d){var e=
new f;e.resolve(a);return e.promise.then(b,c,d)},m=function(a){if(!z(a))throw g("norslvr",a);var b=new f;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};m.prototype=d.prototype;m.defer=function(){var a=new f;a.resolve=c(a,a.resolve);a.reject=c(a,a.reject);a.notify=c(a,a.notify);return a};m.reject=function(a){var b=new f;b.reject(a);return b.promise};m.when=l;m.resolve=l;m.all=function(a){var b=new f,c=0,d=J(a)?[]:{};r(a,function(a,e){c++;l(a).then(function(a){d.hasOwnProperty(e)||
(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return m}function Gf(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function vf(){function a(a){function b(){this.$$watchers=
this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++pb;this.$$ChildScope=null}b.prototype=a;return b}var b=10,d=O("$rootScope"),c=null,e=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(f,g,h){function k(a){a.currentScope.$$destroyed=!0}function l(a){9===Ba&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=
a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++pb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function n(a){if(K.$$phase)throw d("inprog",K.$$phase);K.$$phase=a}function p(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function s(a,b,c){do a.$$listenerCount[c]-=
b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function t(){}function I(){for(;y.length;)try{y.shift()()}catch(a){f(a)}e=null}function q(){null===e&&(e=h.defer(function(){K.$apply(I)}))}m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=
d;(b||c!=this)&&d.$on("$destroy",k);return d},$watch:function(a,b,d,e){var f=g(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var h=this,k=h.$$watchers,l={fn:b,last:t,get:f,exp:e||a,eq:!!d};c=null;z(b)||(l.fn=A);k||(k=h.$$watchers=[]);k.unshift(l);p(this,1);return function(){0<=$a(k,l)&&p(h,-1);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&
b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!w(e)){if(H(e))if(oa(e))for(f!==n&&(f=n,q=f.length=0,l++),a=e.length,q!==a&&(l++,f.length=q=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==
p&&(f=p={},q=0,l++);a=0;for(b in e)sa.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(q++,f[b]=g,l++));if(q>a)for(b in l++,f)sa.call(e,b)||(q--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),n=[],p={},s=!0,q=0;return this.$watch(m,function(){s?(s=!1,b(e,e,d)):b(e,h,d);if(k)if(H(e))if(oa(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)sa.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,
g,k,l,m,p,s,q,r=b,y,x=[],w,A;n("$digest");h.$$checkUrlChange();this===K&&null!==e&&(h.defer.cancel(e),I());c=null;do{q=!1;y=this;for(p=0;p<v.length;p++){try{A=v[p],A.scope.$eval(A.expression,A.locals)}catch(E){f(E)}c=null}v.length=0;a:do{if(p=y.$$watchers)for(s=p.length;s--;)try{if(a=p[s])if(m=a.get,(g=m(y))!==(k=a.last)&&!(a.eq?na(g,k):"number"===typeof g&&"number"===typeof k&&isNaN(g)&&isNaN(k)))q=!0,c=a,a.last=a.eq?Z(g,null):g,l=a.fn,l(g,k===t?g:k,y),5>r&&(w=4-r,x[w]||(x[w]=[]),x[w].push({msg:z(a.exp)?
"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:k}));else if(a===c){q=!1;break a}}catch(B){f(B)}if(!(p=y.$$watchersCount&&y.$$childHead||y!==this&&y.$$nextSibling))for(;y!==this&&!(p=y.$$nextSibling);)y=y.$parent}while(y=p);if((q||v.length)&&!r--)throw K.$$phase=null,d("infdig",b,x);}while(q||v.length);for(K.$$phase=null;P<u.length;)try{u[P++]()}catch(F){f(F)}u.length=P=0},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===
K&&h.$$applicationDestroyed();p(this,-this.$$watchersCount);for(var b in this.$$listenerCount)s(this,this.$$listenerCount[b],b);a&&a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=A;this.$on=this.$watch=this.$watchGroup=
function(){return A};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){K.$$phase||v.length||h.defer(function(){v.length&&K.$digest()});v.push({scope:this,expression:g(a),locals:b})},$$postDigest:function(a){u.push(a)},$apply:function(a){try{n("$apply");try{return this.$eval(a)}finally{K.$$phase=null}}catch(b){f(b)}finally{try{K.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&y.push(b);
a=g(a);q()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,s(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=ab([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=
e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){f(n)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=ab([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,
1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var K=new m,v=K.$$asyncQueue=[],u=K.$$postDigestQueue=[],y=K.$$applyAsyncQueue=[],P=0;return K}]}function oe(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return x(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return x(a)?(b=a,this):b};
this.$get=function(){return function(d,c){var e=c?b:a,f;f=qa(d).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function og(a){if("self"===a)return a;if(F(a)){if(-1<a.indexOf("***"))throw ya("iwcard",a);a=xd(a).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+a+"$")}if(Xa(a))return new RegExp("^"+a.source+"$");throw ya("imatcher");}function yd(a){var b=[];x(a)&&r(a,function(a){b.push(og(a))});return b}function zf(){this.SCE_CONTEXTS=ma;var a=["self"],b=[];this.resourceUrlWhitelist=
function(b){arguments.length&&(a=yd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=yd(a));return b};this.$get=["$injector",function(d){function c(a,b){return"self"===a?jd(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw ya("unsafe");
};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),h={};h[ma.HTML]=e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw ya("icontext",a,b);if(null===b||w(b)||""===b)return b;if("string"!==typeof b)throw ya("itype",a);return new c(b)},getTrusted:function(d,e){if(null===e||w(e)||""===e)return e;var g=h.hasOwnProperty(d)?h[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===ma.RESOURCE_URL){var g=
qa(e.toString()),n,p,s=!1;n=0;for(p=a.length;n<p;n++)if(c(a[n],g)){s=!0;break}if(s)for(n=0,p=b.length;n<p;n++)if(c(b[n],g)){s=!1;break}if(s)return e;throw ya("insecurl",e.toString());}if(d===ma.HTML)return f(e);throw ya("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function yf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ba)throw ya("iequirks");var c=ga(ma);c.isEnabled=function(){return a};
c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},c.valueOf=Ya);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;r(ma,function(a,b){var d=M(b);c[eb("parse_as_"+d)]=function(b){return e(a,b)};c[eb("get_trusted_"+d)]=function(b){return f(a,b)};c[eb("trust_as_"+d)]=function(b){return g(a,b)}});return c}]}function Af(){this.$get=["$window",
"$document",function(a,b){var d={},c=!(a.chrome&&a.chrome.app&&a.chrome.app.runtime)&&a.history&&a.history.pushState,e=aa((/android (\d+)/.exec(M((a.navigator||{}).userAgent))||[])[1]),f=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},h,k=/^(Moz|webkit|ms)(?=[A-Z])/,l=g.body&&g.body.style,m=!1,n=!1;if(l){for(var p in l)if(m=k.exec(p)){h=m[0];h=h[0].toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in l&&"webkit");m=!!("transition"in l||h+"Transition"in l);n=!!("animation"in l||h+"Animation"in
l);!e||m&&n||(m=F(l.webkitTransition),n=F(l.webkitAnimation))}return{history:!(!c||4>e||f),hasEvent:function(a){if("input"===a&&11>=Ba)return!1;if(w(d[a])){var b=g.createElement("div");d[a]="on"+a in b}return d[a]},csp:Fa(),vendorPrefix:h,transitions:m,animations:n,android:e}}]}function Cf(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$templateCache","$http","$q","$sce",function(b,d,c,e){function f(g,h){f.totalPendingRequests++;if(!F(g)||w(b.get(g)))g=e.getTrustedResourceUrl(g);
var k=d.defaults&&d.defaults.transformResponse;J(k)?k=k.filter(function(a){return a!==dc}):k===dc&&(k=null);return d.get(g,R({cache:b,transformResponse:k},a))["finally"](function(){f.totalPendingRequests--}).then(function(a){b.put(g,a.data);return a.data},function(a){if(!h)throw pg("tpload",g,a.status,a.statusText);return c.reject(a)})}f.totalPendingRequests=0;return f}]}function Df(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");
var g=[];r(a,function(a){var c=ea.element(a).data("$binding");c&&r(c,function(c){d?(new RegExp("(^|\\s)"+xd(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!=c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(d?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}
function Ef(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,k,l){z(f)||(l=k,k=f,f=A);var m=ta.call(arguments,3),n=x(l)&&!l,p=(n?c:d).defer(),s=p.promise,r;r=b.defer(function(){try{p.resolve(f.apply(null,m))}catch(b){p.reject(b),e(b)}finally{delete g[s.$$timeoutId]}n||a.$apply()},k);s.$$timeoutId=r;g[r]=p;return s}var g={};f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):
!1};return f}]}function qa(a){Ba&&(Y.setAttribute("href",a),a=Y.href);Y.setAttribute("href",a);return{href:Y.href,protocol:Y.protocol?Y.protocol.replace(/:$/,""):"",host:Y.host,search:Y.search?Y.search.replace(/^\?/,""):"",hash:Y.hash?Y.hash.replace(/^#/,""):"",hostname:Y.hostname,port:Y.port,pathname:"/"===Y.pathname.charAt(0)?Y.pathname:"/"+Y.pathname}}function jd(a){a=F(a)?qa(a):a;return a.protocol===zd.protocol&&a.host===zd.host}function Ff(){this.$get=da(E)}function Ad(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}
var d=a[0]||{},c={},e="";return function(){var a,g,h,k,l;a=d.cookie||"";if(a!==e)for(e=a,a=e.split("; "),c={},h=0;h<a.length;h++)g=a[h],k=g.indexOf("="),0<k&&(l=b(g.substring(0,k)),w(c[l])&&(c[l]=b(g.substring(k+1))));return c}}function Jf(){this.$get=Ad}function Mc(a){function b(d,c){if(H(d)){var e={};r(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",Bd);b("date",Cd);
b("filter",qg);b("json",rg);b("limitTo",sg);b("lowercase",tg);b("number",Dd);b("orderBy",Ed);b("uppercase",ug)}function qg(){return function(a,b,d){if(!oa(a)){if(null==a)return a;throw O("filter")("notarray",a);}var c;switch(lc(b)){case "function":break;case "boolean":case "null":case "number":case "string":c=!0;case "object":b=vg(b,d,c);break;default:return a}return Array.prototype.filter.call(a,b)}}function vg(a,b,d){var c=H(a)&&"$"in a;!0===b?b=na:z(b)||(b=function(a,b){if(w(a))return!1;if(null===
a||null===b)return a===b;if(H(b)||H(a)&&!vc(a))return!1;a=M(""+a);b=M(""+b);return-1!==a.indexOf(b)});return function(e){return c&&!H(e)?La(e,a.$,b,!1):La(e,a,b,d)}}function La(a,b,d,c,e){var f=lc(a),g=lc(b);if("string"===g&&"!"===b.charAt(0))return!La(a,b.substring(1),d,c);if(J(a))return a.some(function(a){return La(a,b,d,c)});switch(f){case "object":var h;if(c){for(h in a)if("$"!==h.charAt(0)&&La(a[h],b,d,!0))return!0;return e?!1:La(a,b,d,!1)}if("object"===g){for(h in b)if(e=b[h],!z(e)&&!w(e)&&
(f="$"===h,!La(f?a:a[h],e,d,f,f)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function lc(a){return null===a?"null":typeof a}function Bd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){w(c)&&(c=b.CURRENCY_SYM);w(e)&&(e=b.PATTERNS[1].maxFrac);return null==a?a:Fd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(/\u00A4/g,c)}}function Dd(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Fd(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function wg(a){var b=
0,d,c,e,f,g;-1<(c=a.indexOf(Gd))&&(a=a.replace(Gd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)==mc;e++);if(e==(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)==mc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Hd&&(d=d.splice(0,Hd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function xg(a,b,d,c){var e=a.d,f=e.length-a.i;b=w(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d){e.splice(Math.max(a.i,d));for(var g=d;g<e.length;g++)e[g]=
0}else for(f=Math.max(0,f),a.i=1,e.length=Math.max(1,d=b+1),e[0]=0,g=1;g<d;g++)e[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)e.unshift(0),a.i++;e.unshift(1);a.i++}else e[d-1]++;for(;f<Math.max(0,b);f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Fd(a,b,d,c,e){if(!F(a)&&!S(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,h=Math.abs(a)+"",k="";if(f)k="\u221e";else{g=wg(h);xg(g,e,b.minFrac,b.maxFrac);k=g.d;h=g.i;e=g.e;f=[];for(g=k.reduce(function(a,
b){return a&&!b},!0);0>h;)k.unshift(0),h++;0<h?f=k.splice(h,k.length):(f=k,k=[0]);h=[];for(k.length>=b.lgSize&&h.unshift(k.splice(-b.lgSize,k.length).join(""));k.length>b.gSize;)h.unshift(k.splice(-b.gSize,k.length).join(""));k.length&&h.unshift(k.join(""));k=h.join(d);f.length&&(k+=c+f.join(""));e&&(k+="e+"+e)}return 0>a&&!g?b.negPre+k+b.negSuf:b.posPre+k+b.posSuf}function Kb(a,b,d,c){var e="";if(0>a||c&&0>=a)c?a=-a+1:(a=-a,e="-");for(a=""+a;a.length<b;)a=mc+a;d&&(a=a.substr(a.length-b));return e+
a}function X(a,b,d,c,e){d=d||0;return function(f){f=f["get"+a]();if(0<d||f>-d)f+=d;0===f&&-12==d&&(f=12);return Kb(f,b,c,e)}}function kb(a,b,d){return function(c,e){var f=c["get"+a](),g=ub((d?"STANDALONE":"")+(b?"SHORT":"")+a);return e[g][f]}}function Id(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Jd(a){return function(b){var d=Id(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Kb(b,a)}}function nc(a,
b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Cd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=aa(b[9]+b[10]),g=aa(b[9]+b[11]));h.call(a,aa(b[1]),aa(b[2])-1,aa(b[3]));f=aa(b[4]||0)-f;g=aa(b[5]||0)-g;h=aa(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,d,f){var g="",h=[],k,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;F(c)&&(c=yg.test(c)?aa(c):b(c));S(c)&&(c=new Date(c));if(!ia(c)||!isFinite(c.getTime()))return c;for(;d;)(l=zg.exec(d))?(h=ab(h,l,1),d=h.pop()):(h.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=yc(f,m),c=Sb(c,f,!0));r(h,function(b){k=Ag[b];g+=k?k(c,a.DATETIME_FORMATS,m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function rg(){return function(a,b){w(b)&&(b=2);return cb(a,b)}}function sg(){return function(a,
b,d){b=Infinity===Math.abs(Number(b))?Number(b):aa(b);if(isNaN(b))return a;S(a)&&(a=a.toString());if(!oa(a))return a;d=!d||isNaN(d)?0:aa(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?oc(a,d,d+b):0===d?oc(a,b,a.length):oc(a,Math.max(0,d+b),d)}}function oc(a,b,d){return F(a)?a.slice(b,d):ta.call(a,b,d)}function Ed(a){function b(b){return b.map(function(b){var c=1,d=Ya;if(z(b))d=b;else if(F(b)){if("+"==b.charAt(0)||"-"==b.charAt(0))c="-"==b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(d=a(b),d.constant))var e=
d(),d=function(a){return a[e]}}return{get:d,descending:c}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function c(a,b){var c=0,d=a.type,k=b.type;if(d===k){var k=a.value,l=b.value;"string"===d?(k=k.toLowerCase(),l=l.toLowerCase()):"object"===d&&(H(k)&&(k=a.index),H(l)&&(l=b.index));k!==l&&(c=k<l?-1:1)}else c=d<k?-1:1;return c}return function(a,f,g,h){if(null==a)return a;if(!oa(a))throw O("orderBy")("notarray",a);J(f)||(f=[f]);0===f.length&&
(f=["+"]);var k=b(f),l=g?-1:1,m=z(h)?h:c;a=Array.prototype.map.call(a,function(a,b){return{value:a,tieBreaker:{value:b,type:"number",index:b},predicateValues:k.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("object"===c)a:{if(z(e.valueOf)&&(e=e.valueOf(),d(e)))break a;vc(e)&&(e=e.toString(),d(e))}return{value:e,type:c,index:b}})}});a.sort(function(a,b){for(var c=0,d=k.length;c<d;c++){var e=m(a.predicateValues[c],b.predicateValues[c]);if(e)return e*k[c].descending*
l}return m(a.tieBreaker,b.tieBreaker)*l});return a=a.map(function(a){return a.value})}}function Ma(a){z(a)&&(a={link:a});a.restrict=a.restrict||"AC";return da(a)}function Kd(a,b,d,c,e){var f=this,g=[];f.$error={};f.$$success={};f.$pending=void 0;f.$name=e(b.name||b.ngForm||"")(d);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;f.$$parentForm=Lb;f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,function(a){a.$commitViewValue()})};
f.$addControl=function(a){Ra(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a);a.$$parentForm=f};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});r(f.$$success,function(b,c){f.$setValidity(c,null,a)});$a(g,a);a.$$parentForm=Lb};Ld({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];d?
-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&($a(d,c),0===d.length&&delete a[b])},$animate:c});f.$setDirty=function(){c.removeClass(a,Va);c.addClass(a,Mb);f.$dirty=!0;f.$pristine=!1;f.$$parentForm.$setDirty()};f.$setPristine=function(){c.setClass(a,Va,Mb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){c.addClass(a,"ng-submitted");
f.$submitted=!0;f.$$parentForm.$setSubmitted()}}function pc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function lb(a,b,d,c,e,f){var g=M(b[0].type);if(!e.android){var h=!1;b.on("compositionstart",function(){h=!0});b.on("compositionend",function(){h=!1;l()})}var k,l=function(a){k&&(f.defer.cancel(k),k=null);if(!h){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=W(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",
l);else{var m=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut",m)}b.on("change",l);if(Md[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!k){var b=this.validity,c=b.badInput,d=b.typeMismatch;k=f.defer(function(){k=null;b.badInput===c&&b.typeMismatch===d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?
"":c.$viewValue;b.val()!==a&&b.val(a)}}function Nb(a,b){return function(d,c){var e,f;if(ia(d))return d;if(F(d)){'"'==d.charAt(0)&&'"'==d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(Bg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,
f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function mb(a,b,d,c){return function(e,f,g,h,k,l,m){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function p(a){return x(a)&&!ia(a)?d(a)||void 0:a}Nd(e,f,g,h);lb(e,f,g,h,k,l);var s=h&&h.$options&&h.$options.timezone,r;h.$$parserName=a;h.$parsers.push(function(a){if(h.$isEmpty(a))return null;if(b.test(a))return a=d(a,r),s&&(a=Sb(a,s)),a});h.$formatters.push(function(a){if(a&&!ia(a))throw nb("datefmt",a);if(n(a))return(r=a)&&
s&&(r=Sb(r,s,!0)),m("date")(a,c,s);r=null;return""});if(x(g.min)||g.ngMin){var t;h.$validators.min=function(a){return!n(a)||w(t)||d(a)>=t};g.$observe("min",function(a){t=p(a);h.$validate()})}if(x(g.max)||g.ngMax){var q;h.$validators.max=function(a){return!n(a)||w(q)||d(a)<=q};g.$observe("max",function(a){q=p(a);h.$validate()})}}}function Nd(a,b,d,c){(c.$$hasNativeValidators=H(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};return c.badInput||c.typeMismatch?void 0:a})}function Od(a,
b,d,c,e){if(x(c)){a=a(c);if(!a.constant)throw nb("constexpr",d,c);return a(b)}return e}function qc(a,b){a="ngClass"+a;return["$animate",function(d){function c(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){var b=[];return J(a)?(r(a,function(a){b=b.concat(e(a))}),b):F(a)?a.split(" "):H(a)?(r(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",link:function(f,g,h){function k(a){a=l(a,1);h.$addClass(a)}
function l(a,b){var c=g.data("$classCounts")||T(),d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function m(a,b){var e=c(b,a),f=c(a,b),e=l(e,1),f=l(f,-1);e&&e.length&&d.addClass(g,e);f&&f.length&&d.removeClass(g,f)}function n(a){if(!0===b||(f.$index&1)===b){var c=e(a||[]);if(!p)k(c);else if(!na(a,p)){var d=e(p);m(d,c)}}p=J(a)?a.map(function(a){return ga(a)}):ga(a)}var p;f.$watch(h[a],n,!0);h.$observe("class",function(b){n(f.$eval(h[a]))});
"ngClass"!==a&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var m=e(f.$eval(h[a]));g===b?k(m):(g=l(m,-1),h.$removeClass(g))}})}}}]}function Ld(a){function b(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function d(a,c){a=a?"-"+Cc(a,"-"):"";b(ob+a,!0===c);b(Pd+a,!1===c)}var c=a.ctrl,e=a.$element,f={},g=a.set,h=a.unset,k=a.$animate;f[Pd]=!(f[ob]=e.hasClass(ob));c.$setValidity=function(a,e,f){w(e)?(c.$pending||(c.$pending={}),g(c.$pending,a,f)):(c.$pending&&
h(c.$pending,a,f),Qd(c.$pending)&&(c.$pending=void 0));Ea(e)?e?(h(c.$error,a,f),g(c.$$success,a,f)):(g(c.$error,a,f),h(c.$$success,a,f)):(h(c.$error,a,f),h(c.$$success,a,f));c.$pending?(b(Rd,!0),c.$valid=c.$invalid=void 0,d("",null)):(b(Rd,!1),c.$valid=Qd(c.$error),c.$invalid=!c.$valid,d("",c.$valid));e=c.$pending&&c.$pending[a]?void 0:c.$error[a]?!1:c.$$success[a]?!0:null;d(a,e);c.$$parentForm.$setValidity(a,e,c)}}function Qd(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}var Cg=
/^\/(.+)\/([a-z]*)$/,sa=Object.prototype.hasOwnProperty,M=function(a){return F(a)?a.toLowerCase():a},ub=function(a){return F(a)?a.toUpperCase():a},Ba,B,pa,ta=[].slice,bg=[].splice,Dg=[].push,ka=Object.prototype.toString,wc=Object.getPrototypeOf,za=O("ng"),ea=E.angular||(E.angular={}),Ub,pb=0;Ba=E.document.documentMode;A.$inject=[];Ya.$inject=[];var J=Array.isArray,be=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,W=function(a){return F(a)?a.trim():a},xd=
function(a){return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Fa=function(){if(!x(Fa.rules)){var a=E.document.querySelector("[ng-csp]")||E.document.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Fa.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Fa;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Fa.rules},
rb=function(){if(x(rb.name_))return rb.name_;var a,b,d=Oa.length,c,e;for(b=0;b<d;++b)if(c=Oa[b],a=E.document.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return rb.name_=e},ee=/:/g,Oa=["ng-","data-ng-","ng:","x-ng-"],je=/[A-Z]/g,Dc=!1,Na=3,ne={full:"1.5.7",major:1,minor:5,dot:7,codeName:"hexagonal-circumvolution"};U.expando="ng339";var gb=U.cache={},Pf=1;U._data=function(a){return this.cache[a[this.expando]]||{}};var Kf=/([\:\-\_]+(.))/g,Lf=/^moz([A-Z])/,yb={mouseleave:"mouseout",
mouseenter:"mouseover"},Wb=O("jqLite"),Of=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Vb=/<|&#?\w+;/,Mf=/<([\w:-]+)/,Nf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,ha={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ha.optgroup=ha.option;ha.tbody=ha.tfoot=ha.colgroup=ha.caption=ha.thead;
ha.th=ha.td;var Uf=E.Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Pa=U.prototype={ready:function(a){function b(){d||(d=!0,a())}var d=!1;"complete"===E.document.readyState?E.setTimeout(b):(this.on("DOMContentLoaded",b),U(E).on("load",b))},toString:function(){var a=[];r(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?B(this[a]):B(this[this.length+a])},length:0,push:Dg,sort:[].sort,splice:[].splice},Eb={};r("multiple selected checked disabled readOnly required open".split(" "),
function(a){Eb[M(a)]=a});var Vc={};r("input select option textarea button form details".split(" "),function(a){Vc[a]=!0});var cd={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};r({data:Yb,removeData:fb,hasData:function(a){for(var b in gb[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)fb(a[b])}},function(a,b){U[b]=a});r({data:Yb,inheritedData:Cb,scope:function(a){return B.data(a,"$scope")||Cb(a.parentNode||a,["$isolateScope",
"$scope"])},isolateScope:function(a){return B.data(a,"$isolateScope")||B.data(a,"$isolateScopeNoTemplate")},controller:Sc,injector:function(a){return Cb(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:zb,css:function(a,b,d){b=eb(b);if(x(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Na&&2!==c&&8!==c)if(c=M(b),Eb[c])if(x(d))d?(a[b]=!0,a.setAttribute(b,c)):(a[b]=!1,a.removeAttribute(c));else return a[b]||(a.attributes.getNamedItem(b)||A).specified?
c:void 0;else if(x(d))a.setAttribute(b,d);else if(a.getAttribute)return a=a.getAttribute(b,2),null===a?void 0:a},prop:function(a,b,d){if(x(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(w(d)){var c=a.nodeType;return 1===c||c===Na?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(w(b)){if(a.multiple&&"select"===ua(a)){var d=[];r(a.options,function(a){a.selected&&d.push(a.value||a.text)});return 0===d.length?null:d}return a.value}a.value=b},html:function(a,b){if(w(b))return a.innerHTML;
wb(a,!0);a.innerHTML=b},empty:Tc},function(a,b){U.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==Tc&&w(2==a.length&&a!==zb&&a!==Sc?b:c)){if(H(b)){for(e=0;e<g;e++)if(a===Yb)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=a.$dv;g=w(e)?Math.min(g,1):g;for(f=0;f<g;f++){var h=a(this[f],b,c);e=e?e+h:h}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});r({removeData:fb,on:function(a,b,d,c){if(x(c))throw Wb("onargs");if(Nc(a)){c=xb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=
Rf(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,h=function(b,c,g){var h=e[b];h||(h=e[b]=[],h.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f,!1));h.push(d)};g--;)b=c[g],yb[b]?(h(yb[b],Tf),h(b,void 0,!0)):h(b)}},off:Rc,one:function(a,b,d){a=B(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;wb(a);r(new U(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];
r(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new U(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;r(new U(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){Pc(a,B(b).eq(0).clone()[0])},remove:Db,detach:function(a){Db(a,!0)},after:function(a,b){var d=a,c=a.parentNode;b=new U(b);for(var e=
0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}},addClass:Bb,removeClass:Ab,toggleClass:function(a,b,d){b&&r(b.split(" "),function(b){var e=d;w(e)&&(e=!zb(a,b));(e?Bb:Ab)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:Xb,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=xb(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=
!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:A,type:f,target:a},b.type&&(c=R(c,b)),b=ga(g),e=d?[c].concat(d):[c],r(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){U.prototype[b]=function(b,c,e){for(var f,g=0,h=this.length;g<h;g++)w(f)?(f=a(this[g],b,c,e),x(f)&&(f=B(f))):
Qc(f,a(this[g],b,c,e));return x(f)?f:this};U.prototype.bind=U.prototype.on;U.prototype.unbind=U.prototype.off});Sa.prototype={put:function(a,b){this[Ga(a,this.nextUid)]=b},get:function(a){return this[Ga(a,this.nextUid)]},remove:function(a){var b=this[a=Ga(a,this.nextUid)];delete this[a];return b}};var If=[function(){this.$get=[function(){return Sa}]}],Wf=/^([^\(]+?)=>/,Xf=/^[^\(]*\(\s*([^\)]*)\)/m,Eg=/,/,Fg=/^\s*(_?)(\S+?)\1\s*$/,Vf=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ha=O("$injector");db.$$annotate=
function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw F(d)&&d||(d=a.name||Yf(a)),Ha("strictdi",d);b=Wc(a);r(b[1].split(Eg),function(a){a.replace(Fg,function(a,b,d){c.push(d)})})}a.$inject=c}}else J(a)?(b=a.length-1,Qa(a[b],"fn"),c=a.slice(0,b)):Qa(a,"fn",!0);return c};var Sd=O("$animate"),af=function(){this.$get=A},bf=function(){var a=new Sa,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=F(b)?b.split(" "):J(b)?
b:[],r(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){r(b,function(b){var c=a.get(b);if(c){var d=Zf(b.attr("class")),e="",f="";r(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});r(b,function(a){e&&Bb(a,e);f&&Ab(a,f)});a.remove(b)}});b.length=0}return{enabled:A,on:A,off:A,pin:A,push:function(g,h,k,l){l&&l();k=k||{};k.from&&g.css(k.from);k.to&&g.css(k.to);if(k.addClass||k.removeClass)if(h=k.addClass,l=k.removeClass,k=a.get(g)||{},h=e(k,h,!0),l=e(k,l,!1),h||l)a.put(g,
k),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},Ze=["$provide",function(a){var b=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,c){if(d&&"."!==d.charAt(0))throw Sd("notcsel",d);var e=d+"-animation";b.$$registeredAnimations[d.substr(1)]=e;a.factory(e,c)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Sd("nongcls",
"ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var h;a:{for(h=0;h<d.length;h++){var k=d[h];if(1===k.nodeType){h=k;break a}}h=void 0}!h||h.parentNode||h.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(e,f,g,h){f=f&&B(f);g=g&&B(g);f=f||g.parent();b(e,f,g);return a.push(e,"enter",Ia(h))},move:function(e,f,g,h){f=f&&B(f);g=g&&B(g);
f=f||g.parent();b(e,f,g);return a.push(e,"move",Ia(h))},leave:function(b,c){return a.push(b,"leave",Ia(c),function(){b.remove()})},addClass:function(b,c,g){g=Ia(g);g.addClass=hb(g.addclass,c);return a.push(b,"addClass",g)},removeClass:function(b,c,g){g=Ia(g);g.removeClass=hb(g.removeClass,c);return a.push(b,"removeClass",g)},setClass:function(b,c,g,h){h=Ia(h);h.addClass=hb(h.addClass,c);h.removeClass=hb(h.removeClass,g);return a.push(b,"setClass",h)},animate:function(b,c,g,h,k){k=Ia(k);k.from=k.from?
R(k.from,c):c;k.to=k.to?R(k.to,g):g;k.tempClasses=hb(k.tempClasses,h||"ng-inline-animate");return a.push(b,"animate",k)}}}]}],df=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},cf=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$document","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=
[];this._tick=function(a){var d=c[0];d&&d.hidden?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;r(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:A,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,
c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=
this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(r(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},$e=function(){this.$get=["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);h||k.complete();h=!0});return k}
var g=e||{};g.$$prepared||(g=Z(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var h,k=new d;return{start:f,end:f}}}]},fa=O("$compile"),bc=new function(){};Fc.$inject=["$provide","$$sanitizeUriProvider"];Fb.prototype.isFirstChange=function(){return this.previousValue===bc};var Yc=/^((?:x|data)[\:\-_])/i,cg=O("$controller"),dd=/^(\S+)(\s+as\s+([\w$]+))?$/,kf=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof B&&(b=b[0]):b=a[0].body;
return b.offsetWidth+1}}]},ed="application/json",ec={"Content-Type":ed+";charset=utf-8"},eg=/^\[|^\{(?!\{)/,fg={"[":/]$/,"{":/}$/},dg=/^\)\]\}',?\n/,Gg=O("$http"),id=function(a){return function(){throw Gg("legacy",a);}},Ka=ea.$interpolateMinErr=O("$interpolate");Ka.throwNoconcat=function(a){throw Ka("noconcat",a);};Ka.interr=function(a,b){return Ka("interr",a,b.toString())};var Hg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,hg={http:80,https:443,ftp:21},Gb=O("$location"),Ig={$$absUrl:"",$$html5:!1,$$replace:!1,
absUrl:Hb("$$absUrl"),url:function(a){if(w(a))return this.$$url;var b=Hg.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Hb("$$protocol"),host:Hb("$$host"),port:Hb("$$port"),path:nd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(F(a)||S(a))a=a.toString(),this.$$search=Ac(a);else if(H(a))a=
Z(a,{}),r(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw Gb("isrcharg");break;default:w(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:nd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};r([md,hc,gc],function(a){a.prototype=Object.create(Ig);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==gc||!this.$$html5)throw Gb("nostate");this.$$state=w(b)?null:
b;return this}});var ca=O("$parse"),jg=Function.prototype.call,kg=Function.prototype.apply,lg=Function.prototype.bind,Ob=T();r("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Ob[a]=!0});var Jg={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},jc=function(a){this.options=a};jc.prototype={constructor:jc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||
"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdentifierStart(this.peekMultichar()))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Ob[b],e=Ob[d];Ob[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},
is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdentifierStart:function(a){return this.options.isIdentifierStart?this.options.isIdentifierStart(a,this.codePointAt(a)):this.isValidIdentifierStart(a)},isValidIdentifierStart:function(a){return"a"<=a&&"z">=
a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isIdentifierContinue:function(a){return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,this.codePointAt(a)):this.isValidIdentifierContinue(a)},isValidIdentifierContinue:function(a,b){return this.isValidIdentifierStart(a,b)||this.isNumber(a)},codePointAt:function(a){return 1===a.length?a.charCodeAt(0):(a.charCodeAt(0)<<10)+a.charCodeAt(1)-56613888},peekMultichar:function(){var a=this.text.charAt(this.index),b=this.peek();if(!b)return a;var d=
a.charCodeAt(0),c=b.charCodeAt(0);return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=x(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw ca("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=M(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"==d&&this.isExpOperator(c))a+=
d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){var a=this.index;for(this.index+=this.peekMultichar().length;this.index<this.text.length;){var b=this.peekMultichar();if(!this.isIdentifierContinue(b))break;this.index+=b.length}this.tokens.push({index:a,
text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=Jg[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,
value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var t=function(a,b){this.lexer=a;this.options=b};t.Program="Program";t.ExpressionStatement="ExpressionStatement";t.AssignmentExpression="AssignmentExpression";t.ConditionalExpression="ConditionalExpression";t.LogicalExpression="LogicalExpression";t.BinaryExpression="BinaryExpression";t.UnaryExpression="UnaryExpression";t.CallExpression="CallExpression";t.MemberExpression="MemberExpression";t.Identifier="Identifier";t.Literal=
"Literal";t.ArrayExpression="ArrayExpression";t.Property="Property";t.ObjectExpression="ObjectExpression";t.ThisExpression="ThisExpression";t.LocalsExpression="LocalsExpression";t.NGValueParameter="NGValueParameter";t.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),
!this.expect(";"))return{type:t.Program,body:a}},expressionStatement:function(){return{type:t.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:t.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&
(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:t.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:t.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:t.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=",
"===","!==");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*",
"/","%");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:t.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=Z(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?
a={type:t.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:t.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:t.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:t.MemberExpression,object:a,
property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:t.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.filterChain());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:t.Identifier,name:a.text}},
constant:function(){return{type:t.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:t.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:t.Property,kind:"init"};this.peek().constant?(b.key=this.constant(),b.computed=!1,this.consume(":"),b.value=this.expression()):
this.peek().identifier?(b.key=this.identifier(),b.computed=!1,this.peek(":")?(this.consume(":"),b.value=this.expression()):b.value=b.key):this.peek("[")?(this.consume("["),b.key=this.expression(),this.consume("]"),b.computed=!0,this.consume(":"),b.value=this.expression()):this.throwError("invalid key",this.peek());a.push(b)}while(this.expect(","))}this.consume("}");return{type:t.ObjectExpression,properties:a}},throwError:function(a,b){throw ca("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));
},consume:function(a){if(0===this.tokens.length)throw ca("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw ca("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=
this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:t.ThisExpression},$locals:{type:t.LocalsExpression}}};ud.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:b,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};$(c,d.$filter);var e="",f;this.stage="assign";if(f=sd(c))this.state.computing="assign",e=this.nextId(),this.recurse(f,e),this.return_(e),e="fn.assign="+this.generateFunction("assign",
"s,v,l");f=qd(c.body);d.stage="inputs";r(f,function(a,b){var c="fn"+b;d.state[c]={vars:[],body:[],own:{}};d.state.computing=c;var e=d.nextId();d.recurse(a,e);d.return_(e);d.state.inputs.push(c);a.watchId=b});this.state.computing="fn";this.stage="main";this.recurse(c);e='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+e+this.watchFns()+"return fn;";e=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","getStringValue",
"ensureSafeAssignContext","ifDefined","plus","text",e))(this.$filter,Ua,ra,od,ig,Ib,mg,pd,a);this.state=this.stage=void 0;e.literal=td(c);e.constant=c.constant;return e},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;r(b,function(b){a.push("var "+b+"="+d.generateFunction(b,"s"))});b.length&&a.push("fn.inputs=["+b.join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=
[],b=this;r(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,e,f){var g,h,k=this,l,m,n;c=c||A;if(!f&&x(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case t.Program:r(a.body,
function(b,c){k.recurse(b.expression,void 0,void 0,function(a){h=a});c!==a.body.length-1?k.current().body.push(h,";"):k.return_(h)});break;case t.Literal:m=this.escape(a.value);this.assign(b,m);c(m);break;case t.UnaryExpression:this.recurse(a.argument,void 0,void 0,function(a){h=a});m=a.operator+"("+this.ifDefined(h,0)+")";this.assign(b,m);c(m);break;case t.BinaryExpression:this.recurse(a.left,void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){h=a});m="+"===a.operator?
this.plus(g,h):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(h,0):"("+g+")"+a.operator+"("+h+")";this.assign(b,m);c(m);break;case t.LogicalExpression:b=b||this.nextId();k.recurse(a.left,b);k.if_("&&"===a.operator?b:k.not(b),k.lazyRecurse(a.right,b));c(b);break;case t.ConditionalExpression:b=b||this.nextId();k.recurse(a.test,b);k.if_(b,k.lazyRecurse(a.alternate,b),k.lazyRecurse(a.consequent,b));c(b);break;case t.Identifier:b=b||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),
this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Ua(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){e&&1!==e&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(b,k.nonComputedMember("s",a.name))})},b&&k.lazyAssign(b,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Jb(a.name))&&k.addEnsureSafeObject(b);c(b);break;case t.MemberExpression:g=
d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();k.recurse(a.object,g,void 0,function(){k.if_(k.notNull(g),function(){e&&1!==e&&k.addEnsureSafeAssignContext(g);if(a.computed)h=k.nextId(),k.recurse(a.property,h),k.getStringValue(h),k.addEnsureSafeMemberName(h),e&&1!==e&&k.if_(k.not(k.computedMember(g,h)),k.lazyAssign(k.computedMember(g,h),"{}")),m=k.ensureSafeObject(k.computedMember(g,h)),k.assign(b,m),d&&(d.computed=!0,d.name=h);else{Ua(a.property.name);e&&1!==e&&k.if_(k.not(k.nonComputedMember(g,
a.property.name)),k.lazyAssign(k.nonComputedMember(g,a.property.name),"{}"));m=k.nonComputedMember(g,a.property.name);if(k.state.expensiveChecks||Jb(a.property.name))m=k.ensureSafeObject(m);k.assign(b,m);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(b,"undefined")});c(b)},!!e);break;case t.CallExpression:b=b||this.nextId();a.filter?(h=k.filter(a.callee.name),l=[],r(a.arguments,function(a){var b=k.nextId();k.recurse(a,b);l.push(b)}),m=h+"("+l.join(",")+")",k.assign(b,m),c(b)):(h=
k.nextId(),g={},l=[],k.recurse(a.callee,h,g,function(){k.if_(k.notNull(h),function(){k.addEnsureSafeFunction(h);r(a.arguments,function(a){k.recurse(a,k.nextId(),void 0,function(a){l.push(k.ensureSafeObject(a))})});g.name?(k.state.expensiveChecks||k.addEnsureSafeObject(g.context),m=k.member(g.context,g.name,g.computed)+"("+l.join(",")+")"):m=h+"("+l.join(",")+")";m=k.ensureSafeObject(m);k.assign(b,m)},function(){k.assign(b,"undefined")});c(b)}));break;case t.AssignmentExpression:h=this.nextId();g=
{};if(!rd(a.left))throw ca("lval");this.recurse(a.left,void 0,g,function(){k.if_(k.notNull(g.context),function(){k.recurse(a.right,h);k.addEnsureSafeObject(k.member(g.context,g.name,g.computed));k.addEnsureSafeAssignContext(g.context);m=k.member(g.context,g.name,g.computed)+a.operator+h;k.assign(b,m);c(b||m)})},1);break;case t.ArrayExpression:l=[];r(a.elements,function(a){k.recurse(a,k.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(m);break;case t.ObjectExpression:l=
[];n=!1;r(a.properties,function(a){a.computed&&(n=!0)});n?(b=b||this.nextId(),this.assign(b,"{}"),r(a.properties,function(a){a.computed?(g=k.nextId(),k.recurse(a.key,g)):g=a.key.type===t.Identifier?a.key.name:""+a.key.value;h=k.nextId();k.recurse(a.value,h);k.assign(k.member(b,g,a.computed),h)})):(r(a.properties,function(b){k.recurse(b.value,a.constant?void 0:k.nextId(),void 0,function(a){l.push(k.escape(b.key.type===t.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,
m));c(b||m);break;case t.ThisExpression:this.assign(b,"s");c("s");break;case t.LocalsExpression:this.assign(b,"l");c("l");break;case t.NGValueParameter:this.assign(b,"v"),c("v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));
return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){var d=/[^$_a-zA-Z0-9]/g;return/[$_a-zA-Z][$_a-zA-Z0-9]*/.test(b)?
a+"."+b:a+'["'+b.replace(d,this.stringEscapeFn)+'"]'},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},addEnsureSafeAssignContext:function(a){this.current().body.push(this.ensureSafeAssignContext(a),
";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},ensureSafeAssignContext:function(a){return"ensureSafeAssignContext("+a+",text)"},lazyRecurse:function(a,b,d,c,e,f){var g=this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,
b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(F(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(S(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw ca("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};
vd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=b;$(c,d.$filter);var e,f;if(e=sd(c))f=this.recurse(e);e=qd(c.body);var g;e&&(g=[],r(e,function(a,b){var c=d.recurse(a);a.input=c;g.push(c);a.watchId=b}));var h=[];r(c.body,function(a){h.push(d.recurse(a.expression))});e=0===c.body.length?A:1===c.body.length?h[0]:function(a,b){var c;r(h,function(d){c=d(a,b)});return c};f&&(e.assign=function(a,b,c){return f(a,c,b)});g&&(e.inputs=g);e.literal=
td(c);e.constant=c.constant;return e},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case t.Literal:return this.value(a.value,b);case t.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case t.BinaryExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case t.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case t.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),
this.recurse(a.alternate),this.recurse(a.consequent),b);case t.Identifier:return Ua(a.name,f.expression),f.identifier(a.name,f.expensiveChecks||Jb(a.name),b,d,f.expression);case t.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(Ua(a.property.name,f.expression),e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d,f.expression):this.nonComputedMember(c,e,f.expensiveChecks,b,d,f.expression);case t.CallExpression:return g=[],r(a.arguments,
function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var n=[],p=0;p<g.length;++p)n.push(g[p](a,c,d,f));a=e.apply(void 0,n,f);return b?{context:void 0,name:void 0,value:a}:a}:function(a,c,d,m){var n=e(a,c,d,m),p;if(null!=n.value){ra(n.context,f.expression);od(n.value,f.expression);p=[];for(var s=0;s<g.length;++s)p.push(ra(g[s](a,c,d,m),f.expression));p=ra(n.value.apply(n.context,p),f.expression)}return b?
{value:p}:p};case t.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,g,m){var n=c(a,d,g,m);a=e(a,d,g,m);ra(n.value,f.expression);Ib(n.context);n.context[n.name]=a;return b?{value:a}:a};case t.ArrayExpression:return g=[],r(a.elements,function(a){g.push(f.recurse(a))}),function(a,c,d,e){for(var f=[],p=0;p<g.length;++p)f.push(g[p](a,c,d,e));return b?{value:f}:f};case t.ObjectExpression:return g=[],r(a.properties,function(a){a.computed?g.push({key:f.recurse(a.key),
computed:!0,value:f.recurse(a.value)}):g.push({key:a.key.type===t.Identifier?a.key.name:""+a.key.value,computed:!1,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},p=0;p<g.length;++p)g[p].computed?f[g[p].key(a,c,d,e)]=g[p].value(a,c,d,e):f[g[p].key]=g[p].value(a,c,d,e);return b?{value:f}:f};case t.ThisExpression:return function(a){return b?{value:a}:a};case t.LocalsExpression:return function(a,c){return b?{value:c}:c};case t.NGValueParameter:return function(a,c,d){return b?{value:d}:d}}},
"unary+":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=x(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=x(d)?-d:0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=pd(h,c);return d?{value:h}:h}},"binary-":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=(x(h)?h:0)-(x(c)?c:0);return d?
{value:h}:h}},"binary*":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:
c}},"binary==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,
b,d){return function(c,e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,h){e=a(e,f,g,h)?b(e,f,g,h):d(e,f,g,h);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:void 0,name:void 0,value:a}:a}},identifier:function(a,
b,d,c,e){return function(f,g,h,k){f=g&&a in g?g:f;c&&1!==c&&f&&!f[a]&&(f[a]={});g=f?f[a]:void 0;b&&ra(g,e);return d?{context:f,name:a,value:g}:g}},computedMember:function(a,b,d,c,e){return function(f,g,h,k){var l=a(f,g,h,k),m,n;null!=l&&(m=b(f,g,h,k),m+="",Ua(m,e),c&&1!==c&&(Ib(l),l&&!l[m]&&(l[m]={})),n=l[m],ra(n,e));return d?{context:l,name:m,value:n}:n}},nonComputedMember:function(a,b,d,c,e,f){return function(g,h,k,l){g=a(g,h,k,l);e&&1!==e&&(Ib(g),g&&!g[b]&&(g[b]={}));h=null!=g?g[b]:void 0;(d||
Jb(b))&&ra(h,f);return c?{context:g,name:b,value:h}:h}},inputs:function(a,b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};var kc=function(a,b,d){this.lexer=a;this.$filter=b;this.options=d;this.ast=new t(a,d);this.astCompiler=d.csp?new vd(this.ast,b):new ud(this.ast,b)};kc.prototype={constructor:kc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};var ng=Object.prototype.valueOf,ya=O("$sce"),ma={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},
pg=O("$compile"),Y=E.document.createElement("a"),zd=qa(E.location.href);Ad.$inject=["$document"];Mc.$inject=["$provide"];var Hd=22,Gd=".",mc="0";Bd.$inject=["$locale"];Dd.$inject=["$locale"];var Ag={yyyy:X("FullYear",4,0,!1,!0),yy:X("FullYear",2,0,!0,!0),y:X("FullYear",1,0,!1,!0),MMMM:kb("Month"),MMM:kb("Month",!0),MM:X("Month",2,1),M:X("Month",1,1),LLLL:kb("Month",!1,!0),dd:X("Date",2),d:X("Date",1),HH:X("Hours",2),H:X("Hours",1),hh:X("Hours",2,-12),h:X("Hours",1,-12),mm:X("Minutes",2),m:X("Minutes",
1),ss:X("Seconds",2),s:X("Seconds",1),sss:X("Milliseconds",3),EEEE:kb("Day"),EEE:kb("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Kb(Math[0<a?"floor":"ceil"](a/60),2)+Kb(Math.abs(a%60),2))},ww:Jd(2),w:Jd(1),G:nc,GG:nc,GGG:nc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},zg=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,yg=/^\-?\d+$/;Cd.$inject=["$locale"];
var tg=da(M),ug=da(ub);Ed.$inject=["$parse"];var pe=da({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===ka.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),vb={};r(Eb,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!=a){var c=xa("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,
e)});vb[c]=function(){return{restrict:"A",priority:100,link:e}}}});r(cd,function(a,b){vb[b]=function(){return{priority:100,link:function(a,c,e){if("ngPattern"===b&&"/"==e.ngPattern.charAt(0)&&(c=e.ngPattern.match(Cg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});r(["src","srcset","href"],function(a){var b=xa("ng-"+a);vb[b]=function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===ka.call(c.prop("href"))&&
(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),Ba&&f&&c.prop(f,e[g])):"href"===a&&e.$set(g,null)})}}}});var Lb={$addControl:A,$$renameControl:function(a,b){a.$name=b},$removeControl:A,$setValidity:A,$setDirty:A,$setPristine:A,$setSubmitted:A};Kd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Td=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||A}return{name:"form",restrict:a?
"EAC":"E",require:["form","^^?form"],controller:Kd,compile:function(d,f){d.addClass(Va).addClass(ob);var g=f.name?"name":a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in e)){var p=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",p,!1);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",p,!1)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var s=g?c(n.$name):A;g&&(s(a,n),e.$observe(g,
function(b){n.$name!==b&&(s(a,void 0),n.$$parentForm.$$renameControl(n,b),s=c(n.$name),s(a,n))}));d.on("$destroy",function(){n.$$parentForm.$removeControl(n);s(a,void 0);R(n,Lb)})}}}}}]},qe=Td(),De=Td(!0),Bg=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,Kg=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,Lg=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
Mg=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Ud=/^(\d{4,})-(\d{2})-(\d{2})$/,Vd=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,rc=/^(\d{4,})-W(\d\d)$/,Wd=/^(\d{4,})-(\d\d)$/,Xd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Md=T();r(["date","datetime-local","month","time","week"],function(a){Md[a]=!0});var Yd={text:function(a,b,d,c,e,f){lb(a,b,d,c,e,f);pc(c)},date:mb("date",Ud,Nb(Ud,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":mb("datetimelocal",Vd,Nb(Vd,"yyyy MM dd HH mm ss sss".split(" ")),
"yyyy-MM-ddTHH:mm:ss.sss"),time:mb("time",Xd,Nb(Xd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:mb("week",rc,function(a,b){if(ia(a))return a;if(F(a)){rc.lastIndex=0;var d=rc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,h=0,k=Id(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),h=b.getMilliseconds());return new Date(c,0,k.getDate()+e,d,f,g,h)}}return NaN},"yyyy-Www"),month:mb("month",Wd,Nb(Wd,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Nd(a,b,d,c);lb(a,b,d,c,e,f);c.$$parserName=
"number";c.$parsers.push(function(a){if(c.$isEmpty(a))return null;if(Mg.test(a))return parseFloat(a)});c.$formatters.push(function(a){if(!c.$isEmpty(a)){if(!S(a))throw nb("numfmt",a);a=a.toString()}return a});if(x(d.min)||d.ngMin){var g;c.$validators.min=function(a){return c.$isEmpty(a)||w(g)||a>=g};d.$observe("min",function(a){x(a)&&!S(a)&&(a=parseFloat(a,10));g=S(a)&&!isNaN(a)?a:void 0;c.$validate()})}if(x(d.max)||d.ngMax){var h;c.$validators.max=function(a){return c.$isEmpty(a)||w(h)||a<=h};d.$observe("max",
function(a){x(a)&&!S(a)&&(a=parseFloat(a,10));h=S(a)&&!isNaN(a)?a:void 0;c.$validate()})}},url:function(a,b,d,c,e,f){lb(a,b,d,c,e,f);pc(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||Kg.test(d)}},email:function(a,b,d,c,e,f){lb(a,b,d,c,e,f);pc(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||Lg.test(d)}},radio:function(a,b,d,c){w(d.name)&&b.attr("name",++pb);b.on("click",function(a){b[0].checked&&c.$setViewValue(d.value,
a&&a.type)});c.$render=function(){b[0].checked=d.value==c.$viewValue};d.$observe("value",c.$render)},checkbox:function(a,b,d,c,e,f,g,h){var k=Od(h,a,"ngTrueValue",d.ngTrueValue,!0),l=Od(h,a,"ngFalseValue",d.ngFalseValue,!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return na(a,k)});c.$parsers.push(function(a){return a?k:l})},hidden:A,button:A,submit:A,reset:A,
file:A},Gc=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,h){h[0]&&(Yd[M(g.type)]||Yd.text)(e,f,g,h[0],b,a,d,c)}}}}],Ng=/^(true|false|\d+)$/,Ve=function(){return{restrict:"A",priority:100,compile:function(a,b){return Ng.test(b.ngValue)?function(a,b,e){e.$set("value",a.$eval(e.ngValue))}:function(a,b,e){a.$watch(e.ngValue,function(a){e.$set("value",a)})}}}},ve=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);
return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=w(a)?"":a})}}}}],xe=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=w(a)?"":a})}}}}],we=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=
b(e.ngBindHtml,function(b){return a.valueOf(b)});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){var d=f(b);c.html(a.getTrustedHtml(d)||"")})}}}}],Ue=da({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),ye=qc("",!0),Ae=qc("Odd",0),ze=qc("Even",1),Be=Ma({compile:function(a,b){b.$set("ngCloak",void 0);a.removeClass("ng-cloak")}}),Ce=[function(){return{restrict:"A",scope:!0,controller:"@",
priority:500}}],Lc={},Og={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=xa("ng-"+a);Lc[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=d(f[b],null,!0);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};Og[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Fe=["$animate","$compile",function(a,
b){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,e,f,g){var h,k,l;d.$watch(e.ngIf,function(d){d?k||g(function(d,f){k=f;d[d.length++]=b.$$createComment("end ngIf",e.ngIf);h={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=tb(h.clone),a.leave(l).then(function(){l=null}),h=null))})}}}],Ge=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,
transclude:"element",controller:ea.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",h=e.autoscroll;return function(c,e,m,n,p){var s=0,r,t,q,w=function(){t&&(t.remove(),t=null);r&&(r.$destroy(),r=null);q&&(d.leave(q).then(function(){t=null}),t=q,q=null)};c.$watch(f,function(f){var m=function(){!x(h)||h&&!c.$eval(h)||b()},t=++s;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&t===s){var b=c.$new();n.template=a;a=p(b,function(a){w();d.enter(a,null,e).then(m)});r=b;q=a;r.$emit("$includeContentLoaded",
f);c.$eval(g)}},function(){c.$$destroyed||t!==s||(w(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(w(),n.template=null)})}}}}],Xe=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){ka.call(d[0]).match(/SVG/)?(d.empty(),a(Oc(e.template,E.document).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],He=Ma({priority:450,compile:function(){return{pre:function(a,
b,d){a.$eval(d.ngInit)}}}}),Te=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=b.attr(d.$attr.ngList)||", ",f="false"!==d.ngTrim,g=f?W(e):e;c.$parsers.push(function(a){if(!w(a)){var b=[];a&&r(a.split(g),function(a){a&&b.push(f?W(a):a)});return b}});c.$formatters.push(function(a){if(J(a))return a.join(e)});c.$isEmpty=function(a){return!a||!a.length}}}},ob="ng-valid",Pd="ng-invalid",Va="ng-pristine",Mb="ng-dirty",Rd="ng-pending",nb=O("ngModel"),Pg=["$scope",
"$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,c,e,f,g,h,k,l){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=void 0;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=void 0;this.$name=l(d.name||"",!1)(a);
this.$$parentForm=Lb;var m=e(d.ngModel),n=m.assign,p=m,s=n,t=null,I,q=this;this.$$setOptions=function(a){if((q.$options=a)&&a.getterSetter){var b=e(d.ngModel+"()"),f=e(d.ngModel+"($$$p)");p=function(a){var c=m(a);z(c)&&(c=b(a));return c};s=function(a,b){z(m(a))?f(a,{$$$p:b}):n(a,b)}}else if(!m.assign)throw nb("nonassign",d.ngModel,va(c));};this.$render=A;this.$isEmpty=function(a){return w(a)||""===a||null===a||a!==a};this.$$updateEmptyClasses=function(a){q.$isEmpty(a)?(f.removeClass(c,"ng-not-empty"),
f.addClass(c,"ng-empty")):(f.removeClass(c,"ng-empty"),f.addClass(c,"ng-not-empty"))};var K=0;Ld({ctrl:this,$element:c,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},$animate:f});this.$setPristine=function(){q.$dirty=!1;q.$pristine=!0;f.removeClass(c,Mb);f.addClass(c,Va)};this.$setDirty=function(){q.$dirty=!0;q.$pristine=!1;f.removeClass(c,Va);f.addClass(c,Mb);q.$$parentForm.$setDirty()};this.$setUntouched=function(){q.$touched=!1;q.$untouched=!0;f.setClass(c,"ng-untouched","ng-touched")};
this.$setTouched=function(){q.$touched=!0;q.$untouched=!1;f.setClass(c,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){g.cancel(t);q.$viewValue=q.$$lastCommittedViewValue;q.$render()};this.$validate=function(){if(!S(q.$modelValue)||!isNaN(q.$modelValue)){var a=q.$$rawModelValue,b=q.$valid,c=q.$modelValue,d=q.$options&&q.$options.allowInvalid;q.$$runValidators(a,q.$$lastCommittedViewValue,function(e){d||b===e||(q.$modelValue=e?a:void 0,q.$modelValue!==c&&q.$$writeModelToScope())})}};
this.$$runValidators=function(a,b,c){function d(){var c=!0;r(q.$validators,function(d,e){var g=d(a,b);c=c&&g;f(e,g)});return c?!0:(r(q.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;r(q.$asyncValidators,function(e,g){var h=e(a,b);if(!h||!z(h.then))throw nb("nopromise",h);f(g,void 0);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?k.all(c).then(function(){g(d)},A):g(!0)}function f(a,b){h===K&&q.$setValidity(a,b)}function g(a){h===K&&c(a)}K++;var h=
K;(function(){var a=q.$$parserName||"parse";if(w(I))f(a,null);else return I||(r(q.$validators,function(a,b){f(b,null)}),r(q.$asyncValidators,function(a,b){f(b,null)})),f(a,I),I;return!0})()?d()?e():g(!1):g(!1)};this.$commitViewValue=function(){var a=q.$viewValue;g.cancel(t);if(q.$$lastCommittedViewValue!==a||""===a&&q.$$hasNativeValidators)q.$$updateEmptyClasses(a),q.$$lastCommittedViewValue=a,q.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var b=q.$$lastCommittedViewValue;
if(I=w(b)?void 0:!0)for(var c=0;c<q.$parsers.length;c++)if(b=q.$parsers[c](b),w(b)){I=!1;break}S(q.$modelValue)&&isNaN(q.$modelValue)&&(q.$modelValue=p(a));var d=q.$modelValue,e=q.$options&&q.$options.allowInvalid;q.$$rawModelValue=b;e&&(q.$modelValue=b,q.$modelValue!==d&&q.$$writeModelToScope());q.$$runValidators(b,q.$$lastCommittedViewValue,function(a){e||(q.$modelValue=a?b:void 0,q.$modelValue!==d&&q.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,q.$modelValue);r(q.$viewChangeListeners,
function(a){try{a()}catch(c){b(c)}})};this.$setViewValue=function(a,b){q.$viewValue=a;q.$options&&!q.$options.updateOnDefault||q.$$debounceViewValueCommit(b)};this.$$debounceViewValueCommit=function(b){var c=0,d=q.$options;d&&x(d.debounce)&&(d=d.debounce,S(d)?c=d:S(d[b])?c=d[b]:S(d["default"])&&(c=d["default"]));g.cancel(t);c?t=g(function(){q.$commitViewValue()},c):h.$$phase?q.$commitViewValue():a.$apply(function(){q.$commitViewValue()})};a.$watch(function(){var b=p(a);if(b!==q.$modelValue&&(q.$modelValue===
q.$modelValue||b===b)){q.$modelValue=q.$$rawModelValue=b;I=void 0;for(var c=q.$formatters,d=c.length,e=b;d--;)e=c[d](e);q.$viewValue!==e&&(q.$$updateEmptyClasses(e),q.$viewValue=q.$$lastCommittedViewValue=e,q.$render(),q.$$runValidators(b,e,A))}return b})}],Se=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Pg,priority:1,compile:function(b){b.addClass(Va).addClass("ng-untouched").addClass(ob);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||
g.$$parentForm;g.$$setOptions(f[2]&&f[2].$options);b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)c.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(){g.$touched||(a.$$phase?b.$evalAsync(g.$setTouched):b.$apply(g.$setTouched))})}}}}}],Qg=/(\s+|^)default(\s+|$)/,We=function(){return{restrict:"A",
controller:["$scope","$attrs",function(a,b){var d=this;this.$options=Z(a.$eval(b.ngModelOptions));x(this.$options.updateOn)?(this.$options.updateOnDefault=!1,this.$options.updateOn=W(this.$options.updateOn.replace(Qg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ie=Ma({terminal:!0,priority:1E3}),Rg=O("ngOptions"),Sg=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
Qe=["$compile","$document","$parse",function(a,b,d){function c(a,b,c){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function f(a){var b;if(!r&&oa(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var n=a.match(Sg);if(!n)throw Rg("iexp",a,va(b));var p=n[5]||n[7],r=n[6];a=/ as /.test(n[0])&&n[1];var t=n[9];b=d(n[2]?n[1]:p);var x=a&&d(a)||b,q=t&&d(t),w=t?function(a,b){return q(c,b)}:function(a){return Ga(a)},
v=function(a,b){return w(a,D(a,b))},u=d(n[2]||n[1]),y=d(n[3]||""),A=d(n[4]||""),z=d(n[8]),C={},D=r?function(a,b){C[r]=b;C[p]=a;return C}:function(a){C[p]=a;return C};return{trackBy:t,getTrackByValue:v,getWatchables:d(z,function(a){var b=[];a=a||[];for(var d=f(a),e=d.length,g=0;g<e;g++){var h=a===d?g:d[g],l=a[h],h=D(l,h),l=w(l,h);b.push(l);if(n[2]||n[1])l=u(c,h),b.push(l);n[4]&&(h=A(c,h),b.push(h))}return b}),getOptions:function(){for(var a=[],b={},d=z(c)||[],g=f(d),h=g.length,n=0;n<h;n++){var p=d===
g?n:g[n],q=D(d[p],p),r=x(c,q),p=w(r,q),s=u(c,q),C=y(c,q),q=A(c,q),r=new e(p,r,s,C,q);a.push(r);b[p]=r}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[v(a)]},getViewValueFromOption:function(a){return t?ea.copy(a.viewValue):a.viewValue}}}}}var e=E.document.createElement("option"),f=E.document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=A},post:function(d,h,k,l){function m(a,b){a.element=
b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);a.value!==b.value&&(b.value=a.selectValue)}function n(){var a=y&&p.readValue();if(y)for(var b=y.items.length-1;0<=b;b--){var c=y.items[b];c.group?Db(c.element.parentNode):Db(c.element)}y=z.getOptions();var d={};v&&h.prepend(w);y.items.forEach(function(a){var b;if(x(a.group)){b=d[a.group];b||(b=f.cloneNode(!1),E.appendChild(b),b.label=a.group,d[a.group]=b);var c=e.cloneNode(!1)}else b=E,c=e.cloneNode(!1);b.appendChild(c);
m(a,c)});h[0].appendChild(E);s.$render();s.$isEmpty(a)||(b=p.readValue(),(z.trackBy||t?na(a,b):a===b)||(s.$setViewValue(b),s.$render()))}var p=l[0],s=l[1],t=k.multiple,w;l=0;for(var q=h.children(),A=q.length;l<A;l++)if(""===q[l].value){w=q.eq(l);break}var v=!!w,u=B(e.cloneNode(!1));u.val("?");var y,z=c(k.ngOptions,h,d),E=b[0].createDocumentFragment();t?(s.$isEmpty=function(a){return!a||0===a.length},p.writeValue=function(a){y.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){if(a=
y.getOptionFromViewValue(a))a.element.selected=!0})},p.readValue=function(){var a=h.val()||[],b=[];r(a,function(a){(a=y.selectValueMap[a])&&!a.disabled&&b.push(y.getViewValueFromOption(a))});return b},z.trackBy&&d.$watchCollection(function(){if(J(s.$viewValue))return s.$viewValue.map(function(a){return z.getTrackByValue(a)})},function(){s.$render()})):(p.writeValue=function(a){var b=y.getOptionFromViewValue(a);b?(h[0].value!==b.selectValue&&(u.remove(),v||w.remove(),h[0].value=b.selectValue,b.element.selected=
!0),b.element.setAttribute("selected","selected")):null===a||v?(u.remove(),v||h.prepend(w),h.val(""),w.prop("selected",!0),w.attr("selected",!0)):(v||w.remove(),h.prepend(u),h.val("?"),u.prop("selected",!0),u.attr("selected",!0))},p.readValue=function(){var a=y.selectValueMap[h.val()];return a&&!a.disabled?(v||w.remove(),u.remove(),y.getViewValueFromOption(a)):null},z.trackBy&&d.$watch(function(){return z.getTrackByValue(s.$viewValue)},function(){s.$render()}));v?(w.remove(),a(w)(d),w.removeClass("ng-scope")):
w=B(e.cloneNode(!1));h.empty();n();d.$watchCollection(z.getWatchables,n)}}}}],Je=["$locale","$interpolate","$log",function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,h){function k(a){g.text(a||"")}var l=h.count,m=h.$attr.when&&g.attr(h.$attr.when),n=h.offset||0,p=f.$eval(m)||{},s={},t=b.startSymbol(),x=b.endSymbol(),q=t+l+"-"+n+x,z=ea.noop,v;r(h,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+M(c[2]),p[c]=g.attr(h.$attr[b]))});r(p,function(a,d){s[d]=b(a.replace(c,q))});f.$watch(l,
function(b){var c=parseFloat(b),e=isNaN(c);e||c in p||(c=a.pluralCat(c-n));c===v||e&&S(v)&&isNaN(v)||(z(),e=s[c],w(e)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),z=A,k()):z=f.$watch(e,k),v=c)})}}}],Ke=["$parse","$animate","$compile",function(a,b,d){var c=O("ngRepeat"),e=function(a,b,c,d,e,m,n){a[c]=d;e&&(a[e]=m);a.$index=b;a.$first=0===b;a.$last=b===n-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,
terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,k=d.$$createComment("end ngRepeat",h),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw c("iexp",h);var m=l[1],n=l[2],p=l[3],s=l[4],l=m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!l)throw c("iidexp",m);var t=l[3]||l[1],w=l[2];if(p&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p)))throw c("badident",
p);var q,x,v,u,y={$id:Ga};s?q=a(s):(v=function(a,b){return Ga(b)},u=function(a){return a});return function(a,d,f,g,l){q&&(x=function(b,c,d){w&&(y[w]=b);y[t]=c;y.$index=d;return q(a,y)});var m=T();a.$watchCollection(n,function(f){var g,n,q=d[0],s,y=T(),z,A,E,C,D,B,F;p&&(a[p]=f);if(oa(f))D=f,n=x||v;else for(F in n=x||u,D=[],f)sa.call(f,F)&&"$"!==F.charAt(0)&&D.push(F);z=D.length;F=Array(z);for(g=0;g<z;g++)if(A=f===D?g:D[g],E=f[A],C=n(A,E,g),m[C])B=m[C],delete m[C],y[C]=B,F[g]=B;else{if(y[C])throw r(F,
function(a){a&&a.scope&&(m[a.id]=a)}),c("dupes",h,C,E);F[g]={id:C,scope:void 0,clone:void 0};y[C]=!0}for(s in m){B=m[s];C=tb(B.clone);b.leave(C);if(C[0].parentNode)for(g=0,n=C.length;g<n;g++)C[g].$$NG_REMOVED=!0;B.scope.$destroy()}for(g=0;g<z;g++)if(A=f===D?g:D[g],E=f[A],B=F[g],B.scope){s=q;do s=s.nextSibling;while(s&&s.$$NG_REMOVED);B.clone[0]!=s&&b.move(tb(B.clone),null,q);q=B.clone[B.clone.length-1];e(B.scope,g,t,E,w,A,z)}else l(function(a,c){B.scope=c;var d=k.cloneNode(!1);a[a.length++]=d;b.enter(a,
null,q);q=d;B.clone=a;y[B.id]=B;e(B.scope,g,t,E,w,A,z)});m=y})}}}}],Le=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ee=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Me=Ma(function(a,b,d){a.$watch(d.ngStyle,function(a,
d){d&&a!==d&&r(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),Ne=["$animate","$compile",function(a,b){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(d,c,e,f){var g=[],h=[],k=[],l=[],m=function(a,b){return function(){a.splice(b,1)}};d.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=k.length;d<e;++d)a.cancel(k[d]);d=k.length=0;for(e=l.length;d<e;++d){var t=tb(h[d].clone);l[d].$destroy();(k[d]=a.leave(t)).then(m(k,d))}h.length=0;l.length=0;(g=f.cases["!"+
c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],Oe=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["!"+d.ngSwitchWhen]=c.cases["!"+d.ngSwitchWhen]||[];c.cases["!"+d.ngSwitchWhen].push({transclude:e,element:b})}}),Pe=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,
b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),Tg=O("ngTransclude"),Re=Ma({restrict:"EAC",link:function(a,b,d,c,e){d.ngTransclude===d.$attr.ngTransclude&&(d.ngTransclude="");if(!e)throw Tg("orphan",va(b));e(function(a){a.length&&(b.empty(),b.append(a))},null,d.ngTransclude||d.ngTranscludeSlot)}}),re=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"==d.type&&a.put(d.id,b[0].text)}}}],Ug={$setViewValue:A,$render:A},
Vg=["$element","$scope",function(a,b){var d=this,c=new Sa;d.ngModelCtrl=Ug;d.unknownOption=B(E.document.createElement("option"));d.renderUnknownOption=function(b){b="? "+Ga(b)+" ?";d.unknownOption.val(b);a.prepend(d.unknownOption);a.val(b)};b.$on("$destroy",function(){d.renderUnknownOption=A});d.removeUnknownOption=function(){d.unknownOption.parent()&&d.unknownOption.remove()};d.readValue=function(){d.removeUnknownOption();return a.val()};d.writeValue=function(b){d.hasOption(b)?(d.removeUnknownOption(),
a.val(b),""===b&&d.emptyOption.prop("selected",!0)):null==b&&d.emptyOption?(d.removeUnknownOption(),a.val("")):d.renderUnknownOption(b)};d.addOption=function(a,b){if(8!==b[0].nodeType){Ra(a,'"option value"');""===a&&(d.emptyOption=b);var g=c.get(a)||0;c.put(a,g+1);d.ngModelCtrl.$render();b[0].hasAttribute("selected")&&(b[0].selected=!0)}};d.removeOption=function(a){var b=c.get(a);b&&(1===b?(c.remove(a),""===a&&(d.emptyOption=void 0)):c.put(a,b-1))};d.hasOption=function(a){return!!c.get(a)};d.registerOption=
function(a,b,c,h,k){if(h){var l;c.$observe("value",function(a){x(l)&&d.removeOption(l);l=a;d.addOption(a,b)})}else k?a.$watch(k,function(a,e){c.$set("value",a);e!==a&&d.removeOption(e);d.addOption(a,b)}):d.addOption(c.value,b);b.on("$destroy",function(){d.removeOption(c.value);d.ngModelCtrl.$render()})}}],se=function(){return{restrict:"E",require:["select","?ngModel"],controller:Vg,priority:1,link:{pre:function(a,b,d,c){var e=c[1];if(e){var f=c[0];f.ngModelCtrl=e;b.on("change",function(){a.$apply(function(){e.$setViewValue(f.readValue())})});
if(d.multiple){f.readValue=function(){var a=[];r(b.find("option"),function(b){b.selected&&a.push(b.value)});return a};f.writeValue=function(a){var c=new Sa(a);r(b.find("option"),function(a){a.selected=x(c.get(a.value))})};var g,h=NaN;a.$watch(function(){h!==e.$viewValue||na(g,e.$viewValue)||(g=ga(e.$viewValue),e.$render());h=e.$viewValue});e.$isEmpty=function(a){return!a||0===a.length}}}},post:function(a,b,d,c){var e=c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},ue=["$interpolate",
function(a){return{restrict:"E",priority:100,compile:function(b,d){if(x(d.value))var c=a(d.value,!0);else{var e=a(b.text(),!0);e||d.$set("value",b.text())}return function(a,b,d){var k=b.parent();(k=k.data("$selectController")||k.parent().data("$selectController"))&&k.registerOption(a,b,d,c,e)}}}}],te=da({restrict:"E",terminal:!1}),Ic=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",
function(){c.$validate()}))}}},Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){F(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw O("ngPattern")("noregexp",f,a,va(b));e=a||void 0;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||w(e)||e.test(b)}}}}},Kc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=
aa(a);e=isNaN(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||b.length<=e}}}}},Jc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=aa(a)||0;c.$validate()});c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};E.angular.bootstrap?E.console&&console.log("WARNING: Tried to load angular more than once."):(ke(),me(ea),ea.module("ngLocale",[],["$provide",function(a){function b(a){a+=
"";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),
WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,
c){var e=a|0,f=c;void 0===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),B(E.document).ready(function(){ge(E.document,Bc)}))})(window);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

/*global angular:true, browser:true */

/**
 * @license HTTP Auth Interceptor Module for AngularJS
 * (c) 2012 Witold Szczerba
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer'])

  .factory('authService', ['$rootScope','httpBuffer', function($rootScope, httpBuffer) {
    return {
      /**
       * Call this function to indicate that authentication was successfull and trigger a
       * retry of all deferred requests.
       * @param data an optional argument to pass on to $broadcast which may be useful for
       * example if you need to pass through details of the user that was logged in
       * @param configUpdater an optional transformation function that can modify the
       * requests that are retried after having logged in.  This can be used for example
       * to add an authentication token.  It must return the request.
       */
      loginConfirmed: function(data, configUpdater) {
        var updater = configUpdater || function(config) {return config;};
        $rootScope.$broadcast('event:auth-loginConfirmed', data);
        httpBuffer.retryAll(updater);
      },

      /**
       * Call this function to indicate that authentication should not proceed.
       * All deferred requests will be abandoned or rejected (if reason is provided).
       * @param data an optional argument to pass on to $broadcast.
       * @param reason if provided, the requests are rejected; abandoned otherwise.
       */
      loginCancelled: function(data, reason) {
        httpBuffer.rejectAll(reason);
        $rootScope.$broadcast('event:auth-loginCancelled', data);
      }
    };
  }])

  /**
   * $http interceptor.
   * On 401 response (without 'ignoreAuthModule' option) stores the request
   * and broadcasts 'event:auth-loginRequired'.
   * On 403 response (without 'ignoreAuthModule' option) discards the request
   * and broadcasts 'event:auth-forbidden'.
   */
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope', '$q', 'httpBuffer', function($rootScope, $q, httpBuffer) {
      return {
        responseError: function(rejection) {
          var config = rejection.config || {};
          if (!config.ignoreAuthModule) {
            switch (rejection.status) {
              case 401:
                var deferred = $q.defer();
                var bufferLength = httpBuffer.append(config, deferred);
                if (bufferLength === 1)
                  $rootScope.$broadcast('event:auth-loginRequired', rejection);
                return deferred.promise;
              case 403:
                $rootScope.$broadcast('event:auth-forbidden', rejection);
                break;
            }
          }
          // otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    }]);
  }]);

  /**
   * Private module, a utility, required internally by 'http-auth-interceptor'.
   */
  angular.module('http-auth-interceptor-buffer', [])

  .factory('httpBuffer', ['$injector', function($injector) {
    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];

    /** Service initialized later because of circular dependency problem. */
    var $http;

    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    return {
      /**
       * Appends HTTP request configuration object with deferred response attached to buffer.
       * @return {Number} The new length of the buffer.
       */
      append: function(config, deferred) {
        return buffer.push({
          config: config,
          deferred: deferred
        });
      },

      /**
       * Abandon or reject (if reason provided) all the buffered requests.
       */
      rejectAll: function(reason) {
        if (reason) {
          for (var i = 0; i < buffer.length; ++i) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },

      /**
       * Retries all the buffered requests clears the buffer.
       */
      retryAll: function(updater) {
        for (var i = 0; i < buffer.length; ++i) {
          var _cfg = updater(buffer[i].config);
          if (_cfg !== false)
            retryHttpRequest(_cfg, buffer[i].deferred);
        }
        buffer = [];
      }
    };
  }]);
})();

angular.module('fi.seco.sparql', []);
var fi;
(function (fi) {
    var seco;
    (function (seco) {
        var sparql;
        (function (sparql) {
            'use strict';
            var SparqlService = (function () {
                function SparqlService($http, $q) {
                    this.$http = $http;
                    this.$q = $q;
                }/*<auto_generate>*/SparqlService.$inject = ['$http','$q']; SparqlService.$componentName = 'sparqlService'/*</auto_generate>*/
                SparqlService.stringToSPARQLString = function (string) {
                    return '"' + string.replace(/"/g, '\\"') + '"';
                };
                SparqlService.bindingsToObject = function (result) {
                    var ret = {};
                    for (var key in result) {
                        ret[key] = SparqlService.bindingToValue(result[key]);
                    }
                    return ret;
                };
                SparqlService.bindingToValue = function (binding) {
                    if (!binding)
                        return undefined;
                    if (binding.type === 'uri')
                        return binding.value;
                    else if (binding.type === 'bnode')
                        return binding.value;
                    else if (binding.datatype)
                        switch (binding.datatype) {
                            case 'http://www.w3.org/2001/XMLSchema#integer':
                            case 'http://www.w3.org/2001/XMLSchema#decimal': return parseInt(binding.value, 10);
                            case 'http://www.w3.org/2001/XMLSchema#float':
                            case 'http://www.w3.org/2001/XMLSchema#double': return parseFloat(binding.value);
                            case 'http://www.w3.org/2001/XMLSchema#boolean': return binding.value ? true : false;
                            default:
                        }
                    return binding.value;
                };
                SparqlService.bindingToString = function (binding) {
                    if (!binding)
                        return 'UNDEF';
                    else {
                        var value = binding.value.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\b]/g, '\\b').replace(/\f/g, '\\f').replace(/\"/g, '\\"').replace(/\'/g, '\\\'');
                        if (binding.type === 'uri')
                            return '<' + value + '>';
                        else if (binding.type === 'bnode')
                            return '_:' + value;
                        else if (binding.datatype)
                            switch (binding.datatype) {
                                case 'http://www.w3.org/2001/XMLSchema#integer':
                                case 'http://www.w3.org/2001/XMLSchema#decimal':
                                case 'http://www.w3.org/2001/XMLSchema#double':
                                case 'http://www.w3.org/2001/XMLSchema#boolean': return value;
                                case 'http://www.w3.org/2001/XMLSchema#string': return '"' + value + '"';
                                default: return '"' + value + '"^^<' + binding.datatype + '>';
                            }
                        else if (binding['xml:lang'])
                            return '"' + value + '"@' + binding['xml:lang'];
                        else
                            return '"' + value + '"';
                    }
                };
                SparqlService.prototype.check = function (endpoint, params) {
                    var deferred = this.$q.defer();
                    this.$http(angular.extend({
                        method: 'GET',
                        url: endpoint,
                        params: { query: 'ASK {}' },
                        headers: { 'Accept': 'application/sparql-results+json' }
                    }, params)).then(function (response) { return deferred.resolve(response.data.boolean === true); }, function (response) { return deferred.resolve(false); });
                    return deferred.promise;
                };
                SparqlService.prototype.checkUpdate = function (endpoint, params) {
                    var deferred = this.$q.defer();
                    this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint,
                        headers: { 'Content-Type': 'application/sparql-update' },
                        data: 'INSERT DATA {}'
                    }, params)).then(function (response) { return deferred.resolve(response.status === 204); }, function (response) { return deferred.resolve(false); });
                    return deferred.promise;
                };
                SparqlService.prototype.checkRest = function (endpoint, params) {
                    var deferred = this.$q.defer();
                    this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint + '?default',
                        data: '',
                        headers: { 'Content-Type': 'text/turtle' }
                    }, params)).then(function (response) { return deferred.resolve(response.status === 204); }, function (response) { return deferred.resolve(false); });
                    return deferred.promise;
                };
                SparqlService.prototype.get = function (endpoint, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'GET',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' },
                        headers: { 'Accept': 'text/turtle' }
                    }, params));
                };
                SparqlService.prototype.post = function (endpoint, graph, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' },
                        data: graph,
                        headers: { 'Content-Type': 'text/turtle' }
                    }, params));
                };
                SparqlService.prototype.put = function (endpoint, graph, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'PUT',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' },
                        data: graph,
                        headers: { 'Content-Type': 'text/turtle' }
                    }, params));
                };
                SparqlService.prototype.delete = function (endpoint, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'DELETE',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' }
                    }, params));
                };
                SparqlService.prototype.query = function (endpoint, query, params) {
                    if (query.length <= 2048)
                        return this.$http(angular.extend({
                            method: 'GET',
                            url: endpoint,
                            params: { query: query },
                            headers: { 'Accept': 'application/sparql-results+json' }
                        }, params));
                    else
                        return this.$http(angular.extend({
                            method: 'POST',
                            url: endpoint,
                            data: query,
                            headers: {
                                'Content-Type': 'application/sparql-query',
                                'Accept': 'application/sparql-results+json'
                            }
                        }, params));
                };
                SparqlService.prototype.construct = function (endpoint, query, params) {
                    if (query.length <= 2048)
                        return this.$http(angular.extend({
                            method: 'GET',
                            url: endpoint,
                            params: { query: query },
                            headers: { 'Accept': 'text/turtle' }
                        }, params));
                    else
                        return this.$http(angular.extend({
                            method: 'POST',
                            url: endpoint,
                            data: query,
                            headers: {
                                'Content-Type': 'application/sparql-query',
                                'Accept': 'text/turtle'
                            }
                        }, params));
                };
                SparqlService.prototype.update = function (endpoint, query, params) {
                    return this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint,
                        headers: { 'Content-Type': 'application/sparql-update' },
                        data: query
                    }, params));
                };
                return SparqlService;
            })();/*<auto_generate>*/angular.module('fi.seco.sparql').service('sparqlService',SparqlService);/*</auto_generate>*/
            sparql.SparqlService = SparqlService;
        })(sparql = seco.sparql || (seco.sparql = {}));
    })(seco = fi.seco || (fi.seco = {}));
})(fi || (fi = {}));

//# sourceMappingURL=sparql-service.js.map

var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra', ['fi.seco.sparql', 'http-auth-interceptor']);
    m.run(function ($rootScope, workerWorkerService) {
        $rootScope.$on('event:auth-loginRequired', function () { return workerWorkerService.$broadcast('event:auth-loginRequired'); });
    });
    m.run(function ($rootScope, authService, $http) {
        $rootScope.$on('main:auth-loginAuthInfo', function (event, authorization) {
            $http.defaults.headers.common['Authorization'] = authorization;
            authService.loginConfirmed();
        });
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24td29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQWVkO0FBZkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaLElBQUksQ0FBQyxHQUFvQixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQTtJQUU3RixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBcUMsRUFBRSxtQkFBd0M7UUFDcEYsVUFBVSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxjQUFNLE9BQUEsbUJBQW1CLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLEVBQTFELENBQTBELENBQUMsQ0FBQTtJQUM5RyxDQUFDLENBQUMsQ0FBQTtJQUVGLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFxQyxFQUFFLFdBQTBDLEVBQUUsS0FBMkI7UUFDbkgsVUFBVSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxVQUFDLEtBQTRCLEVBQUUsYUFBcUI7WUFDNUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQTtZQUMvRCxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsRUFmUyxLQUFLLEtBQUwsS0FBSyxRQWVkIiwiZmlsZSI6InNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24td29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IG06IGFuZ3VsYXIuSU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdmaWJyYScsIFsnZmkuc2Vjby5zcGFycWwnLCAnaHR0cC1hdXRoLWludGVyY2VwdG9yJ10pXG5cbiAgbS5ydW4oKCRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsIHdvcmtlcldvcmtlclNlcnZpY2U6IFdvcmtlcldvcmtlclNlcnZpY2UpID0+IHtcbiAgICAkcm9vdFNjb3BlLiRvbignZXZlbnQ6YXV0aC1sb2dpblJlcXVpcmVkJywgKCkgPT4gd29ya2VyV29ya2VyU2VydmljZS4kYnJvYWRjYXN0KCdldmVudDphdXRoLWxvZ2luUmVxdWlyZWQnKSlcbiAgfSlcblxuICBtLnJ1bigoJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSwgYXV0aFNlcnZpY2U6IGFuZ3VsYXIuaHR0cEF1dGguSUF1dGhTZXJ2aWNlLCAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UpID0+IHtcbiAgICAkcm9vdFNjb3BlLiRvbignbWFpbjphdXRoLWxvZ2luQXV0aEluZm8nLCAoZXZlbnQ6IGFuZ3VsYXIuSUFuZ3VsYXJFdmVudCwgYXV0aG9yaXphdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzIS5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9IGF1dGhvcml6YXRpb25cbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ29uZmlybWVkKClcbiAgICB9KVxuICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra');
    m.service('workerServicePrototypeMappingConfiguration', function () {
        return {
            'Object': Object.prototype,
            'Configuration': fibra.Configuration.prototype,
            'NamedNode': fibra.NamedNode.prototype,
            'Node': fibra.Node.prototype,
            'DataModelConfiguration': fibra.DataModelConfiguration.prototype,
            'Item': fibra.Item.prototype,
            'PropertyToValues': fibra.PropertyToValues.prototype,
            'SourcedNodePlusLabel': fibra.SourcedNodePlusLabel.prototype
        };
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQWdCZDtBQWhCRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFaEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0Q0FBNEMsRUFBRTtRQUN0RCxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDMUIsZUFBZSxFQUFFLG1CQUFhLENBQUMsU0FBUztZQUN4QyxXQUFXLEVBQUUsZUFBUyxDQUFDLFNBQVM7WUFDaEMsTUFBTSxFQUFFLFVBQUksQ0FBQyxTQUFTO1lBQ3RCLHdCQUF3QixFQUFFLDRCQUFzQixDQUFDLFNBQVM7WUFDMUQsTUFBTSxFQUFFLFVBQUksQ0FBQyxTQUFTO1lBQ3RCLGtCQUFrQixFQUFFLHNCQUFnQixDQUFDLFNBQVM7WUFDOUMsc0JBQXNCLEVBQUUsMEJBQW9CLENBQUMsU0FBUztTQUN2RCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLEVBaEJTLEtBQUssS0FBTCxLQUFLLFFBZ0JkIiwiZmlsZSI6InNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGxldCBtOiBhbmd1bGFyLklNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZmlicmEnKVxuXG4gIG0uc2VydmljZSgnd29ya2VyU2VydmljZVByb3RvdHlwZU1hcHBpbmdDb25maWd1cmF0aW9uJywgZnVuY3Rpb24oKToge30ge1xuICAgIHJldHVybiB7XG4gICAgICAnT2JqZWN0JzogT2JqZWN0LnByb3RvdHlwZSxcbiAgICAgICdDb25maWd1cmF0aW9uJzogQ29uZmlndXJhdGlvbi5wcm90b3R5cGUsXG4gICAgICAnTmFtZWROb2RlJzogTmFtZWROb2RlLnByb3RvdHlwZSxcbiAgICAgICdOb2RlJzogTm9kZS5wcm90b3R5cGUsXG4gICAgICAnRGF0YU1vZGVsQ29uZmlndXJhdGlvbic6IERhdGFNb2RlbENvbmZpZ3VyYXRpb24ucHJvdG90eXBlLFxuICAgICAgJ0l0ZW0nOiBJdGVtLnByb3RvdHlwZSxcbiAgICAgICdQcm9wZXJ0eVRvVmFsdWVzJzogUHJvcGVydHlUb1ZhbHVlcy5wcm90b3R5cGUsXG4gICAgICAnU291cmNlZE5vZGVQbHVzTGFiZWwnOiBTb3VyY2VkTm9kZVBsdXNMYWJlbC5wcm90b3R5cGVcbiAgICB9XG4gIH0pXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var WorkerServiceConfiguration = (function () {
        function WorkerServiceConfiguration(appName, workerThreads, importScripts) {
            this.appName = appName;
            this.workerThreads = workerThreads;
            this.importScripts = importScripts;
        }
        return WorkerServiceConfiguration;
    }());
    fibra.WorkerServiceConfiguration = WorkerServiceConfiguration;
    var WorkerService = (function () {
        function WorkerService(workerServiceConfiguration, workerServicePrototypeMappingConfiguration, $rootScope, $window, $q) {
            var _this = this;
            this.workerServicePrototypeMappingConfiguration = workerServicePrototypeMappingConfiguration;
            this.$q = $q;
            this.currentWorker = 0;
            this.deferreds = [];
            var path = $window.location.protocol + '//' + $window.location.host;
            var importScripts = workerServiceConfiguration.importScripts.map(function (s) {
                return s.indexOf('http') !== 0 ? path + (s.indexOf('/') !== 0 ? $window.location.pathname : '') + s : s;
            });
            var blobURL = ($window.URL).createObjectURL(new Blob([WorkerService.workerTemplate.replace(/<APP_NAME>/g, workerServiceConfiguration.appName).replace(/<IMPORT_SCRIPTS>/g, importScripts.join('\',\''))], { type: 'application/javascript' }));
            this.workers = [];
            for (var i = 0; i < workerServiceConfiguration.workerThreads; i++) {
                this.workers.push(new Worker(blobURL));
                this.workers[i].addEventListener('message', function (e) {
                    var eventId = e.data.event;
                    if (eventId === 'broadcast') {
                        $rootScope.$broadcast(e.data.name, _this.restorePrototypes(e.data.args));
                        $rootScope.$apply();
                    }
                    else {
                        var deferred = _this.deferreds[e.data.id];
                        if (deferred) {
                            delete _this.deferreds[e.data.id];
                            if (eventId === 'success')
                                deferred.resolve(_this.restorePrototypes(e.data.data));
                            else if (eventId === 'failure')
                                deferred.reject(_this.restorePrototypes(e.data.data));
                            else
                                deferred.notify(_this.restorePrototypes(e.data.data));
                        }
                    }
                });
            }
        }
        WorkerService.stripMarks = function (args) {
            if (!args || !args.__mark || typeof args !== 'object')
                return;
            delete args.__mark;
            if (args instanceof Array)
                args.forEach(function (arg) { return WorkerService.stripMarks(arg); });
            else {
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        WorkerService.stripMarks(args[key]);
            }
        };
        WorkerService.savePrototypes = function (args) {
            this.savePrototypesInternal(args);
            return args;
        };
        WorkerService.savePrototypesInternal = function (args) {
            if (!args || args.__className || typeof args !== 'object')
                return;
            if (args instanceof Array)
                args.forEach(function (arg) { return WorkerService.savePrototypes(arg); });
            else {
                if (args.constructor.name !== 'Object') {
                    var currentPrototype = Object.getPrototypeOf(args);
                    out: while (currentPrototype !== Object.prototype) {
                        for (var _i = 0, _a = Object.getOwnPropertyNames(currentPrototype); _i < _a.length; _i++) {
                            var prop = _a[_i];
                            if (prop !== 'constructor' && typeof (args.__proto__[prop]) === 'function') {
                                args.__className = args.constructor.name;
                                break out;
                            }
                        }
                        currentPrototype = Object.getPrototypeOf(currentPrototype);
                    }
                    if (!args.__className)
                        args.__className = 'Object';
                }
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        WorkerService.savePrototypes(args[key]);
            }
        };
        WorkerService.prototype.$broadcast = function (name, args) {
            this.workers.forEach(function (w) { return w.postMessage({ name: name, args: WorkerService.savePrototypes(args) }); });
        };
        WorkerService.prototype.callAll = function (service, method, args, canceller) {
            var _this = this;
            if (args === void 0) { args = []; }
            var deferred = this.$q.defer();
            this.deferreds.push(deferred);
            var id = this.deferreds.length - 1;
            var message = {
                id: id,
                service: service,
                method: method,
                args: WorkerService.savePrototypes(args)
            };
            if (canceller)
                canceller.then(function () {
                    _this.workers.forEach(function (worker) { return worker.postMessage({
                        id: id,
                        cancel: true
                    }); });
                    delete _this.deferreds[id];
                });
            this.workers.forEach(function (worker) { return worker.postMessage(message); });
            return deferred.promise;
        };
        WorkerService.prototype.call = function (service, method, args, canceller) {
            var _this = this;
            if (args === void 0) { args = []; }
            var deferred = this.$q.defer();
            this.deferreds.push(deferred);
            var id = this.deferreds.length - 1;
            var worker = this.workers[this.currentWorker];
            this.currentWorker = (this.currentWorker + 1) % this.workers.length;
            if (canceller)
                canceller.then(function () {
                    worker.postMessage({
                        id: id,
                        cancel: true
                    });
                    delete _this.deferreds[id];
                });
            worker.postMessage({
                id: id,
                service: service,
                method: method,
                args: WorkerService.savePrototypes(args)
            });
            return deferred.promise;
        };
        WorkerService.prototype.restorePrototypes = function (args) {
            this.restorePrototypesInternal(args);
            WorkerService.stripMarks(args);
            return args;
        };
        WorkerService.prototype.restorePrototypesInternal = function (args) {
            var _this = this;
            if (!args || args.__mark || typeof args !== 'object')
                return;
            args.__mark = true;
            if (args instanceof Array)
                args.forEach(function (arg) { return _this.restorePrototypesInternal(arg); });
            else {
                if (args.__className) {
                    var prototype = this.workerServicePrototypeMappingConfiguration[args.__className];
                    if (!prototype)
                        throw 'Unknown prototype ' + args.__className;
                    args.__proto__ = prototype;
                    delete args.__className;
                }
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        this.restorePrototypesInternal(args[key]);
            }
        };
        WorkerService.workerTemplate = "\n      var window = self\n      self.history = {}\n      self.Node = function () {}\n      var document = {\n        readyState: 'complete',\n        cookie: '',\n        querySelector: function () {},\n        createElement: function() {\n          return {\n            pathname: '',\n            setAttribute: function() {}\n          };\n        },\n      };\n      importScripts('<IMPORT_SCRIPTS>')\n      window.angular.module('<APP_NAME>').run(['workerWorkerService', function(workerWorkerService) {\n        self.addEventListener('message', function(e) { workerWorkerService.onMessage(e.data) })\n      }])\n      window.angular.bootstrap(null, ['<APP_NAME>'])\n    ";
        return WorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('workerService',['workerServiceConfiguration','workerServicePrototypeMappingConfiguration','$rootScope','$window','$q',function(){return new (Function.prototype.bind.apply(WorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.WorkerService = WorkerService;
    var WorkerWorkerService = (function () {
        function WorkerWorkerService(workerServicePrototypeMappingConfiguration, $injector, $q, $rootScope) {
            this.workerServicePrototypeMappingConfiguration = workerServicePrototypeMappingConfiguration;
            this.$injector = $injector;
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.cancellers = [];
        }
        WorkerWorkerService.stripFunctions = function (obj) {
            var ret = {};
            for (var key in obj)
                if (typeof obj[key] === 'object')
                    ret[key] = WorkerWorkerService.stripFunctions(obj[key]);
                else if (typeof obj[key] !== 'function')
                    ret[key] = obj[key];
            return ret;
        };
        WorkerWorkerService.prototype.$broadcast = function (name, args) {
            try {
                self.postMessage({ event: 'broadcast', name: name, args: WorkerService.savePrototypes(args) });
            }
            catch (e) {
                console.log(args, e);
                throw e;
            }
        };
        WorkerWorkerService.prototype.onMessage = function (message) {
            var _this = this;
            if (message.id === undefined) {
                this.$rootScope.$broadcast(message.name, this.restorePrototypes(message.args));
                this.$rootScope.$apply();
            }
            else if (message.cancel) {
                var canceller = this.cancellers[message.id];
                delete this.cancellers[message.id];
                if (canceller)
                    canceller.resolve();
            }
            else {
                var service = this.$injector.get(message.service);
                var canceller = this.$q.defer();
                this.cancellers[message.id] = canceller;
                var promise = service[message.method].apply(service, this.restorePrototypes(message.args).concat(canceller.promise));
                if (!promise || !promise.then) {
                    var deferred = this.$q.defer();
                    deferred.resolve(promise);
                    promise = deferred.promise;
                }
                promise.then(function (success) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'success', id: message.id, data: WorkerService.savePrototypes(success) });
                }, function (error) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'failure', id: message.id, data: WorkerService.savePrototypes(WorkerWorkerService.stripFunctions(error)) });
                }, function (update) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'update', id: message.id, data: WorkerService.savePrototypes(update) });
                });
            }
        };
        WorkerWorkerService.prototype.restorePrototypes = function (args) {
            this.restorePrototypesInternal(args);
            WorkerService.stripMarks(args);
            return args;
        };
        WorkerWorkerService.prototype.restorePrototypesInternal = function (args) {
            var _this = this;
            if (!args || args.__mark || typeof args !== 'object')
                return;
            args.__mark = true;
            if (args instanceof Array)
                args.forEach(function (arg) { return _this.restorePrototypesInternal(arg); });
            else {
                if (args.__className) {
                    var prototype = this.workerServicePrototypeMappingConfiguration[args.__className];
                    if (!prototype)
                        throw 'Unknown prototype ' + args.__className;
                    args.__proto__ = prototype;
                    delete args.__className;
                }
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        this.restorePrototypesInternal(args[key]);
            }
        };
        return WorkerWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('workerWorkerService',['workerServicePrototypeMappingConfiguration','$injector','$q','$rootScope',function(){return new (Function.prototype.bind.apply(WorkerWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.WorkerWorkerService = WorkerWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvd29ya2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBb1FkO0FBcFFELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUNFLG9DQUFtQixPQUFlLEVBQVMsYUFBcUIsRUFBUyxhQUF1QjtZQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQVE7WUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBVTtRQUFHLENBQUM7UUFDdEcsaUNBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLGdDQUEwQiw2QkFFdEMsQ0FBQTtJQUVEO1FBZ0VFLHVCQUFZLDBCQUFzRCxFQUFVLDBDQUF5RSxFQUFFLFVBQXFDLEVBQUUsT0FBK0IsRUFBVSxFQUFxQjtZQWhFOVAsaUJBa0tDO1lBbEc2RSwrQ0FBMEMsR0FBMUMsMENBQTBDLENBQStCO1lBQWtGLE9BQUUsR0FBRixFQUFFLENBQW1CO1lBdkNwUCxrQkFBYSxHQUFXLENBQUMsQ0FBQTtZQUN6QixjQUFTLEdBQTZCLEVBQUUsQ0FBQTtZQXVDOUMsSUFBSSxJQUFJLEdBQVcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBO1lBQzNFLElBQUksYUFBYSxHQUFhLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUMxRSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQWhHLENBQWdHLENBQ2pHLENBQUE7WUFDRCxJQUFJLE9BQU8sR0FBVyxD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QSxBQTRFQyxJQUFBO0lBNUVZLHlCQUFtQixzQkE0RS9CLENBQUE7QUFFSCxDQUFDLEVBcFFTLEtBQUssS0FBTCxLQUFLLFFBb1FkIiwiZmlsZSI6InNjcmlwdHMvd29ya2VyLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgV29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhcHBOYW1lOiBzdHJpbmcsIHB1YmxpYyB3b3JrZXJUaHJlYWRzOiBudW1iZXIsIHB1YmxpYyBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBXb3JrZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHdvcmtlclRlbXBsYXRlOiBzdHJpbmcgPSBgXG4gICAgICB2YXIgd2luZG93ID0gc2VsZlxuICAgICAgc2VsZi5oaXN0b3J5ID0ge31cbiAgICAgIHNlbGYuTm9kZSA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICB2YXIgZG9jdW1lbnQgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6ICdjb21wbGV0ZScsXG4gICAgICAgIGNvb2tpZTogJycsXG4gICAgICAgIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF0aG5hbWU6ICcnLFxuICAgICAgICAgICAgc2V0QXR0cmlidXRlOiBmdW5jdGlvbigpIHt9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBpbXBvcnRTY3JpcHRzKCc8SU1QT1JUX1NDUklQVFM+JylcbiAgICAgIHdpbmRvdy5hbmd1bGFyLm1vZHVsZSgnPEFQUF9OQU1FPicpLnJ1bihbJ3dvcmtlcldvcmtlclNlcnZpY2UnLCBmdW5jdGlvbih3b3JrZXJXb3JrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHsgd29ya2VyV29ya2VyU2VydmljZS5vbk1lc3NhZ2UoZS5kYXRhKSB9KVxuICAgICAgfV0pXG4gICAgICB3aW5kb3cuYW5ndWxhci5ib290c3RyYXAobnVsbCwgWyc8QVBQX05BTUU+J10pXG4gICAgYFxuXG4gICAgcHJpdmF0ZSB3b3JrZXJzOiBXb3JrZXJbXVxuICAgIHByaXZhdGUgY3VycmVudFdvcmtlcjogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgZGVmZXJyZWRzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcE1hcmtzKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8ICFhcmdzLl9fbWFyayB8fCB0eXBlb2YgYXJncyAhPT0gJ29iamVjdCcpIHJldHVyblxuICAgICAgZGVsZXRlIGFyZ3MuX19tYXJrXG4gICAgICBpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSBhcmdzLmZvckVhY2goYXJnID0+IFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYXZlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5zYXZlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICByZXR1cm4gYXJnc1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBzYXZlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19jbGFzc05hbWUgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChhcmdzLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm90b3R5cGU6IHt9ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3MpXG4gICAgICAgICAgb3V0OiB3aGlsZSAoY3VycmVudFByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50UHJvdG90eXBlKSkge1xuICAgICAgICAgICAgICBpZiAocHJvcCAhPT0gJ2NvbnN0cnVjdG9yJyAmJiB0eXBlb2YoYXJncy5fX3Byb3RvX19bcHJvcF0pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5fX2NsYXNzTmFtZSA9IGFyZ3MuY29uc3RydWN0b3IubmFtZVxuICAgICAgICAgICAgICAgIGJyZWFrIG91dFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGN1cnJlbnRQcm90b3R5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYXJncy5fX2NsYXNzTmFtZSkgYXJncy5fX2NsYXNzTmFtZSA9ICdPYmplY3QnXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Iod29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb246IFdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLCBwcml2YXRlIHdvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbjoge1tjbGFzc05hbWU6IHN0cmluZ106IE9iamVjdH0sICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7XG4gICAgICBsZXQgcGF0aDogc3RyaW5nID0gJHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyAkd2luZG93LmxvY2F0aW9uLmhvc3RcbiAgICAgIGxldCBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSA9IHdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLmltcG9ydFNjcmlwdHMubWFwKHMgPT5cbiAgICAgICAgcy5pbmRleE9mKCdodHRwJykgIT09IDAgPyBwYXRoICsgKHMuaW5kZXhPZignLycpICE9PSAwID8gJHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA6ICcnKSArIHMgOiBzXG4gICAgICApXG4gICAgICBsZXQgYmxvYlVSTDogc3RyaW5nID0gKCR3aW5kb3cuVVJMKS5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1dvcmtlclNlcnZpY2Uud29ya2VyVGVtcGxhdGUucmVwbGFjZSgvPEFQUF9OQU1FPi9nLCB3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbi5hcHBOYW1lKS5yZXBsYWNlKC88SU1QT1JUX1NDUklQVFM+L2csIGltcG9ydFNjcmlwdHMuam9pbignXFwnLFxcJycpKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH0pKTtcbiAgICAgIHRoaXMud29ya2VycyA9IFtdXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgd29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ud29ya2VyVGhyZWFkczsgaSsrKSB7XG4gICAgICAgIHRoaXMud29ya2Vycy5wdXNoKG5ldyBXb3JrZXIoYmxvYlVSTCkpXG4gICAgICAgIHRoaXMud29ya2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgIGxldCBldmVudElkOiBzdHJpbmcgPSBlLmRhdGEuZXZlbnQ7XG4gICAgICAgICAgaWYgKGV2ZW50SWQgPT09ICdicm9hZGNhc3QnKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoZS5kYXRhLm5hbWUsIHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmFyZ3MpKVxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPGFueT4gPSB0aGlzLmRlZmVycmVkc1tlLmRhdGEuaWRdXG4gICAgICAgICAgICBpZiAoZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGVmZXJyZWRzW2UuZGF0YS5pZF1cbiAgICAgICAgICAgICAgaWYgKGV2ZW50SWQgPT09ICdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgICBlbHNlIGlmIChldmVudElkID09PSAnZmFpbHVyZScpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5KHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgJGJyb2FkY2FzdChuYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3ID0+IHcucG9zdE1lc3NhZ2Uoe25hbWU6IG5hbWUsIGFyZ3M6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoYXJncyl9KSlcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsbEFsbDxUPihzZXJ2aWNlOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBhcmdzOiBhbnlbXSA9IFtdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFQ+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VD4gPSB0aGlzLiRxLmRlZmVyKClcbiAgICAgIHRoaXMuZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpXG4gICAgICBsZXQgaWQ6IG51bWJlciA9IHRoaXMuZGVmZXJyZWRzLmxlbmd0aCAtIDFcbiAgICAgIGxldCBtZXNzYWdlOiBJTWVzc2FnZSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYXJnczogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzKVxuICAgICAgfVxuICAgICAgaWYgKGNhbmNlbGxlcikgY2FuY2VsbGVyLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3b3JrZXIgPT4gd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pKVxuICAgICAgICBkZWxldGUgdGhpcy5kZWZlcnJlZHNbaWRdXG4gICAgICB9KVxuICAgICAgdGhpcy53b3JrZXJzLmZvckVhY2god29ya2VyID0+IHdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKSlcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuICAgIHB1YmxpYyBjYWxsPFQ+KHNlcnZpY2U6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGFyZ3M6IGFueVtdID0gW10sIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8VD4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxUPiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5kZWZlcnJlZHMucHVzaChkZWZlcnJlZClcbiAgICAgIGxldCBpZDogbnVtYmVyID0gdGhpcy5kZWZlcnJlZHMubGVuZ3RoIC0gMVxuICAgICAgbGV0IHdvcmtlcjogV29ya2VyID0gdGhpcy53b3JrZXJzW3RoaXMuY3VycmVudFdvcmtlcl1cbiAgICAgIHRoaXMuY3VycmVudFdvcmtlciA9ICh0aGlzLmN1cnJlbnRXb3JrZXIgKyAxKSAlIHRoaXMud29ya2Vycy5sZW5ndGhcbiAgICAgIGlmIChjYW5jZWxsZXIpIGNhbmNlbGxlci50aGVuKCgpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkc1tpZF1cbiAgICAgIH0pXG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHNlcnZpY2U6IHNlcnZpY2UsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVQcm90b3R5cGVzKGFyZ3M6IGFueSk6IGFueSB7XG4gICAgICB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJncylcbiAgICAgIFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmdzKVxuICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnczogYW55KTogdm9pZCB7XG4gICAgICBpZiAoIWFyZ3MgfHwgYXJncy5fX21hcmsgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGFyZ3MuX19tYXJrID0gdHJ1ZVxuICAgICAgaWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkgYXJncy5mb3JFYWNoKGFyZyA9PiB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnKSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoYXJncy5fX2NsYXNzTmFtZSkge1xuICAgICAgICAgIGxldCBwcm90b3R5cGU6IE9iamVjdCA9IHRoaXMud29ya2VyU2VydmljZVByb3RvdHlwZU1hcHBpbmdDb25maWd1cmF0aW9uW2FyZ3MuX19jbGFzc05hbWVdXG4gICAgICAgICAgaWYgKCFwcm90b3R5cGUpIHRocm93ICdVbmtub3duIHByb3RvdHlwZSAnICsgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICAgIGFyZ3MuX19wcm90b19fID0gIHByb3RvdHlwZVxuICAgICAgICAgIGRlbGV0ZSBhcmdzLl9fY2xhc3NOYW1lXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3Nba2V5XSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGRlY2xhcmUgdmFyIHNlbGY6IGFueVxuXG4gIGludGVyZmFjZSBJTWVzc2FnZSB7XG4gICAgaWQ/OiBudW1iZXJcbiAgICBuYW1lPzogc3RyaW5nXG4gICAgYXJncz86IGFueVxuICAgIGNhbmNlbD86IGJvb2xlYW5cbiAgICBzZXJ2aWNlPzogc3RyaW5nXG4gICAgbWV0aG9kPzogc3RyaW5nXG4gIH1cblxuICBleHBvcnQgY2xhc3MgV29ya2VyV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjYW5jZWxsZXJzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcEZ1bmN0aW9ucyhvYmopOiBhbnkge1xuICAgICAgbGV0IHJldDoge30gPSB7fVxuICAgICAgZm9yIChsZXQga2V5IGluIG9iailcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcpIHJldFtrZXldID0gV29ya2VyV29ya2VyU2VydmljZS5zdHJpcEZ1bmN0aW9ucyhvYmpba2V5XSlcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9ialtrZXldICE9PSAnZnVuY3Rpb24nKSByZXRba2V5XSA9IG9ialtrZXldXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyAkYnJvYWRjYXN0KG5hbWU6IHN0cmluZywgYXJncz86IGFueSk6IHZvaWQge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICdicm9hZGNhc3QnLCBuYW1lOiBuYW1lLCBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncywgZSlcbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbjogIHtbY2xhc3NOYW1lOiBzdHJpbmddOiBPYmplY3R9LCBwcml2YXRlICRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHt9XG4gICAgcHVibGljIG9uTWVzc2FnZShtZXNzYWdlOiBJTWVzc2FnZSk6IHZvaWQge1xuICAgICAgaWYgKG1lc3NhZ2UuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChtZXNzYWdlLm5hbWUhLCB0aGlzLnJlc3RvcmVQcm90b3R5cGVzKG1lc3NhZ2UuYXJncykpXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKVxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmNhbmNlbCkge1xuICAgICAgICBsZXQgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdO1xuICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdO1xuICAgICAgICBpZiAoY2FuY2VsbGVyKSBjYW5jZWxsZXIucmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNlcnZpY2U6IGFueSA9IHRoaXMuJGluamVjdG9yLmdldChtZXNzYWdlLnNlcnZpY2UhKVxuICAgICAgICBsZXQgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICB0aGlzLmNhbmNlbGxlcnNbbWVzc2FnZS5pZF0gPSBjYW5jZWxsZXI7XG4gICAgICAgIGxldCBwcm9taXNlOiBhbnkgPSBzZXJ2aWNlW21lc3NhZ2UubWV0aG9kIV0uYXBwbHkoc2VydmljZSwgdGhpcy5yZXN0b3JlUHJvdG90eXBlcyhtZXNzYWdlLmFyZ3MpLmNvbmNhdChjYW5jZWxsZXIucHJvbWlzZSkpXG4gICAgICAgIGlmICghcHJvbWlzZSB8fCAhcHJvbWlzZS50aGVuKSB7XG4gICAgICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwcm9taXNlKVxuICAgICAgICAgIHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlXG4gICAgICAgIH1cbiAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWQhXVxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICdzdWNjZXNzJywgaWQ6IG1lc3NhZ2UuaWQsIGRhdGE6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoc3VjY2Vzcyl9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkIV1cbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2V2ZW50OiAnZmFpbHVyZScsIGlkOiBtZXNzYWdlLmlkLCBkYXRhOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKFdvcmtlcldvcmtlclNlcnZpY2Uuc3RyaXBGdW5jdGlvbnMoZXJyb3IpKX0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICAodXBkYXRlKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWQhXVxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICd1cGRhdGUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyh1cGRhdGUpfSk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICBXb3JrZXJTZXJ2aWNlLnN0cmlwTWFya3MoYXJncylcbiAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19tYXJrIHx8IHR5cGVvZiBhcmdzICE9PSAnb2JqZWN0JykgcmV0dXJuXG4gICAgICBhcmdzLl9fbWFyayA9IHRydWVcbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZykpXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGFyZ3MuX19jbGFzc05hbWUpIHtcbiAgICAgICAgICBsZXQgcHJvdG90eXBlOiBPYmplY3QgPSB0aGlzLndvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvblthcmdzLl9fY2xhc3NOYW1lXVxuICAgICAgICAgIGlmICghcHJvdG90eXBlKSB0aHJvdyAnVW5rbm93biBwcm90b3R5cGUgJyArIGFyZ3MuX19jbGFzc05hbWVcbiAgICAgICAgICBhcmdzLl9fcHJvdG9fXyA9ICBwcm90b3R5cGVcbiAgICAgICAgICBkZWxldGUgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIHRoaXMucmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var Configuration = (function () {
        function Configuration() {
            this.preferredLanguage = '"en"';
            this.authorityEndpoints = [];
            this.archiveEndpoints = [];
            this.globalDataModelConfiguration = new DataModelConfiguration();
            this.deleteItemQuery = fibra.SparqlItemService.deleteItemQuery;
            this.prefixes = '';
        }
        Configuration.prototype.allEndpoints = function () {
            var allEndpoints = this.archiveEndpoints.concat(this.authorityEndpoints);
            allEndpoints.push(this.primaryEndpoint);
            return allEndpoints;
        };
        Configuration.prototype.remoteEndpoints = function () {
            return this.archiveEndpoints.concat(this.authorityEndpoints);
        };
        return Configuration;
    }());
    fibra.Configuration = Configuration;
    var EndpointConfiguration = (function () {
        function EndpointConfiguration(id, title, endpoint, selectedTypes) {
            if (selectedTypes === void 0) { selectedTypes = []; }
            this.id = id;
            this.title = title;
            this.endpoint = endpoint;
            this.class = '';
            this.autocompletionTextMatchQueryTemplate = fibra.SparqlAutocompleteService.defaultMatchQueryTemplate;
            this.treeQueryTemplate = fibra.SparqlTreeService.getClassTreeQuery;
            this.localItemQueryTemplate = fibra.SparqlItemService.getLocalItemPropertiesQuery;
            this.remoteItemQueryTemplate = fibra.SparqlItemService.getRemoteItemPropertiesQuery;
            this.dataModelConfiguration = new DataModelConfiguration();
            this.dataModelConfiguration.setSelectedTypes(selectedTypes);
        }
        return EndpointConfiguration;
    }());
    fibra.EndpointConfiguration = EndpointConfiguration;
    var PrimaryEndpointConfiguration = (function (_super) {
        __extends(PrimaryEndpointConfiguration, _super);
        function PrimaryEndpointConfiguration(id, title, endpoint, updateEndpoint) {
            if (updateEndpoint === void 0) { updateEndpoint = endpoint; }
            _super.call(this, id, title, endpoint);
            this.updateEndpoint = updateEndpoint;
        }
        return PrimaryEndpointConfiguration;
    }(EndpointConfiguration));
    fibra.PrimaryEndpointConfiguration = PrimaryEndpointConfiguration;
    var DataModelConfiguration = (function () {
        function DataModelConfiguration() {
            this.typeConstraints = '';
            this.typeTree = [];
            this.selectedTypes = [];
            this.properties = [];
            this.selectedProperties = [];
            this.propertyPropertyMap = {};
            this.typeTypeMap = {};
        }
        DataModelConfiguration.prototype.setSelectedTypes = function (selectedTypes) {
            this.selectedTypes = selectedTypes;
            this.updateFilter();
        };
        DataModelConfiguration.prototype.updateFilter = function () {
            if (this.selectedTypes.length === 0)
                this.typeConstraints = '';
            else
                this.typeConstraints = 'FILTER (?groupId IN (' + this.selectedTypes.map(function (id) { return id.toCanonical(); }).join(', ') + '))';
        };
        return DataModelConfiguration;
    }());
    fibra.DataModelConfiguration = DataModelConfiguration;
    var ConfigurationService = (function () {
        function ConfigurationService(workerService) {
            this.configuration = new Configuration();
            var c = this.configuration;
            c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new fibra.NamedNode('http://ldf.fi/fibra/sparql'), new fibra.NamedNode('http://ldf.fi/fibra/sparql'));
            c.authorityEndpoints = [
                // ULAN endpoint is not standards compliant, needs further tweaking new EndpointConfiguration('ulan', 'ULAN', new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql.json')),
                new EndpointConfiguration('geonames', 'GeoNames', new fibra.NamedNode('http://ldf.fi/geonames/sparql')),
                new EndpointConfiguration('viaf', 'VIAF', new fibra.NamedNode('http://ldf.fi/viaf-labels/sparql')),
            ];
            c.authorityEndpoints.forEach(function (e, i) { return e.class = 'source' + i; });
            var emloConfiguration = new EndpointConfiguration('emlo', 'EMLO', new fibra.NamedNode('http://ldf.fi/emlo/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            emloConfiguration.autocompletionTextMatchQueryTemplate = emloConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage ?ifpODBNId {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  {\n    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n    FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))\n    BIND(?ref AS ?ifpWikipediaPage)\n  } UNION {\n    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n    FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))\n    BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)\n  }\n}");
            var sdfbConfiguration = new EndpointConfiguration('sdfb', 'Six Degrees of Francis Bacon', new fibra.NamedNode('http://ldf.fi/sdfb/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            sdfbConfiguration.autocompletionTextMatchQueryTemplate = sdfbConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpODBNId {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .\n}\n");
            var procopeConfiguration = new EndpointConfiguration('procope', 'Procope', new fibra.NamedNode('http://ldf.fi/procope/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            procopeConfiguration.autocompletionTextMatchQueryTemplate = procopeConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .\n  BIND(IRI(?ref) AS ?ifpWikipediaPage)\n}\n");
            c.archiveEndpoints = [
                sdfbConfiguration,
                emloConfiguration,
                procopeConfiguration,
                new EndpointConfiguration('schoenberg', 'Schoenberg', new fibra.NamedNode('http://ldf.fi/schoenberg/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group])
            ];
            c.archiveEndpoints.forEach(function (e, i) { return e.class = 'source' + (c.authorityEndpoints.length + i); });
            c.instanceNS = 'http://ldf.fi/fibra/';
            c.instanceGraph = 'http://ldf.fi/fibra/main/';
            c.schemaNS = 'http://ldf.fi/fibra/schema#';
            c.schemaGraph = 'http://ldf.fi/fibra/schema#';
            workerService.callAll('configurationWorkerService', 'setConfiguration', [c]);
        }
        return ConfigurationService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationService',['workerService',function(){return new (Function.prototype.bind.apply(ConfigurationService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.ConfigurationService = ConfigurationService;
    var ConfigurationWorkerService = (function () {
        function ConfigurationWorkerService() {
        }
        ConfigurationWorkerService.prototype.setConfiguration = function (configuration) {
            this.configuration = configuration;
        };
        return ConfigurationWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationWorkerService',[function(){return new (Function.prototype.bind.apply(ConfigurationWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.ConfigurationWorkerService = ConfigurationWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBMkhkO0FBM0hELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFVjtRQUFBO1lBQ1Msc0JBQWlCLEdBQVcsTUFBTSxDQUFBO1lBRWxDLHVCQUFrQixHQUE0QixFQUFFLENBQUE7WUFDaEQscUJBQWdCLEdBQTRCLEVBQUUsQ0FBQTtZQUM5QyxpQ0FBNEIsR0FBMkIsSUFBSSxzQkFBc0IsRUFBRSxDQUFBO1lBS25GLG9CQUFlLEdBQVcsdUJBQWlCLENBQUMsZUFBZSxDQUFBO1lBQzNELGFBQVEsR0FBVyxFQUFFLENBQUE7UUFTOUIsQ0FBQztRQVJRLG9DQUFZLEdBQW5CO1lBQ0UsSUFBSSxZQUFZLEdBQTRCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDakcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDdkMsTUFBTSxDQUFDLFlBQVksQ0FBQTtRQUNyQixDQUFDO1FBQ00sdUNBQWUsR0FBdEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUM5RCxDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQXBCQSxBQW9CQyxJQUFBO0lBcEJZLG1CQUFhLGdCQW9CekIsQ0FBQTtJQUVEO1FBT0UsK0JBQW1CLEVBQVUsRUFBUyxLQUFhLEVBQVMsUUFBZSxFQUFFLGFBQTJCO1lBQTNCLDZCQUEyQixHQUEzQixrQkFBMkI7WUFBckYsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFPO1lBTnBFLFVBQUssR0FBVyxFQUFFLENBQUE7WUFDbEIseUNBQW9D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L2NvbmZpZ3VyYXRpb24tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gICAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIHByZWZlcnJlZExhbmd1YWdlOiBzdHJpbmcgPSAnXCJlblwiJ1xuICAgICAgcHVibGljIHByaW1hcnlFbmRwb2ludDogUHJpbWFyeUVuZHBvaW50Q29uZmlndXJhdGlvblxuICAgICAgcHVibGljIGF1dGhvcml0eUVuZHBvaW50czogRW5kcG9pbnRDb25maWd1cmF0aW9uW10gPSBbXVxuICAgICAgcHVibGljIGFyY2hpdmVFbmRwb2ludHM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdID0gW11cbiAgICAgIHB1YmxpYyBnbG9iYWxEYXRhTW9kZWxDb25maWd1cmF0aW9uOiBEYXRhTW9kZWxDb25maWd1cmF0aW9uID0gbmV3IERhdGFNb2RlbENvbmZpZ3VyYXRpb24oKVxuICAgICAgcHVibGljIGluc3RhbmNlTlM6IHN0cmluZ1xuICAgICAgcHVibGljIGluc3RhbmNlR3JhcGg6IHN0cmluZ1xuICAgICAgcHVibGljIHNjaGVtYU5TOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBzY2hlbWFHcmFwaDogc3RyaW5nXG4gICAgICBwdWJsaWMgZGVsZXRlSXRlbVF1ZXJ5OiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5kZWxldGVJdGVtUXVlcnlcbiAgICAgIHB1YmxpYyBwcmVmaXhlczogc3RyaW5nID0gJydcbiAgICAgIHB1YmxpYyBhbGxFbmRwb2ludHMoKTogRW5kcG9pbnRDb25maWd1cmF0aW9uW10ge1xuICAgICAgICBsZXQgYWxsRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IHRoaXMuYXJjaGl2ZUVuZHBvaW50cy5jb25jYXQodGhpcy5hdXRob3JpdHlFbmRwb2ludHMpXG4gICAgICAgIGFsbEVuZHBvaW50cy5wdXNoKHRoaXMucHJpbWFyeUVuZHBvaW50KVxuICAgICAgICByZXR1cm4gYWxsRW5kcG9pbnRzXG4gICAgICB9XG4gICAgICBwdWJsaWMgcmVtb3RlRW5kcG9pbnRzKCk6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjaGl2ZUVuZHBvaW50cy5jb25jYXQodGhpcy5hdXRob3JpdHlFbmRwb2ludHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEVuZHBvaW50Q29uZmlndXJhdGlvbiB7XG4gICAgICBwdWJsaWMgY2xhc3M6IHN0cmluZyA9ICcnXG4gICAgICBwdWJsaWMgYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmRlZmF1bHRNYXRjaFF1ZXJ5VGVtcGxhdGVcbiAgICAgIHB1YmxpYyB0cmVlUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsVHJlZVNlcnZpY2UuZ2V0Q2xhc3NUcmVlUXVlcnlcbiAgICAgIHB1YmxpYyBsb2NhbEl0ZW1RdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5nZXRMb2NhbEl0ZW1Qcm9wZXJ0aWVzUXVlcnlcbiAgICAgIHB1YmxpYyByZW1vdGVJdGVtUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZ2V0UmVtb3RlSXRlbVByb3BlcnRpZXNRdWVyeVxuICAgICAgcHVibGljIGRhdGFNb2RlbENvbmZpZ3VyYXRpb246IERhdGFNb2RlbENvbmZpZ3VyYXRpb24gPSBuZXcgRGF0YU1vZGVsQ29uZmlndXJhdGlvbigpXG4gICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyBlbmRwb2ludDogSU5vZGUsIHNlbGVjdGVkVHlwZXM6IElOb2RlW10gPSBbXSkge1xuICAgICAgICB0aGlzLmRhdGFNb2RlbENvbmZpZ3VyYXRpb24uc2V0U2VsZWN0ZWRUeXBlcyhzZWxlY3RlZFR5cGVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBQcmltYXJ5RW5kcG9pbnRDb25maWd1cmF0aW9uIGV4dGVuZHMgRW5kcG9pbnRDb25maWd1cmF0aW9uIHtcbiAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIGVuZHBvaW50OiBJTm9kZSwgcHVibGljIHVwZGF0ZUVuZHBvaW50OiBJTm9kZSA9IGVuZHBvaW50KSB7XG4gICAgICAgIHN1cGVyKGlkLCB0aXRsZSwgZW5kcG9pbnQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERhdGFNb2RlbENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIHR5cGVDb25zdHJhaW50czogc3RyaW5nID0gJydcbiAgICAgIHB1YmxpYyB0eXBlVHJlZTogVHJlZU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgc2VsZWN0ZWRUeXBlczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgcHJvcGVydGllczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgc2VsZWN0ZWRQcm9wZXJ0aWVzOiBJTm9kZVtdID0gW11cbiAgICAgIHB1YmxpYyBwcm9wZXJ0eVByb3BlcnR5TWFwOiB7W2lkOiBzdHJpbmddOiBJU291cmNlZE5vZGVbXSB9ID0ge31cbiAgICAgIHB1YmxpYyB0eXBlVHlwZU1hcDoge1tpZDogc3RyaW5nXTogSVNvdXJjZWROb2RlW10gfSA9IHt9XG4gICAgICBwdWJsaWMgc2V0U2VsZWN0ZWRUeXBlcyhzZWxlY3RlZFR5cGVzOiBJTm9kZVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUeXBlcyA9IHNlbGVjdGVkVHlwZXNcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoKVxuICAgICAgfVxuICAgICAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHRoaXMudHlwZUNvbnN0cmFpbnRzID0gJydcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMudHlwZUNvbnN0cmFpbnRzID0gJ0ZJTFRFUiAoP2dyb3VwSWQgSU4gKCcgKyB0aGlzLnNlbGVjdGVkVHlwZXMubWFwKGlkID0+IGlkLnRvQ2Fub25pY2FsKCkpLmpvaW4oJywgJykgKyAnKSknXG4gICAgICB9XG4gICAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBuZXcgQ29uZmlndXJhdGlvbigpXG4gICAgY29uc3RydWN0b3Iod29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge1xuICAgICAgbGV0IGM6IENvbmZpZ3VyYXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICAgIGMucHJpbWFyeUVuZHBvaW50ID0gbmV3IFByaW1hcnlFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2xvY2FsJywgJ0xvY2FsJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSwgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSlcbiAgICAgIGMuYXV0aG9yaXR5RW5kcG9pbnRzID0gW1xuICAgICAgICAvLyBVTEFOIGVuZHBvaW50IGlzIG5vdCBzdGFuZGFyZHMgY29tcGxpYW50LCBuZWVkcyBmdXJ0aGVyIHR3ZWFraW5nIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ3VsYW4nLCAnVUxBTicsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvY29yc3Byb3h5L3ZvY2FiLmdldHR5LmVkdS9zcGFycWwuanNvbicpKSxcbiAgICAgICAgbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignZ2VvbmFtZXMnLCAnR2VvTmFtZXMnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2dlb25hbWVzL3NwYXJxbCcpKSxcbiAgICAgICAgbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbigndmlhZicsICdWSUFGJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS92aWFmLWxhYmVscy9zcGFycWwnKSksIC8vIGJpcnRoL2RlYXRoIGRhdGVzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICAgIC8vIG5vdCB5ZXQgbG9hZGVkIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2xjbmFtZXMnLCAnTEMgTmFtZXMnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2xjbmFtZXMvc3BhcnFsJykpXG4gICAgICBdXG4gICAgICBjLmF1dGhvcml0eUVuZHBvaW50cy5mb3JFYWNoKChlLCBpKSA9PiBlLmNsYXNzID0gICdzb3VyY2UnICsgaSlcbiAgICAgIGxldCBlbWxvQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignZW1sbycsICdFTUxPJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9lbWxvL3NwYXJxbCcpLCBbQ0lET0MuUGVyc29uLCBDSURPQy5QbGFjZSwgQ0lET0MuR3JvdXBdKVxuICAgICAgZW1sb0NvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gZW1sb0NvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoL1xce8KgIyBBRERJVElPTkFMVkFSSUFCTEVTL2csICc/aWZwV2lraXBlZGlhUGFnZSA/aWZwT0RCTklkIHsnKS5yZXBsYWNlKC8jIEFERElUSU9OQUxTRUxFQ1QvZywgYFxuVU5JT04ge1xuICB7XG4gICAgP2lkIDxodHRwOi8vZW1sby5ib2RsZWlhbi5veC5hYy51ay9zY2hlbWEjY29ma191bmlvbl9yZWxhdGlvbnNoaXBfdHlwZS1pc19yZWxhdGVkX3RvPiA/cmVmIC5cbiAgICBGSUxURVIoUkVHRVgoU1RSKD9yZWYpLCdodHRwOi8vLi5cXFxcXFxcXC53aWtpcGVkaWFcXFxcXFxcXC5vcmcvd2lraS8nKSlcbiAgICBCSU5EKD9yZWYgQVMgP2lmcFdpa2lwZWRpYVBhZ2UpXG4gIH0gVU5JT04ge1xuICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgRklMVEVSKFNUUlNUQVJUUyhTVFIoP3JlZiksJ2h0dHA6Ly93d3cub3hmb3JkZG5iLmNvbS92aWV3L2FydGljbGUvJykpXG4gICAgQklORChSRVBMQUNFKFNUUig/cmVmKSwnaHR0cDovL3d3dy5veGZvcmRkbmIuY29tL3ZpZXcvYXJ0aWNsZS8oW14/XSopLionLCckMScpIEFTID9pZnBPREJOSWQpXG4gIH1cbn1gKVxuICAgICAgbGV0IHNkZmJDb25maWd1cmF0aW9uOiBFbmRwb2ludENvbmZpZ3VyYXRpb24gPSBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdzZGZiJywgJ1NpeCBEZWdyZWVzIG9mIEZyYW5jaXMgQmFjb24nLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3NkZmIvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlLCBDSURPQy5Hcm91cF0pXG4gICAgICBzZGZiQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUgPSBzZGZiQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvXFx7ICMgQURESVRJT05BTFZBUklBQkxFUy9nLCAnP2lmcE9EQk5JZCB7JykucmVwbGFjZSgvIyBBRERJVElPTkFMU0VMRUNUL2csIGBcblVOSU9OIHtcbiAgP2lkIDxodHRwOi8vbGRmLmZpL3NkZmIvc2NoZW1hI29kYm5JZD4gP2lmcE9EQk5JZCAuXG59XG5gKVxuICAgICAgbGV0IHByb2NvcGVDb25maWd1cmF0aW9uOiBFbmRwb2ludENvbmZpZ3VyYXRpb24gPSBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdwcm9jb3BlJywgJ1Byb2NvcGUnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3Byb2NvcGUvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlLCBDSURPQy5Hcm91cF0pXG4gICAgICBwcm9jb3BlQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUgPSBwcm9jb3BlQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvXFx7ICMgQURESVRJT05BTFZBUklBQkxFUy9nLCAnP2lmcFdpa2lwZWRpYVBhZ2UgeycpLnJlcGxhY2UoLyMgQURESVRJT05BTFNFTEVDVC9nLCBgXG5VTklPTiB7XG4gID9pZCA8aHR0cDovL2xkZi5maS9wcm9jb3BlLXNjaGVtYSN3aWtpcGVkaWFVcmw+ID9yZWYgLlxuICBCSU5EKElSSSg/cmVmKSBBUyA/aWZwV2lraXBlZGlhUGFnZSlcbn1cbmApXG4gICAgICBjLmFyY2hpdmVFbmRwb2ludHMgPSBbXG4gICAgICAgIHNkZmJDb25maWd1cmF0aW9uLFxuICAgICAgICBlbWxvQ29uZmlndXJhdGlvbixcbiAgICAgICAgcHJvY29wZUNvbmZpZ3VyYXRpb24sXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ3NjaG9lbmJlcmcnLCAnU2Nob2VuYmVyZycsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvc2Nob2VuYmVyZy9zcGFycWwnKSwgW0NJRE9DLlBlcnNvbiwgQ0lET0MuUGxhY2UsIENJRE9DLkdyb3VwXSlcbiAgICAgIF1cbiAgICAgIGMuYXJjaGl2ZUVuZHBvaW50cy5mb3JFYWNoKChlLCBpKSA9PiBlLmNsYXNzID0gICdzb3VyY2UnICsgKGMuYXV0aG9yaXR5RW5kcG9pbnRzLmxlbmd0aCArIGkpKVxuICAgICAgYy5pbnN0YW5jZU5TID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvJ1xuICAgICAgYy5pbnN0YW5jZUdyYXBoID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvbWFpbi8nXG4gICAgICBjLnNjaGVtYU5TID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc2NoZW1hIydcbiAgICAgIGMuc2NoZW1hR3JhcGggPSAnaHR0cDovL2xkZi5maS9maWJyYS9zY2hlbWEjJ1xuICAgICAgd29ya2VyU2VydmljZS5jYWxsQWxsKCdjb25maWd1cmF0aW9uV29ya2VyU2VydmljZScsICdzZXRDb25maWd1cmF0aW9uJywgW2NdKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uV29ya2VyU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb25cbiAgICBwdWJsaWMgc2V0Q29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uKTogdm9pZCB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var EMap = (function () {
        function EMap(create) {
            if (create === void 0) { create = function () { return {}; }; }
            this.create = create;
            this.s = {};
        }
        EMap.prototype.has = function (key) {
            return this.s[key] !== undefined;
        };
        EMap.prototype.goc = function (key, create) {
            if (!this.has(key))
                this.set(key, create ? create(key) : this.create(key));
            return this.get(key);
        };
        EMap.prototype.set = function (key, value) {
            this.s[key] = value;
            return this;
        };
        EMap.prototype.get = function (key) {
            return this.s[key];
        };
        EMap.prototype.remove = function (key) {
            var contained = this.has(key);
            delete this.s[key];
            return contained;
        };
        EMap.prototype.sets = function (obj) {
            for (var key in obj)
                this.set(key, obj[key]);
            return this;
        };
        EMap.prototype.setm = function (obj) {
            for (var key in obj)
                this.set(key, obj[key]);
            return this;
        };
        EMap.prototype.clear = function () {
            this.s = {};
            return this;
        };
        EMap.prototype.keys = function () {
            var ret = [];
            for (var key in this.s)
                ret.push(key);
            return ret;
        };
        EMap.prototype.values = function () {
            var ret = [];
            for (var key in this.s)
                ret.push(this.s[key]);
            return ret;
        };
        EMap.prototype.entries = function () {
            var ret = [];
            for (var key in this.s)
                ret.push({ key: key, value: this.s[key] });
            return ret;
        };
        EMap.prototype.each = function (func) {
            for (var key in this.s)
                func(this.s[key], key, this);
            return undefined;
        };
        EMap.prototype.size = function () {
            var size = 0;
            /*tslint:disable no-unused-variable*/
            for (var key in this.s)
                size++;
            /*tslint:enable no-unused-variable*/
            return size;
        };
        EMap.prototype.empty = function () {
            return this.size() === 0;
        };
        return EMap;
    }());
    fibra.EMap = EMap;
    var IdentitySet = (function () {
        function IdentitySet() {
            this.a = [];
        }
        IdentitySet.prototype.clear = function () {
            this.a = [];
            return this;
        };
        IdentitySet.prototype.has = function (key) {
            return this.a.indexOf(key) !== -1;
        };
        IdentitySet.prototype.add = function (key) {
            if (this.has(key))
                return this;
            this.a.push(key);
            return this;
        };
        IdentitySet.prototype.adda = function (arr) {
            var _this = this;
            arr.forEach(function (v) { return _this.add(v); });
            return this;
        };
        IdentitySet.prototype.adds = function (oset) {
            var _this = this;
            oset.each(function (v) { return _this.add(v); });
            return this;
        };
        IdentitySet.prototype.remove = function (key) {
            var index = this.a.indexOf(key);
            if (index === -1)
                return false;
            this.a.splice(index, 1);
            return true;
        };
        IdentitySet.prototype.each = function (func) {
            for (var _i = 0, _a = this.a; _i < _a.length; _i++) {
                var value = _a[_i];
                func(value, value, this);
            }
            return undefined;
        };
        IdentitySet.prototype.size = function () {
            return this.a.length;
        };
        IdentitySet.prototype.empty = function () {
            return this.size() === 0;
        };
        IdentitySet.prototype.values = function () {
            return this.a;
        };
        return IdentitySet;
    }());
    fibra.IdentitySet = IdentitySet;
    var StringSet = (function () {
        function StringSet() {
            this.s = {};
        }
        StringSet.prototype.clear = function () {
            this.s = {};
            return this;
        };
        StringSet.prototype.has = function (key) {
            return this.s[key] !== undefined;
        };
        StringSet.prototype.add = function (key) {
            this.s[key] = key;
            return this;
        };
        StringSet.prototype.adda = function (arr) {
            var _this = this;
            arr.forEach(function (str) { return _this.add(str); });
            return this;
        };
        StringSet.prototype.adds = function (oset) {
            var _this = this;
            oset.each(function (str) { return _this.add(str); });
            return this;
        };
        StringSet.prototype.remove = function (key) {
            var contained = this.has(key);
            delete this.s[key];
            return contained;
        };
        StringSet.prototype.each = function (func) {
            for (var key in this.s)
                func(this.s[key], key, this);
            return undefined;
        };
        StringSet.prototype.size = function () {
            var size = 0;
            /*tslint:disable no-unused-variable*/
            for (var key in this.s)
                size++;
            /*tslint:enable no-unused-variable*/
            return size;
        };
        StringSet.prototype.empty = function () {
            return this.size() === 0;
        };
        StringSet.prototype.values = function () {
            var ret = [];
            for (var key in this.s)
                ret.push(key);
            return ret;
        };
        return StringSet;
    }());
    fibra.StringSet = StringSet;
    var EOMap = (function (_super) {
        __extends(EOMap, _super);
        function EOMap(create) {
            _super.call(this, create);
            this.a = [];
        }
        EOMap.prototype.goc = function (key, create) {
            if (!this.has(key))
                this.set(key, create ? create(key) : this.create(key));
            return this.get(key);
        };
        EOMap.prototype.set = function (key, value) {
            if (!this.has(key)) {
                _super.prototype.set.call(this, key, value);
                this.a.push(value);
            }
            return this;
        };
        EOMap.prototype.remove = function (key) {
            var value = this.get(key);
            if (value !== undefined) {
                _super.prototype.remove.call(this, key);
                this.a.splice(this.a.indexOf(value), 1);
            }
            return value !== undefined;
        };
        EOMap.prototype.size = function () {
            return this.a.length;
        };
        EOMap.prototype.values = function () {
            return this.a;
        };
        EOMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.a = [];
            return this;
        };
        return EOMap;
    }(EMap));
    fibra.EOMap = EOMap;
    var OStringSet = (function (_super) {
        __extends(OStringSet, _super);
        function OStringSet() {
            _super.apply(this, arguments);
            this.a = [];
        }
        OStringSet.prototype.add = function (key) {
            if (!this.has(key)) {
                _super.prototype.add.call(this, key);
                this.a.push(key);
            }
            return this;
        };
        OStringSet.prototype.remove = function (key) {
            var contained = _super.prototype.remove.call(this, key);
            if (contained)
                this.a.splice(this.a.indexOf(key), 1);
            return contained;
        };
        OStringSet.prototype.size = function () {
            return this.a.length;
        };
        OStringSet.prototype.values = function () {
            return this.a;
        };
        OStringSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.a = [];
            return this;
        };
        return OStringSet;
    }(StringSet));
    fibra.OStringSet = OStringSet;
    function goc(obj, key, create) {
        if (obj[key] === undefined)
            obj[key] = create ? create(key) : {};
        return obj[key];
    }
    fibra.goc = goc;
    function ogoc(obj, key, arr, create) {
        if (obj[key] === undefined) {
            obj[key] = create ? create(key) : {};
            arr.push(obj[key]);
        }
        return obj[key];
    }
    fibra.ogoc = ogoc;
    function cpush(arr, obj, key, value) {
        if (obj[key] === undefined) {
            obj[key] = value;
            arr.push(value);
        }
    }
    fibra.cpush = cpush;
    function cpushs(arr, obj, obj2) {
        for (var key in obj2)
            cpush(arr, obj, key, obj2[key]);
    }
    fibra.cpushs = cpushs;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29sbGVjdGlvbi11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQWtRZDtBQWxRRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFJRSxjQUFzQixNQUFvRDtZQUE5RCxzQkFBOEQsR0FBOUQsU0FBd0MsY0FBUSxNQUFNLENBQUksRUFBRSxDQUFBLENBQUMsQ0FBQztZQUFwRCxXQUFNLEdBQU4sTUFBTSxDQUE4QztZQUZuRSxNQUFDLEdBQXNCLEVBQUUsQ0FBQTtRQUU2QyxDQUFDO1FBRXZFLGtCQUFHLEdBQVYsVUFBVyxHQUFXO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQTtRQUNsQyxDQUFDO1FBQ00sa0JBQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxNQUE0QjtZQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7UUFDTSxrQkFBRyxHQUFWLFVBQVcsR0FBVyxFQUFFLEtBQVE7WUFDOUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxrQkFBRyxHQUFWLFVBQVcsR0FBVztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDO1FBQ00scUJBQU0sR0FBYixVQUFjLEdBQVc7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QUFFLEdBQVEsRUFBRSxNQUE0QjtRQUNqRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTSxFQUFFLENBQUE7WUFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNwQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBTmUsVUFBSSxPQU1uQixDQUFBO0lBRUQsZUFBeUIsR0FBUSxFQUFFLEdBQXNCLEVBQUUsR0FBVyxFQUFFLEtBQVE7UUFDOUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBTGUsV0FBSyxRQUtwQixDQUFBO0lBRUQsZ0JBQTBCLEdBQVEsRUFBRSxHQUFzQixFQUFFLElBQXVCO1FBQ2pGLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztZQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRmUsWUFBTSxTQUVyQixDQUFBO0FBRUgsQ0FBQyxFQWxRUyxLQUFLLEtBQUwsS0FBSyxRQWtRZCIsImZpbGUiOiJzY3JpcHRzL2NvbGxlY3Rpb24tdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgRU1hcDxWPiBpbXBsZW1lbnRzIGQzLk1hcDxWPiB7XG5cbiAgICBwdWJsaWMgczoge1tpZDogc3RyaW5nXTogVn0gPSB7fVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNyZWF0ZTogKGtleT86IHN0cmluZykgPT4gViA9ICgpID0+IHsgcmV0dXJuIDxWPnt9IH0pIHt9XG5cbiAgICBwdWJsaWMgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zW2tleV0gIT09IHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgZ29jKGtleTogc3RyaW5nLCBjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBWKTogViB7XG4gICAgICBpZiAoIXRoaXMuaGFzKGtleSkpXG4gICAgICAgIHRoaXMuc2V0KGtleSwgY3JlYXRlID8gY3JlYXRlKGtleSkgOiB0aGlzLmNyZWF0ZShrZXkpKVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSlcbiAgICB9XG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICAgIHRoaXMuc1trZXldID0gdmFsdWVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBWIHtcbiAgICAgIHJldHVybiB0aGlzLnNba2V5XVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBsZXQgY29udGFpbmVkOiBib29sZWFuID0gdGhpcy5oYXMoa2V5KVxuICAgICAgZGVsZXRlIHRoaXMuc1trZXldXG4gICAgICByZXR1cm4gY29udGFpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzZXRzKG9iajoge1tpZDogc3RyaW5nXTogVn0pOiB0aGlzIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHRoaXMuc2V0KGtleSwgb2JqW2tleV0pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgc2V0bShvYmo6IGQzLk1hcDxWPik6IHRoaXMge1xuICAgICAgZm9yIChsZXQga2V5IGluIG9iaikgdGhpcy5zZXQoa2V5LCBvYmpba2V5XSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBjbGVhcigpOiB0aGlzIHtcbiAgICAgIHRoaXMucyA9IHt9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMga2V5cygpOiBzdHJpbmdbXSB7XG4gICAgICBsZXQgcmV0OiBzdHJpbmdbXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaChrZXkpXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVltdIHtcbiAgICAgIGxldCByZXQ6IFZbXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaCh0aGlzLnNba2V5XSlcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gICAgcHVibGljIGVudHJpZXMoKTogeyBrZXk6IHN0cmluZywgdmFsdWU6IFYgfVtdIHtcbiAgICAgIGxldCByZXQ6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBWIH1bXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaCh7IGtleSwgdmFsdWU6IHRoaXMuc1trZXldIH0pXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyBlYWNoKGZ1bmM6ICh2YWx1ZTogViwga2V5OiBzdHJpbmcsIG1hcDogRU1hcDxWPikgPT4gdm9pZCk6IHVuZGVmaW5lZCB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKVxuICAgICAgICBmdW5jKHRoaXMuc1trZXldLCBrZXksIHRoaXMpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMFxuICAgICAgLyp0c2xpbnQ6ZGlzYWJsZSBuby11bnVzZWQtdmFyaWFibGUqL1xuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgc2l6ZSsrXG4gICAgICAvKnRzbGludDplbmFibGUgbm8tdW51c2VkLXZhcmlhYmxlKi9cbiAgICAgIHJldHVybiBzaXplXG4gICAgfVxuICAgIHB1YmxpYyBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemUoKSA9PT0gMFxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBJZGVudGl0eVNldDxWPiB7XG4gICAgcHVibGljIGE6IFZbXSA9IFtdXG4gICAgcHVibGljIGNsZWFyKCk6IHRoaXMge1xuICAgICAgdGhpcy5hID0gW11cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBoYXMoa2V5OiBWKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5hLmluZGV4T2Yoa2V5KSAhPT0gLTFcbiAgICB9XG4gICAgcHVibGljIGFkZChrZXk6IFYpOiB0aGlzIHtcbiAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSByZXR1cm4gdGhpc1xuICAgICAgdGhpcy5hLnB1c2goa2V5KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZGEoYXJyOiBWW10pOiB0aGlzIHtcbiAgICAgIGFyci5mb3JFYWNoKHYgPT4gdGhpcy5hZGQodikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgYWRkcyhvc2V0OiBJZGVudGl0eVNldDxWPik6IHRoaXMge1xuICAgICAgb3NldC5lYWNoKHYgPT4gdGhpcy5hZGQodikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogVik6IGJvb2xlYW4ge1xuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmEuaW5kZXhPZihrZXkpXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gZmFsc2VcbiAgICAgIHRoaXMuYS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBwdWJsaWMgZWFjaChmdW5jOiAodmFsdWU6IFYsIHZhbHVlUmVwZWF0OiBWLCBzZXQ6IElkZW50aXR5U2V0PFY+KSA9PiB2b2lkKTogdW5kZWZpbmVkIHtcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuYSlcbiAgICAgICAgZnVuYyh2YWx1ZSwgdmFsdWUsIHRoaXMpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5hLmxlbmd0aFxuICAgIH1cbiAgICBwdWJsaWMgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplKCkgPT09IDBcbiAgICB9XG4gICAgcHVibGljIHZhbHVlcygpOiBWW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTdHJpbmdTZXQgaW1wbGVtZW50cyBkMy5TZXQge1xuICAgIHB1YmxpYyBzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge31cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICB0aGlzLnMgPSB7fVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc1trZXldICE9PSB1bmRlZmluZWRcbiAgICB9XG4gICAgcHVibGljIGFkZChrZXk6IHN0cmluZyk6IHRoaXMge1xuICAgICAgdGhpcy5zW2tleV0gPSBrZXlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBhZGRhKGFycjogc3RyaW5nW10pOiB0aGlzIHtcbiAgICAgIGFyci5mb3JFYWNoKHN0ciA9PiB0aGlzLmFkZChzdHIpKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZHMob3NldDogZDMuU2V0KTogdGhpcyB7XG4gICAgICBvc2V0LmVhY2goc3RyID0+IHRoaXMuYWRkKHN0cikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBsZXQgY29udGFpbmVkOiBib29sZWFuID0gdGhpcy5oYXMoa2V5KVxuICAgICAgZGVsZXRlIHRoaXMuc1trZXldXG4gICAgICByZXR1cm4gY29udGFpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBlYWNoKGZ1bmM6ICh2YWx1ZTogc3RyaW5nLCB2YWx1ZVJlcGVhdDogc3RyaW5nLCBzZXQ6IFN0cmluZ1NldCkgPT4gdm9pZCk6IHVuZGVmaW5lZCB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKVxuICAgICAgICBmdW5jKHRoaXMuc1trZXldLCBrZXksIHRoaXMpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMFxuICAgICAgLyp0c2xpbnQ6ZGlzYWJsZSBuby11bnVzZWQtdmFyaWFibGUqL1xuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgc2l6ZSsrXG4gICAgICAvKnRzbGludDplbmFibGUgbm8tdW51c2VkLXZhcmlhYmxlKi9cbiAgICAgIHJldHVybiBzaXplXG4gICAgfVxuICAgIHB1YmxpYyBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemUoKSA9PT0gMFxuICAgIH1cbiAgICBwdWJsaWMgdmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgIGxldCByZXQ6IHN0cmluZ1tdID0gW11cbiAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnMpIHJldC5wdXNoKGtleSlcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRU9NYXA8Vj4gZXh0ZW5kcyBFTWFwPFY+IHtcbiAgICBwdWJsaWMgYTogVltdID0gW11cbiAgICBjb25zdHJ1Y3RvcihjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBWKSB7XG4gICAgICBzdXBlcihjcmVhdGUpXG4gICAgfVxuXG4gICAgcHVibGljIGdvYyhrZXk6IHN0cmluZywgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVik6IFYge1xuICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKVxuICAgICAgICB0aGlzLnNldChrZXksIGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogdGhpcy5jcmVhdGUoa2V5KSlcbiAgICAgIHJldHVybiB0aGlzLmdldChrZXkpXG4gICAgfVxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgc3VwZXIuc2V0KGtleSwgdmFsdWUpXG4gICAgICAgIHRoaXMuYS5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgbGV0IHZhbHVlOiBWID0gdGhpcy5nZXQoa2V5KVxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIucmVtb3ZlKGtleSlcbiAgICAgICAgdGhpcy5hLnNwbGljZSh0aGlzLmEuaW5kZXhPZih2YWx1ZSksIDEpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuYS5sZW5ndGhcbiAgICB9XG4gICAgcHVibGljIHZhbHVlcygpOiBWW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICBzdXBlci5jbGVhcigpXG4gICAgICB0aGlzLmEgPSBbXVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgT1N0cmluZ1NldCBleHRlbmRzIFN0cmluZ1NldCB7XG4gICAgcHVibGljIGE6IHN0cmluZ1tdID0gW11cblxuICAgIHB1YmxpYyBhZGQoa2V5OiBzdHJpbmcpOiB0aGlzIHtcbiAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICBzdXBlci5hZGQoa2V5KVxuICAgICAgICB0aGlzLmEucHVzaChrZXkpXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBsZXQgY29udGFpbmVkOiBib29sZWFuID0gc3VwZXIucmVtb3ZlKGtleSlcbiAgICAgIGlmIChjb250YWluZWQpXG4gICAgICAgIHRoaXMuYS5zcGxpY2UodGhpcy5hLmluZGV4T2Yoa2V5KSwgMSlcbiAgICAgIHJldHVybiBjb250YWluZWRcbiAgICB9XG4gICAgcHVibGljIHNpemUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLmEubGVuZ3RoXG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogc3RyaW5nW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICBzdXBlci5jbGVhcigpXG4gICAgICB0aGlzLmEgPSBbXVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ29jPFY+KG9iajoge1tpZDogc3RyaW5nXTogVn0sIGtleTogc3RyaW5nLCBjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBWKTogViB7XG4gICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpXG4gICAgICBvYmpba2V5XSA9IGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogPFY+e31cbiAgICByZXR1cm4gb2JqW2tleV1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBvZ29jPFY+KG9iajoge1tpZDogc3RyaW5nXTogVn0sIGtleTogc3RyaW5nLCBhcnI6IFZbXSwgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVik6IFYge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvYmpba2V5XSA9IGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogPFY+e31cbiAgICAgIGFyci5wdXNoKG9ialtrZXldKVxuICAgIH1cbiAgICByZXR1cm4gb2JqW2tleV1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcHVzaDxWPihhcnI6IFZbXSwgb2JqOiB7W2lkOiBzdHJpbmddOiBWfSwga2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogdm9pZCB7XG4gICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWVcbiAgICAgIGFyci5wdXNoKHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcHVzaHM8Vj4oYXJyOiBWW10sIG9iajoge1tpZDogc3RyaW5nXTogVn0sIG9iajI6IHtbaWQ6IHN0cmluZ106IFZ9KTogdm9pZCB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iajIpIGNwdXNoKGFyciwgb2JqLCBrZXksIG9iajJba2V5XSlcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var Node = (function () {
        function Node(value, termType, language, datatype) {
            if (language === void 0) { language = undefined; }
            if (datatype === void 0) { datatype = undefined; }
            this.value = value;
            this.termType = termType;
            this.language = language;
            this.datatype = datatype;
        }
        Node.prototype.toCanonical = function () {
            switch (this.termType) {
                case 'NamedNode': return '<' + this.value + '>';
                case 'BlankNode': return '_:' + this.value;
                case 'Literal': return JSON.stringify(this.value) + (this.language ? '@' + this.language : (XMLSchema.string.equals(this.datatype) ? '' : '^^' + this.datatype.toCanonical()));
                case 'Variable': return '?' + this.value;
                case 'DefaultGraph': return '';
                default: throw 'Unknown term type ' + this;
            }
        };
        Node.prototype.equals = function (other) {
            return this.termType === other.termType && this.value === other.value && (this.termType !== 'Literal' || (this.language === other.language && this.datatype === other.datatype));
        };
        return Node;
    }());
    fibra.Node = Node;
    var NodeFromNode = (function (_super) {
        __extends(NodeFromNode, _super);
        function NodeFromNode(other) {
            _super.call(this, other.value, other.termType, other.language, other.datatype);
        }
        return NodeFromNode;
    }(Node));
    fibra.NodeFromNode = NodeFromNode;
    var DefaultGraph = (function (_super) {
        __extends(DefaultGraph, _super);
        function DefaultGraph() {
            _super.call(this, '', 'DefaultGraph');
        }
        DefaultGraph.prototype.toCanonical = function () { return ''; };
        DefaultGraph.prototype.equals = function (other) { return other.termType === 'DefaultGraph'; };
        DefaultGraph.instance = new DefaultGraph();
        return DefaultGraph;
    }(Node));
    fibra.DefaultGraph = DefaultGraph;
    var Variable = (function (_super) {
        __extends(Variable, _super);
        function Variable(value) {
            _super.call(this, value, 'Variable');
        }
        Variable.prototype.toCanonical = function () { return '?' + this.value; };
        return Variable;
    }(Node));
    fibra.Variable = Variable;
    var NamedNode = (function (_super) {
        __extends(NamedNode, _super);
        function NamedNode(value) {
            _super.call(this, value, 'NamedNode');
        }
        NamedNode.prototype.toCanonical = function () { return '<' + this.value + '>'; };
        return NamedNode;
    }(Node));
    fibra.NamedNode = NamedNode;
    var BlankNode = (function (_super) {
        __extends(BlankNode, _super);
        function BlankNode(value) {
            _super.call(this, value, 'BlankNode');
        }
        BlankNode.prototype.toCanonical = function () { return '?' + this.value; };
        return BlankNode;
    }(Node));
    fibra.BlankNode = BlankNode;
    var Literal = (function (_super) {
        __extends(Literal, _super);
        function Literal(value, language, datatype) {
            if (language === void 0) { language = ''; }
            _super.call(this, value, 'Literal', language, datatype ? datatype : (language !== '' ? RDF.langString : XMLSchema.string));
        }
        return Literal;
    }(Node));
    fibra.Literal = Literal;
    var Quad = (function () {
        function Quad(subject, predicate, object, graph) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.graph = graph;
        }
        Quad.prototype.toCanonical = function () {
            return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical() + (this.graph.termType === 'DefaultGraph' ? '' : (' ' + this.graph.toCanonical()));
        };
        Quad.prototype.equals = function (other) {
            return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph);
        };
        return Quad;
    }());
    fibra.Quad = Quad;
    var Triple = (function () {
        function Triple(subject, predicate, object) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.graph = DefaultGraph.instance;
        }
        Triple.prototype.toCanonical = function () {
            return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical();
        };
        Triple.prototype.equals = function (other) {
            return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph);
        };
        return Triple;
    }());
    fibra.Triple = Triple;
    var Graph = (function () {
        function Graph(graph, triples) {
            if (triples === void 0) { triples = []; }
            this.graph = graph;
            this.triples = triples;
        }
        return Graph;
    }());
    fibra.Graph = Graph;
    var DataFactory = (function () {
        function DataFactory() {
            this.nextBlankNodeId = 0;
        }
        DataFactory.prototype.nodeFromBinding = function (binding) {
            var n = new Node(binding.value, binding.type === 'literal' ? 'Literal' : (binding.type === 'uri' ? 'NamedNode' : 'BlankNode'));
            if (binding.type === 'literal') {
                n.language = binding['xml:lang'] ? binding['xml:lang'] : '';
                n.datatype = binding.datatype ? new NamedNode(binding.datatype) : (n.language !== '' ? RDF.langString : XMLSchema.string);
            }
            return n;
        };
        DataFactory.prototype.nodeFromNode = function (other) {
            if (other.termType === 'Literal')
                return new Literal(other.value, other.language, other.datatype);
            else
                return new Node(other.value, other.termType);
        };
        DataFactory.prototype.nodeFromCanonicalRepresentation = function (id) {
            if (id.indexOf('<') === 0)
                return new NamedNode(id.substring(1, id.length - 1));
            else if (id.indexOf('_:') === 0)
                return new BlankNode(id.substring(2));
            else {
                var value = id.substring(1, id.lastIndexOf('"'));
                if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1)
                    return new Literal(value, id.substring(id.lastIndexOf('@')));
                else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
                    return new Literal(value, '', new NamedNode(id.substring(id.lastIndexOf('^^<'), id.length - 1)));
                else
                    return new Literal(value);
            }
        };
        DataFactory.prototype.namedNode = function (value) { return new NamedNode(value); };
        DataFactory.prototype.blankNode = function (value) { return new BlankNode(value ? value : ('b' + ++this.nextBlankNodeId)); };
        DataFactory.prototype.literal = function (value, languageOrDatatype) {
            if (typeof (languageOrDatatype) === 'string')
                return new Literal(value, languageOrDatatype);
            else
                return new Literal(value, undefined, languageOrDatatype);
        };
        DataFactory.prototype.variable = function (value) { return new Variable(value); };
        DataFactory.prototype.defaultGraph = function () { return DefaultGraph.instance; };
        DataFactory.prototype.triple = function (subject, predicate, object) {
            return new Triple(subject, predicate, object);
        };
        DataFactory.prototype.quad = function (subject, predicate, object, graph) {
            return new Quad(subject, predicate, object, graph ? graph : DefaultGraph.instance);
        };
        DataFactory.instance = new DataFactory();
        return DataFactory;
    }());
    fibra.DataFactory = DataFactory;
    var SKOS = (function () {
        function SKOS() {
        }
        SKOS.ns = 'http://www.w3.org/2004/02/skos/core#';
        SKOS.prefLabel = new NamedNode(SKOS.ns + 'prefLabel');
        return SKOS;
    }());
    fibra.SKOS = SKOS;
    var OWL = (function () {
        function OWL() {
        }
        OWL.ns = 'http://www.w3.org/2002/07/owl#';
        OWL.sameAs = new NamedNode(OWL.ns + 'sameAs');
        return OWL;
    }());
    fibra.OWL = OWL;
    var RDF = (function () {
        function RDF() {
        }
        RDF.ns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
        RDF.type = new NamedNode(RDF.ns + 'type');
        RDF.langString = new NamedNode(RDF.ns + 'langString');
        return RDF;
    }());
    fibra.RDF = RDF;
    var XMLSchema = (function () {
        function XMLSchema() {
        }
        XMLSchema.ns = 'http://www.w3.org/2001/XMLSchema#';
        XMLSchema.string = new NamedNode(XMLSchema.ns + 'string');
        return XMLSchema;
    }());
    fibra.XMLSchema = XMLSchema;
    var CIDOC = (function () {
        function CIDOC() {
        }
        CIDOC.ns = 'http://www.cidoc-crm.org/cidoc-crm/';
        CIDOC.Person = new NamedNode(CIDOC.ns + 'E21_Person');
        CIDOC.Place = new NamedNode(CIDOC.ns + 'E53_Place');
        CIDOC.Group = new NamedNode(CIDOC.ns + 'E74_Group');
        return CIDOC;
    }());
    fibra.CIDOC = CIDOC;
    var ENodeMap = (function () {
        function ENodeMap(create, map) {
            if (create === void 0) { create = function () { return {}; }; }
            if (map === void 0) { map = new fibra.EMap(); }
            this.create = create;
            this.map = map;
        }
        ENodeMap.prototype.goc = function (key, create) {
            if (!this.has(key))
                this.set(key, create ? create(key) : this.create(key));
            return this.get(key);
        };
        ENodeMap.prototype.get = function (key) {
            return this.map.get(key.toCanonical());
        };
        ENodeMap.prototype.remove = function (key) {
            return this.map.remove(key.toCanonical());
        };
        ENodeMap.prototype.each = function (f) {
            var _this = this;
            this.map.each(function (value, key, map) { return f(value, DataFactory.instance.nodeFromCanonicalRepresentation(key), _this); });
        };
        ENodeMap.prototype.has = function (key) {
            return this.map.has(key.toCanonical());
        };
        ENodeMap.prototype.set = function (key, value) {
            this.map.set(key.toCanonical(), value);
            return this;
        };
        Object.defineProperty(ENodeMap.prototype, "size", {
            get: function () {
                return this.map.size();
            },
            enumerable: true,
            configurable: true
        });
        ENodeMap.prototype.values = function () {
            return this.map.values();
        };
        ENodeMap.prototype.keys = function () {
            return this.map.keys().map(function (k) { return DataFactory.instance.nodeFromCanonicalRepresentation(k); });
        };
        ENodeMap.prototype.entries = function () {
            return this.map.entries().map(function (o) { return { key: DataFactory.instance.nodeFromCanonicalRepresentation(o.key), value: o.value }; });
        };
        ENodeMap.prototype.clear = function () {
            this.map.clear();
            return this;
        };
        return ENodeMap;
    }());
    fibra.ENodeMap = ENodeMap;
    var EONodeMap = (function (_super) {
        __extends(EONodeMap, _super);
        function EONodeMap(create) {
            _super.call(this, create, new fibra.EOMap());
        }
        return EONodeMap;
    }(ENodeMap));
    fibra.EONodeMap = EONodeMap;
    var NodeSet = (function () {
        function NodeSet(map) {
            if (map === void 0) { map = new fibra.EMap(); }
            this.m = new ENodeMap(undefined, map);
        }
        NodeSet.prototype.add = function (value) {
            this.m.set(value, value);
            return this;
        };
        NodeSet.prototype.adda = function (arr) {
            var _this = this;
            arr.forEach(function (n) { return _this.add(n); });
            return this;
        };
        NodeSet.prototype.adds = function (oset) {
            var _this = this;
            oset.each(function (n) { return _this.add(n); });
            return this;
        };
        NodeSet.prototype.has = function (value) {
            return this.m.has(value);
        };
        NodeSet.prototype.get = function (value) {
            return this.m.get(value);
        };
        NodeSet.prototype.clear = function () {
            this.m.clear();
            return this;
        };
        NodeSet.prototype.remove = function (value) {
            return this.m.remove(value);
        };
        NodeSet.prototype.values = function () {
            return this.m.values();
        };
        Object.defineProperty(NodeSet.prototype, "size", {
            get: function () {
                return this.m.size;
            },
            enumerable: true,
            configurable: true
        });
        NodeSet.prototype.each = function (f) {
            var _this = this;
            this.m.each(function (value, key, map) { return f(value, value, _this); });
        };
        return NodeSet;
    }());
    fibra.NodeSet = NodeSet;
    var ONodeSet = (function (_super) {
        __extends(ONodeSet, _super);
        function ONodeSet() {
            _super.call(this, new fibra.EOMap());
        }
        return ONodeSet;
    }(NodeSet));
    fibra.ONodeSet = ONodeSet;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,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QTNDQSxBQTJDQyxJQUFBO0lBM0NZLGFBQU8sVUEyQ25CLENBQUE7SUFFRDtRQUErQyw0QkFBVTtRQUN2RDtZQUNFLGtCQUFNLElBQUksV0FBSyxFQUFLLENBQUMsQ0FBQTtRQUN2QixDQUFDO1FBQ0gsZUFBQztJQUFELENBSkEsQUFJQyxDQUo4QyxPQUFPLEdBSXJEO0lBSlksY0FBUSxXQUlwQixDQUFBO0FBSUgsQ0FBQyxFQTNSUyxLQUFLLEtBQUwsS0FBSyxRQTJSZCIsImZpbGUiOiJzY3JpcHRzL3JkZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgaW50ZXJmYWNlIElOb2RlIGV4dGVuZHMgSVRlcm0ge1xuICAgIGxhbmd1YWdlPzogc3RyaW5nXG4gICAgZGF0YXR5cGU/OiBJTmFtZWROb2RlXG4gIH1cblxuICBleHBvcnQgY2xhc3MgTm9kZSBpbXBsZW1lbnRzIElOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIHRlcm1UeXBlOiAnTmFtZWROb2RlJyB8ICdCbGFua05vZGUnIHwgJ0xpdGVyYWwnIHwgJ1ZhcmlhYmxlJyB8ICdEZWZhdWx0R3JhcGgnLCBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgcHVibGljIGRhdGF0eXBlOiBJTmFtZWROb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7fVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcge1xuICAgICAgc3dpdGNoICh0aGlzLnRlcm1UeXBlKSB7XG4gICAgICAgIGNhc2UgJ05hbWVkTm9kZSc6IHJldHVybiAnPCcgKyB0aGlzLnZhbHVlICsgJz4nXG4gICAgICAgIGNhc2UgJ0JsYW5rTm9kZSc6IHJldHVybiAnXzonICsgdGhpcy52YWx1ZVxuICAgICAgICBjYXNlICdMaXRlcmFsJzogcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudmFsdWUpICsgKHRoaXMubGFuZ3VhZ2UgPyAnQCcgKyB0aGlzLmxhbmd1YWdlIDogKFhNTFNjaGVtYS5zdHJpbmcuZXF1YWxzKHRoaXMuZGF0YXR5cGUhKSA/ICcnIDogJ15eJyArIHRoaXMuZGF0YXR5cGUhLnRvQ2Fub25pY2FsKCkpKVxuICAgICAgICBjYXNlICdWYXJpYWJsZSc6IHJldHVybiAnPycgKyB0aGlzLnZhbHVlXG4gICAgICAgIGNhc2UgJ0RlZmF1bHRHcmFwaCc6IHJldHVybiAnJ1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyAnVW5rbm93biB0ZXJtIHR5cGUgJyArIHRoaXNcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogSVRlcm0pOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnRlcm1UeXBlID09PSBvdGhlci50ZXJtVHlwZSAmJiB0aGlzLnZhbHVlID09PSBvdGhlci52YWx1ZSAmJiAodGhpcy50ZXJtVHlwZSAhPT0gJ0xpdGVyYWwnIHx8ICh0aGlzLmxhbmd1YWdlID09PSAoPElMaXRlcmFsPm90aGVyKS5sYW5ndWFnZSAmJiB0aGlzLmRhdGF0eXBlID09PSAoPElMaXRlcmFsPm90aGVyKS5kYXRhdHlwZSkpXG4gICAgfVxuICB9XG5cbiAgIGV4cG9ydCBjbGFzcyBOb2RlRnJvbU5vZGUgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihvdGhlcjogSU5vZGUpIHtcbiAgICAgIHN1cGVyKG90aGVyLnZhbHVlLCBvdGhlci50ZXJtVHlwZSwgb3RoZXIubGFuZ3VhZ2UsIG90aGVyLmRhdGF0eXBlKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBEZWZhdWx0R3JhcGggZXh0ZW5kcyBOb2RlIGltcGxlbWVudHMgSURlZmF1bHRHcmFwaCB7XG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogSURlZmF1bHRHcmFwaCA9IG5ldyBEZWZhdWx0R3JhcGgoKVxuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ0RlZmF1bHRHcmFwaCdcbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHsgcmV0dXJuICcnIH1cbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBJVGVybSk6IGJvb2xlYW4geyByZXR1cm4gb3RoZXIudGVybVR5cGUgPT09ICdEZWZhdWx0R3JhcGgnIH1cbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoJycsICdEZWZhdWx0R3JhcGgnKSB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVmFyaWFibGUgZXh0ZW5kcyBOb2RlIGltcGxlbWVudHMgSVZhcmlhYmxlIHtcbiAgICBwdWJsaWMgdGVybVR5cGU6ICdWYXJpYWJsZSdcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nKSB7IHN1cGVyKHZhbHVlLCAnVmFyaWFibGUnKSB9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7IHJldHVybiAnPycgKyB0aGlzLnZhbHVlIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBOYW1lZE5vZGUgZXh0ZW5kcyBOb2RlIGltcGxlbWVudHMgSU5hbWVkTm9kZSB7XG4gICAgcHVibGljIHRlcm1UeXBlOiAnTmFtZWROb2RlJ1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHsgc3VwZXIodmFsdWUsICdOYW1lZE5vZGUnKSB9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7IHJldHVybiAnPCcgKyB0aGlzLnZhbHVlICsgJz4nIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBCbGFua05vZGUgZXh0ZW5kcyBOb2RlIGltcGxlbWVudHMgSUJsYW5rTm9kZSB7XG4gICAgcHVibGljIHRlcm1UeXBlOiAnQmxhbmtOb2RlJ1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHsgc3VwZXIodmFsdWUsICdCbGFua05vZGUnKSB9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7IHJldHVybiAnPycgKyB0aGlzLnZhbHVlIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBMaXRlcmFsIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElMaXRlcmFsIHtcbiAgICBwdWJsaWMgdGVybVR5cGU6ICdMaXRlcmFsJ1xuICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nXG4gICAgcHVibGljIGRhdGF0eXBlOiBJTmFtZWROb2RlXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyA9ICcnLCBkYXRhdHlwZT86IElOYW1lZE5vZGUpIHtcbiAgICAgIHN1cGVyKHZhbHVlLCAnTGl0ZXJhbCcsIGxhbmd1YWdlLCBkYXRhdHlwZSA/IGRhdGF0eXBlIDogKGxhbmd1YWdlICE9PSAnJyA/IFJERi5sYW5nU3RyaW5nIDogWE1MU2NoZW1hLnN0cmluZykpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFF1YWQgaW1wbGVtZW50cyBJUXVhZCB7XG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgcHVibGljIHN1YmplY3Q6IElOb2RlLFxuICAgICAgcHVibGljIHByZWRpY2F0ZTogSU5vZGUsXG4gICAgICBwdWJsaWMgb2JqZWN0OiBJTm9kZSxcbiAgICAgIHB1YmxpYyBncmFwaDogSU5vZGVcbiAgICApIHt9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7XG4gICAgIHJldHVybiB0aGlzLnN1YmplY3QudG9DYW5vbmljYWwoKSArICcgJyArIHRoaXMucHJlZGljYXRlLnRvQ2Fub25pY2FsKCkgKyAnICcgKyB0aGlzLm9iamVjdC50b0Nhbm9uaWNhbCgpICsgKHRoaXMuZ3JhcGgudGVybVR5cGUgPT09ICdEZWZhdWx0R3JhcGgnID8gJycgOiAoJyAnICsgdGhpcy5ncmFwaC50b0Nhbm9uaWNhbCgpKSlcbiAgICB9XG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogSVF1YWQpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YmplY3QuZXF1YWxzKG90aGVyLnN1YmplY3QpICYmIHRoaXMucHJlZGljYXRlLmVxdWFscyhvdGhlci5wcmVkaWNhdGUpICYmIHRoaXMub2JqZWN0LmVxdWFscyhvdGhlci5vYmplY3QpICYmIHRoaXMuZ3JhcGguZXF1YWxzKG90aGVyLmdyYXBoKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBUcmlwbGUgaW1wbGVtZW50cyBJVHJpcGxlIHtcbiAgICBwdWJsaWMgZ3JhcGg6IElEZWZhdWx0R3JhcGggPSBEZWZhdWx0R3JhcGguaW5zdGFuY2VcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICBwdWJsaWMgc3ViamVjdDogSU5vZGUsXG4gICAgICBwdWJsaWMgcHJlZGljYXRlOiBJTm9kZSxcbiAgICAgIHB1YmxpYyBvYmplY3Q6IElOb2RlXG4gICAgKSB7fVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcge1xuICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LnRvQ2Fub25pY2FsKCkgKyAnICcgKyB0aGlzLnByZWRpY2F0ZS50b0Nhbm9uaWNhbCgpICsgJyAnICsgdGhpcy5vYmplY3QudG9DYW5vbmljYWwoKVxuICAgIH1cbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBJUXVhZCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC5lcXVhbHMob3RoZXIuc3ViamVjdCkgJiYgdGhpcy5wcmVkaWNhdGUuZXF1YWxzKG90aGVyLnByZWRpY2F0ZSkgJiYgdGhpcy5vYmplY3QuZXF1YWxzKG90aGVyLm9iamVjdCkgJiYgdGhpcy5ncmFwaC5lcXVhbHMob3RoZXIuZ3JhcGgpXG4gICAgfVxuICB9XG5cblxuICBleHBvcnQgY2xhc3MgR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGdyYXBoOiBJTm9kZSxcbiAgICAgIHB1YmxpYyB0cmlwbGVzOiBJUXVhZFtdID0gW11cbiAgICApIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRGF0YUZhY3RvcnkgaW1wbGVtZW50cyBJRGF0YUZhY3Rvcnkge1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogRGF0YUZhY3RvcnkgPSBuZXcgRGF0YUZhY3RvcnkoKVxuXG4gICAgcHJpdmF0ZSBuZXh0QmxhbmtOb2RlSWQ6IG51bWJlciA9IDBcblxuICAgIHB1YmxpYyBub2RlRnJvbUJpbmRpbmcoYmluZGluZzogcy5JU3BhcnFsQmluZGluZyk6IElOb2RlIHtcbiAgICAgIGxldCBuOiBOb2RlID0gbmV3IE5vZGUoYmluZGluZy52YWx1ZSwgYmluZGluZy50eXBlID09PSAnbGl0ZXJhbCcgPyAnTGl0ZXJhbCcgOiAoYmluZGluZy50eXBlID09PSAndXJpJyA/ICdOYW1lZE5vZGUnIDogJ0JsYW5rTm9kZScpKVxuICAgICAgaWYgKGJpbmRpbmcudHlwZSA9PT0gJ2xpdGVyYWwnKSB7XG4gICAgICAgIG4ubGFuZ3VhZ2UgPSBiaW5kaW5nWyd4bWw6bGFuZyddID8gYmluZGluZ1sneG1sOmxhbmcnXSA6ICcnXG4gICAgICAgIG4uZGF0YXR5cGUgPSBiaW5kaW5nLmRhdGF0eXBlID8gbmV3IE5hbWVkTm9kZShiaW5kaW5nLmRhdGF0eXBlKSA6IChuLmxhbmd1YWdlICE9PSAnJyA/IFJERi5sYW5nU3RyaW5nIDogWE1MU2NoZW1hLnN0cmluZylcbiAgICAgIH1cbiAgICAgIHJldHVybiBuXG4gICAgfVxuXG4gICAgcHVibGljIG5vZGVGcm9tTm9kZShvdGhlcjogSVRlcm0pOiBJTm9kZSB7XG4gICAgICBpZiAob3RoZXIudGVybVR5cGUgPT09ICdMaXRlcmFsJykgcmV0dXJuIG5ldyBMaXRlcmFsKG90aGVyLnZhbHVlLCAoPElMaXRlcmFsPm90aGVyKS5sYW5ndWFnZSwgKDxJTGl0ZXJhbD5vdGhlcikuZGF0YXR5cGUpXG4gICAgICBlbHNlIHJldHVybiBuZXcgTm9kZShvdGhlci52YWx1ZSwgb3RoZXIudGVybVR5cGUpXG4gICAgfVxuICAgIHB1YmxpYyBub2RlRnJvbUNhbm9uaWNhbFJlcHJlc2VudGF0aW9uKGlkOiBzdHJpbmcpOiBJTm9kZSB7XG4gICAgICBpZiAoaWQuaW5kZXhPZignPCcpID09PSAwKVxuICAgICAgICByZXR1cm4gbmV3IE5hbWVkTm9kZShpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSkpXG4gICAgICBlbHNlIGlmIChpZC5pbmRleE9mKCdfOicpID09PSAwKVxuICAgICAgICByZXR1cm4gbmV3IEJsYW5rTm9kZShpZC5zdWJzdHJpbmcoMikpXG4gICAgICBlbHNlIHtcbiAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBpZC5zdWJzdHJpbmcoMSwgaWQubGFzdEluZGV4T2YoJ1wiJykpXG4gICAgICAgIGlmIChpZC5sYXN0SW5kZXhPZignQCcpID09PSBpZC5sYXN0SW5kZXhPZignXCInKSArIDEpXG4gICAgICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlLCBpZC5zdWJzdHJpbmcoaWQubGFzdEluZGV4T2YoJ0AnKSkpXG4gICAgICAgIGVsc2UgaWYgKGlkLmxhc3RJbmRleE9mKCdeXjwnKSA9PT0gaWQubGFzdEluZGV4T2YoJ1wiJykgKyAxKVxuICAgICAgICAgIHJldHVybiBuZXcgTGl0ZXJhbCh2YWx1ZSwgJycsIG5ldyBOYW1lZE5vZGUoaWQuc3Vic3RyaW5nKGlkLmxhc3RJbmRleE9mKCdeXjwnKSwgaWQubGVuZ3RoIC0gMSkpKVxuICAgICAgICBlbHNlIHJldHVybiBuZXcgTGl0ZXJhbCh2YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIG5hbWVkTm9kZSh2YWx1ZTogc3RyaW5nKTogSU5hbWVkTm9kZSB7IHJldHVybiBuZXcgTmFtZWROb2RlKHZhbHVlKSB9XG4gICAgcHVibGljIGJsYW5rTm9kZSh2YWx1ZT86IHN0cmluZyk6IElCbGFua05vZGUgeyByZXR1cm4gbmV3IEJsYW5rTm9kZSh2YWx1ZSA/IHZhbHVlIDogKCdiJyArICsrdGhpcy5uZXh0QmxhbmtOb2RlSWQpKSB9XG4gICAgcHVibGljIGxpdGVyYWwodmFsdWU6IHN0cmluZywgbGFuZ3VhZ2VPckRhdGF0eXBlPzogc3RyaW5nfE5hbWVkTm9kZSk6IElMaXRlcmFsIHtcbiAgICAgIGlmICh0eXBlb2YobGFuZ3VhZ2VPckRhdGF0eXBlKSA9PT0gJ3N0cmluZycpIHJldHVybiBuZXcgTGl0ZXJhbCh2YWx1ZSwgPHN0cmluZz5sYW5ndWFnZU9yRGF0YXR5cGUpXG4gICAgICBlbHNlIHJldHVybiBuZXcgTGl0ZXJhbCh2YWx1ZSwgdW5kZWZpbmVkICwgPE5hbWVkTm9kZT5sYW5ndWFnZU9yRGF0YXR5cGUpXG4gICAgfVxuICAgIHB1YmxpYyB2YXJpYWJsZSh2YWx1ZTogc3RyaW5nKTogSVZhcmlhYmxlIHsgcmV0dXJuIG5ldyBWYXJpYWJsZSh2YWx1ZSkgfVxuICAgIHB1YmxpYyBkZWZhdWx0R3JhcGgoKTogSURlZmF1bHRHcmFwaCB7IHJldHVybiBEZWZhdWx0R3JhcGguaW5zdGFuY2UgfVxuICAgIHB1YmxpYyB0cmlwbGUoc3ViamVjdDogSVRlcm0sIHByZWRpY2F0ZTogSVRlcm0sIG9iamVjdDogSVRlcm0pOiBJUXVhZCB7XG4gICAgICByZXR1cm4gbmV3IFRyaXBsZShzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdClcbiAgICB9XG4gICAgcHVibGljIHF1YWQoc3ViamVjdDogSVRlcm0sIHByZWRpY2F0ZTogSVRlcm0sIG9iamVjdDogSVRlcm0sIGdyYXBoPzogSVRlcm0pOiBJUXVhZCB7XG4gICAgICByZXR1cm4gbmV3IFF1YWQoc3ViamVjdCwgcHJlZGljYXRlLCBvYmplY3QsIGdyYXBoID8gZ3JhcGggOiBEZWZhdWx0R3JhcGguaW5zdGFuY2UpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNLT1Mge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSMnXG4gICAgcHVibGljIHN0YXRpYyBwcmVmTGFiZWw6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFNLT1MubnMgKyAncHJlZkxhYmVsJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBPV0wge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCMnXG4gICAgcHVibGljIHN0YXRpYyBzYW1lQXM6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKE9XTC5ucyArICdzYW1lQXMnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFJERiB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnXG4gICAgcHVibGljIHN0YXRpYyB0eXBlOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShSREYubnMgKyAndHlwZScpXG4gICAgcHVibGljIHN0YXRpYyBsYW5nU3RyaW5nOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShSREYubnMgKyAnbGFuZ1N0cmluZycpXG4gIH1cblxuICBleHBvcnQgY2xhc3MgWE1MU2NoZW1hIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjJ1xuICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShYTUxTY2hlbWEubnMgKyAnc3RyaW5nJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDSURPQyB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vJ1xuICAgIHB1YmxpYyBzdGF0aWMgUGVyc29uOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShDSURPQy5ucyArICdFMjFfUGVyc29uJylcbiAgICBwdWJsaWMgc3RhdGljIFBsYWNlOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShDSURPQy5ucyArICdFNTNfUGxhY2UnKVxuICAgIHB1YmxpYyBzdGF0aWMgR3JvdXA6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKENJRE9DLm5zICsgJ0U3NF9Hcm91cCcpXG4gIH1cblxuICBleHBvcnQgY2xhc3MgRU5vZGVNYXA8Vj4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3JlYXRlOiAoa2V5PzogSU5vZGUpID0+IFYgPSAoKSA9PiB7IHJldHVybiA8Vj57fX0sIHByaXZhdGUgbWFwOiBFTWFwPFY+ID0gbmV3IEVNYXA8Vj4oKSkge31cbiAgICBwdWJsaWMgZ29jKGtleTogSU5vZGUsIGNyZWF0ZT86IChrZXk/OiBJTm9kZSkgPT4gVik6IFYge1xuICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKVxuICAgICAgICB0aGlzLnNldChrZXksIGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogdGhpcy5jcmVhdGUoa2V5KSlcbiAgICAgIHJldHVybiB0aGlzLmdldChrZXkpXG4gICAgfVxuICAgIHB1YmxpYyBnZXQoa2V5OiBJTm9kZSk6IFYge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLmdldChrZXkudG9DYW5vbmljYWwoKSlcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IElOb2RlKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAucmVtb3ZlKGtleS50b0Nhbm9uaWNhbCgpKVxuICAgIH1cbiAgICBwdWJsaWMgZWFjaChmOiAodmFsdWU6IFYsIGtleTogSU5vZGUsIG1hcDogRU5vZGVNYXA8Vj4pID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgIHRoaXMubWFwLmVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4gZih2YWx1ZSwgRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21DYW5vbmljYWxSZXByZXNlbnRhdGlvbihrZXkpLCB0aGlzKSlcbiAgICB9XG4gICAgcHVibGljIGhhcyhrZXk6IElOb2RlKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleS50b0Nhbm9uaWNhbCgpKVxuICAgIH1cbiAgICBwdWJsaWMgc2V0KGtleTogSU5vZGUsIHZhbHVlOiBWKTogRU5vZGVNYXA8Vj4ge1xuICAgICAgdGhpcy5tYXAuc2V0KGtleS50b0Nhbm9uaWNhbCgpLCB2YWx1ZSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZSgpXG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVltdIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC52YWx1ZXMoKVxuICAgIH1cbiAgICBwdWJsaWMga2V5cygpOiBJTm9kZVtdIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC5rZXlzKCkubWFwKGsgPT4gRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21DYW5vbmljYWxSZXByZXNlbnRhdGlvbihrKSlcbiAgICB9XG4gICAgcHVibGljIGVudHJpZXMoKToge2tleTogSU5vZGUsIHZhbHVlOiBWfVtdIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC5lbnRyaWVzKCkubWFwKG8gPT4geyByZXR1cm4geyBrZXk6IERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQ2Fub25pY2FsUmVwcmVzZW50YXRpb24oby5rZXkpLCB2YWx1ZTogby52YWx1ZSB9fSlcbiAgICB9XG4gICAgcHVibGljIGNsZWFyKCk6IEVOb2RlTWFwPFY+IHtcbiAgICAgIHRoaXMubWFwLmNsZWFyKClcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEVPTm9kZU1hcDxWPiBleHRlbmRzIEVOb2RlTWFwPFY+IHtcbiAgICBjb25zdHJ1Y3RvcihjcmVhdGU/OiAoa2V5PzogSU5vZGUpID0+IFYgKSB7XG4gICAgICBzdXBlcihjcmVhdGUsIG5ldyBFT01hcDxWPigpKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBOb2RlU2V0PE4gZXh0ZW5kcyBJTm9kZT4ge1xuICAgIHB1YmxpYyBtOiBFTm9kZU1hcDxOPlxuICAgIGNvbnN0cnVjdG9yKG1hcDogRU1hcDxOPiA9IG5ldyBFTWFwPE4+KCkpIHtcbiAgICAgIHRoaXMubSA9IG5ldyBFTm9kZU1hcDxOPih1bmRlZmluZWQsIG1hcClcbiAgICB9XG4gICAgcHVibGljIGFkZCh2YWx1ZTogTik6IE5vZGVTZXQ8Tj4ge1xuICAgICAgdGhpcy5tLnNldCh2YWx1ZSwgdmFsdWUpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgYWRkYShhcnI6IE5bXSk6IHRoaXMge1xuICAgICAgYXJyLmZvckVhY2gobiA9PiB0aGlzLmFkZChuKSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBhZGRzKG9zZXQ6IE5vZGVTZXQ8Tj4pOiB0aGlzIHtcbiAgICAgIG9zZXQuZWFjaChuID0+IHRoaXMuYWRkKG4pKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGhhcyh2YWx1ZTogTik6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMubS5oYXModmFsdWUpXG4gICAgfVxuICAgIHB1YmxpYyBnZXQodmFsdWU6IE4pOiBOIHtcbiAgICAgIHJldHVybiB0aGlzLm0uZ2V0KHZhbHVlKVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogTm9kZVNldDxOPiB7XG4gICAgICB0aGlzLm0uY2xlYXIoKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKHZhbHVlOiBOKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5tLnJlbW92ZSh2YWx1ZSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsdWVzKCk6IE5bXSB7XG4gICAgICByZXR1cm4gdGhpcy5tLnZhbHVlcygpXG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLm0uc2l6ZVxuICAgIH1cblxuICAgIHB1YmxpYyBlYWNoKGY6ICh2YWx1ZTogTiwga2V5OiBOLCBzZXQ6IE5vZGVTZXQ8Tj4pID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgIHRoaXMubS5lYWNoKCh2YWx1ZSwga2V5LCBtYXApID0+IGYodmFsdWUsIHZhbHVlLCB0aGlzKSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgT05vZGVTZXQ8TiBleHRlbmRzIElOb2RlPiBleHRlbmRzIE5vZGVTZXQ8Tj4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIobmV3IEVPTWFwPE4+KCkpXG4gICAgfVxuICB9XG5cblxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var NodePlusLabel = (function (_super) {
        __extends(NodePlusLabel, _super);
        function NodePlusLabel(node, label) {
            _super.call(this, node);
            if (label)
                this.label = label;
        }
        return NodePlusLabel;
    }(fibra.NodeFromNode));
    fibra.NodePlusLabel = NodePlusLabel;
    var SourcedNodePlusLabel = (function (_super) {
        __extends(SourcedNodePlusLabel, _super);
        function SourcedNodePlusLabel(node, label, sourceEndpoints) {
            if (sourceEndpoints === void 0) { sourceEndpoints = []; }
            _super.call(this, node, label);
            this.sourceEndpoints = sourceEndpoints;
        }
        return SourcedNodePlusLabel;
    }(NodePlusLabel));
    fibra.SourcedNodePlusLabel = SourcedNodePlusLabel;
    var PropertyToValues = (function (_super) {
        __extends(PropertyToValues, _super);
        function PropertyToValues(property) {
            _super.call(this, property);
            this.values = [];
        }
        return PropertyToValues;
    }(NodePlusLabel));
    fibra.PropertyToValues = PropertyToValues;
    var SourcePlusProperties = (function () {
        function SourcePlusProperties(source) {
            this.source = source;
            this.properties = [];
        }
        return SourcePlusProperties;
    }());
    fibra.SourcePlusProperties = SourcePlusProperties;
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            _super.apply(this, arguments);
            this.localProperties = [];
            this.remoteProperties = [];
            this.localInverseProperties = [];
            this.remoteInverseProperties = [];
        }
        return Item;
    }(NodePlusLabel));
    fibra.Item = Item;
    var SimpleConstraint = (function () {
        function SimpleConstraint(constraintString, priority) {
            if (priority === void 0) { priority = 0; }
            this.constraintString = constraintString;
            this.priority = priority;
        }
        return SimpleConstraint;
    }());
    fibra.SimpleConstraint = SimpleConstraint;
    var SparqlItemService = (function () {
        function SparqlItemService(workerService) {
            this.workerService = workerService;
        }
        SparqlItemService.UUID = function () {
            /* tslint:disable:no-bitwise */
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            return SparqlItemService.lut[d0 & 0xff] + SparqlItemService.lut[d0 >> 8 & 0xff] + SparqlItemService.lut[d0 >> 16 & 0xff] + SparqlItemService.lut[d0 >> 24 & 0xff] + '-' +
                SparqlItemService.lut[d1 & 0xff] + SparqlItemService.lut[d1 >> 8 & 0xff] + '-' + SparqlItemService.lut[d1 >> 16 & 0x0f | 0x40] + SparqlItemService.lut[d1 >> 24 & 0xff] + '-' +
                SparqlItemService.lut[d2 & 0x3f | 0x80] + SparqlItemService.lut[d2 >> 8 & 0xff] + '-' + SparqlItemService.lut[d2 >> 16 & 0xff] + SparqlItemService.lut[d2 >> 24 & 0xff] +
                SparqlItemService.lut[d3 & 0xff] + SparqlItemService.lut[d3 >> 8 & 0xff] + SparqlItemService.lut[d3 >> 16 & 0xff] + SparqlItemService.lut[d3 >> 24 & 0xff];
            /* tslint:enable:no-bitwise */
        };
        /**
         * Get a single item from the local store
         * @param canceller promise that can be resolved to cancel a remote fetch
         */
        SparqlItemService.prototype.getItem = function (id, canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItem', [id], canceller);
        };
        SparqlItemService.prototype.getItemsForExplore = function (canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItemsForExplore', [], canceller);
        };
        SparqlItemService.prototype.createNewItem = function (equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [equivalentNodes, properties]);
        };
        SparqlItemService.prototype.alterItem = function (id, propertiesToAdd, propertiesToRemove) {
            if (propertiesToRemove === void 0) { propertiesToRemove = []; }
            return this.workerService.call('sparqlItemWorkerService', 'alterItem', [id, propertiesToAdd, propertiesToRemove]);
        };
        SparqlItemService.prototype.deleteItem = function (id) {
            return this.workerService.call('sparqlItemWorkerService', 'deleteItem', [id]);
        };
        SparqlItemService.ns = 'http://ldf.fi/fibra/';
        SparqlItemService.schemaGraph = new fibra.NamedNode(SparqlItemService.ns + 'schema#');
        SparqlItemService.instanceGraph = new fibra.NamedNode(SparqlItemService.ns + 'main/');
        SparqlItemService.getLocalItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  {\n    <ID> sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  } UNION {\n    <ID> ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}";
        SparqlItemService.getItemInversePropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?property ?propertyLabel ?object ?objectLabel {\n  VALUES ?id { <IDS> }\n  ?object ?property ?id .\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.getRemoteItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?property ?propertyLabel ?object ?objectLabel {\n  VALUES ?id { <IDS> }\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.getItemsForExploreQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  ?id a ?type .\n  {\n    ?id owl:sameAs ?oid .\n    VALUES ?service {\n      <SERVICES>\n    }\n    SERVICE ?service {\n      ?oid ?property ?object .\n      OPTIONAL {\n        ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n      }\n      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n      OPTIONAL {\n        ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n      }\n      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n    }\n  } UNION {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  } UNION {\n    ?id ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}\n";
        SparqlItemService.deleteItemQuery = "\nDELETE {\n  GRAPH ?g {\n    <ID> ?p ?o .\n    ?s ?p <ID> .\n  }\n}\nWHERE {\n  GRAPH ?g {\n    { <ID> ?p ?o } UNION { ?s ?p <ID> }\n  }\n}\n";
        SparqlItemService.lut = (function () {
            var lut = [];
            for (var i = 0; i < 256; i++)
                lut[i] = (i < 16 ? '0' : '') + i.toString(16);
            return lut;
        })();
        return SparqlItemService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlItemService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlItemService = SparqlItemService;
    var SparqlItemWorkerService = (function () {
        function SparqlItemWorkerService(sparqlService, $q, sparqlUpdateWorkerService, configurationWorkerService) {
            this.sparqlService = sparqlService;
            this.$q = $q;
            this.sparqlUpdateWorkerService = sparqlUpdateWorkerService;
            this.configurationWorkerService = configurationWorkerService;
        }
        SparqlItemWorkerService.prototype.getItem = function (id, canceller) {
            var _this = this;
            var queryTemplate = this.configurationWorkerService.configuration.primaryEndpoint.localItemQueryTemplate;
            queryTemplate = queryTemplate.replace(/<ID>/g, id.toCanonical());
            var item = new Item(id);
            return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) {
                var propertyMap = new fibra.EMap();
                var propertyValueMap = new fibra.EMap(function () { return new fibra.EMap(); });
                for (var _i = 0, _a = response.data.results.bindings; _i < _a.length; _i++) {
                    var b = _a[_i];
                    if (b['itemLabel'])
                        item.label = fibra.DataFactory.instance.nodeFromBinding(b['itemLabel']);
                    _this.processItemResult(item.localProperties, propertyMap, propertyValueMap, _this.configurationWorkerService.configuration.primaryEndpoint, b);
                }
                var sameAses = item.localProperties.filter(function (p) { return fibra.OWL.sameAs.equals(p); })[0];
                var ids = [item.toCanonical()];
                if (sameAses)
                    for (var _b = 0, _c = sameAses.values; _b < _c.length; _b++) {
                        var v = _c[_b];
                        ids.push(v.toCanonical());
                    }
                return _this.$q.all(_this.configurationWorkerService.configuration.remoteEndpoints().map(function (endpoint) {
                    return _this.sparqlService.query(endpoint.endpoint.value, SparqlItemService.getRemoteItemPropertiesQuery.replace(/<IDS>/g, ids.join('')), { timeout: canceller }).then(function (response2) {
                        for (var _i = 0, _a = response2.data.results.bindings; _i < _a.length; _i++) {
                            var b = _a[_i];
                            _this.processItemResult(item.remoteProperties, propertyMap, propertyValueMap, endpoint, b);
                        }
                    });
                })).then(function () { return item; });
            });
        };
        SparqlItemWorkerService.prototype.getItemsForExplore = function (canceller) {
            var _this = this;
            var queryTemplate = SparqlItemService.getItemsForExploreQuery;
            queryTemplate = queryTemplate.replace(/<SERVICES>/g, this.configurationWorkerService.configuration.remoteEndpoints().map(function (p) { return p.endpoint.toCanonical(); }).join(''));
            return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) {
                var items = new fibra.EOMap();
                var itemPropertyMap = new fibra.EMap(function () { return new fibra.EMap(); });
                var itemPropertyValueMap = new fibra.EMap(function () { return new fibra.EMap(function () { return new fibra.EMap(); }); });
                var _loop_1 = function(b) {
                    var item = items.goc(b['id'].value, function () { return new Item(fibra.DataFactory.instance.nodeFromBinding(b['id'])); });
                    if (b['itemLabel'])
                        item.label = fibra.DataFactory.instance.nodeFromBinding(b['itemLabel']);
                    _this.processItemResult(item.localProperties, itemPropertyMap.goc(b['id'].value), itemPropertyValueMap.goc(b['id'].value), _this.configurationWorkerService.configuration.primaryEndpoint, b);
                };
                for (var _i = 0, _a = response.data.results.bindings; _i < _a.length; _i++) {
                    var b = _a[_i];
                    _loop_1(b);
                }
                return items.values();
            });
        };
        SparqlItemWorkerService.prototype.deleteItem = function (id) {
            return this.sparqlService.update(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, this.configurationWorkerService.configuration.deleteItemQuery.replace(/<ID>/g, id.toCanonical())).then(function (r) { return r.status === 204; }, function (r) { return false; });
        };
        SparqlItemWorkerService.prototype.alterItem = function (id, propertiesToAdd, propertiesToRemove) {
            if (propertiesToRemove === void 0) { propertiesToRemove = []; }
            var instanceTriplesToAdd = [];
            var schemaTriplesToAdd = [];
            var instanceTriplesToRemove = [];
            propertiesToAdd.forEach(function (property) {
                if (property.label)
                    schemaTriplesToAdd.push(new fibra.Triple(property, fibra.SKOS.prefLabel, property.label));
                property.values.forEach(function (value) {
                    instanceTriplesToAdd.push(new fibra.Triple(id, property, value));
                    if (value.label)
                        instanceTriplesToAdd.push(new fibra.Triple(value, fibra.SKOS.prefLabel, value.label));
                });
            });
            propertiesToRemove.forEach(function (property) { return property.values.forEach(function (value) { return instanceTriplesToRemove.push(new fibra.Triple(id, property, value)); }); });
            return this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new fibra.Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new fibra.Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]);
        };
        SparqlItemWorkerService.prototype.createNewItem = function (equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            var deferred = this.$q.defer();
            var subject = new fibra.NamedNode(SparqlItemService.ns + SparqlItemService.UUID());
            deferred.notify(subject);
            var schemaTriplesToAdd = [];
            var instanceTriplesToAdd = [];
            equivalentNodes.forEach(function (node) { return instanceTriplesToAdd.push(new fibra.Triple(subject, fibra.OWL.sameAs, node)); });
            properties.forEach(function (property) {
                if (property.label)
                    schemaTriplesToAdd.push(new fibra.Triple(property, fibra.SKOS.prefLabel, property.label));
                property.values.forEach(function (value) {
                    instanceTriplesToAdd.push(new fibra.Triple(subject, property, value));
                    if (value.label)
                        instanceTriplesToAdd.push(new fibra.Triple(value, fibra.SKOS.prefLabel, value.label));
                });
            });
            this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new fibra.Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new fibra.Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]).then(function () { return deferred.resolve(subject); }, deferred.reject, deferred.notify);
            return deferred.promise;
        };
        SparqlItemWorkerService.prototype.processItemResult = function (properties, propertyMap, propertyValueMap, endpoint, b) {
            if (b['property']) {
                var n = propertyValueMap.goc(b['property'].value).goc(b['object'].value, function () {
                    var propertyToValues = propertyMap.goc(b['property'].value, function () {
                        var ret = new PropertyToValues(fibra.DataFactory.instance.nodeFromBinding(b['property']));
                        if (b['propertyLabel'])
                            ret.label = fibra.DataFactory.instance.nodeFromBinding(b['propertyLabel']);
                        properties.push(ret);
                        return ret;
                    });
                    var oNode = new SourcedNodePlusLabel(fibra.DataFactory.instance.nodeFromBinding(b['object']));
                    propertyToValues.values.push(oNode);
                    return oNode;
                });
                n.sourceEndpoints.push(endpoint);
                if (b['objectLabel'] && !n.label)
                    n.label = fibra.DataFactory.instance.nodeFromBinding(b['objectLabel']);
            }
        };
        return SparqlItemWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemWorkerService',['sparqlService','$q','sparqlUpdateWorkerService','configurationWorkerService',function(){return new (Function.prototype.bind.apply(SparqlItemWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlItemWorkerService = SparqlItemWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQXNWZDtBQXRWRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBY1o7UUFBbUMsaUNBQVk7UUFFN0MsdUJBQVksSUFBVyxFQUFFLEtBQWE7WUFDcEMsa0JBQU0sSUFBSSxDQUFDLENBQUE7WUFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDL0IsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FOQSxBQU1DLENBTmtDLGtCQUFZLEdBTTlDO0lBTlksbUJBQWEsZ0JBTXpCLENBQUE7SUFFRDtRQUEwQyx3Q0FBYTtRQUNyRCw4QkFBWSxJQUFXLEVBQUUsS0FBYSxFQUFTLGVBQTZDO1lBQXBELCtCQUFvRCxHQUFwRCxvQkFBb0Q7WUFDMUYsa0JBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBRDJCLG9CQUFlLEdBQWYsZUFBZSxDQUE4QjtRQUU1RixDQUFDO1FBQ0gsMkJBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKeUMsYUFBYSxHQUl0RDtJQUpZLDBCQUFvQix1QkFJaEMsQ0FBQTtJQU1EO1FBQXVELG9DQUFhO1FBRWxFLDBCQUFZLFFBQWU7WUFDekIsa0JBQU0sUUFBUSxDQUFDLENBQUE7WUFGVixXQUFNLEdBQVEsRUFBRSxDQUFBO1FBR3ZCLENBQUM7UUFDSCx1QkFBQztJQUFELENBTEEsQUFLQyxDQUxzRCxhQUFhLEdBS25FO0lBTFksc0JBQWdCLG1CQUs1QixDQUFBO0lBRUQ7UUFFRSw4QkFBbUIsTUFBNkI7WUFBN0IsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7WUFEekMsZUFBVSxHQUF1QyxFQUFFLENBQUE7UUFDUCxDQUFDO1FBQ3RELDJCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSwwQkFBb0IsdUJBR2hDLENBQUE7SUFFRDtR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LENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxpQkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7WUFDcEcsQ0FBQztRQUNILENBQUM7UUFFSCw4QkFBQztJQUFELENBOUdBLEFBOEdDLElBQUE7SUE5R1ksNkJBQXVCLDBCQThHbkMsQ0FBQTtBQUVILENBQUMsRUF0VlMsS0FBSyxLQUFMLEtBQUssUUFzVmQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtaXRlbS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVNvdXJjZWROb2RlIGV4dGVuZHMgSU5vZGUge1xuICAgIHNvdXJjZUVuZHBvaW50czogRW5kcG9pbnRDb25maWd1cmF0aW9uW11cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSU5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBJTm9kZSB7XG4gICAgbGFiZWw6IElOb2RlXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElTb3VyY2VkTm9kZVBsdXNMYWJlbCBleHRlbmRzIElOb2RlUGx1c0xhYmVsLCBJU291cmNlZE5vZGUge31cblxuICBleHBvcnQgY2xhc3MgTm9kZVBsdXNMYWJlbCBleHRlbmRzIE5vZGVGcm9tTm9kZSBpbXBsZW1lbnRzIElOb2RlUGx1c0xhYmVsIHtcbiAgICBwdWJsaWMgbGFiZWw6IElOb2RlXG4gICAgY29uc3RydWN0b3Iobm9kZTogSU5vZGUsIGxhYmVsPzogSU5vZGUpIHtcbiAgICAgIHN1cGVyKG5vZGUpXG4gICAgICBpZiAobGFiZWwpIHRoaXMubGFiZWwgPSBsYWJlbFxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTb3VyY2VkTm9kZVBsdXNMYWJlbCBleHRlbmRzIE5vZGVQbHVzTGFiZWwgaW1wbGVtZW50cyBJU291cmNlZE5vZGVQbHVzTGFiZWwge1xuICAgIGNvbnN0cnVjdG9yKG5vZGU6IElOb2RlLCBsYWJlbD86IElOb2RlLCBwdWJsaWMgc291cmNlRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IFtdKSB7XG4gICAgICBzdXBlcihub2RlLCBsYWJlbClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eVRvVmFsdWVzPFQgZXh0ZW5kcyBJTm9kZT4gZXh0ZW5kcyBJTm9kZVBsdXNMYWJlbCB7XG4gICAgdmFsdWVzOiBUW11cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVRvVmFsdWVzPFQgZXh0ZW5kcyBJTm9kZT4gZXh0ZW5kcyBOb2RlUGx1c0xhYmVsIGltcGxlbWVudHMgSVByb3BlcnR5VG9WYWx1ZXM8VD4ge1xuICAgIHB1YmxpYyB2YWx1ZXM6IFRbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHJvcGVydHk6IElOb2RlKSB7XG4gICAgICBzdXBlcihwcm9wZXJ0eSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU291cmNlUGx1c1Byb3BlcnRpZXMge1xuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBFbmRwb2ludENvbmZpZ3VyYXRpb24pIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSXRlbSBleHRlbmRzIE5vZGVQbHVzTGFiZWwge1xuICAgIHB1YmxpYyBsb2NhbFByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+W10gPSBbXVxuICAgIHB1YmxpYyByZW1vdGVQcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgICBwdWJsaWMgbG9jYWxJbnZlcnNlUHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD5bXSA9IFtdXG4gICAgcHVibGljIHJlbW90ZUludmVyc2VQcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUNvbnN0cmFpbnQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cmFpbnQgYXMgZXhwcmVzc2VkIGFzIGEgU1BBUlFMIGV4cHJlc3Npb25cbiAgICAgKi9cbiAgICBjb25zdHJhaW50U3RyaW5nOiBzdHJpbmdcbiAgICAvKipcbiAgICAgKiBPcmRlcmluZyBoaW50IGZvciBvcmRlcmluZyBjb25zdHJhaW50cyBpbiB0aGUgU1BBUlFMIHF1ZXJ5LiBUaGUgbGFyZ2VyLCB0aGUgbW9yZSBpbXBvcnRhbnQgKHdoZXJlIGl0IG1hdHRlcnMpXG4gICAgICovXG4gICAgcHJpb3JpdHk6IG51bWJlclxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNpbXBsZUNvbnN0cmFpbnQgaW1wbGVtZW50cyBJQ29uc3RyYWludCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbnN0cmFpbnRTdHJpbmc6IHN0cmluZywgcHVibGljIHByaW9yaXR5OiBudW1iZXIgPSAwKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEl0ZW1TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vbGRmLmZpL2ZpYnJhLydcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYUdyYXBoOiBJTm9kZSA9IG5ldyBOYW1lZE5vZGUoU3BhcnFsSXRlbVNlcnZpY2UubnMgKyAnc2NoZW1hIycpXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZUdyYXBoOiBJTm9kZSA9IG5ldyBOYW1lZE5vZGUoU3BhcnFsSXRlbVNlcnZpY2UubnMgKyAnbWFpbi8nKVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRMb2NhbEl0ZW1Qcm9wZXJ0aWVzUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/aXRlbUxhYmVsID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gIHtcbiAgICA8SUQ+IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICB9IFVOSU9OIHtcbiAgICA8SUQ+ID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgICBPUFRJT05BTCB7XG4gICAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJvcGVydHlMYWJlbFApXG4gICAgfVxuICAgIEJJTkQoQ09BTEVTQ0UoP3Byb3BlcnR5TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9wcm9wZXJ0eSksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSkgQVMgP3Byb3BlcnR5TGFiZWwpXG4gICAgT1BUSU9OQUwge1xuICAgICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgICB9XG4gICAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG4gIH1cbn1gXG4gICAgcHVibGljIHN0YXRpYyBnZXRJdGVtSW52ZXJzZVByb3BlcnRpZXNRdWVyeTogc3RyaW5nID0gYFxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggb3dsOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gIFZBTFVFUyA/aWQgeyA8SURTPiB9XG4gID9vYmplY3QgP3Byb3BlcnR5ID9pZCAuXG4gID9pZCA/cHJvcGVydHkgP29iamVjdCAuXG4gIE9QVElPTkFMIHtcbiAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJvcGVydHlMYWJlbFApXG4gIH1cbiAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgT1BUSU9OQUwge1xuICAgID9vYmplY3Qgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/b2JqZWN0TGFiZWxQKSAuXG4gIH1cbiAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG59XG5gXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZW1vdGVJdGVtUHJvcGVydGllc1F1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgVkFMVUVTID9pZCB7IDxJRFM+IH1cbiAgP2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgT1BUSU9OQUwge1xuICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgfVxuICBCSU5EKENPQUxFU0NFKD9wcm9wZXJ0eUxhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/cHJvcGVydHkpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpIEFTID9wcm9wZXJ0eUxhYmVsKVxuICBPUFRJT05BTCB7XG4gICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgfVxuICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbn1cbmBcbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1zRm9yRXhwbG9yZVF1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP2lkID9pdGVtTGFiZWwgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgP2lkIGEgP3R5cGUgLlxuICB7XG4gICAgP2lkIG93bDpzYW1lQXMgP29pZCAuXG4gICAgVkFMVUVTID9zZXJ2aWNlIHtcbiAgICAgIDxTRVJWSUNFUz5cbiAgICB9XG4gICAgU0VSVklDRSA/c2VydmljZSB7XG4gICAgICA/b2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgICAgIE9QVElPTkFMIHtcbiAgICAgICAgP3Byb3BlcnR5IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP3Byb3BlcnR5TGFiZWxQKVxuICAgICAgfVxuICAgICAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgICAgIE9QVElPTkFMIHtcbiAgICAgICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgICAgIH1cbiAgICAgIEJJTkQgKElGKElTSVJJKD9vYmplY3QpLENPQUxFU0NFKD9vYmplY3RMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP29iamVjdCksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSksP29iamVjdCkgQVMgP29iamVjdExhYmVsKVxuICAgIH1cbiAgfSBVTklPTiB7XG4gICAgP2lkIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICB9IFVOSU9OIHtcbiAgICA/aWQgP3Byb3BlcnR5ID9vYmplY3QgLlxuICAgIE9QVElPTkFMIHtcbiAgICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgICB9XG4gICAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgICBPUFRJT05BTCB7XG4gICAgICA/b2JqZWN0IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP29iamVjdExhYmVsUCkgLlxuICAgIH1cbiAgICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbiAgfVxufVxuYFxuXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVJdGVtUXVlcnk6IHN0cmluZyA9IGBcbkRFTEVURSB7XG4gIEdSQVBIID9nIHtcbiAgICA8SUQ+ID9wID9vIC5cbiAgICA/cyA/cCA8SUQ+IC5cbiAgfVxufVxuV0hFUkUge1xuICBHUkFQSCA/ZyB7XG4gICAgeyA8SUQ+ID9wID9vIH0gVU5JT04geyA/cyA/cCA8SUQ+IH1cbiAgfVxufVxuYFxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbHV0OiBzdHJpbmdbXSA9ICgoKSA9PiB7XG4gICAgICBsZXQgbHV0OiBzdHJpbmdbXSA9IFtdXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgMjU2OyBpKyspXG4gICAgICAgIGx1dFtpXSA9IChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KVxuICAgICAgcmV0dXJuIGx1dFxuICAgIH0pKClcblxuICAgIHB1YmxpYyBzdGF0aWMgVVVJRCgpOiBzdHJpbmcge1xuICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZSAqL1xuICAgICAgbGV0IGQwOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIGxldCBkMTogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICBsZXQgZDI6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgbGV0IGQzOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIHJldHVybiBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiA4ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gMTYgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiAyNCAmIDB4ZmZdICsgJy0nICtcbiAgICAgICAgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDEgPj4gOCAmIDB4ZmZdICsgJy0nICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDE2ICYgMHgwZiB8IDB4NDBdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDI0ICYgMHhmZl0gKyAnLScgK1xuICAgICAgICBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgJiAweDNmIHwgMHg4MF0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gOCAmIDB4ZmZdICsgJy0nICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDE2ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gMjQgJiAweGZmXSArXG4gICAgICAgIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDggJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiAxNiAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDI0ICYgMHhmZl1cbiAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYml0d2lzZSAqL1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge31cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBpdGVtIGZyb20gdGhlIGxvY2FsIHN0b3JlXG4gICAgICogQHBhcmFtIGNhbmNlbGxlciBwcm9taXNlIHRoYXQgY2FuIGJlIHJlc29sdmVkIHRvIGNhbmNlbCBhIHJlbW90ZSBmZXRjaFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJdGVtKGlkOiBJTm9kZSwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxJdGVtPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2dldEl0ZW0nLCBbaWRdLCBjYW5jZWxsZXIpXG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1zRm9yRXhwbG9yZShjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW1bXT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdnZXRJdGVtc0ZvckV4cGxvcmUnLCBbXSwgY2FuY2VsbGVyKVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOZXdJdGVtKGVxdWl2YWxlbnROb2RlczogSU5vZGVbXSA9IFtdLCBwcm9wZXJ0aWVzOiBJUHJvcGVydHlUb1ZhbHVlczxJTm9kZT5bXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxJTm9kZT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdjcmVhdGVOZXdJdGVtJywgW2VxdWl2YWxlbnROb2RlcywgcHJvcGVydGllc10pXG4gICAgfVxuXG4gICAgcHVibGljIGFsdGVySXRlbShpZDogSU5vZGUsIHByb3BlcnRpZXNUb0FkZDogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10sIHByb3BlcnRpZXNUb1JlbW92ZTogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2FsdGVySXRlbScsIFtpZCwgcHJvcGVydGllc1RvQWRkLCBwcm9wZXJ0aWVzVG9SZW1vdmVdKVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVJdGVtKGlkOiBJTm9kZSk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2RlbGV0ZUl0ZW0nLCBbaWRdKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxJdGVtV29ya2VyU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZTogU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZSwgcHJpdmF0ZSBjb25maWd1cmF0aW9uV29ya2VyU2VydmljZTogQ29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbShpZDogSU5vZGUsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbT4ge1xuICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQubG9jYWxJdGVtUXVlcnlUZW1wbGF0ZVxuICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPElEPi9nLCBpZC50b0Nhbm9uaWNhbCgpKVxuICAgICAgbGV0IGl0ZW06IEl0ZW0gPSBuZXcgSXRlbShpZClcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkodGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC5lbmRwb2ludC52YWx1ZSwgcXVlcnlUZW1wbGF0ZSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICBsZXQgcHJvcGVydHlNYXA6IEVNYXA8UHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4+ID0gbmV3IEVNYXA8UHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4+KClcbiAgICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZU1hcDogRU1hcDxFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4+ID0gbmV3IEVNYXA8RU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+PigoKSA9PiBuZXcgRU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+KCkpXG4gICAgICAgICAgZm9yIChsZXQgYiBvZiByZXNwb25zZS5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoYlsnaXRlbUxhYmVsJ10pIGl0ZW0ubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnaXRlbUxhYmVsJ10pXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NJdGVtUmVzdWx0KGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLCBwcm9wZXJ0eU1hcCwgcHJvcGVydHlWYWx1ZU1hcCwgdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludCwgYilcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHNhbWVBc2VzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLmZpbHRlcihwID0+IE9XTC5zYW1lQXMuZXF1YWxzKHApKVswXVxuICAgICAgICAgIGxldCBpZHM6IHN0cmluZ1tdID0gW2l0ZW0udG9DYW5vbmljYWwoKV1cbiAgICAgICAgICBpZiAoc2FtZUFzZXMpIGZvciAobGV0IHYgb2Ygc2FtZUFzZXMudmFsdWVzKSBpZHMucHVzaCh2LnRvQ2Fub25pY2FsKCkpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5yZW1vdGVFbmRwb2ludHMoKS5tYXAoZW5kcG9pbnQgPT5cbiAgICAgICAgICAgIHRoaXMuc3BhcnFsU2VydmljZS5xdWVyeShlbmRwb2ludC5lbmRwb2ludC52YWx1ZSwgU3BhcnFsSXRlbVNlcnZpY2UuZ2V0UmVtb3RlSXRlbVByb3BlcnRpZXNRdWVyeS5yZXBsYWNlKC88SURTPi9nLCBpZHMuam9pbignJykpLCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgICAgICAgKHJlc3BvbnNlMjogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBiIG9mIHJlc3BvbnNlMi5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzKVxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSXRlbVJlc3VsdChpdGVtLnJlbW90ZVByb3BlcnRpZXMsIHByb3BlcnR5TWFwLCBwcm9wZXJ0eVZhbHVlTWFwLCBlbmRwb2ludCwgYilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICApKS50aGVuKCgpID0+IGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbXNGb3JFeHBsb3JlKGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbVtdPiB7XG4gICAgICBsZXQgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZ2V0SXRlbXNGb3JFeHBsb3JlUXVlcnlcbiAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxTRVJWSUNFUz4vZywgdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnJlbW90ZUVuZHBvaW50cygpLm1hcChwID0+IHAuZW5kcG9pbnQudG9DYW5vbmljYWwoKSkuam9pbignJykpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgbGV0IGl0ZW1zOiBFT01hcDxJdGVtPiA9IG5ldyBFT01hcDxJdGVtPigpXG4gICAgICAgICAgbGV0IGl0ZW1Qcm9wZXJ0eU1hcDogRU1hcDxFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+Pj4gPSBuZXcgRU1hcDxFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+Pj4oKCkgPT4gbmV3IEVNYXA8UHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4+KCkpXG4gICAgICAgICAgbGV0IGl0ZW1Qcm9wZXJ0eVZhbHVlTWFwOiBFTWFwPEVNYXA8RU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+Pj4gPSBuZXcgRU1hcDxFTWFwPEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPj4+KCgpID0+IG5ldyBFTWFwPEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPj4oKCkgPT4gbmV3IEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPigpKSlcbiAgICAgICAgICBmb3IgKGxldCBiIG9mIHJlc3BvbnNlLmRhdGEhLnJlc3VsdHMuYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGxldCBpdGVtOiBJdGVtID0gaXRlbXMuZ29jKGJbJ2lkJ10udmFsdWUsICgpID0+IG5ldyBJdGVtKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiWydpZCddKSkpXG4gICAgICAgICAgICBpZiAoYlsnaXRlbUxhYmVsJ10pIGl0ZW0ubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnaXRlbUxhYmVsJ10pXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NJdGVtUmVzdWx0KGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLCBpdGVtUHJvcGVydHlNYXAuZ29jKGJbJ2lkJ10udmFsdWUpLCBpdGVtUHJvcGVydHlWYWx1ZU1hcC5nb2MoYlsnaWQnXS52YWx1ZSksIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQsIGIpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdGVtcy52YWx1ZXMoKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZUl0ZW0oaWQ6IElOb2RlKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnVwZGF0ZSh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LnVwZGF0ZUVuZHBvaW50LnZhbHVlLCB0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24uZGVsZXRlSXRlbVF1ZXJ5LnJlcGxhY2UoLzxJRD4vZywgaWQudG9DYW5vbmljYWwoKSkpLnRoZW4oXG4gICAgICAgIChyKSA9PiByLnN0YXR1cyA9PT0gMjA0LFxuICAgICAgICAocikgPT4gZmFsc2VcbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgYWx0ZXJJdGVtKGlkOiBJTm9kZSwgcHJvcGVydGllc1RvQWRkOiBJUHJvcGVydHlUb1ZhbHVlczxJTm9kZT5bXSwgcHJvcGVydGllc1RvUmVtb3ZlOiBJUHJvcGVydHlUb1ZhbHVlczxJTm9kZT5bXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IElUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBJVHJpcGxlW10gPSBbXVxuICAgICAgbGV0IGluc3RhbmNlVHJpcGxlc1RvUmVtb3ZlOiBJVHJpcGxlW10gPSBbXVxuICAgICAgcHJvcGVydGllc1RvQWRkLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHkubGFiZWwpIHNjaGVtYVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUocHJvcGVydHksIFNLT1MucHJlZkxhYmVsLCBwcm9wZXJ0eS5sYWJlbCkpXG4gICAgICAgIHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUoaWQsIHByb3BlcnR5LCB2YWx1ZSkpXG4gICAgICAgICAgaWYgKCg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZSh2YWx1ZSwgU0tPUy5wcmVmTGFiZWwsICg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHByb3BlcnRpZXNUb1JlbW92ZS5mb3JFYWNoKHByb3BlcnR5ID0+IHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IGluc3RhbmNlVHJpcGxlc1RvUmVtb3ZlLnB1c2gobmV3IFRyaXBsZShpZCwgcHJvcGVydHksIHZhbHVlKSkpKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS51cGRhdGVHcmFwaHModGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC51cGRhdGVFbmRwb2ludC52YWx1ZSwgW25ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5zY2hlbWFHcmFwaCwgc2NoZW1hVHJpcGxlc1RvQWRkKSwgbmV3IEdyYXBoKFNwYXJxbEl0ZW1TZXJ2aWNlLmluc3RhbmNlR3JhcGgsIGluc3RhbmNlVHJpcGxlc1RvQWRkKV0pXG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5ld0l0ZW0oZXF1aXZhbGVudE5vZGVzOiBJTm9kZVtdID0gW10sIHByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8SU5vZGU+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8SU5vZGU+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICBsZXQgc3ViamVjdDogSU5vZGUgPSBuZXcgTmFtZWROb2RlKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgU3BhcnFsSXRlbVNlcnZpY2UuVVVJRCgpKVxuICAgICAgZGVmZXJyZWQubm90aWZ5KHN1YmplY3QpXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IFRyaXBsZVtdID0gW11cbiAgICAgIGVxdWl2YWxlbnROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHN1YmplY3QsIE9XTC5zYW1lQXMsIG5vZGUpKSlcbiAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIGlmIChwcm9wZXJ0eS5sYWJlbCkgc2NoZW1hVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShwcm9wZXJ0eSwgU0tPUy5wcmVmTGFiZWwsIHByb3BlcnR5LmxhYmVsKSlcbiAgICAgICAgcHJvcGVydHkudmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShzdWJqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpKVxuICAgICAgICAgIGlmICgoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUodmFsdWUsIFNLT1MucHJlZkxhYmVsLCAoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UudXBkYXRlR3JhcGhzKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQudXBkYXRlRW5kcG9pbnQudmFsdWUsIFtuZXcgR3JhcGgoU3BhcnFsSXRlbVNlcnZpY2Uuc2NoZW1hR3JhcGgsIHNjaGVtYVRyaXBsZXNUb0FkZCksIG5ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5pbnN0YW5jZUdyYXBoLCBpbnN0YW5jZVRyaXBsZXNUb0FkZCldKS50aGVuKFxuICAgICAgICAoKSA9PiBkZWZlcnJlZC5yZXNvbHZlKHN1YmplY3QpLFxuICAgICAgICBkZWZlcnJlZC5yZWplY3QsXG4gICAgICAgIGRlZmVycmVkLm5vdGlmeVxuICAgICAgKVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NJdGVtUmVzdWx0KHByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+W10sIHByb3BlcnR5TWFwOiBFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+PiwgcHJvcGVydHlWYWx1ZU1hcDogRU1hcDxFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4+LCBlbmRwb2ludDogRW5kcG9pbnRDb25maWd1cmF0aW9uLCBiOiB7W3ZhcklkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfSk6IHZvaWQge1xuICAgICAgaWYgKGJbJ3Byb3BlcnR5J10pIHtcbiAgICAgICAgbGV0IG46IElTb3VyY2VkTm9kZVBsdXNMYWJlbCA9IHByb3BlcnR5VmFsdWVNYXAuZ29jKGJbJ3Byb3BlcnR5J10udmFsdWUpLmdvYyhiWydvYmplY3QnXS52YWx1ZSwgKCkgPT4ge1xuICAgICAgICAgIGxldCBwcm9wZXJ0eVRvVmFsdWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IHByb3BlcnR5TWFwLmdvYyhiWydwcm9wZXJ0eSddLnZhbHVlLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0OiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPihEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsncHJvcGVydHknXSkpXG4gICAgICAgICAgICBpZiAoYlsncHJvcGVydHlMYWJlbCddKSByZXQubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsncHJvcGVydHlMYWJlbCddKVxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHJldClcbiAgICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGxldCBvTm9kZTogSVNvdXJjZWROb2RlUGx1c0xhYmVsID0gbmV3IFNvdXJjZWROb2RlUGx1c0xhYmVsKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiWydvYmplY3QnXSkpXG4gICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcy52YWx1ZXMucHVzaChvTm9kZSlcbiAgICAgICAgICByZXR1cm4gb05vZGVcbiAgICAgICAgfSlcbiAgICAgICAgbi5zb3VyY2VFbmRwb2ludHMucHVzaChlbmRwb2ludClcbiAgICAgICAgaWYgKGJbJ29iamVjdExhYmVsJ10gJiYgIW4ubGFiZWwpIG4ubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnb2JqZWN0TGFiZWwnXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var s = fi.seco.sparql;
    var ResultGroup = (function () {
        function ResultGroup(label) {
            this.label = label;
            this.results = [];
        }
        return ResultGroup;
    }());
    fibra.ResultGroup = ResultGroup;
    var Result = (function () {
        function Result(ids, datasources, matchedLabel, prefLabel) {
            this.ids = ids;
            this.datasources = datasources;
            this.matchedLabel = matchedLabel;
            this.prefLabel = prefLabel;
            this.additionalInformation = {};
        }
        return Result;
    }());
    fibra.Result = Result;
    var SparqlAutocompleteService = (function () {
        function SparqlAutocompleteService(workerService) {
            this.workerService = workerService;
        }
        SparqlAutocompleteService.prototype.autocomplete = function (query, limit, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit], canceller);
        };
        SparqlAutocompleteService.defaultMatchQueryTemplate = "\nPREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nPREFIX fibra: <http://ldf.fi/fibra/schema#>\nSELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES\n  {\n    SELECT ?groupId ?id (SUM(?sc) AS ?score) {\n      {\n        SELECT ?groupId ?id ?sc {\n          BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n          (?id ?sc) text:query ?query .\n          ?id a ?groupId .\n          # CONSTRAINTS\n        } LIMIT <LIMIT>\n      } UNION {\n        BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n        (?id ?sc) text:query ?query .\n        ?id a ?groupId .\n        # CONSTRAINTS\n      }\n    }\n    GROUP BY ?groupId ?id\n    HAVING(BOUND(?id))\n  }\n  {\n    ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?groupLabel) .\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?prefLabel) .\n  } UNION {\n    ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel\n    FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n  } UNION {\n    ?id owl:sameAs ?sameAs .\n  } UNION {\n    ?id skos:altLabel ?altLabel .\n  }\n  # ADDITIONALSELECT\n}\n";
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
    var SparqlAutocompleteWorkerService = (function () {
        function SparqlAutocompleteWorkerService($q, sparqlService, configurationWorkerService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
            this.configurationWorkerService = configurationWorkerService;
        }
        SparqlAutocompleteWorkerService.prototype.autocomplete = function (query, limit, canceller) {
            var _this = this;
            var idToIdSet = new fibra.EMap(function () { return new fibra.StringSet(); });
            var idToGroupIdSet = new fibra.EMap(function () { return new fibra.StringSet(); });
            var ifpVarPlusValueToIdSet = new fibra.EMap(function () { return new fibra.EMap(function () { return new fibra.StringSet(); }); });
            var idToPrefLabelSet = new fibra.EMap(function () { return new fibra.ONodeSet(); });
            var idToMatchedLabelSet = new fibra.EMap(function () { return new fibra.ONodeSet(); });
            var idToAltLabelSet = new fibra.EMap(function () { return new fibra.ONodeSet(); });
            var idToDatasourceSet = new fibra.EMap(function () { return new fibra.IdentitySet(); });
            return this.$q.all(this.configurationWorkerService.configuration.allEndpoints().map(function (endpointConfiguration) {
                var queryTemplate = endpointConfiguration.autocompletionTextMatchQueryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query));
                queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, endpointConfiguration.dataModelConfiguration.typeConstraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                queryTemplate = queryTemplate.replace(/<PREFLANG>/g, _this.configurationWorkerService.configuration.preferredLanguage);
                return _this.sparqlService.query(endpointConfiguration.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) { return response.data.results.bindings.forEach(function (binding) {
                    var id = binding['id'].value;
                    idToDatasourceSet.goc(id).add(endpointConfiguration);
                    if (binding['prefLabel'])
                        idToPrefLabelSet.goc(id).add(fibra.DataFactory.instance.nodeFromBinding(binding['prefLabel']));
                    if (binding['altLabel'])
                        idToAltLabelSet.goc(id).add(fibra.DataFactory.instance.nodeFromBinding(binding['altLabel']));
                    if (binding['matchedLabel'])
                        idToMatchedLabelSet.goc(id).add(fibra.DataFactory.instance.nodeFromBinding(binding['matchedLabel']));
                    if (binding['groupId']) {
                        idToGroupIdSet.goc(id).add(binding['groupId'].value);
                        if (binding['groupLabel'])
                            idToPrefLabelSet.goc(binding['groupId'].value).add(fibra.DataFactory.instance.nodeFromBinding(binding['groupLabel']));
                    }
                    if (binding['sameAs']) {
                        idToIdSet.goc(id).add(binding['sameAs'].value);
                        idToIdSet.goc(binding['sameAs'].value).add(id);
                    }
                    for (var _i = 0, _a = response.data.head.vars; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (v.indexOf('ifp') === 0 && binding[v])
                            ifpVarPlusValueToIdSet.goc(v.substring(3)).goc(binding[v].value).add(id);
                    }
                }); }).catch(function () { return undefined; });
            })).then(function () {
                // create sameAses for all objects sharing same inverse functional property values
                ifpVarPlusValueToIdSet.each(function (valueToIdSet) { return valueToIdSet.each(function (ids) { return ids.each(function (id) { return idToIdSet.goc(id).adds(ids); }); }); });
                // consolidate id sets as well as all id -related information
                idToIdSet.each(function (idSet, id) {
                    idSet.each(function (oid) {
                        var oidSet = idToIdSet.get(oid);
                        if (idSet !== oidSet) {
                            idToIdSet.set(oid, idSet);
                            idSet.adds(oidSet);
                            var datasourceSet = idToDatasourceSet.get(id);
                            var oDatasourceSet = idToDatasourceSet.get(oid);
                            if (datasourceSet) {
                                if (oDatasourceSet)
                                    datasourceSet.adds(oDatasourceSet);
                                idToDatasourceSet.set(oid, datasourceSet);
                            }
                            else if (oDatasourceSet)
                                idToDatasourceSet.set(id, oDatasourceSet);
                            var groupIdSet = idToGroupIdSet.get(id);
                            var oGroupIdSet = idToGroupIdSet.get(oid);
                            if (groupIdSet) {
                                if (oGroupIdSet)
                                    groupIdSet.adds(oGroupIdSet);
                                idToGroupIdSet.set(oid, groupIdSet);
                            }
                            else if (oGroupIdSet)
                                idToGroupIdSet.set(id, oGroupIdSet);
                            var mSet = idToPrefLabelSet.get(id);
                            var oSet = idToPrefLabelSet.get(oid);
                            if (mSet) {
                                if (oSet)
                                    mSet.adds(oSet);
                                idToPrefLabelSet.set(oid, mSet);
                            }
                            else if (oSet)
                                idToPrefLabelSet.set(id, oSet);
                            mSet = idToMatchedLabelSet.get(id);
                            oSet = idToMatchedLabelSet.get(oid);
                            if (mSet) {
                                if (oSet)
                                    mSet.adds(oSet);
                                idToMatchedLabelSet.set(oid, mSet);
                            }
                            else if (oSet)
                                idToMatchedLabelSet.set(id, oSet);
                            mSet = idToAltLabelSet.get(id);
                            oSet = idToAltLabelSet.get(oid);
                            if (mSet) {
                                if (oSet)
                                    mSet.adds(oSet);
                                idToAltLabelSet.set(oid, mSet);
                            }
                            else if (oSet)
                                idToAltLabelSet.set(id, oSet);
                        }
                    });
                });
                var ret = [];
                var groupIdToGroup = new fibra.EMap();
                var seen = new fibra.StringSet();
                idToIdSet.each(function (idSet, id) {
                    if (!seen.has(id)) {
                        seen.add(id);
                        var result_1 = new Result(idSet.values().map(function (oid) { return fibra.DataFactory.instance.namedNode(oid); }), idToDatasourceSet.get(id).values(), idToMatchedLabelSet.get(id).values()[0], idToPrefLabelSet.get(id).values()[0]);
                        if (idToAltLabelSet.has(id))
                            result_1.additionalInformation['altLabel'] = idToAltLabelSet.get(id).values();
                        idToGroupIdSet.get(id).each(function (gid) {
                            var resultGroup = groupIdToGroup.get(gid);
                            if (!resultGroup) {
                                resultGroup = new ResultGroup(idToPrefLabelSet.get(gid).values()[0].value);
                                groupIdToGroup.set(gid, resultGroup);
                                ret.push(resultGroup);
                            }
                            resultGroup.results.push(result_1);
                        });
                    }
                });
                return ret;
            });
        };
        return SparqlAutocompleteWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteWorkerService',['$q','sparqlService','configurationWorkerService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlAutocompleteWorkerService = SparqlAutocompleteWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQStLZDtBQS9LRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVosSUFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFFekI7UUFFRSxxQkFBbUIsS0FBYTtZQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7WUFEekIsWUFBTyxHQUFhLEVBQUUsQ0FBQTtRQUNNLENBQUM7UUFDdEMsa0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGlCQUFXLGNBR3ZCLENBQUE7SUFFRDtRQUVFLGdCQUFtQixHQUFZLEVBQVMsV0FBb0MsRUFBUyxZQUFtQixFQUFTLFNBQWdCO1lBQTlHLFFBQUcsR0FBSCxHQUFHLENBQVM7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7WUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBTztZQUFTLGNBQVMsR0FBVCxTQUFTLENBQU87WUFEMUgsMEJBQXFCLEdBQWlDLEVBQUUsQ0FBQTtRQUNxRSxDQUFDO1FBQ3ZJLGFBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLFlBQU0sU0FHbEIsQ0FBQTtJQUVEO1FBNENFLG1DQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFFN0MsZ0RBQVksR0FBbkIsVUFBb0IsS0FBYSxFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUE5Q2EsbURBQXlCLEdBQVcsMG1EQXdDckQsQ0FBQTtRQVFDLGdDQUFDO0lBQUQsQ0FsREEsQUFrREMsSUFBQTtJQWxEWSwrQkFBeUIsNEJBa0RyQyxDQUFBO0lBRUQ7UUFFRSx5Q0FBb0IsRUFBcUIsRUFBVSxhQUE4QixFQUFVLDBCQUFzRDtZQUE3SCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtZQUFVLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDakosQ0FBQztRQUVNLHNEQUFZLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxLQUFhLEVBQUUsU0FBaUM7WUFBbkYsaUJBb0dDO1lBbkdDLElBQUksU0FBUyxHQUFvQixJQUFJLFVBQUksQ0FBWSxjQUFNLE9BQUEsSUFBSSxlQUFTLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQTtZQUMzRSxJQUFJLGNBQWMsR0FBb0IsSUFBSSxVQUFJLENBQVksY0FBTSxPQUFBLElBQUksZUFBUyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUE7WUFDaEYsSUFBSSxzQkFBc0IsR0FBMEIsSUFBSSxVQUFJLENBQWtCLGNBQU0sT0FBQSxJQUFJLFVBQUksQ0FBWSxjQUFNLE9BQUEsSUFBSSxlQUFTLEVBQUUsRUFBZixDQUFlLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFBO1lBQy9ILElBQUksZ0JBQWdCLEdBQTBCLElBQUksVUFBSSxDQUFrQixjQUFNLE9BQUEsSUFBSSxjQUFRLEVBQVMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFBO1lBQ3BHLElBQUksbUJBQW1CLEdBQTBCLElBQUksVUFBSSxDQUFrQixjQUFNLE9BQUEsSUFBSSxjQUFRLEVBQVMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFBO1lBQ3ZHLElBQUksZUFBZSxHQUEwQixJQUFJLFVBQUksQ0FBa0IsY0FBTSxPQUFBLElBQUksY0FBUSxFQUFTLEVBQXJCLENBQXFCLENBQUMsQ0FBQTtZQUNuRyxJQUFJLGlCQUFpQixHQUE2QyxJQUFJLFVBQUksQ0FBcUMsY0FBTSxPQUFBLElBQUksaUJBQVcsRUFBeUIsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFBO1lBQzlKLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLHFCQUFxQjtnQkFDdkcsSUFBSSxhQUFhLEdBQVcscUJBQXFCLENBQUMsb0NBQW9DLENBQUE7Z0JBQ3RGLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBQzlGLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLHFCQUFxQixDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUNySCxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFBO2dCQUM3RCxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUNySCxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQzdHLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQzNELElBQUksRUFBRSxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUE7b0JBQ3BDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtvQkFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFXLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMxRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3RCLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFXLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUN4RixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzFCLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2hHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUN4QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDbkgsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQzlDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDaEQsQ0FBQztvQkFDRCxHQUFHLENBQUMsQ0FBVSxVQUF3QixFQUF4QixLQUFBLFFBQVEsQ0FBQyxJQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBeEIsY0FBd0IsRUFBeEIsSUFBd0IsQ0FBQzt3QkFBbEMsSUFBSSxDQUFDLFNBQUE7d0JBQThCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUFBO2dCQUM1SixDQUFDLENBQUMsRUFuQlksQ0FtQlosQ0FDSCxDQUFDLEtBQUssQ0FBQyxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQyxDQUFBO1lBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNQLGtGQUFrRjtnQkFDbEYsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQUEsWUFBWSxJQUFJLE9BQUEsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLEVBQXJFLENBQXFFLENBQUMsQ0FBQTtnQkFDbEgsNkRBQTZEO2dCQUM3RCxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBZ0IsRUFBRSxFQUFVO29CQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRzt3QkFDWixJQUFJLE1BQU0sR0FBYyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7NEJBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7NEJBQ2xCLElBQUksYUFBYSxHQUF1QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7NEJBQ2pGLElBQUksY0FBYyxHQUF1QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7NEJBQ25GLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0NBQ2xCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztvQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO2dDQUN0RCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFBOzRCQUMzQyxDQUFDOzRCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7Z0NBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQTs0QkFDcEUsSUFBSSxVQUFVLEdBQWMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTs0QkFDbEQsSUFBSSxXQUFXLEdBQWMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDcEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQ0FDZixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7b0NBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQ0FDN0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUE7NEJBQ3JDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTs0QkFDM0QsSUFBSSxJQUFJLEdBQW9CLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTs0QkFDcEQsSUFBSSxJQUFJLEdBQW9CLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7b0NBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQ0FDekIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFDakMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7NEJBQy9DLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7NEJBQ2xDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7NEJBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO29DQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0NBQ3pCLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7NEJBQ3BDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBOzRCQUNsRCxJQUFJLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTs0QkFDOUIsSUFBSSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7NEJBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO29DQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0NBQ3pCLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBOzRCQUNoQyxDQUFDOzRCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7d0JBQ2hELENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxHQUFHLEdBQWtCLEVBQUUsQ0FBQTtnQkFDM0IsSUFBSSxjQUFjLEdBQXNCLElBQUksVUFBSSxFQUFlLENBQUE7Z0JBQy9ELElBQUksSUFBSSxHQUFjLElBQUksZUFBUyxFQUFFLENBQUE7Z0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFnQixFQUFFLEVBQVU7b0JBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7d0JBQ1osSUFBSSxRQUFNLEdBQVcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLGlCQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQ2xOLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQUMsUUFBTSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7d0JBQ3hHLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRzs0QkFDN0IsSUFBSSxXQUFXLEdBQWdCLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7NEJBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQ0FDakIsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQ0FDMUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0NBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7NEJBQ3ZCLENBQUM7NEJBQ0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBTSxDQUFDLENBQUE7d0JBQ2xDLENBQUMsQ0FBQyxDQUFBO29CQUNKLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQTtZQUNaLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNILHNDQUFDO0lBQUQsQ0ExR0EsQUEwR0MsSUFBQTtJQTFHWSxxQ0FBK0Isa0NBMEczQyxDQUFBO0FBRUgsQ0FBQyxFQS9LUyxLQUFLLEtBQUwsS0FBSyxRQStLZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgUmVzdWx0R3JvdXAge1xuICAgIHB1YmxpYyByZXN1bHRzOiBSZXN1bHRbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHVibGljIGxhYmVsOiBzdHJpbmcpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgUmVzdWx0IHtcbiAgICBwdWJsaWMgYWRkaXRpb25hbEluZm9ybWF0aW9uOiB7W3Zhck5hbWU6IHN0cmluZ106IElOb2RlW119ID0ge31cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWRzOiBJTm9kZVtdLCBwdWJsaWMgZGF0YXNvdXJjZXM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdLCBwdWJsaWMgbWF0Y2hlZExhYmVsOiBJTm9kZSwgcHVibGljIHByZWZMYWJlbDogSU5vZGUpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRNYXRjaFF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGBcblBSRUZJWCB0ZXh0OiA8aHR0cDovL2plbmEuYXBhY2hlLm9yZy90ZXh0Iz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblBSRUZJWCBmaWJyYTogPGh0dHA6Ly9sZGYuZmkvZmlicmEvc2NoZW1hIz5cblNFTEVDVCA/Z3JvdXBJZCA/Z3JvdXBMYWJlbCA/aWQgP3ByZWZMYWJlbCA/bWF0Y2hlZExhYmVsID9zYW1lQXMgP2FsdExhYmVsIHsgIyBBRERJVElPTkFMVkFSSUFCTEVTXG4gIHtcbiAgICBTRUxFQ1QgP2dyb3VwSWQgP2lkIChTVU0oP3NjKSBBUyA/c2NvcmUpIHtcbiAgICAgIHtcbiAgICAgICAgU0VMRUNUID9ncm91cElkID9pZCA/c2Mge1xuICAgICAgICAgIEJJTkQoQ09OQ0FUKFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCIqXCIpIEFTID9xdWVyeSlcbiAgICAgICAgICAoP2lkID9zYykgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgICAgICAgID9pZCBhID9ncm91cElkIC5cbiAgICAgICAgICAjIENPTlNUUkFJTlRTXG4gICAgICAgIH0gTElNSVQgPExJTUlUPlxuICAgICAgfSBVTklPTiB7XG4gICAgICAgIEJJTkQoQ09OQ0FUKFwiXFxcXFwiXCIsUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIlxcXFxcIlwiKSBBUyA/cXVlcnkpXG4gICAgICAgICg/aWQgP3NjKSB0ZXh0OnF1ZXJ5ID9xdWVyeSAuXG4gICAgICAgID9pZCBhID9ncm91cElkIC5cbiAgICAgICAgIyBDT05TVFJBSU5UU1xuICAgICAgfVxuICAgIH1cbiAgICBHUk9VUCBCWSA/Z3JvdXBJZCA/aWRcbiAgICBIQVZJTkcoQk9VTkQoP2lkKSlcbiAgfVxuICB7XG4gICAgP2dyb3VwSWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgPFBSRUZMQU5HPiAnJyA/Z3JvdXBMYWJlbCkgLlxuICAgID9pZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCA8UFJFRkxBTkc+ICcnID9wcmVmTGFiZWwpIC5cbiAgfSBVTklPTiB7XG4gICAgP2lkIHNrb3M6cHJlZkxhYmVsfHJkZnM6bGFiZWx8c2tvczphbHRMYWJlbCA/bWF0Y2hlZExhYmVsXG4gICAgRklMVEVSIChSRUdFWChMQ0FTRSg/bWF0Y2hlZExhYmVsKSxDT05DQVQoXCJcXFxcXFxcXGJcIixMQ0FTRSg8UVVFUlk+KSkpKVxuICB9IFVOSU9OIHtcbiAgICA/aWQgb3dsOnNhbWVBcyA/c2FtZUFzIC5cbiAgfSBVTklPTiB7XG4gICAgP2lkIHNrb3M6YWx0TGFiZWwgP2FsdExhYmVsIC5cbiAgfVxuICAjIEFERElUSU9OQUxTRUxFQ1Rcbn1cbmBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge31cblxuICAgIHB1YmxpYyBhdXRvY29tcGxldGUocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxSZXN1bHRHcm91cFtdPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEF1dG9jb21wbGV0ZVdvcmtlclNlcnZpY2UnLCAnYXV0b2NvbXBsZXRlJywgW3F1ZXJ5LCBsaW1pdF0sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVXb3JrZXJTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSwgcHJpdmF0ZSBjb25maWd1cmF0aW9uV29ya2VyU2VydmljZTogQ29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlKHF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8UmVzdWx0R3JvdXBbXT4ge1xuICAgICAgbGV0IGlkVG9JZFNldDogRU1hcDxTdHJpbmdTZXQ+ID0gbmV3IEVNYXA8U3RyaW5nU2V0PigoKSA9PiBuZXcgU3RyaW5nU2V0KCkpXG4gICAgICBsZXQgaWRUb0dyb3VwSWRTZXQ6IEVNYXA8U3RyaW5nU2V0PiA9IG5ldyBFTWFwPFN0cmluZ1NldD4oKCkgPT4gbmV3IFN0cmluZ1NldCgpKVxuICAgICAgbGV0IGlmcFZhclBsdXNWYWx1ZVRvSWRTZXQ6IEVNYXA8RU1hcDxTdHJpbmdTZXQ+PiA9IG5ldyBFTWFwPEVNYXA8U3RyaW5nU2V0Pj4oKCkgPT4gbmV3IEVNYXA8U3RyaW5nU2V0PigoKSA9PiBuZXcgU3RyaW5nU2V0KCkpKVxuICAgICAgbGV0IGlkVG9QcmVmTGFiZWxTZXQ6IEVNYXA8T05vZGVTZXQ8SU5vZGU+PiA9IG5ldyBFTWFwPE9Ob2RlU2V0PElOb2RlPj4oKCkgPT4gbmV3IE9Ob2RlU2V0PElOb2RlPigpKVxuICAgICAgbGV0IGlkVG9NYXRjaGVkTGFiZWxTZXQ6IEVNYXA8T05vZGVTZXQ8SU5vZGU+PiA9IG5ldyBFTWFwPE9Ob2RlU2V0PElOb2RlPj4oKCkgPT4gbmV3IE9Ob2RlU2V0PElOb2RlPigpKVxuICAgICAgbGV0IGlkVG9BbHRMYWJlbFNldDogRU1hcDxPTm9kZVNldDxJTm9kZT4+ID0gbmV3IEVNYXA8T05vZGVTZXQ8SU5vZGU+PigoKSA9PiBuZXcgT05vZGVTZXQ8SU5vZGU+KCkpXG4gICAgICBsZXQgaWRUb0RhdGFzb3VyY2VTZXQ6IEVNYXA8SWRlbnRpdHlTZXQ8RW5kcG9pbnRDb25maWd1cmF0aW9uPj4gPSBuZXcgRU1hcDxJZGVudGl0eVNldDxFbmRwb2ludENvbmZpZ3VyYXRpb24+PigoKSA9PiBuZXcgSWRlbnRpdHlTZXQ8RW5kcG9pbnRDb25maWd1cmF0aW9uPigpKVxuICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5hbGxFbmRwb2ludHMoKS5tYXAoZW5kcG9pbnRDb25maWd1cmF0aW9uID0+IHtcbiAgICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGVuZHBvaW50Q29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGVcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPFFVRVJZPi9nLCBzLlNwYXJxbFNlcnZpY2Uuc3RyaW5nVG9TUEFSUUxTdHJpbmcocXVlcnkpKVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC8jIENPTlNUUkFJTlRTL2csIGVuZHBvaW50Q29uZmlndXJhdGlvbi5kYXRhTW9kZWxDb25maWd1cmF0aW9uLnR5cGVDb25zdHJhaW50cylcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPExJTUlUPi9nLCAnJyArIGxpbWl0KVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88UFJFRkxBTkc+L2csIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmVmZXJyZWRMYW5ndWFnZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS5xdWVyeShlbmRwb2ludENvbmZpZ3VyYXRpb24uZW5kcG9pbnQudmFsdWUsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAgIChyZXNwb25zZSkgPT4gcmVzcG9uc2UuZGF0YSEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBiaW5kaW5nWydpZCddLnZhbHVlXG4gICAgICAgICAgICBpZFRvRGF0YXNvdXJjZVNldC5nb2MoaWQpLmFkZChlbmRwb2ludENvbmZpZ3VyYXRpb24pXG4gICAgICAgICAgICBpZiAoYmluZGluZ1sncHJlZkxhYmVsJ10pXG4gICAgICAgICAgICAgIGlkVG9QcmVmTGFiZWxTZXQuZ29jKGlkKS5hZGQoRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJpbmRpbmdbJ3ByZWZMYWJlbCddKSlcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydhbHRMYWJlbCddKVxuICAgICAgICAgICAgICBpZFRvQWx0TGFiZWxTZXQuZ29jKGlkKS5hZGQoRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJpbmRpbmdbJ2FsdExhYmVsJ10pKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ21hdGNoZWRMYWJlbCddKVxuICAgICAgICAgICAgICBpZFRvTWF0Y2hlZExhYmVsU2V0LmdvYyhpZCkuYWRkKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiaW5kaW5nWydtYXRjaGVkTGFiZWwnXSkpXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snZ3JvdXBJZCddKSB7XG4gICAgICAgICAgICAgIGlkVG9Hcm91cElkU2V0LmdvYyhpZCkuYWRkKGJpbmRpbmdbJ2dyb3VwSWQnXS52YWx1ZSlcbiAgICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2dyb3VwTGFiZWwnXSlcbiAgICAgICAgICAgICAgICBpZFRvUHJlZkxhYmVsU2V0LmdvYyhiaW5kaW5nWydncm91cElkJ10udmFsdWUpLmFkZChEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYmluZGluZ1snZ3JvdXBMYWJlbCddKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydzYW1lQXMnXSkge1xuICAgICAgICAgICAgICBpZFRvSWRTZXQuZ29jKGlkKS5hZGQoYmluZGluZ1snc2FtZUFzJ10udmFsdWUpXG4gICAgICAgICAgICAgIGlkVG9JZFNldC5nb2MoYmluZGluZ1snc2FtZUFzJ10udmFsdWUpLmFkZChpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgcmVzcG9uc2UuZGF0YSEuaGVhZC52YXJzKSBpZiAodi5pbmRleE9mKCdpZnAnKSA9PT0gMCAmJiBiaW5kaW5nW3ZdKSBpZnBWYXJQbHVzVmFsdWVUb0lkU2V0LmdvYyh2LnN1YnN0cmluZygzKSkuZ29jKGJpbmRpbmdbdl0udmFsdWUpLmFkZChpZClcbiAgICAgICAgICB9KVxuICAgICAgICApLmNhdGNoKCgpID0+IHVuZGVmaW5lZClcbiAgICAgIH0pKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHNhbWVBc2VzIGZvciBhbGwgb2JqZWN0cyBzaGFyaW5nIHNhbWUgaW52ZXJzZSBmdW5jdGlvbmFsIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICBpZnBWYXJQbHVzVmFsdWVUb0lkU2V0LmVhY2godmFsdWVUb0lkU2V0ID0+IHZhbHVlVG9JZFNldC5lYWNoKGlkcyA9PiBpZHMuZWFjaChpZCA9PiBpZFRvSWRTZXQuZ29jKGlkKS5hZGRzKGlkcykpKSlcbiAgICAgICAgLy8gY29uc29saWRhdGUgaWQgc2V0cyBhcyB3ZWxsIGFzIGFsbCBpZCAtcmVsYXRlZCBpbmZvcm1hdGlvblxuICAgICAgICBpZFRvSWRTZXQuZWFjaCgoaWRTZXQ6IFN0cmluZ1NldCwgaWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlkU2V0LmVhY2gob2lkID0+IHtcbiAgICAgICAgICAgIGxldCBvaWRTZXQ6IFN0cmluZ1NldCA9IGlkVG9JZFNldC5nZXQob2lkKVxuICAgICAgICAgICAgaWYgKGlkU2V0ICE9PSBvaWRTZXQpIHtcbiAgICAgICAgICAgICAgaWRUb0lkU2V0LnNldChvaWQsIGlkU2V0KVxuICAgICAgICAgICAgICBpZFNldC5hZGRzKG9pZFNldClcbiAgICAgICAgICAgICAgbGV0IGRhdGFzb3VyY2VTZXQ6IElkZW50aXR5U2V0PEVuZHBvaW50Q29uZmlndXJhdGlvbj4gPSBpZFRvRGF0YXNvdXJjZVNldC5nZXQoaWQpXG4gICAgICAgICAgICAgIGxldCBvRGF0YXNvdXJjZVNldDogSWRlbnRpdHlTZXQ8RW5kcG9pbnRDb25maWd1cmF0aW9uPiA9IGlkVG9EYXRhc291cmNlU2V0LmdldChvaWQpXG4gICAgICAgICAgICAgIGlmIChkYXRhc291cmNlU2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9EYXRhc291cmNlU2V0KSBkYXRhc291cmNlU2V0LmFkZHMob0RhdGFzb3VyY2VTZXQpXG4gICAgICAgICAgICAgICAgaWRUb0RhdGFzb3VyY2VTZXQuc2V0KG9pZCwgZGF0YXNvdXJjZVNldClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvRGF0YXNvdXJjZVNldCkgaWRUb0RhdGFzb3VyY2VTZXQuc2V0KGlkLCBvRGF0YXNvdXJjZVNldClcbiAgICAgICAgICAgICAgbGV0IGdyb3VwSWRTZXQ6IFN0cmluZ1NldCA9IGlkVG9Hcm91cElkU2V0LmdldChpZClcbiAgICAgICAgICAgICAgbGV0IG9Hcm91cElkU2V0OiBTdHJpbmdTZXQgPSBpZFRvR3JvdXBJZFNldC5nZXQob2lkKVxuICAgICAgICAgICAgICBpZiAoZ3JvdXBJZFNldCkge1xuICAgICAgICAgICAgICAgIGlmIChvR3JvdXBJZFNldCkgZ3JvdXBJZFNldC5hZGRzKG9Hcm91cElkU2V0KVxuICAgICAgICAgICAgICAgIGlkVG9Hcm91cElkU2V0LnNldChvaWQsIGdyb3VwSWRTZXQpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob0dyb3VwSWRTZXQpIGlkVG9Hcm91cElkU2V0LnNldChpZCwgb0dyb3VwSWRTZXQpXG4gICAgICAgICAgICAgIGxldCBtU2V0OiBPTm9kZVNldDxJTm9kZT4gPSBpZFRvUHJlZkxhYmVsU2V0LmdldChpZClcbiAgICAgICAgICAgICAgbGV0IG9TZXQ6IE9Ob2RlU2V0PElOb2RlPiA9IGlkVG9QcmVmTGFiZWxTZXQuZ2V0KG9pZClcbiAgICAgICAgICAgICAgaWYgKG1TZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob1NldCkgbVNldC5hZGRzKG9TZXQpXG4gICAgICAgICAgICAgICAgaWRUb1ByZWZMYWJlbFNldC5zZXQob2lkLCBtU2V0KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9TZXQpIGlkVG9QcmVmTGFiZWxTZXQuc2V0KGlkLCBvU2V0KVxuICAgICAgICAgICAgICBtU2V0ID0gaWRUb01hdGNoZWRMYWJlbFNldC5nZXQoaWQpXG4gICAgICAgICAgICAgIG9TZXQgPSBpZFRvTWF0Y2hlZExhYmVsU2V0LmdldChvaWQpXG4gICAgICAgICAgICAgIGlmIChtU2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9TZXQpIG1TZXQuYWRkcyhvU2V0KVxuICAgICAgICAgICAgICAgIGlkVG9NYXRjaGVkTGFiZWxTZXQuc2V0KG9pZCwgbVNldClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvU2V0KSBpZFRvTWF0Y2hlZExhYmVsU2V0LnNldChpZCwgb1NldClcbiAgICAgICAgICAgICAgbVNldCA9IGlkVG9BbHRMYWJlbFNldC5nZXQoaWQpXG4gICAgICAgICAgICAgIG9TZXQgPSBpZFRvQWx0TGFiZWxTZXQuZ2V0KG9pZClcbiAgICAgICAgICAgICAgaWYgKG1TZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob1NldCkgbVNldC5hZGRzKG9TZXQpXG4gICAgICAgICAgICAgICAgaWRUb0FsdExhYmVsU2V0LnNldChvaWQsIG1TZXQpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob1NldCkgaWRUb0FsdExhYmVsU2V0LnNldChpZCwgb1NldClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBsZXQgcmV0OiBSZXN1bHRHcm91cFtdID0gW11cbiAgICAgICAgbGV0IGdyb3VwSWRUb0dyb3VwOiBFTWFwPFJlc3VsdEdyb3VwPiA9IG5ldyBFTWFwPFJlc3VsdEdyb3VwPigpXG4gICAgICAgIGxldCBzZWVuOiBTdHJpbmdTZXQgPSBuZXcgU3RyaW5nU2V0KClcbiAgICAgICAgaWRUb0lkU2V0LmVhY2goKGlkU2V0OiBTdHJpbmdTZXQsIGlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGlkKSkge1xuICAgICAgICAgICAgc2Vlbi5hZGQoaWQpXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBSZXN1bHQgPSBuZXcgUmVzdWx0KGlkU2V0LnZhbHVlcygpLm1hcChvaWQgPT4gRGF0YUZhY3RvcnkuaW5zdGFuY2UubmFtZWROb2RlKG9pZCkpLCBpZFRvRGF0YXNvdXJjZVNldC5nZXQoaWQpLnZhbHVlcygpLCBpZFRvTWF0Y2hlZExhYmVsU2V0LmdldChpZCkudmFsdWVzKClbMF0sIGlkVG9QcmVmTGFiZWxTZXQuZ2V0KGlkKS52YWx1ZXMoKVswXSlcbiAgICAgICAgICAgIGlmIChpZFRvQWx0TGFiZWxTZXQuaGFzKGlkKSkgcmVzdWx0LmFkZGl0aW9uYWxJbmZvcm1hdGlvblsnYWx0TGFiZWwnXSA9IGlkVG9BbHRMYWJlbFNldC5nZXQoaWQpLnZhbHVlcygpXG4gICAgICAgICAgICBpZFRvR3JvdXBJZFNldC5nZXQoaWQpLmVhY2goZ2lkID0+IHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdEdyb3VwOiBSZXN1bHRHcm91cCA9IGdyb3VwSWRUb0dyb3VwLmdldChnaWQpXG4gICAgICAgICAgICAgIGlmICghcmVzdWx0R3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRHcm91cCA9IG5ldyBSZXN1bHRHcm91cChpZFRvUHJlZkxhYmVsU2V0LmdldChnaWQpLnZhbHVlcygpWzBdLnZhbHVlKVxuICAgICAgICAgICAgICAgIGdyb3VwSWRUb0dyb3VwLnNldChnaWQsIHJlc3VsdEdyb3VwKVxuICAgICAgICAgICAgICAgIHJldC5wdXNoKHJlc3VsdEdyb3VwKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlc3VsdEdyb3VwLnJlc3VsdHMucHVzaChyZXN1bHQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJldFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var SparqlTreeService = (function () {
        function SparqlTreeService(workerService) {
            this.workerService = workerService;
        }
        SparqlTreeService.prototype.getTree = function (endpoint, query, canceller) {
            return this.workerService.call('sparqlTreeWorkerService', 'getTree', [endpoint, query], canceller);
        };
        SparqlTreeService.getClassTreeQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?subClass ?superClass ?class ?classLabel ?instances {\n  {\n    ?subClass rdfs:subClassOf ?class .\n    FILTER EXISTS {\n      ?p a ?subClass .\n    }\n  } UNION {\n    {\n      SELECT ?class (COUNT(DISTINCT ?p) AS ?instances) {\n        ?p a ?class .\n      }\n      GROUP BY ?class\n    }\n  }\n  ?class sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?classLabel) .\n}\n";
        return SparqlTreeService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlTreeService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlTreeService = SparqlTreeService;
    var SparqlTreeWorkerService = (function () {
        function SparqlTreeWorkerService(sparqlService) {
            this.sparqlService = sparqlService;
        }
        SparqlTreeWorkerService.prototype.getTree = function (endpoint, query, canceller) {
            return this.sparqlService.query(endpoint, query, { timeout: canceller }).then(function (response) {
                var parents = {};
                var classes = {};
                response.data.results.bindings.forEach(function (binding) {
                    if (binding['classLabel'])
                        classes[binding['class'].value] = new fibra.TreeNode(binding['class'].value, binding['classLabel'].value);
                    if (binding['instances'])
                        classes[binding['class'].value].instances = parseInt(binding['instances'].value, 10);
                    if (binding['subClass']) {
                        var subClass = binding['subClass'].value;
                        if (!parents[subClass])
                            parents[subClass] = {};
                        parents[subClass][binding['class'].value] = true;
                    }
                    if (binding['superClass']) {
                        var subClass = binding['class'].value;
                        if (!parents[subClass])
                            parents[subClass] = {};
                        parents[subClass][binding['superClass'].value] = true;
                    }
                });
                var ret = [];
                for (var id in classes) {
                    if (!parents[id])
                        ret.push(classes[id]);
                    else
                        for (var pid in parents[id])
                            classes[pid].children.push(classes[id]);
                }
                return ret;
            });
        };
        return SparqlTreeWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeWorkerService',['sparqlService',function(){return new (Function.prototype.bind.apply(SparqlTreeWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlTreeWorkerService = SparqlTreeWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FvRWQ7QUFwRUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBc0JFLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFDN0MsbUNBQU8sR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDcEcsQ0FBQztRQXhCYSxtQ0FBaUIsR0FBVywraUJBb0I3QyxDQUFBO1FBS0Msd0JBQUM7SUFBRCxDQTFCQSxBQTBCQyxJQUFBO0lBMUJZLHVCQUFpQixvQkEwQjdCLENBQUE7SUFFRDtRQUNFLGlDQUFvQixhQUE4QjtZQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBRyxDQUFDO1FBRS9DLHlDQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsVUFBQyxRQUFtRztnQkFDbEcsSUFBSSxPQUFPLEdBQTRDLEVBQUUsQ0FBQTtnQkFDekQsSUFBSSxPQUFPLEdBQTZCLEVBQUUsQ0FBQTtnQkFDMUMsUUFBUSxDQUFDLElBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGNBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ2xELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ3ZELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFBO2dCQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUk7d0JBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ1osQ0FBQyxDQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0gsOEJBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLDZCQUF1QiwwQkFpQ25DLENBQUE7QUFFSCxDQUFDLEVBcEVTLEtBQUssS0FBTCxLQUFLLFFBb0VkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVHJlZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2xhc3NUcmVlUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9zdWJDbGFzcyA/c3VwZXJDbGFzcyA/Y2xhc3MgP2NsYXNzTGFiZWwgP2luc3RhbmNlcyB7XG4gIHtcbiAgICA/c3ViQ2xhc3MgcmRmczpzdWJDbGFzc09mID9jbGFzcyAuXG4gICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICA/cCBhID9zdWJDbGFzcyAuXG4gICAgfVxuICB9IFVOSU9OIHtcbiAgICB7XG4gICAgICBTRUxFQ1QgP2NsYXNzIChDT1VOVChESVNUSU5DVCA/cCkgQVMgP2luc3RhbmNlcykge1xuICAgICAgICA/cCBhID9jbGFzcyAuXG4gICAgICB9XG4gICAgICBHUk9VUCBCWSA/Y2xhc3NcbiAgICB9XG4gIH1cbiAgP2NsYXNzIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2NsYXNzTGFiZWwpIC5cbn1cbmBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG4gICAgcHVibGljIGdldFRyZWUoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFRyZWVXb3JrZXJTZXJ2aWNlJywgJ2dldFRyZWUnLCBbZW5kcG9pbnQsIHF1ZXJ5XSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxUcmVlV29ya2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0VHJlZShlbmRwb2ludDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQsIHF1ZXJ5LCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBwYXJlbnRzOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBib29sZWFufX0gPSB7fVxuICAgICAgICAgIGxldCBjbGFzc2VzOiB7W2lkOiBzdHJpbmddOiBUcmVlTm9kZX0gPSB7fVxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydjbGFzc0xhYmVsJ10pXG4gICAgICAgICAgICAgIGNsYXNzZXNbYmluZGluZ1snY2xhc3MnXS52YWx1ZV0gPSBuZXcgVHJlZU5vZGUoYmluZGluZ1snY2xhc3MnXS52YWx1ZSwgYmluZGluZ1snY2xhc3NMYWJlbCddLnZhbHVlKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2luc3RhbmNlcyddKVxuICAgICAgICAgICAgICBjbGFzc2VzW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdLmluc3RhbmNlcyA9IHBhcnNlSW50KGJpbmRpbmdbJ2luc3RhbmNlcyddLnZhbHVlLCAxMClcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydzdWJDbGFzcyddKSB7XG4gICAgICAgICAgICAgIGxldCBzdWJDbGFzczogc3RyaW5nID0gYmluZGluZ1snc3ViQ2xhc3MnXS52YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudHNbc3ViQ2xhc3NdKSBwYXJlbnRzW3N1YkNsYXNzXSA9IHt9XG4gICAgICAgICAgICAgIHBhcmVudHNbc3ViQ2xhc3NdW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3N1cGVyQ2xhc3MnXSkge1xuICAgICAgICAgICAgICBsZXQgc3ViQ2xhc3M6IHN0cmluZyA9IGJpbmRpbmdbJ2NsYXNzJ10udmFsdWVcbiAgICAgICAgICAgICAgaWYgKCFwYXJlbnRzW3N1YkNsYXNzXSkgcGFyZW50c1tzdWJDbGFzc10gPSB7fVxuICAgICAgICAgICAgICBwYXJlbnRzW3N1YkNsYXNzXVtiaW5kaW5nWydzdXBlckNsYXNzJ10udmFsdWVdID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgbGV0IHJldDogVHJlZU5vZGVbXSA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgaWQgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKCFwYXJlbnRzW2lkXSkgcmV0LnB1c2goY2xhc3Nlc1tpZF0pOyBlbHNlIGZvciAobGV0IHBpZCBpbiBwYXJlbnRzW2lkXSlcbiAgICAgICAgICAgICAgICBjbGFzc2VzW3BpZF0uY2hpbGRyZW4ucHVzaChjbGFzc2VzW2lkXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var SparqlUpdateService = (function () {
        function SparqlUpdateService(workerService) {
            this.workerService = workerService;
        }
        SparqlUpdateService.prototype.updateQuads = function (endpoint, quadsToAdd, quadsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, quadsToAdd, quadsToRemove]);
        };
        SparqlUpdateService.prototype.updateGraphs = function (endpoint, graphsToAdd, graphsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, graphsToAdd, graphsToRemove]);
        };
        return SparqlUpdateService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlUpdateService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlUpdateService = SparqlUpdateService;
    var SparqlUpdateWorkerService = (function () {
        function SparqlUpdateWorkerService(sparqlService) {
            this.sparqlService = sparqlService;
        }
        SparqlUpdateWorkerService.prototype.updateQuads = function (endpoint, quadsToAdd, quadsToRemove) {
            if (quadsToAdd === void 0) { quadsToAdd = []; }
            if (quadsToRemove === void 0) { quadsToRemove = []; }
            var graphsToAddMap = {};
            var graphsToRemoveMap = {};
            var graphsToAdd = [];
            var graphsToRemove = [];
            quadsToAdd.forEach(function (q) {
                var graph = graphsToAddMap[q.graph.value];
                if (!graph) {
                    graph = new fibra.Graph(q.graph);
                    graphsToAddMap[q.graph.value] = graph;
                    graphsToAdd.push(graph);
                }
                graph.triples.push(q);
            });
            quadsToRemove.forEach(function (q) {
                var graph = graphsToRemoveMap[q.graph.value];
                if (!graph) {
                    graph = new fibra.Graph(q.graph);
                    graphsToRemoveMap[q.graph.value] = graph;
                    graphsToRemove.push(graph);
                }
                graph.triples.push(q);
            });
            return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove);
        };
        SparqlUpdateWorkerService.prototype.updateGraphs = function (endpoint, graphsToAdd, graphsToRemove) {
            if (graphsToAdd === void 0) { graphsToAdd = []; }
            if (graphsToRemove === void 0) { graphsToRemove = []; }
            var addString = graphsToAdd.map(function (graph) { return (fibra.DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(function (g) { return g.toCanonical(); }).join(' . ') + '}'; }).join('');
            var removeString = graphsToRemove.map(function (graph) { return (fibra.DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(function (g) { return g.toCanonical(); }).join(' . ') + '}'; }).join('');
            return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(function (r) { return r.status === 204; }, function (r) { return false; });
        };
        SparqlUpdateWorkerService.queryTemplate = "DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}";
        return SparqlUpdateWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateWorkerService',['sparqlService',function(){return new (Function.prototype.bind.apply(SparqlUpdateWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlUpdateWorkerService = SparqlUpdateWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTREZDtBQTVERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFFRSw2QkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBRTdDLHlDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxhQUFxQjtZQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUFFTSwwQ0FBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFdBQW9CLEVBQUUsY0FBdUI7WUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUNoSCxDQUFDO1FBRUgsMEJBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLHlCQUFtQixzQkFZL0IsQ0FBQTtJQUVEO1FBR0UsbUNBQW9CLGFBQThCO1lBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUFHLENBQUM7UUFFL0MsK0NBQVcsR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxVQUF1QixFQUFFLGFBQTBCO1lBQW5ELDBCQUF1QixHQUF2QixlQUF1QjtZQUFFLDZCQUEwQixHQUExQixrQkFBMEI7WUFDdEYsSUFBSSxjQUFjLEdBQStCLEVBQUUsQ0FBQTtZQUNuRCxJQUFJLGlCQUFpQixHQUErQixFQUFFLENBQUE7WUFDdEQsSUFBSSxXQUFXLEdBQVksRUFBRSxDQUFBO1lBQzdCLElBQUksY0FBYyxHQUFZLEVBQUUsQ0FB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QyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pKLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQWhCLENBQWdCLEVBQ3ZCLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FDYixDQUFBO1FBQ0gsQ0FBQztRQXJDYyx1Q0FBYSxHQUFXLDBDQUEwQyxDQUFBO1FBdUNuRixnQ0FBQztJQUFELENBeENBLEFBd0NDLElBQUE7SUF4Q1ksK0JBQXlCLDRCQXdDckMsQ0FBQTtBQUNILENBQUMsRUE1RFMsS0FBSyxLQUFMLEtBQUssUUE0RGQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtdXBkYXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFVwZGF0ZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIHVwZGF0ZVF1YWRzKGVuZHBvaW50OiBzdHJpbmcsIHF1YWRzVG9BZGQ6IFF1YWRbXSwgcXVhZHNUb1JlbW92ZTogUXVhZFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZScsICd1cGRhdGUnLCBbZW5kcG9pbnQsIHF1YWRzVG9BZGQsIHF1YWRzVG9SZW1vdmVdKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFwaHMoZW5kcG9pbnQ6IHN0cmluZywgZ3JhcGhzVG9BZGQ6IEdyYXBoW10sIGdyYXBoc1RvUmVtb3ZlOiBHcmFwaFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZScsICd1cGRhdGUnLCBbZW5kcG9pbnQsIGdyYXBoc1RvQWRkLCBncmFwaHNUb1JlbW92ZV0pXG4gICAgfVxuXG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYERFTEVURXs8REVMRVRFPn1JTlNFUlR7PElOU0VSVD59V0hFUkUge31gXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSkge31cblxuICAgIHB1YmxpYyB1cGRhdGVRdWFkcyhlbmRwb2ludDogc3RyaW5nLCBxdWFkc1RvQWRkOiBRdWFkW10gPSBbXSwgcXVhZHNUb1JlbW92ZTogUXVhZFtdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xuICAgICAgbGV0IGdyYXBoc1RvQWRkTWFwOiB7W2dyYXBoSWQ6IHN0cmluZ106IEdyYXBofSA9IHt9XG4gICAgICBsZXQgZ3JhcGhzVG9SZW1vdmVNYXA6IHtbZ3JhcGhJZDogc3RyaW5nXTogR3JhcGh9ID0ge31cbiAgICAgIGxldCBncmFwaHNUb0FkZDogR3JhcGhbXSA9IFtdXG4gICAgICBsZXQgZ3JhcGhzVG9SZW1vdmU6IEdyYXBoW10gPSBbXVxuICAgICAgcXVhZHNUb0FkZC5mb3JFYWNoKHEgPT4ge1xuICAgICAgICBsZXQgZ3JhcGg6IEdyYXBoID0gZ3JhcGhzVG9BZGRNYXBbcS5ncmFwaC52YWx1ZV1cbiAgICAgICAgaWYgKCFncmFwaCkge1xuICAgICAgICAgIGdyYXBoID0gbmV3IEdyYXBoKHEuZ3JhcGgpXG4gICAgICAgICAgZ3JhcGhzVG9BZGRNYXBbcS5ncmFwaC52YWx1ZV0gPSBncmFwaFxuICAgICAgICAgIGdyYXBoc1RvQWRkLnB1c2goZ3JhcGgpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGgudHJpcGxlcy5wdXNoKHEpXG4gICAgICB9KVxuICAgICAgcXVhZHNUb1JlbW92ZS5mb3JFYWNoKHEgPT4ge1xuICAgICAgICBsZXQgZ3JhcGg6IEdyYXBoID0gZ3JhcGhzVG9SZW1vdmVNYXBbcS5ncmFwaC52YWx1ZV1cbiAgICAgICAgaWYgKCFncmFwaCkge1xuICAgICAgICAgIGdyYXBoID0gbmV3IEdyYXBoKHEuZ3JhcGgpXG4gICAgICAgICAgZ3JhcGhzVG9SZW1vdmVNYXBbcS5ncmFwaC52YWx1ZV0gPSBncmFwaFxuICAgICAgICAgIGdyYXBoc1RvUmVtb3ZlLnB1c2goZ3JhcGgpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGgudHJpcGxlcy5wdXNoKHEpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlR3JhcGhzKGVuZHBvaW50LCBncmFwaHNUb0FkZCwgZ3JhcGhzVG9SZW1vdmUpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUdyYXBocyhlbmRwb2ludDogc3RyaW5nLCBncmFwaHNUb0FkZDogR3JhcGhbXSA9IFtdLCBncmFwaHNUb1JlbW92ZTogR3JhcGhbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBsZXQgYWRkU3RyaW5nOiBzdHJpbmcgPSBncmFwaHNUb0FkZC5tYXAoZ3JhcGggPT4gKERlZmF1bHRHcmFwaC5pbnN0YW5jZS5lcXVhbHMoZ3JhcGguZ3JhcGgpID8gJycgOiAnR1JBUEgnICsgZ3JhcGguZ3JhcGgudG9DYW5vbmljYWwoKSkgKyAneycgKyBncmFwaC50cmlwbGVzLm1hcChnID0+IGcudG9DYW5vbmljYWwoKSkuam9pbignIC4gJykgKyAnfScpLmpvaW4oJycpXG4gICAgICBsZXQgcmVtb3ZlU3RyaW5nOiBzdHJpbmcgPSBncmFwaHNUb1JlbW92ZS5tYXAoZ3JhcGggPT4gKERlZmF1bHRHcmFwaC5pbnN0YW5jZS5lcXVhbHMoZ3JhcGguZ3JhcGgpID8gJycgOiAnR1JBUEgnICsgZ3JhcGguZ3JhcGgudG9DYW5vbmljYWwoKSkgKyAneycgKyBncmFwaC50cmlwbGVzLm1hcChnID0+IGcudG9DYW5vbmljYWwoKSkuam9pbignIC4gJykgKyAnfScpLmpvaW4oJycpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnVwZGF0ZShlbmRwb2ludCwgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS5xdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxERUxFVEU+L2csIHJlbW92ZVN0cmluZykucmVwbGFjZSgvPElOU0VSVD4vZywgYWRkU3RyaW5nKSkudGhlbihcbiAgICAgICAgKHIpID0+IHIuc3RhdHVzID09PSAyMDQsXG4gICAgICAgIChyKSA9PiBmYWxzZVxuICAgICAgKVxuICAgIH1cblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var TreeNode = (function () {
        function TreeNode(id, label) {
            this.id = id;
            this.label = label;
            this.children = [];
            this.selected = true;
            this.open = true;
        }
        TreeNode.recursivelyProcess = function (node, f) {
            f(node);
            node.children.forEach(function (n) { return TreeNode.recursivelyProcess(n, f); });
        };
        return TreeNode;
    }());
    fibra.TreeNode = TreeNode;
    var TreeComponent = (function () {
        function TreeComponent() {
            this.bindings = {
                tree: '<',
                onSelect: '&',
            };
            this.templateUrl = 'partials/tree.html';
        }
        return TreeComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('tree',new TreeComponent());/*</auto_generate>*/
    fibra.TreeComponent = TreeComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBdUJkO0FBdkJELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQVVFLGtCQUFtQixFQUFVLEVBQVMsS0FBYTtZQUFoQyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQVQ1QyxhQUFRLEdBQWUsRUFBRSxDQUFBO1lBR3pCLGFBQVEsR0FBWSxJQUFJLENBQUE7WUFDeEIsU0FBSSxHQUFZLElBQUksQ0FBQTtRQUsyQixDQUFDO1FBSnpDLDJCQUFrQixHQUFvRCxVQUFDLElBQWMsRUFBRSxDQUFxQjtZQUN4SCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQTtRQUMvRCxDQUFDLENBQUE7UUFFSCxlQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxjQUFRLFdBV3BCLENBQUE7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZ0JBQVcsR0FBVyxvQkFBb0IsQ0FBQTtRQUNyRCxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLG1CQUFhLGdCQU16QixDQUFBO0FBQ0gsQ0FBQyxFQXZCUyxLQUFLLEtBQUwsS0FBSyxRQXVCZCIsImZpbGUiOiJzY3JpcHRzL3RyZWUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIFRyZWVOb2RlIHtcbiAgICBwdWJsaWMgY2hpbGRyZW46IFRyZWVOb2RlW10gPSBbXVxuICAgIHB1YmxpYyBpbnN0YW5jZXM6IG51bWJlclxuICAgIHB1YmxpYyBtYXRjaGluZ0luc3RhbmNlczogbnVtYmVyXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuID0gdHJ1ZVxuICAgIHB1YmxpYyBvcGVuOiBib29sZWFuID0gdHJ1ZVxuICAgIHB1YmxpYyBzdGF0aWMgcmVjdXJzaXZlbHlQcm9jZXNzOiAobm9kZTogVHJlZU5vZGUsIGY6IChUcmVlTm9kZSkgPT4gdm9pZCkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSwgZjogKFRyZWVOb2RlKSA9PiB2b2lkKSA9PiB7XG4gICAgICBmKG5vZGUpXG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2gobiA9PiBUcmVlTm9kZS5yZWN1cnNpdmVseVByb2Nlc3MobiwgZikpXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIHRyZWU6ICc8JyxcbiAgICAgICAgb25TZWxlY3Q6ICcmJyxcbiAgICAgIH1cbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3RyZWUuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
