const buy = document.querySelectorAll('.buy');
const dimage = document.querySelector('.dimage');
const dprice = document.querySelector('.dprice');
const dtype = document.querySelector('.dtype');
const close = document.querySelector('.close');
const dname = document.querySelector('.dname');
const dform = document.querySelector('form');
const body = document.querySelector('body');



buy.forEach(function(el, i) {
    el.addEventListener('click', function(){
        dname.innerHTML=this.dataset.name;
        dprice.innerHTML=this.dataset.price;
        dimage.src=this.dataset.image;
        dtype.innerHTML=this.dataset.type;
        dform.style.transform="scale(1)";
        body.style.overflowY="hidden";

        

        
            })

})
close.onclick = function(){
    dform.style.transform="scale(0)";
    body.style.overflowY="scroll";

    
}
// body.onclick = function(){
//     // dform.style.display="none";
// }