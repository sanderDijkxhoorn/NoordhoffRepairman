console.log("Script added! " + window.location.hostname + " (slave_reactapp)");

async function XMLPARGE(url) {
  const response = await fetch_original(url);
  const text = await response.text();
  const parsed = await new window.DOMParser().parseFromString(text, "text/xml");
  return parsed;
}

async function FetchAnswerSEQ(answerditaurl) {
  console.log("Fetching Sequencing answer('s)");

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const btns = xmlparsed.querySelectorAll("lcAnswerContent2 p");
  const btnsArr = Array.from(btns);
  let acount = 0;

  btnsArr.forEach((el) => {
    acount++;
    console.log("FetchAnswerSEQ: " + acount + ": " + el.textContent);
    // console.log("FetchAnswerSEQ: " + el.textContent + " From: " + answerditaurl.url)
  });
  // console.log("Done, FetchAnswerSEQ.");
}

async function FetchAnswerOV(answerditaurl) {
  console.log("Fetching Open vraag answer('s)");

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const btns = xmlparsed.querySelectorAll("lcOpenAnswer2 p");
  const btnsArr = Array.from(btns);

  btnsArr.forEach((el) => {
    if (el.textContent !== "") {
      console.log("FetchAnswerOV: " + el.textContent);
      // console.log("FetchAnswerOV: " + el.textContent + " From: " + answerditaurl.url)
    }
  });

  // console.log("Done, FetchAnswerOV.");
}

async function FetchAnswerIC(answerditaurl) {
  console.log("Fetching Inline choice answer('s)");

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const tcorrectresponse = xmlparsed.querySelectorAll("lcCorrectResponse2");
  const choises = Array.from(tcorrectresponse);
  let tcount = 0;

  for (const el of choises) {
    tcount++;
    console.log(
      "Vraag: " +
        tcount +
        ": " +
        el.parentElement.querySelector("lceAnswerContentInline").textContent
    );
  }
}

async function FetchAnswerMATCH(answerditaurl) {
  console.log("Fetching Matching answer('s)");

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const tcorrectresponse = xmlparsed.querySelectorAll("lcMatchingPair2");
  const choises = Array.from(tcorrectresponse);

  /* var combicountr = 0;

    var combicountr2 = 0;

    var arranswrs = [];

    choises.forEach( el => {
        combicountr++;
        arranswrs.push(firstpartanswer);

        dragDrop.initElement('test');

        console.log(`FetchAnswerMATCH: combi #${combicountr}: ${el.querySelector("lcItem2 p").textContent} = ${el.querySelector("lcMatchingItem2  p").textContent}`)
    })

    var btns2 = document.querySelectorAll("lceinlineinteractiontext p span span input");

    var btnsArr2 = Array.from(btns2);

    btnsArr2.forEach(el => {
        el.focus();
        el.value = arranswrs[combicountr2];
        el.select();
        combicountr2++;
    }) */
  let questnr = 0;

  choises.forEach((el) => {
    questnr++;
    console.log(
      `FetchAnswerMATCH: combi #${questnr}: ${
        el.querySelector("lcItem2 p").textContent
      } = ${el.querySelector("lcMatchingItem2  p").textContent}`
    );
  });

  // console.log("Deze functie is nog niet toegevoegd. (FetchAnswerMATCH) url:", answerditaurl.url);
}

async function FetchAnswerSC(answerditaurl) {
  console.log("Fetching Single choice answer('s)");

  // console.log(answerditaurl.url)

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const tcorrectresponse = xmlparsed.querySelectorAll("lcCorrectResponse2");
  const choises = Array.from(tcorrectresponse);

  for (const el of choises) {
    // console.log(el.parentElement)
    console.log(
      "FetchAnswerSC: " +
        el.parentElement.querySelector("lcAnswerContent2 p").textContent
    );
  }

  // console.log("Deze functie is nog niet compleet getest. (FetchAnswerSC)");
}

async function FetchAnswerMultiMATCH(answerditaurl) {
  console.log("Fetching Multi choice answer('s)");

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const choises = Object.fromEntries(
    Array.from(xmlparsed.querySelectorAll("lceAssociableMatch")).map((el) => [
      el.getAttribute("id"),
      el.firstElementChild.textContent,
    ])
  );
  const statements = Object.fromEntries(
    Array.from(xmlparsed.querySelectorAll("lceAssociableItem")).map((el) => [
      el.getAttribute("id"),
      el.firstElementChild.textContent,
    ])
  );
  const answers = Array.from(xmlparsed.querySelectorAll("lceMatchPair")).map(
    (el) =>
      statements[el.children[0].getAttribute("href").split("/")[1]] +
      " = " +
      choises[el.children[1].getAttribute("href").split("/")[1]]
  );

  answers.forEach((answer) => console.log(answer));
}

async function FetchAnswerTE(answerditaurl) {
  console.log("Fetching Text entry answer('s)");

  const xmlparsed = await XMLPARGE(answerditaurl.url);
  const btns = xmlparsed.querySelectorAll("lceTextEntryOptions");
  const btnsArr = Array.from(btns);
  let firstpartanswer;
  let elcount = 0;
  const arranswrs = [];

  btnsArr.forEach((el) => {
    firstpartanswer = el.querySelector("lceAnswerOptionInline")
      .firstElementChild.textContent;
    arranswrs.push(firstpartanswer);
    console.log("FetchAnswerTE: " + firstpartanswer);
    // console.log("FetchAnswerTE: " + firstpartanswer + "From: " + answerditaurl.url);
  });

  const btns2 = document.querySelectorAll("span span input");
  const btnsArr2 = Array.from(btns2);

  // console.log(btns2)

  btnsArr2.forEach((el) => {
    el.focus();
    el.value = arranswrs[elcount];
    el.select();
    elcount++;
  });

  // console.log("Done, FetchAnswerTE.");
}

function reactapp_npEnableFetchHook(enabled) {
  if (enabled) {
    window.fetch_original = window.fetch_original ?? window.fetch;

    window.fetch = (...args) => {
      const result = window.fetch_original(...args);
      return result.then((r) => {
        setTimeout(function () {
          console.log("Waited 2s for questions to load.");
          if (r.url.includes("Inline%20choice") && r.url.endsWith(".dita")) {
            // console.log("Found 'Inline choice.dita'!");
            FetchAnswerIC(r);
          } else if (
            r.url.includes("Text%20entry") &&
            r.url.endsWith(".dita")
          ) {
            // console.log("Found 'Text entry.dita'!");
            FetchAnswerTE(r);
          } else if (r.url.includes("Sequencing") && r.url.endsWith(".dita")) {
            // console.log("Found 'Text entry.dita'!");
            FetchAnswerSEQ(r);
          } else if (r.url.endsWith("Matching.dita")) {
            // console.log("Found 'Matching.dita'!");
            FetchAnswerMATCH(r);
          } else if (
            r.url.includes("Open%20vraag") ||
            (r.url.includes("Open%20question") && r.url.endsWith(".dita"))
          ) {
            // console.log("Found 'Open vraag.dita'");
            FetchAnswerOV(r);
          } else if (
            r.url.includes("Multiple%20match") &&
            r.url.endsWith(".dita")
          ) {
            // console.log("Found 'Multiple match.dita'");
            FetchAnswerMultiMATCH(r);
          } else if (
            r.url.includes("Single%20choice") &&
            r.url.endsWith(".dita")
          ) {
            // console.log("Found 'Single choice.dita'");
            FetchAnswerSC(r);
          } else if (
            r.url.endsWith(".dita") &&
            !r.url.endsWith("Tekstbron.dita") &&
            !r.url.endsWith("Theorie.dita") &&
            !r.url.endsWith("Animatie.dita")
          ) {
            console.log("Nieuwe soort opdracht?!?! " + r.url);
          }
          // console.log(r);
        }, 2000);
        return r;
      });
    };
  } else {
    window.fetch = window.fetch_original ?? window.fetch;
  }
}

function reactapp_npShowAnswers(/* currentPage */) {
  // console.log(currentPage)
  // console.log("Showing answers");
}

function reactapp_npOnHashChange(/* hashChangeEvent */) {
  // console.log(hashChangeEvent);

  const regexUuid =
    "[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}";
  const regexUrl = new RegExp(
    `^#\/plp\/book\/(?<book>${regexUuid})\/chapter\/(?<chapter>${regexUuid})\/paragraph\/(?<paragraph>${regexUuid})\/lesson\/(?<lesson>${regexUuid})`
  );
  const matched = window.location.hash.match(regexUrl);

  reactapp_npEnableFetchHook(matched);

  if (matched) {
    reactapp_npShowAnswers(matched);
  }
}

window.addEventListener("hashchange", reactapp_npOnHashChange, false);

window.location.hash = window.location.hash + "/"; // Force a hashchange event
