function initialize(){initializeCssStyleSheet();let k=document.getElementById("downloader"),d=document.createElement("div");d.className="pinterest-wrapper",k.appendChild(d);let g=document.createElement("h1");g.innerText="Pinterest Downloader",g.className="pinterest-title",d.appendChild(g);let h=document.createElement("div");h.id="div1";let i=document.createElement("form"),j=document.createElement("div"),e=document.createElement("label");e.className="pinterest-label",e.for="url",e.innerText="Video URL";let b=document.createElement("input");b.id="url",b.type="text",b.placeholder="Please enter valid video URL i.e: https://pin.it/5sfd2T64",b.className="pinterest-form-control pinterest-p-3",j.append(e),j.append(b);let f=document.createElement("div");f.className="pinterest-btn-group";let c=document.createElement("button");c.className="pinterest-cancel-btn pinterest-btn",c.type="button",c.innerText="Reset";let a=document.createElement("button");a.id="submit_btn",a.className="pinterest-submit-btn pinterest-btn",a.type="button",a.innerHTML="<span>Generate</span>",a.style.display="flex",a.style.marginRight="10px",f.appendChild(c),f.appendChild(a),i.append(j),i.append(f),h.appendChild(i),d.appendChild(h),c.addEventListener("click",function(){document.getElementById("file-details"),document.getElementById("file-details")&&document.getElementById("file-details").remove(),b.value="",a.disabled=!1,a.classList.remove("pinterest-disable"),f.style.marginTop="0px",b.classList.contains("pinterest-invalid")&&(b.classList.remove("pinterest-invalid"),document.getElementById("error").remove()),document.getElementById("loader")&&document.getElementById("loader").remove()}),a.addEventListener("click",async function(){let d=!1,e="";if(document.getElementById("file-details")&&document.getElementById("file-details").remove(),document.getElementById("error")&&(document.getElementById("error").remove(),a.disabled=!1,a.classList.remove("pinterest-disable"),b.classList.remove("pinterest-invalid")),""!==b.value||b.value){if(b.value.includes("/pin")){if(b.classList.contains("pinterest-invalid")){d=!0,e="Video Url is required, please fill it!";return}}else d=!0,e="Please use a valid pinterest video url!"}else d=!0,e="Video Url is required, please fill it!";if(d){b.classList.add("pinterest-invalid");let c=document.createElement("span");c.innerText=e,c.id="error",c.style.color="red",c.style.marginBottom="10px",j.appendChild(c),f.style.marginTop="10px";return}let g=document.createElement("span");g.id="loader",g.className="pinterest-loader",g.style.marginLeft="10px",a.appendChild(g),a.disabled=!0,a.classList.add("pinterest-disable"),await fetch("http://164.92.103.98:3001/pinterest",{method:"POST",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({url:b.value})}).then(async d=>{if(200!==d.status){let e=await d.json(),c=document.createElement("span");return c.id="error",c.style.color="red",c.style.marginBottom="10px",c.innerText=e.message,b.classList.add("pinterest-invalid"),j.appendChild(c),a.disabled=!0,a.classList.add("pinterest-disable"),f.style.marginTop="10px",null}return d.json()}).then(a=>{a&&generateDownloadContainer(a)}).catch(a=>{console.error("Error:",a)}).finally(()=>{g.remove(),a.disabled=!1,a.classList.remove("pinterest-disable")})}),getUrlParams()}function generateDownloadContainer(d){document.getElementById("file-details")&&document.getElementById("file-details").remove();let c=document.createElement("div");c.className="pinterest-file-preview",c.id="file-details";let f=document.createElement("div");f.className="pinterest-mr-4";let b=document.createElement("img");b.src=d.thumbnail,b.className="pinterest-img-thumbnail",b.width=d.width,b.height=d.height,b.alt="thumbnail",f.appendChild(b),c.appendChild(f);let e=document.createElement("div");e.className="pinterest-file-details";let g=document.createElement("p");g.className="pinterest-label",g.innerText=d.url.replace(/^.*[\\\/]/,""),e.appendChild(g);let h=document.createElement("div");h.className="pinterest-download-preview";let a=document.createElement("button");a.id="download_btn",a.type="button",a.className="pinterest-download-btn pinterest-btn",a.innerHTML='<span id="download-btn-id">Download Now</span>',a.style.display="flex",a.style.marginRight="10px",h.appendChild(a),submit_btn.disabled=!1,submit_btn.classList.remove("pinterest-disable"),e.appendChild(h),c.appendChild(e),div1.appendChild(c),a.addEventListener("click",async c=>{c.preventDefault(),document.getElementById("download-btn-id").innerText="Downloading...",a.disabled=!0;let b=document.createElement("span");b.id="download_loader",b.className="pinterest-loader",b.style.marginLeft="10px",a.appendChild(b),a.disabled=!0,a.classList.add("pinterest-disable");let e="http://164.92.103.98:3001/pinterest/redirects/getVideo?url="+d.url;await fetch(e,{redirect:"follow",method:"GET"}).then(a=>a.blob()).then(d=>{let c=URL.createObjectURL(d),b=document.createElement("a");b.href=c,b.download=e.replace(/^.*[\\\/]/,""),document.body.appendChild(b),b.click(),a.innerText="Download Now",URL.revokeObjectURL(c),b.remove()}).catch(b=>{console.log(b),a.innerText="Download Now"}).finally(()=>{a.innerHTML='<span id="download-btn-id">Download Now</span>',b.remove(),a.disabled=!1,a.classList.remove("pinterest-disable")})})}function getUrlParams(){let b=document.getElementById("url"),a=new URLSearchParams(window.location.search);a.has("videoUrl")&&(b.value=a.get("videoUrl"))}function initializeCssStyleSheet(){let b=document.getElementsByTagName("head")[0],a=document.createElement("style");a.innerText=".pinterest-title { \n    color: #CB2027;\n    font-weight: 700!important;\n    margin-bottom: 0.5rem!important;\n    margin-top: 0.5rem!important;\n    font-size: 2.5rem;\n}\n\n.pinterest-wrapper {\n    width: 100%;\n    padding-right: 15px;\n    padding-left: 15px;\n    margin-right: auto;\n    margin-left: auto;\n    margin-top: 1.5rem!important;\n    margin-bottom: 1.5rem!important;\n}\n\n.pinterest-label {\n    padding: 0.5rem!important;\n    font-weight: 700!important;\n    text-align: left!important;\n    display: block!important;\n    margin-bottom: 0.5rem;\n}\n\n.pinterest-form-control {\n    display: block;\n    width: 100%;\n    padding: 0.375rem 0.75rem;\n    font-size: 1rem;\n    line-height: 1.5;\n    color: #495057;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 1px solid #ced4da;\n    border-radius: 0.25rem;\n    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n    margin-bottom: 10px;\n}\n\n.pinterest-btn-group {\n    display: flex!important;\n    flex-direction: row!important;\n    justify-content: flex-start!important;\n}\n\n.pinterest-cancel-btn {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545;\n    margin-right: 10px;\n}\n\n.pinterest-submit-btn {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff;\n}\n\n.pinterest-btn {\n    cursor: pointer;\n    display: inline-block;\n    font-weight: 400;\n    text-align: center;\n    white-space: nowrap;\n    vertical-align: middle;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    border: 1px solid transparent;\n    padding: 0.375rem 0.75rem;\n    font-size: 1rem;\n    line-height: 1.5;\n    border-radius: 0.25rem;\n    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n}\n\n.pinterest-file-preview {\n    margin-top: 3rem!important;\n    flex-direction: row!important;\n    display: flex!important;\n}\n\n.pinterest-mr-4 {\n    margin-right: 1.5rem!important;\n}\n\n.pinterest-img-thumbnail {\n    padding: 0.25rem;\n    background-color: #fff;\n    border: 1px solid #dee2e6;\n    border-radius: 0.25rem;\n    max-width: 100%;\n    height: auto;\n}\n\n.pinterest-download-preview {\n    padding: 0.5rem!important;\n    justify-content: space-between!important;\n    display: flex!important;\n}\n\n.pinterest-download-btn {\n    cursor: pointer;\n    color: #fff;\n    background-color: #17a2b8;\n}\n\n.pinterest-file-details {\n    width: 100%; border:1px solid #dee2e6; padding: 0 5px\n}\n\n.pinterest-invalid {\n    border: 2px dashed red !important;\n}\n\n.pinterest-disable {\n    opacity: 0.45;\n    cursor: not-allowed;\n}\n\n.pinterest-loader {\n    border: 4px solid #f3f3f3;\n    border-radius: 50%;\n    border-top: 4px solid #3498db;\n    width: 12px;\n    height: 12px;\n    -webkit-animation: spin 2s linear infinite; /* Safari */\n    animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n}",b.appendChild(a)}initialize()