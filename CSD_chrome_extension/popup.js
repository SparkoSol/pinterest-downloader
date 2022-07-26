getCurrentURl();

function getCurrentURl() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let _download_tag = document.getElementById('download-link');
        let showDownload = document.getElementById('showDownload');
        let showNoExistMessage = document.getElementById('showNoExistMessage');

        if(tabs[0].url.includes('https://www.pinterest.com/pin')) {
            _download_tag.href = "https://sparkolinks.com?videoUrl=" + tabs[0].url;
            showDownload.classList.add('d-block')
            showDownload.classList.remove('d-none')
            showNoExistMessage.classList.add('d-none')
            showNoExistMessage.classList.remove('d-block')
        } else {
            _download_tag.href = "#";
            showDownload.classList.add('d-none')
            showDownload.classList.remove('d-block')
            showNoExistMessage.classList.add('d-block')
            showNoExistMessage.classList.remove('d-none')
        }
    });
}