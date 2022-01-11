console.log("Injecting... (slave_reactapp)");

chrome.storage.sync.get({
    slider_alles: true,
    slider_knop: false,
    slider_auto: true,
  },
  function (items) {
    if (!items.slider_alles) {
      console.log("Nevermind, slider_alles is disabled");
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    if (items.slider_knop) {
      script.src = chrome.extension.getURL("slave_reactapp/button.js");
      script.setAttribute("slider-button", items.slider_knop);
      script.setAttribute("slider-auto", items.slider_auto);
      document.head.appendChild(script);
    } else {
      if (items.slider_auto) {
        script.src = chrome.extension.getURL("slave_reactapp/script.js");
        script.setAttribute("slider-button", items.slider_knop);
        script.setAttribute("slider-auto", items.slider_auto);
        document.head.appendChild(script);
      }
    }
  }
);