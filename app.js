initialize();

function initialize() {
    // initialize stylesheet for css design
    initializeCssStyleSheet();

    let main = document.getElementById('downloader');

    let wrapper = document.createElement('div');
    wrapper.className = 'pinterest-wrapper';
    main.appendChild(wrapper);

    let title = document.createElement('h1');
    title.innerText = 'Pinterest Downloader';
    title.className = 'pinterest-title';

    wrapper.appendChild(title)
    let div1 = document.createElement('div');
    div1.id = 'div1';

    let form = document.createElement('form')
    let div2 = document.createElement('div');
    let label = document.createElement('label');
    label.className = 'pinterest-label';
    label.for = 'url';
    label.innerText = 'Video URL';

    let input = document.createElement('input');
    input.id = 'url';
    input.type = 'text';
    input.placeholder = 'Please enter valid video URL i.e: https://pin.it/5sfd2T64';
    input.className = 'pinterest-form-control pinterest-p-3';

    div2.append(label);
    div2.append(input);

    let div3 = document.createElement('div');
    div3.className = 'pinterest-btn-group';

    let cancel_btn = document.createElement('button');
    cancel_btn.className = 'pinterest-cancel-btn pinterest-btn';
    cancel_btn.type = 'button';
    cancel_btn.innerText = 'Reset';

    let submit_btn = document.createElement('button');
    submit_btn.id = 'submit_btn';
    submit_btn.className = 'pinterest-submit-btn pinterest-btn';
    submit_btn.type = 'button';
    submit_btn.innerHTML = '<span>Generate</span>';
    submit_btn.style.display = 'flex';
    submit_btn.style.marginRight = '10px';

    div3.appendChild(cancel_btn);
    div3.appendChild(submit_btn);

    form.append(div2);
    form.append(div3);

    div1.appendChild(form);
    wrapper.appendChild(div1);

    cancel_btn.addEventListener('click', function () {
        document.getElementById('file-details');
        if (document.getElementById('file-details')) {
            document.getElementById('file-details').remove();
        }
        input.value = '';
        submit_btn.disabled = false;
        submit_btn.classList.remove('pinterest-disable');
        div3.style.marginTop = '0px';
        if (input.classList.contains('pinterest-invalid')) {
            input.classList.remove('pinterest-invalid');
            document.getElementById('error').remove();
        }
        if (document.getElementById('loader')) {
            document.getElementById('loader').remove();
        }
    });

    submit_btn.addEventListener('click', async function () {
        let hasError = false;
        let errorMessage = '';

        if (document.getElementById('file-details')) {
            document.getElementById('file-details').remove();
        }

        if(document.getElementById('error')) {
            document.getElementById('error').remove();
            submit_btn.disabled = false;
            submit_btn.classList.remove('pinterest-disable');
            input.classList.remove('pinterest-invalid');
        }

        if (input.value === '' && !input.value) {
            hasError = true;
            errorMessage = 'Video Url is required, please fill it!'
        } else if (!input.value.includes('/pin')) {
            hasError = true;
            errorMessage = 'Please use a valid pinterest video url!'
        } else if (input.classList.contains('pinterest-invalid')) {
            hasError = true;
            errorMessage = 'Video Url is required, please fill it!'
            return;
        }

        if (hasError) {
            input.classList.add('pinterest-invalid');
            let error = document.createElement('span');
            error.innerText = errorMessage;
            error.id = 'error';
            error.style.color = 'red';
            error.style.marginBottom = '10px';
            div2.appendChild(error);
            div3.style.marginTop = '10px';
            return;
        }


        let spinner = document.createElement('span');
        spinner.id = 'loader';
        spinner.className = 'pinterest-loader';
        spinner.style.marginLeft = '10px';
        submit_btn.appendChild(spinner)
        submit_btn.disabled = true;
        submit_btn.classList.add('pinterest-disable');

        await fetch('https://api.sparkolinks.com/pinterest', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            }, redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({url: input.value}) // body data type must match "Content-Type" header
        })
            .then(async response => {
                if (response.status !== 200) {
                    let res = await response.json();
                    let error = document.createElement('span');
                    error.id = 'error';
                    error.style.color = 'red';
                    error.style.marginBottom = '10px';
                    error.innerText = res.message;
                    input.classList.add('pinterest-invalid');
                    div2.appendChild(error);
                    submit_btn.disabled = true;
                    submit_btn.classList.add('pinterest-disable');
                    div3.style.marginTop = '10px';
                    return null;
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    generateDownloadContainer(data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                spinner.remove();
                submit_btn.disabled = false;
                submit_btn.classList.remove('pinterest-disable');
            });
    });

    getUrlParams();
}

function generateDownloadContainer(data) {
    if (document.getElementById('file-details')) {
        document.getElementById('file-details').remove();
    }

    let div4 = document.createElement('div');
    div4.className = 'pinterest-file-preview';
    div4.id = 'file-details';

    let div5 = document.createElement('div');
    div5.className = 'pinterest-mr-4';
    let image = document.createElement('img');
    image.src = data.thumbnail;
    image.className = 'pinterest-img-thumbnail';
    image.width = data.width;
    image.height = data.height;
    image.alt = 'thumbnail';
    div5.appendChild(image);

    div4.appendChild(div5)

    let div6 = document.createElement('div');
    div6.className = 'pinterest-file-details';

    let sub_title = document.createElement('p');
    sub_title.className = 'pinterest-label';
    sub_title.innerText = data.url.replace(/^.*[\\\/]/, '');
    div6.appendChild(sub_title);

    let div7 = document.createElement('div');
    div7.className = 'pinterest-download-preview';

    let download_btn = document.createElement('button');
    download_btn.id = 'download_btn';
    download_btn.type = 'button';
    download_btn.className = 'pinterest-download-btn pinterest-btn';
    download_btn.innerHTML = '<span id="download-btn-id">Download Now</span>';
    download_btn.style.display = 'flex';
    download_btn.style.marginRight = '10px';
    div7.appendChild(download_btn);

    submit_btn.disabled = false;
    submit_btn.classList.remove('pinterest-disable');

    div6.appendChild(div7);
    div4.appendChild(div6);

    div1.appendChild(div4);

    download_btn.addEventListener("click", async e => {
        e.preventDefault();
        document.getElementById('download-btn-id').innerText = "Downloading...";
        download_btn.disabled = true;
        let download_loader = document.createElement('span');
        download_loader.id = 'download_loader';
        download_loader.className = 'pinterest-loader';
        download_loader.style.marginLeft = '10px';
        download_btn.appendChild(download_loader)
        download_btn.disabled = true;
        download_btn.classList.add('pinterest-disable');

        let _url = 'https://api.sparkolinks.com/pinterest/redirects/getVideo?url=' + data.url;
        let response = await fetch(_url, {
            redirect: "follow", method: 'GET'
        })
            .then(response => {
                return response.blob()
            })
            .then(file => {
                let tempUrl = URL.createObjectURL(file);
                const aTag = document.createElement("a");
                aTag.href = tempUrl;
                aTag.download = _url.replace(/^.*[\\\/]/, '');
                document.body.appendChild(aTag);
                aTag.click();
                download_btn.innerText = "Download Now";
                URL.revokeObjectURL(tempUrl);
                aTag.remove();
            })
            .catch(e => {
                console.log(e)
                download_btn.innerText = "Download Now";
            }).finally(() => {
                download_btn.innerHTML = '<span id="download-btn-id">Download Now</span>';
                download_loader.remove();
                download_btn.disabled = false;
                download_btn.classList.remove('pinterest-disable');
            });
    });
}

function getUrlParams() {
    let input_field = document.getElementById('url');
    const query = new URLSearchParams(window.location.search)
    if (query.has('videoUrl')) {
        input_field.value = query.get('videoUrl');
    }
}

// Css design
function initializeCssStyleSheet() {
    let head = document.getElementsByTagName('head')[0];
    let stylesheet = document.createElement('style');
    stylesheet.innerText = '.pinterest-title { \n' + '    color: #CB2027;\n' + '    font-weight: 700!important;\n' + '    margin-bottom: 0.5rem!important;\n' + '    margin-top: 0.5rem!important;\n' + '    font-size: 2.5rem;\n' + '}\n' + '\n' + '.pinterest-wrapper {\n' + '    width: 100%;\n' + '    padding-right: 15px;\n' + '    padding-left: 15px;\n' + '    margin-right: auto;\n' + '    margin-left: auto;\n' + '    margin-top: 1.5rem!important;\n' + '    margin-bottom: 1.5rem!important;\n' + '}\n' + '\n' + '.pinterest-label {\n' + '    padding: 0.5rem!important;\n' + '    font-weight: 700!important;\n' + '    text-align: left!important;\n' + '    display: block!important;\n' + '    margin-bottom: 0.5rem;\n' + '}\n' + '\n' + '.pinterest-form-control {\n' + '    display: block;\n' + '    width: 100%;\n' + '    padding: 0.375rem 0.75rem;\n' + '    font-size: 1rem;\n' + '    line-height: 1.5;\n' + '    color: #495057;\n' + '    background-color: #fff;\n' + '    background-clip: padding-box;\n' + '    border: 1px solid #ced4da;\n' + '    border-radius: 0.25rem;\n' + '    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n' + '    margin-bottom: 10px;\n' + '}\n' + '\n' + '.pinterest-btn-group {\n' + '    display: flex!important;\n' + '    flex-direction: row!important;\n' + '    justify-content: flex-start!important;\n' + '}\n' + '\n' + '.pinterest-cancel-btn {\n' + '    color: #fff;\n' + '    background-color: #dc3545;\n' + '    border-color: #dc3545;\n' + '    margin-right: 10px;\n' + '}\n' + '\n' + '.pinterest-submit-btn {\n' + '    color: #fff;\n' + '    background-color: #007bff;\n' + '    border-color: #007bff;\n' + '}\n' + '\n' + '.pinterest-btn {\n' + '    cursor: pointer;\n' + '    display: inline-block;\n' + '    font-weight: 400;\n' + '    text-align: center;\n' + '    white-space: nowrap;\n' + '    vertical-align: middle;\n' + '    -webkit-user-select: none;\n' + '    -moz-user-select: none;\n' + '    -ms-user-select: none;\n' + '    user-select: none;\n' + '    border: 1px solid transparent;\n' + '    padding: 0.375rem 0.75rem;\n' + '    font-size: 1rem;\n' + '    line-height: 1.5;\n' + '    border-radius: 0.25rem;\n' + '    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n' + '}\n' + '\n' + '.pinterest-file-preview {\n' + '    margin-top: 3rem!important;\n' + '    flex-direction: row!important;\n' + '    display: flex!important;\n' + '}\n' + '\n' + '.pinterest-mr-4 {\n' + '    margin-right: 1.5rem!important;\n' + '}\n' + '\n' + '.pinterest-img-thumbnail {\n' + '    padding: 0.25rem;\n' + '    background-color: #fff;\n' + '    border: 1px solid #dee2e6;\n' + '    border-radius: 0.25rem;\n' + '    max-width: 100%;\n' + '    height: auto;\n' + '}\n' + '\n' + '.pinterest-download-preview {\n' + '    padding: 0.5rem!important;\n' + '    justify-content: space-between!important;\n' + '    display: flex!important;\n' + '}\n' + '\n' + '.pinterest-download-btn {\n' + '    cursor: pointer;\n' + '    color: #fff;\n' + '    background-color: #17a2b8;\n' + '}\n' + '\n' + '.pinterest-file-details {\n' + '    width: 100%; border:1px solid #dee2e6; padding: 0 5px\n' + '}\n' + '\n' + '.pinterest-invalid {\n' + '    border: 2px dashed red !important;\n' + '}\n' + '\n' + '.pinterest-disable {\n' + '    opacity: 0.45;\n' + '    cursor: not-allowed;\n' + '}\n' + '\n' + '.pinterest-loader {\n' + '    border: 4px solid #f3f3f3;\n' + '    border-radius: 50%;\n' + '    border-top: 4px solid #3498db;\n' + '    width: 12px;\n' + '    height: 12px;\n' + '    -webkit-animation: spin 2s linear infinite; /* Safari */\n' + '    animation: spin 2s linear infinite;\n' + '}\n' + '\n' + '@keyframes spin {\n' + '    0% { transform: rotate(0deg); }\n' + '    100% { transform: rotate(360deg); }\n' + '}';
    head.appendChild(stylesheet);
}