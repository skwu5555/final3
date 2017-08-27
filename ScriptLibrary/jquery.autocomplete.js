/*
 Ajax Autocomplete
 Version: 1.0.9
 (c) 2011 DMXzone.com
 @build 25-08-2011 10:30:12
*/
(function(c){c.fn.extend({autocomplete:function(b,a){var f=typeof b=="string",i=b=="GoogleAjax",a=c.extend({},c.Autocompleter.defaults,{url:f?i?"http://maps.googleapis.com/maps/api/geocode/json?sensor=false":b:null,data:f?null:b,staticData:f?/(.txt|.xml)$/.test(b):!0,delay:f?c.Autocompleter.defaults.delay:10,isGoogleAjax:i},a);a.limitName="";a.limitCode="";if(a.isGoogleAjax&&(a.searchAll=!1,a.matchSubset=!1,(f=a.gRegion?a.gRegion.split("|"):[])&&f.length>1)){if(f[0])a.limitCode=f[0];if(f[1])a.limitName=
f[1]}return this.each(function(){new c.Autocompleter(this,a)})},result:function(b){return this.bind("result",b)},search:function(){return this.trigger("search")}});c.Autocompleter=function(b,a){function f(b,d,n){var g=p.selected();if(!g)return!1;var e=g.result;v=e;if(a.multiple){var j=o(l.val());j.length>1&&(e=j.slice(0,j.length-1).join(a.multipleSeparator)+a.multipleSeparator+e);e+=a.multipleSeparator}l.val(e);a.hiddenIdField&&a.hiddenIdField!=""&&(e=c('input[name="'+a.hiddenIdField+'"]'))&&e.val(g.idVal);
if(a.gStreetField&&a.gStreetField!=""&&(j=c('input[name="'+a.gStreetField+'"]')))(e=h(g.obj,"street_address"))||(e=h(g.obj,"route")),e&&e.short_name&&e.long_name?j.val(a.gStreetFieldShort?e.short_name:e.long_name):j.val("");if(a.gStreetNumberField&&a.gStreetNumberField!=""&&(j=c('input[name="'+a.gStreetNumberField+'"]')))(e=h(g.obj,"street_number"))&&e.long_name?j.val(e.long_name):j.val("");if(a.gCityField&&a.gCityField!=""&&(j=c('input[name="'+a.gCityField+'"]')))(e=h(g.obj,"locality"))&&e.short_name&&
e.long_name?j.val(a.gCityFieldShort?e.short_name:e.long_name):j.val("");if(a.gCountryField&&a.gCountryField!=""&&(j=c('input[name="'+a.gCountryField+'"]')))(e=h(g.obj,"country"))&&e.short_name&&e.long_name?j.val(a.gCountryFieldShort?e.short_name:e.long_name):j.val("");if(a.gStateField&&a.gStateField!=""&&(j=c('input[name="'+a.gStateField+'"]')))(e=h(g.obj,"administrative_area_level_1"))&&e.short_name&&e.long_name?j.val(a.gStateFieldShort?e.short_name:e.long_name):j.val("");if(a.gPostalCodeField&&
a.gPostalCodeField!=""&&(j=c('input[name="'+a.gPostalCodeField+'"]')))(e=h(g.obj,"postal_code"))&&e.short_name&&e.long_name?j.val(a.gPostalCodeFieldShort?e.short_name:e.long_name):j.val("");a.gLatField&&a.gLatField!=""&&(e=c('input[name="'+a.gLatField+'"]'))&&e.val(g.latLng.lat());a.gLngField&&a.gLngField!=""&&(e=c('input[name="'+a.gLngField+'"]'))&&e.val(g.latLng.lng());if(a.useMap&&a.useMap!=""&&!n&&(j=c("#"+a.useMap))&&j.gMap)if(e=j.data("gmap"))a.clearAllMarkers&&!d&&j.gMap("removeAllMarkers"),
d=e.gmap,d.panTo(g.obj.geometry.location),b=new google.maps.Marker({title:g.data,draggable:a.allowDragChange?!0:!1,animation:b?null:google.maps.Animation.DROP,map:d,position:g.obj.geometry.location}),a.allowDragChange&&google.maps.event.addListener(b,"dragend",function(a){(new google.maps.Geocoder).geocode({location:a.latLng},function(a,b){if(b==google.maps.GeocoderStatus.OK){var e=a[0].formatted_address,c=q(a);u.add(e,c);c=u.load(e);p.display(c,e);f(!0)}})}),e.markers.push(b);r();n||l.trigger("result",
[g.data,g.value,g]);return!0}function i(b,c){if(y==t.DEL)p.hide();else{var n=l.val();if(c||n!=v)v=n,n=s(n),n.length>=a.minChars?(l.addClass(a.loadingClass),a.matchCase||(n=n.toLowerCase()),m(n,d,k)):(k(),p.hide())}}function o(b){if(!b)return[""];var b=b.split(c.trim(a.multipleSeparator)),d=[];c.each(b,function(a,b){c.trim(b)&&(d[a]=c.trim(b))});return d}function s(b){if(!a.multiple)return b;b=o(b);return b[b.length-1]}function r(){p.hide();clearTimeout(w);k();a.mustMatch&&l.search(function(a){a||
l.val("")})}function d(d,h){if(h&&h.length&&x){k();p.display(h,d);var n=h[0].value;a.autoFill&&s(l.val()).toLowerCase()==d.toLowerCase()&&y!=8&&l.val().toLowerCase()==n.substring(0,l.val().length).toLowerCase()&&(l.val(l.val()+n.substring(s(v).length)),c.Autocompleter.Selection(b,v.length,v.length+n.length));p.show()}else r()}function m(b,d,l){a.matchCase||(b=b.toLowerCase());var g=u.load(b);if(g&&g.length)d(b,g);else if(typeof a.url=="string"&&a.url.length>0&&(!a.staticData||!g)){if(a.matchContains)a.extraParams=
c.extend({mc:"true"},a.extraParams);if(a.searchAll)a.extraParams=c.extend({sa:"true"},a.extraParams);a.isGoogleAjax?(new google.maps.Geocoder).geocode(a.gRegion?{address:b+(!a.gLimitType&&a.limitName?","+a.limitName:""),region:a.limitCode}:{address:b},function(a,c){if(c==google.maps.GeocoderStatus.OK){var g=q(a);u.add(b,g);g=u.load(b);d(b,g)}else r()}):c.ajax({url:a.url,data:!a.staticData?c.extend({q:s(b),limit:a.max},a.extraParams):"",success:function(e){var g;if(!(g=a.parse&&a.parse(e))){g=[];for(var e=
e.split("\n"),l=0;l<e.length;l++){var h=c.trim(e[l]);h&&(h=h.split("|"),g[g.length]={data:h,value:h[0],idVal:a.idField&&a.hiddenIdField?h[1]:"",result:a.formatResult&&a.formatResult(h)||h[0]})}}u.add(b,g);g=u.load(b);d(b,g)},error:function(b){var a=c('<div id="error"/>').css({position:"absolute",width:"400px",height:"300px",left:"50%",top:"50%",border:"3px solid #f00",marginLeft:"-250px",marginTop:"-150px"}).appendTo("body");c("<div/>").css({width:"400px",height:"25px",backgroundColor:"#f00",textAlign:"center",
fontWeight:"bold",color:"#fff"}).text("Ajax AutoComplete Server Error").appendTo(a);c("<div/>").css({width:"400px",height:"275px",backgroundColor:"#fff",color:"#000",overflow:"auto"}).html(b.responseText).appendTo(a);c("<div/>").css({position:"absolute",width:"15px",height:"25px",top:"0px",right:"0px",fontWeight:"bold",color:"#fff",cursor:"pointer"}).text("X").click(function(){a.remove()}).appendTo(a)}})}else l(b)}function q(b){for(var c=[],d=0;d<b.length;d++){var g=b[d];if(g&&(a.gLimitType=="all"||
a.limitCode==""||a.limitCode==h(g,"country").short_name))c[c.length]={data:g.formatted_address,value:g.formatted_address,latLng:g.geometry.location,result:g.formatted_address,obj:g}}return c}function h(b,a){if(b&&b.address_components)for(var d=0;d<b.address_components.length;d++){var g=b.address_components[d];if(c.inArray(a,g.types)!=-1)return g}return null}function k(){l.removeClass(a.loadingClass)}var t={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188},l=c(b).attr("autocomplete","off").addClass(a.inputClass),
w,v="",u=c.Autocompleter.Cache(a),x=0,y,p=c.Autocompleter.Select(a,b,f),z;c.browser.opera&&c(b.form).bind("submit.autocomplete",function(){if(z)return z=!1});l.bind((c.browser.opera?"keypress":"keydown")+".autocomplete",function(b){x=1;y=b.keyCode;switch(b.keyCode){case t.UP:p.visible()?(b.preventDefault(),p.prev()):i(0,!0);break;case t.DOWN:p.visible()?(b.preventDefault(),p.next()):i(0,!0);break;case a.multiple&&c.trim(a.multipleSeparator)==","&&t.COMMA:case t.TAB:case t.RETURN:if(f())return b.preventDefault(),
z=!0,!1;break;case t.ESC:p.hide();break;default:clearTimeout(w),w=setTimeout(i,a.delay)}}).keypress(function(){}).focus(function(){x++}).blur(function(){x=0;clearTimeout(w);w=setTimeout(r,200)}).click(function(){x++>1&&!p.visible()&&i(0,!0)}).bind("search",function(){function b(a,c){var d;if(c&&c.length)for(var e=0;e<c.length;e++)if(c[e].result.toLowerCase()==a.toLowerCase()){d=c[e];break}l.trigger("result",d&&[d.data,d.value,d])}c.each(o(l.val()),function(a,c){m(c,b,b)})}).bind("select",function(b,
a,c,d,e){p.display([d],a);f(!0,!0,e)});r()};c.Autocompleter.defaults={highlightClass:"ac_highlight",inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:2,delay:500,matchCase:!1,matchSubset:!0,matchContains:!1,gRegion:"",gLimitType:"",gStreetField:"",gStreetNumberField:"",gStreetFieldShort:!1,gPostalCodeField:"",gPostalCodeFieldShort:!1,gCityField:"",gCityFieldShort:!1,gStateField:"",gStateFieldShort:!1,gCountryField:"",gCountryFieldShort:!1,gLatField:"",gLngField:"",
useMap:"",clearAllMarkers:!0,allowDragChange:!0,idField:"",hiddenIdField:"",cacheLength:10,mustMatch:!1,extraParams:{},selectFirst:!0,max:10,autoFill:!1,width:0,multiple:!1,multipleSeparator:", ",opacity:0.8,showFullItem:!0,searchAll:!1,itemSeparator:"<br/>"};c.Autocompleter.Cache=function(b){function a(a,c){var m=!1,q=!1;if(typeof a=="string"){b.matchCase||(a=a.toLowerCase());var h=a.indexOf(c);if(h==-1)return!1;return h==0||b.matchContains}else{for(var k=b.searchAll?a.length:1,h=0;h<k;h++){var f=
a[h];b.matchCase||(f=f.toLowerCase());f=f.indexOf(c);f>-1&&(m=!0);f==0&&(q=!0)}if(!m)return!1}return q||b.matchContains}function f(a,c){s>b.cacheLength&&this.flush();o[a]||s++;o[a]=c}function i(){if(!b.data)return!1;var a={},d=0;if(!b.url)b.cacheLength=1;a[""]=[];c.each(b.data,function(c,f){value=b.formatItem?b.formatItem(f,f,c+1,b.data.length):f;var h=value.charAt(0).toLowerCase();a[h]||(a[h]=[]);var k={value:value,data:f,result:b.formatResult&&b.formatResult(f)||value};a[h].push(k);d++<b.max&&a[""].push(k)});
c.each(a,function(a,c){b.cacheLength++;f(a,c)})}var o={},s=0;setTimeout(i,25);return{flush:function(){o={};s=0},add:f,populate:i,load:function(f){if(!b.cacheLength||!s)return null;if(!b.url&&b.matchContains){var d=[],m;for(m in o)if(m.length>0){var i=o[m];c.each(i,function(b,c){a(c.data,f)&&d.push(c)})}return d}else if(b.matchSubset)for(m=f.length;m>=b.minChars;m--){if(i=o[f.substr(0,m)])return d=[],c.each(i,function(b,c){a(c.data,f)&&(d[d.length]=c)}),d}else if(o[f])return o[f];return null}}};c.Autocompleter.Select=
function(b,a,f){function i(a){var b=a.target;if(b.tagName=="UL")b=a.relatedTarget;for(;b.tagName!="LI";)b=b.parentNode;return b}function o(a){h+=a;h<0?h=q.size()-1:h>=q.size()&&(h=0);q.removeClass().eq(h).addClass(r.ACTIVE)}function s(){function a(c){var d=t.replace(/(\.|\?|\||\(|\)|\[|\]|\{|\}|\$|\^|\*|\+|\\)/g,"\\$1");return b.highlightClass?c.replace(RegExp((b.matchContains?"":"^")+"("+d+")","gi"),"<span class='"+b.highlightClass+"'>$1</span>"):c.replace(RegExp((b.matchContains?"":"^")+"("+d+")",
"gi"),"<strong>$1</strong>")}function d(a,c){if(typeof c!="string"&&c.length>1)for(var a="<span class='ac_title'>"+a+"</span>",f=b.idField&&b.hiddenIdField?2:1;f<c.length;f++)a+=b.itemSeparator+c[f];return a}for(var f=b.max>0&&b.max<k.length?b.max:k.length,i=0;i<f;i++)k[i]&&c("<li/>").html(b.formatItem?b.searchAll?a(b.formatItem(k[i].value,k[i].data,i+1,f)):b.formatItem(a(k[i].value),k[i].data,i+1,f):b.showFullItem?d(a(k[i].value),k[i].data):a(k[i].value)).appendTo(m);q=m.find("li");b.selectFirst&&
(q.eq(0).addClass(r.ACTIVE),h=0)}var r={ACTIVE:"ac_over"},d=c("<div/>").hide().addClass(b.resultsClass).css("position","absolute").appendTo("body");!c.browser.msie&&!/6.0/.test(navigator.userAgent)&&d.css("opacity",b.opacity);var m=c("<ul/>").appendTo(d).mouseover(function(a){h=c("li",m).removeClass().index(i(a));c(i(a)).addClass(r.ACTIVE)}).mouseout(function(a){c(i(a)).removeClass()}).click(function(b){c(i(b)).addClass(r.ACTIVE);f();a.focus();return!1}),q,h=-1,k,t="";b.width>0&&d.css("width",b.width);
return{display:function(a,b){k=a;t=b;m.empty();s();c.fn.bgiframe&&m.bgiframe()},next:function(){o(1)},prev:function(){o(-1)},hide:function(){if(b.onHide)b.onHide(d);else if(b.fxHide){if(!b.fxHide.duration)b.fxHide.duration="normal";switch(b.fxHide.type.toLowerCase()){case "slide":d.slideUp(b.fxHide.duration);break;case "fade":d.fadeOut(b.fxHide.duration);break;default:d.hide()}}else d.hide();h=-1},visible:function(){return d&&d.is(":visible")},current:function(){return this.visible()&&(q.filter("."+
r.ACTIVE)[0]||b.selectFirst&&q[0])},show:function(){var f=c(a).offset();d.css({width:b.width>0?b.width:c(a).width(),top:f.top+a.offsetHeight,left:f.left});if(b.onShow)b.onShow(d);else if(b.fxShow){if(!b.fxShow.duration)b.fxShow.duration="normal";switch(b.fxShow.type.toLowerCase()){case "slide":d.slideDown(b.fxShow.duration);break;case "fade":d.fadeIn(b.fxShow.duration);break;default:d.show()}}else d.show()},selected:function(){return k&&k[h]},emptyList:function(){m&&m.empty()},unbind:function(){d&&
d.remove()}}};c.Autocompleter.Selection=function(b,a,c){if(b.createTextRange){var i=b.createTextRange();i.collapse(!0);i.moveStart("character",a);i.moveEnd("character",c);i.select()}else if(b.setSelectionRange)b.setSelectionRange(a,c);else if(b.selectionStart)b.selectionStart=a,b.selectionEnd=c;b.focus()}})(jQuery);
