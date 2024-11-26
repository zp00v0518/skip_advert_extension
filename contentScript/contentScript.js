// прибирає елемненти з рекламою
// ytd-rich-item-renderer.style-scope.ytd-rich-grid-renderer:has(#support .yt-img-shadow) {
//     display: none;
// }

; (() => {
    createFakeClickLikeUser();
    function createFakeClickLikeUser(){
        Element.prototype._addEventListener = Element.prototype.addEventListener
        Element.prototype.addEventListener = function () {
            let args = [...arguments]
            if(args[0] !== 'click' || !this.closest('button.ytp-skip-ad-button') ) return this._addEventListener(...args)
            let temp = args[1]
            args[1] = function () {
                let args2 = [...arguments]
                const t = {}
                for (let key in args2[0]) {
                    t[key] = args2[0][key]
                }
                t.isTrusted = true
                // t.preventDefault =  args2[0].preventDefault()
                t.preventDefault = function(){
                    // console.log(' run preventDefault')
                }
                Object.setPrototypeOf(t, new PointerEvent('click'))
                args2[0] = t
                args2[0].isTrusted = true
                return temp(...args2)
            }
            return this._addEventListener(...args)
        }
    }


    let observer = false
    const config = {
        childList: true,
        subtree: true
    }
    setTimeout(() => {
        if (observer?.disconnect) observer.disconnect()
        observer = new MutationObserver(observeCallback)
        const target = document.querySelector('.html5-video-player')
        observer.observe(target || document.body, config)
    }, 2000)
})()
let btnObserveIsWork = false

function observeCallback() {
    // let btn = document.querySelector('[id^="skip-button"]')
    let btn = document.querySelector('button.ytp-ad-skip-button.ytp-button')
    if (!btn)
        btn = document.querySelector('button.ytp-ad-skip-button-modern.ytp-button')
    if (!btn) btn = document.querySelector('button.ytp-skip-ad-button')
    const imgReklama = document.querySelector('div.ytp-ad-image-overlay')
    const pauseInplay = document.querySelector('.ytp-ad-overlay-close-container')

    if (btn) {
        if (btnObserveIsWork) return

        btnObserveIsWork = true

        const btnObserver = new MutationObserver(btnObserveCallback)
        const btnConfig = {
            attributes: true,
            subtree: true,
            childList: true
        }

        btnObserver.observe(btn.parentNode.parentNode, btnConfig)
        function btnObserveCallback(e) {
            setTimeout(() => {
                btn.click()
                // console.log('click')
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
        const pausePtn = pauseInplay.querySelector(
            '.yt-simple-endpoint.style-scope.yt-button-renderer'
        )
        if (pausePtn) pausePtn.click()
    }
}
