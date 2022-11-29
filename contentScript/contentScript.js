(()=>{
    const config = {
        childList: true,
        subtree: true
    };
    setTimeout(()=> {
        const observer = new MutationObserver(observeCallback);
        observer.observe(document.body, config);
    },2000)
})()
let btnObserveIsWork = false

function observeCallback(){
    const btn = document.querySelector('button.ytp-ad-skip-button.ytp-button')
    const imgReklama = document.querySelector('div.ytp-ad-image-overlay')
    const pauseInplay = document.querySelector('.ytp-ad-overlay-close-container')
    if (btn){
        if (btnObserveIsWork) return
        btnObserveIsWork = true
        const btnObserver = new MutationObserver(btnObserveCallback);
        const btnConfig = {
            attributes: true,
        };
        btnObserver.observe(btn.parentNode.parentNode, btnConfig);
        function btnObserveCallback(){
            setTimeout(()=>{
                btn.click()
                btnObserveIsWork = false
                btnObserver.disconnect()
            },500)
        }
    }
    if (imgReklama){
        const closeBtn = imgReklama.querySelector('.ytp-ad-overlay-close-button')
        if (closeBtn) closeBtn.click()
    }
    if (pauseInplay){
        console.log(123)
        const pausePtn = pauseInplay.querySelector('.yt-simple-endpoint.style-scope.yt-button-renderer')
        if (pausePtn) pausePtn.click()
    }
}
