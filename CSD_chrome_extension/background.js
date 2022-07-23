let currentURL;

chrome.tabs.onActivated.addListener(function () {
    console.log("TAB CHANGED");
        currentURL = getTab().then(url => {
            console.log(url);
            if (url.includes('https://www.pinterest.com/pin')) {
                console.log('yes')
                chrome.action.setBadgeText({text: "1"})
                chrome.action.setBadgeBackgroundColor({color: '#E60023'})
            } else {
                console.log('no')
                chrome.action.setBadgeText({text: ""})
            }
        })
})

chrome.tabs.onUpdated.addListener(function () {
    console.log("TAB UPDATED")
    currentURL = getTab().then(url => {
        console.log(url);
        if (url.includes('https://www.pinterest.com/pin')) {
            console.log('yes')
            chrome.action.setBadgeText({text: "1"})
            chrome.action.setBadgeBackgroundColor({color: '#E60023'})
        } else {
            console.log('no')
            chrome.action.setBadgeText({text: ""})
        }
    })
})

async function getTab() {
    let queryOptions = {active: true, currentWindow: true};
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].url;
}