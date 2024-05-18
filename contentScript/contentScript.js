


(() => {
    let observer = false
    const config = {
        childList: true,
        subtree: true
    };
    setTimeout(() => {
        if (observer?.disconnect) observer.disconnect()
        observer = new MutationObserver(observeCallback);
        const target = document.querySelector('.html5-video-player')
        observer.observe(target || document.body, config);
    }, 2000)
})()
let btnObserveIsWork = false

function observeCallback() {
    // let btn = document.querySelector('[id^="skip-button"]')
    let btn = document.querySelector('button.ytp-ad-skip-button.ytp-button')
    if (!btn) btn = document.querySelector('button.ytp-ad-skip-button-modern.ytp-button')
    if (!btn) btn  = document.querySelector('button.ytp-skip-ad-button')
    const imgReklama = document.querySelector('div.ytp-ad-image-overlay')
    const pauseInplay = document.querySelector('.ytp-ad-overlay-close-container')

    if (btn) {
        if (btnObserveIsWork) return
        btnObserveIsWork = true


        const btnObserver = new MutationObserver(btnObserveCallback);
        const btnConfig = {
            attributes: true,
            subtree: true,
            childList: true,
        };
        btnObserver.observe(btn.parentNode.parentNode, btnConfig);
        function btnObserveCallback(e) {
            setTimeout(() => {
                btn.click()
                console.log("click")
                btnObserveIsWork = false
                btnObserver.disconnect()
            }, 500)
        }
    }

    // id="skip-button:20"
    if (imgReklama) {
        const closeBtn = imgReklama.querySelector('.ytp-ad-overlay-close-button')
        if (closeBtn) closeBtn.click()
    }
    if (pauseInplay) {
        const pausePtn = pauseInplay.querySelector('.yt-simple-endpoint.style-scope.yt-button-renderer')
        if (pausePtn) pausePtn.click()
    }
}
