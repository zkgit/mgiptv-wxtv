function getRequest() {
var url = window.location.href;
var theRequest = {};
if (url.indexOf("?") != -1) {
var start = url.indexOf("?"),
strs = url.substr(start + 1).split("&");
console.log(strs)
for (var i = 0,len=strs.length; i < len; i++) {
theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
}
}
return theRequest;
}
