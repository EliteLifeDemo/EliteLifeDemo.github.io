document.addEventListener('DOMContentLoaded',function () {
    pageReady();
});

function pageReady() {
    initializeMainBanner();
}
function initializeMainBanner(){
    let sliderBox = document.querySelector('.main-page-banner .splide');
    let slider = new Splide(sliderBox, {
        type   : 'loop',
        /*autoplay: true,*/
        interval: 10000,
        lazyLoad: true,
        arrows: false,
        cover: true
    });
    slider.on( 'autoplay:playing', function (rate) {
        console.log(rate); // 0-1
    });
    slider.mount();
}