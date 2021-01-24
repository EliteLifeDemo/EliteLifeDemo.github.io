if(location.pathname === '/flats.html' &&  window.outerWidth <= 1000){
    location = '/flats-filter.html'
}
document.addEventListener('DOMContentLoaded', function () {
    pageReady();
});

function pageReady() {
    polyfills();
    initializeMainBanner();
    initializeFLatSlider();
    initializeLakeMiniSlider();
    initializeBigGallerySlider();
    menuOpener();
    flatLinks();
    togglers();
}

function menuOpener() {
    let menuOpener = document.querySelector('.mobile-menu-link.-menu');
    let menu = document.querySelector('.menu');
    menuOpener.addEventListener('click', function (e) {
        e.preventDefault();
        if (menu) {
            menu.style.cssText = "display:block !important";
            document.body.style.overflow = "hidden";
        } else {
            location = '/'
        }
    })
}

function polyfills() {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    let menuOpener = document.querySelector('.menu-opener-button');
    menuOpener.addEventListener('click', function () {
        location = "/";
    });
}

function togglers() {
    let toggleButtons = document.querySelectorAll('[data-toggle-target]');
    toggleButtons.forEach(function (button) {
        let selector = button.getAttribute('data-toggle-target');
        let element = document.querySelector(selector);
        let siblings = element.parentElement.querySelectorAll('.toggled');
        let buttonSiblings = button.parentElement.querySelectorAll('[data-toggle-target]');
        button.addEventListener('click', function (e) {
            siblings.forEach(function (el) {
                el.classList.remove('active')
            });
            buttonSiblings.forEach(function (el) {
                el.classList.remove('active')
            });
            button.classList.add('active');
            element.classList.add('active')
        });
    });
}

function flatLinks() {
    let flatLinks = document.querySelectorAll('[data-flat-link]');
    flatLinks.forEach(function (link) {
        let href = link.getAttribute('data-flat-link');
        link.addEventListener('click', function (e) {
            location = href
        });
    });
}

function initializeMainBanner() {
    let sliderBox = document.querySelector('.main-page-banner .splide');
    if (!sliderBox) {
        return
    }
    let slider = new Splide(sliderBox, {
        type: 'loop',
        autoplay: true,
        interval: 10000,
        lazyLoad: true,
        arrows: false,
        cover: true,
        perPage: 1,
        heightRatio: 0.5987654321,
        pauseOnHover: false,
        pauseOnFocus: false,
        breakpoints: {
            1000: {
                fixedHeight: "600px"
            }
        }
    });
    slider.on('moved', function (newIndex) {
        normalizePaginationButtons(sliderBox, newIndex);
    });
    slider.on('dragged', function (newIndex) {
        normalizePaginationButtons(sliderBox, newIndex);
    });
    slider.on('autoplay:playing', function (rate) {
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
    for (let i = 0; i < index; i++) {
        dots[i].parentElement.style.paddingRight = "0px";
        dots[i].classList.add('-full');
    }
    for (let i = index; i < dots.length; i++) {
        let width = dots[i].offsetWidth;
        dots[i].parentElement.style.paddingRight = width + "px";
        dots[i].classList.remove('-full');
    }
}

function initializeFLatSlider() {
    let previewSlider = document.querySelector('.flat-preview-small');
    if (!previewSlider || window.outerWidth <= 1000) {
        return
    }
    var secondarySlider = new Splide(previewSlider, {
        rewind: true,
        fixedWidth: 246,
        isNavigation: true,
        gap: 3,
        arrows: false,
        pagination: false,
        updateOnMove: true,
        waitForTransition: false,
    }).mount();

// Create the main slider.
    var primarySlider = new Splide('.flat-preview-big', {
        type: 'fade',
        pagination: false,
        arrows: true,
        updateOnMove: true,
        waitForTransition: false,
    });

// Set the thumbnails slider as a sync target and then call mount.
    primarySlider.sync(secondarySlider).mount();
}

function initializeBigGallerySlider() {
    let previewSlider = document.querySelector('.gallery-small-image');
    if (!previewSlider) {
        return
    }
    var secondarySlider = new Splide(previewSlider, {
        rewind: true,
        isNavigation: true,
        gap: 9,
        arrows: false,
        pagination: false,
        updateOnMove: true,
        waitForTransition: false,
        cover: true,
        perPage: 5,
        breakpoints: {
            1000: {
                perPage: 2,
            }
        }
    }).mount();

// Create the main slider.
    var primarySlider = new Splide('.gallery-big-image', {
        type: 'fade',
        pagination: false,
        arrows: false,
        updateOnMove: true,
        waitForTransition: false,
        cover: true,
        width: '100%'
    });

// Set the thumbnails slider as a sync target and then call mount.
    primarySlider.sync(secondarySlider).mount();
}

function initializeLakeMiniSlider() {
    let slider = document.querySelector('.mini-gallery');
    if (!slider) {
        return
    }
    var splide = new Splide(slider, {
        fixedWidth: "715px",
        height: "746px",
        arrows: true,
        pagination: false,
        updateOnMove: true,
        waitForTransition: false,
        type: 'fade',
        cover: true,
        lazyLoad: true,
        perPage: 1,
        breakpoints: {
            1000: {
                height: 0,
                heightRatio: 1,
                width:"100%",
                fixedWidth: "100%"
            }
        }
    });
    let currentPageBlock = document.querySelector('.mini-gallery-current-page');

    function changeNumber() {
        currentPageBlock.innerHTML = splide.index + 1;
    }

    splide.on('moved', function () {
        changeNumber();
    });
    splide.on('dragged', function () {
        changeNumber();
    });
    splide.mount();
}

function getVals() {
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat(slides[0].value);
    var slide2 = parseFloat(slides[1].value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    var displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = slide1 + " - " + slide2;
}

function scrollConfig() {
    let map = document.querySelector('.map-section');
    if (map) {
        map.scrollLeft = 767
    }
    let spaceLine = document.querySelector('.space-line-section');
    if (spaceLine) {
        spaceLine.scrollLeft = 272
    }
}
window.onload = function () {
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
    for (var x = 0; x < sliderSections.length; x++) {
        var sliders = sliderSections[x].getElementsByTagName("input");
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
    scrollConfig();
}