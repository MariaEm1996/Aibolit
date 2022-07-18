class Popup {
    constructor(element) {
        if (!element) {
            throw new Error('Отсутствует элемент попапа');
        }

        this.element = element;
        this.id = element.dataset.id;
        this.closePopupButtons = [...document.querySelectorAll(`[data-close="${this.id}"]`)];
        this.openPopupButtons = [...document.querySelectorAll(`[data-open="${this.id}"]`)];
    }

    init() {
        this.closePopupButtons.forEach((closeBtn) => this.addClickListener(closeBtn, () => {
            this.element.classList.remove('popup--visible');
        }));

        this.openPopupButtons.forEach((openBtn) => this.addClickListener(openBtn, () => {
            this.element.classList.add('popup--visible');
        }));
    }

    addClickListener(element, listener) {
        if (!element || !listener || typeof listener !== 'function') {
            return;
        }

        element.addEventListener('click', listener);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.popup')].forEach((popupElement) => {
        const popupInstance = new Popup(popupElement);
        popupInstance.init();
    })
});