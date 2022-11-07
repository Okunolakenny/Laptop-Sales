var open = document.getElementById('open');
var close = document.getElementById('close');
var text = document.getElementById('text');
var body = document.querySelector('body');

open.onclick = function(){
    text.type="text";
    open.style.display="none";
    close.style.display="block";

}
close.onclick = function(){
    text.type="password";
    open.style.display="block";
    close.style.display="none";

}