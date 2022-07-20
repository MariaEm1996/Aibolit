const getSliderElements = (element) => ({
    togglers: [...element.querySelectorAll('.toggle')],
    slides: [...element.querySelectorAll('.slide')],
    viewport: document.querySelector('.slide-viewport'),
    viewportContent: document.querySelector('.slide-viewport-content'),
});

const sizeViewport = (viewport, slide) => {
    if (!viewport || !slide) {
        return;
    }

    viewport.style.height = `${slide.offsetHeight}px`;

    return slide.offsetHeight;
};

const setTranslateY = (element, height = 0) => {
    if (!element) {
        return;
    }

    element.style.transform = `translateY(${height - 1}px)`;
};

const activateToggle = (toggler) => toggler.classList.add('toggle--active');

const deactivateToggle = (toggler) => toggler.classList.remove('toggle--active');

const goToSlide = (toggle, index, slideHeight, viewportContent) => {
    setTranslateY(viewportContent, -index * slideHeight);
    activateToggle(toggle);
};

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.main-slider');

    const {
        togglers,
        slides,
        viewport,
        viewportContent,
    } = getSliderElements(wrapper);

    const totalSlides = slides.length;

    const slideHeight = sizeViewport(viewport, slides[0]);

    let activeToggler = togglers[0];
    let activeSlideIndex = 0;

    let autoscrollIntervalId = null;

    const switchSlide = (toggler, index, slideHeight, viewportContent) => {
        goToSlide(toggler, index, slideHeight, viewportContent);
        deactivateToggle(activeToggler);
        activeToggler = toggler;
        activeSlideIndex = index;
    };

    const setAutoscroll = () => setInterval(() => {
        const nextSlideIndex = ((activeSlideIndex + 1) + totalSlides) % totalSlides;
        switchSlide(togglers[nextSlideIndex], nextSlideIndex, slideHeight, viewportContent);
    }, 5000);

    const offAutoscroll = () => {
        if (autoscrollIntervalId) {
            clearInterval(autoscrollIntervalId);
        }
    }

    togglers.forEach((toggler, index) => {
        toggler.addEventListener('click', () => {
            offAutoscroll();
            switchSlide(toggler, index, slideHeight, viewportContent);
            autoscrollIntervalId = setAutoscroll();
        });
    });

    autoscrollIntervalId = setAutoscroll();
});