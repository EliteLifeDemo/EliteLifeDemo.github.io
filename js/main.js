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
    slider.on( 'moved', function (newIndex) {
        let dots = sliderBox.querySelectorAll('.splide__pagination__page');
        for (let i = newIndex; i >= 0; i--){
            dots[i].parentElement.style.paddingRight = width + "px";
        }
        for (let i = 0; i < newIndex; i++){
            dots[i].parentElement.style.paddingRight = 0;
        }
    });
    slider.on( 'autoplay:playing', function (rate) {
        let activeDot = sliderBox.querySelector('.splide__pagination__page.is-active');
        let width = activeDot.offsetWidth;
        let parent = activeDot.parentElement;
        let index = slider.index;
        let dots = sliderBox.querySelectorAll('.splide__pagination__page');
        for (let i = index-1; i >= 0; i--){
            dots[i].parentElement.style.paddingRight = width + "px";
        }
        for (let i = 0; i < index; i++){
            dots[i].parentElement.style.paddingRight = 0;
        }
        activeDot && (parent.style.paddingRight = ((1 - rate) * width) + 'px');
    });
    slider.mount();
}