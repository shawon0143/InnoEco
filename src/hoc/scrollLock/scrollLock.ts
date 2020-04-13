export const showScrollbar = () => {
    document.body.classList.add('showBodyScroll');
    document.body.classList.remove('hideBodyScroll');
};

// this will prevent body from scrolling when the modal is open.
export const hideScrollBar = () => {
    document.body.classList.add('hideBodyScroll');
    document.body.classList.remove('showBodyScroll');
};
