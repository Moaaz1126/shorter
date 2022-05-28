let JsDate = ""
let inputVal = ""
let fail = false;
function GetUrls() {
    let input = document.querySelector("input").value;
    inputVal = input    
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", `https://api.shrtco.de/v2/shorten?url=${input}`);
    myRequest.send();
    myRequest.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 201 || this.readyState === 4 && this.status === 200) { 
            JsDate = JSON.parse(this.responseText);
            fail = false
        }
        if(this.readyState === 4 && this.status === 404 || this.readyState === 4 && this.status === 400) { 
            fail = true
        }
    }
}
function AddToLast() {
    $("#last").text(" ")
    $("#last").append(`<div><p>${inputVal}</p> <span class="span">${JsDate.result.short_link}</span> <button onclick="copy(0)">Copy</button><div>`);
    $("#last").append(`<div><p>${inputVal}</p> <span class="span">${JsDate.result.short_link2}</span> <button onclick="copy(1)">Copy</button><div>`);
    $("#last").append(`<div><p>${inputVal}</p> <span class="span">${JsDate.result.short_link3}</span> <button onclick="copy(2)">Copy</button><div>`);
}
function click2() {
    let input = document.querySelector("input");
    GetUrls();
    setTimeout(function () {
        if(fail == true) {
            input.style.border = "2px solid red"
            $("#last").text("")
        } else {
            input.style.border = "none"
            GetUrls();
            AddToLast()
        }
    }, 500)
}
function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
}
function copy(num) {
    let span = document.querySelectorAll(".span");
    copyToClipboard(`http://${span[num].textContent}`)
    alert(`copyed(${span[num].textContent})`)
}
