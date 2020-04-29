//ui
const controlBarBtn = document.querySelector('.js-control-bar-btn');
const content = document.querySelector('.js--content-block');

function getControl() {
    return document.querySelector('.js-control-bar');
}

function closeControlBar() {
    let control = getControl();
    if (!control) return;
    control.classList.remove('is-open');
    content.style.cssText = '';
}

function toggleControlBar() {
    let control = getControl();
    if (!control) return;
    control.classList.toggle('is-open');

    if (control.classList.contains('is-open')) {
        let controlWidth = control.offsetWidth;
        content.style.cssText = `margin-left: ${controlWidth}px; flex: 0 0 calc(100% - ${controlWidth}px)`;
    } else {
        content.style.cssText = '';
    }

}

let resizeTimeout;

function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            closeControlBar();

            // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
    }
}

controlBarBtn.addEventListener('click', () => {
    toggleControlBar();
});

let innerWidthWindow = window.innerWidth;
window.addEventListener('resize', () => {
    if (innerWidthWindow !== window.innerWidth) {
        innerWidthWindow = window.innerWidth;
        resizeThrottler();
    }
}, false);