let userId = undefined;
let sessionId = undefined;

async function sendFeedback(uuid, url, happy) {
    try {
        fetch("https://api-jdhry57disoejch.qually.com/0/supertokens/documentation/feedback", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "api-version": "0",
            },
            body: JSON.stringify({
                url,
                userId: uuid,
                helpful: happy,
            }),
        });
    } catch {
        // IGNORING
    }
}

function feedbackSelected(happy) {
    let uuid = getUUID();
    let url = window.location.href;
    if (happy) {
        // happy selected
        sendFeedback(uuid, url, true);
        let happyImage = document.getElementById("feedback-happy");
        let sadImage = document.getElementById("feedback-sad");

        happyImage.className = "feedback-button-happy selected";
        sadImage.className = "feedback-button-sad";
    } else {
        // sad selected
        sendFeedback(uuid, url, false);
        let happyImage = document.getElementById("feedback-happy");
        let sadImage = document.getElementById("feedback-sad");

        happyImage.className = "feedback-button-happy";
        sadImage.className = "feedback-button-sad selected";
    }
}

function goToGithub() {
    window.open(
        'https://github.com/supertokens/supertokens-website',
        '_blank'
    );
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function getUUID() {
    let userId = localStorage.getItem("uuid");
    if (userId === null || userId === undefined) {
        // generate new one
        userId = create_UUID();
        localStorage.setItem("uuid", userId);
    }
    return userId;
}

function getFeedbackButtons(mode) {
    let alignItems = "center";
    let justifyContent = "center";

    if (mode === 'mobile') {
        alignItems = "left";
        justifyContent = "left";
    }

    let splittedCurrPath = window.location.pathname.split("/");
    let happySelected = ["", splittedCurrPath[1], "img", "happySelected.png"].join("/");
    let sadSelected = ["", splittedCurrPath[1], "img", "sadSelected.png"].join("/");
    return `
        <div
            style="display: flex; flex: 1; flex-direction: column; align-items: `+ alignItems + `; justify-content: ` + justifyContent + `">
            <div
                style="display: flex;">
                <img
                    id="feedback-sad"
                    src="`+ sadSelected + `"
                    class="feedback-button-sad"
                    onClick="feedbackSelected(false)"/>

                <img
                    id="feedback-happy"
                    src="`+ happySelected + `"
                    class="feedback-button-happy"
                    onClick="feedbackSelected(true)"/>
            </div>
            <div
                style="font-size: 16px; color: #dddddd; margin-top: 10px">
                Was it helpful?
            </div>
        </div>
    `;
}

function addFeedbackButtons() {
    let prevNextContainer = document.getElementsByClassName("docs-prevnext")[0];
    if (prevNextContainer === null || prevNextContainer === undefined) {
        return;
    }
    if (window.screen.width <= 735) {
        // MOBILE
        let feedbackButton = getFeedbackButtons("mobile");
        prevNextContainer.innerHTML = `
            <div style="position: relative">
                `+ feedbackButton + `
                `+ prevNextContainer.innerHTML + `
            </div>
        `;
    } else {
        // WEB
        let feedbackButton = getFeedbackButtons("web");
        prevNextContainer.innerHTML = `
            <div style="position: relative">
                `+ prevNextContainer.innerHTML + `
                `+ feedbackButton + `
            </div>
        `;
    }
}

function addChat() {
    let code = `
    var $zoho = $zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
        widgetcode: "761a7a4dde9ad5fec41bd464091af58c274a6245df82c91814d08ccbeb1fe2bf4b288258e0dbf601553afd01b0e28e58",
        values: {},
        ready: function() {}
    };
    var d = document;
    s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "zsiqscript";
    s.defer = true;
    s.src = "https://salesiq.zoho.com/widget";
    t = d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
    `

    let zohodiv = document.createElement("div");
    zohodiv.id = "zsiqwidget";
    document.body.appendChild(zohodiv);

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.text = code;
    document.body.appendChild(script);
}

function sendWindowOriginToFrame(){
    let iframe = document.getElementById("st-timer-frame");
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: "supertokens-web-source",
            origin: window.location.origin,
            pageUrl: window.location.href,
            messageType: "handshake",
        }, "https://supertokens.io");
    }
}

function addIframe() {
    let iframe = document.createElement("iframe");
    iframe.id = "st-timer-frame";
    iframe.width = "0px";
    iframe.height = "0px";
    iframe.src = "https://supertokens.io/utils/iframe.html";
    iframe.style.borderWidth = "0px";
    iframe.onload = sendWindowOriginToFrame
    document.body.appendChild(iframe);
}

document.addEventListener("DOMContentLoaded", () => {
    function uncollapseInitial(node, title, currNav) {
        node.classList.remove("hide");
        currNav.children[0].innerHTML = title + '<span class="arrow rotate"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="#565656" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></span>';
    }

    function collapseInitial(node, title, currNav) {
        node.classList.add("hide");
        currNav.children[0].innerHTML = title + '<span class="arrow"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="#565656" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></span>'
    }

    function uncollapse(node, title, currNav) {
        node.classList.remove("hide");
        let arrow = currNav.children[0].children[0];
        arrow.classList.toggle("rotate");
    }

    function collapse(node, title, currNav) {
        node.classList.add("hide");
        let arrow = currNav.children[0].children[0];
        arrow.classList.toggle("rotate");
    }

    function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    let navGroupElements = document.getElementsByClassName("navGroup subNavGroup");

    let activeItem = document.getElementsByClassName("navListItemActive")[0];

    for (let i = 0; i < navGroupElements.length; i++) {
        let currNav = navGroupElements[i];
        const title = currNav.children[0].innerText;
        const content = navGroupElements[i].childNodes[1];
        currNav.children[0].classList.add("collapsible");

        currNav.childNodes[0].addEventListener("click", function () {
            if (!content.classList.contains("hide")) {
                collapse(content, title, currNav);
            } else {
                uncollapse(content, title, currNav);
            }
        });

        if (isDescendant(currNav, activeItem)) {
            uncollapseInitial(content, title, currNav);
        } else {
            collapseInitial(content, title, currNav);
        }

    }

    let superTokensPrevButtons = document.getElementsByClassName("docs-prev");
    let superTokensNextButtons = document.getElementsByClassName("docs-next");
    Array.from(superTokensPrevButtons).forEach(element => {
        element.children[1].innerHTML = "Previous";
    });

    Array.from(superTokensNextButtons).forEach(element => {
        element.children[0].innerHTML = "Next";
    });

    let superTokensLinks = document.getElementsByTagName("a");
    Array.from(superTokensLinks).forEach(element => {
        let url = element.href;
        let splittedUrl = url.split("/");
        let path = splittedUrl.filter((x, i) => i >= 3).join("/");
        let base = splittedUrl.filter((x, i) => i < 3).join("/");
        let currLocation = window.location.origin;
        let lastPath = splittedUrl[splittedUrl.length - 1];
        if (lastPath === "versions") {
            element.className = "header-version-text";
        }

        if (base === currLocation && splittedUrl.length === 5 && lastPath === "") {
            element.href = "https://supertokens.io";
            element.target = "_blank";
        }
    });

    let specialNotes = document.getElementsByClassName("specialNote");
    for (let i = 0; i < specialNotes.length; i++) {
        let text = " " + specialNotes[i].innerHTML.trim();
        let header = document.getElementsByClassName("fixedHeaderContainer")[0];
        let splittedCurrPath = window.location.pathname.split("/");
        let imgPath = ["", splittedCurrPath[1], "img", "star.png"].join("/");
        specialNotes[i].innerHTML = `
            <div style="border: 1px solid #6ab1fd; border-radius: 6px; width: 100%; padding: 20px; display: flex">
            <div style="margin-right: 20px;">
            <img src="` + imgPath + `" style="width: 15px"></img>
            </div>
            <div style="flex: 1"><span style="color: #6ab1fd">Note:</span>` + text + `</div></div>
        `;
    }

    let header = document.getElementsByClassName("fixedHeaderContainer")[0];
    let splittedCurrPath = window.location.pathname.split("/");
    let imgPath = ["", splittedCurrPath[1], "img", "githubFold.png"].join("/");
    header.innerHTML = `
    <div style="position: relative">
        ` + header.innerHTML + `
        <img 
            src="`+ imgPath + `"
            style="width: 50px; height: 50px; position: absolute; top: -8px; right: 0px; cursor: pointer"
            onClick="goToGithub()">
        </img>
    </div>
    `;
    addFeedbackButtons();

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-143540696-1');

    let body = document.getElementsByTagName("body")[0];
    addIframe();
    addChat();
    body.style.display = "block";
});

window.addEventListener("message", (e) => {
    if ( typeof e.data === "object" && e.data.source === "st-timer" ) {
        if ( e.data.userId !== undefined ) {
            userId = e.data.userId;
        }

        if ( e.data.sessionId !== undefined ) {
            sessionId = e.data.sessionId;
        }

        // if ( e.data.frameOrigin !== undefined ) {
        //     this.frameOrigin = e.data.frameOrigin;
        //     if ( this.shouldSendFrameMessageWhenOriginRecieved ) {
        //         this.sendWindowOriginToFrame();
        //     }
        // }
        // TODO: show popup here, if the user dismisses the popup fire the event below


        // let iframe = document.getElementById("st-timer-frame");
        // if ( iframe !== null ) {
        //     iframe.contentWindow.postMessage({
        //         updateTimer: true,
        //         source: "stokens",
        //     }, "http://0.0.0.0:8090");
        // }
    }
}, false);
