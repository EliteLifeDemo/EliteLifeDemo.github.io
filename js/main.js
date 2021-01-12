document.addEventListener('DOMContentLoaded',function () {
    pageReady();
});

function pageReady() {
    polyfills();
    initializeMainBanner();
}
function polyfills() {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
}
function initializeMainBanner(){
    let sliderBox = document.querySelector('.main-page-banner .splide');
    let slider = new Splide(sliderBox, {
        type   : 'loop',
        autoplay: true,
        interval: 10000,
        lazyLoad: true,
        arrows: false,
        cover: true,
        perPage: 1,
        heightRatio: 0.592,
        preloadPages: 0,
    });
    let reset = true;
    slider.on( 'autoplay:playing', function (rate) {
        let activeDot = sliderBox.querySelector('.splide__pagination__page.is-active');
        let width = activeDot.width;
        let parent = activeDot.parentElement;
        let index = slider.index;
        if(index === 0 && reset){
            reset = false;
            let dots = sliderBox.querySelector('.splide__pagination__page');
            dots.forEach(function (dot) {
                dot.parentElement.style.paddingRight = width + "px";
            })
        }
        if(index !== 1){
            reset = true;
        }
        parent.style.paddingRight = ((1 - rate) * width) + 'px';
    });
    slider.mount();
}