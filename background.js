chrome.tabs.onActivated.addListener(callback);
chrome.tabs.onUpdated.addListener(callback)

async function callback(){
    const tab = await getCurrentTab()
    const isMathesUrl = await chrome.permissions.contains({
        permissions: ['tabs'],
        origins: [tab.url]
    })
    changeIcon(isMathesUrl, tab)
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function changeIcon(active, tab) {
    const icon = active ? "assets/images/youtube-logo19.png" : "assets/images/youtube-logo_grey19.png"
    chrome.action.setIcon({tabId: tab.id, path: icon });
}