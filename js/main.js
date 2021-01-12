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
        pauseOnHover: false,
    });
    slider.on( 'moved', function (newIndex) {
        normalizePaginationButtons(sliderBox, newIndex);
    });
    slider.on( 'dragged', function (newIndex) {
        normalizePaginationButtons(sliderBox, newIndex);
    });
    slider.on( 'autoplay:playing', function (rate) {
        let activeDot = sliderBox.querySelector('.splide__pagination__page.is-active');
        let width = activeDot.offsetWidth;
        let parent = activeDot.parentElement;
        let index = slider.index;
        normalizePaginationButtons(sliderBox, index);
        activeDot && (parent.style.paddingRight = ((1 - rate) * width) + 'px');
    });
    slider.mount();
}

function normalizePaginationButtons(sliderBox, index) {
    let dots = sliderBox.querySelectorAll('.splide__pagination__page');
    for (let i = 0; i < index; i++){
        dots[i].parentElement.style.paddingRight = "0px";
        dots[i].classList.add('-full');
    }
    for (let i = index; i < dots.length; i++){
        let width = dots[i].offsetWidth;
        dots[i].parentElement.style.paddingRight = width + "px";
        dots[i].classList.remove('-full');
    }
}