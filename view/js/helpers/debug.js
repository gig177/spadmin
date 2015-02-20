/* for normal debugging */
window.cl = (function (console) {
    return console
        ? function () { console.log.apply(console, arguments); }
        : function () {}
})(window.console);
define(function() {
});