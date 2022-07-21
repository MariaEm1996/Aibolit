const getSliderElements = (element) => ({
    togglers: [...element.querySelectorAll('.toggle')],
    slides: [...element.querySelectorAll('.slide')],
    viewport: document.querySelector('.slide-viewport'),
    viewportContent: document.querySelector('.slide-viewport-content'),
});

const getMaxHeight = (slides) => Math.min(...slides.map(slide => {
    const style = getComputedStyle(slide);

    const height = parseInt(style.height);
    const paddingTop = parseInt(style.paddingTop);
    const paddingBottom = parseInt(style.paddingBottom);
    const borderTop = parseInt(style.borderTop);
    const borderBottom = parseInt(style.borderBottom);

    return height + paddingTop + paddingBottom + borderTop + borderBottom;
}));

const sizeViewport = (viewport, height) => {
    if (!viewport || !(height ?? false)) {
        return;
    }

    viewport.style.height = `${height}px`;
};

const sizeSlides = (slides, size) => slides.forEach(slide => slide.style.height = `${size}px`);

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

    const slideHeight = getMaxHeight(slides);

    const totalSlides = slides.length;

    sizeViewport(viewport, slideHeight);

    sizeSlides(slides, slideHeight);

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
            // autoscrollIntervalId = setAutoscroll();
        });
    });

    // autoscrollIntervalId = setAutoscroll();
});