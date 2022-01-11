function addButton() {
    var npSA = document.createElement("button");
    npSA.classList.add("rmq-e0984127");
    npSA.innerText = '👀Laat antwoorden zien👀';
    npSA.style = "position: relative; margin: 10px 0px; padding: 0px 0px 0px 0px; height: 50px; min-width: 145px; font-family: inherit; font-size: 18px; font-weight: 600; line-height: 21px; border: 0px; border-radius: 100px; box-sizing: border-box; cursor: pointer; transition: background-color 0.5s ease 0s; overflow: hidden; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); color: rgb(0, 59, 94); background-color: rgb(255, 186, 0); box-shadow: rgb(204, 149, 0) 0px -2px 0px 0px inset;";
    npSA.setAttribute("onclick", "AutoShowAnswers();");

    // var buttonEl = document.createElement("a");
    // buttonEl.href = "https://test.com/";
    // var buttonTextEl = document.createElement("span");
    // buttonTextEl.className = "picon-p-add-news";
    // buttonTextEl.innerText = "Read more news";
    // buttonEl.appendChild(buttonTextEl);
    setTimeout(function () {
        console.log("Waited 2s before adding the button!");
        document.querySelector("#scroll-view > div > div > div > section > div").appendChild(npSA);
    }, 2000);
    //document.getElementsByClassName("rmq-b8900ffb")
}

addButton();