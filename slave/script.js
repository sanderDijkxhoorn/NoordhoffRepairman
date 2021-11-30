// alert('script' + window.name);
log("Script added! " + window.location.hostname);

function npShowAnswers() {
  const EX_SINGLECHOICE = 1;
  const EX_MULTIPLECHOICE = 2;
  const EX_TEXTENTRY = 3;
  const EX_DRAGNDROP = 4;
  const EX_DRAGNSORT = 5;
  const EX_DRAGNSTACK = 6;
  const EX_DRAGCONTAINER = 7;
  const EX_TRUEORFALSE = 8;
  const EX_TEXTENTRYDROPLIST = 9;
  const EX_CONNECTION = 10;
  const EX_SHAPECLICK = 11;
  const EX_PAIRS = 12;
  const EX_SIMPLE = 13;
  const EX_SMARTASSET = 14;
  const EX_DRAGNDROPSTACKSENTENCE = 15;

  const exercise = tempExContainer[0];
  const cab = exercise.config.correctAnswerBehaviour;
  exercise.config.correctAnswerBehaviour = "SHOW_NO_GRAPHIC_TIPPS";
  exercise.showCorrectAnswer();
  exercise.config.correctAnswerBehaviour = cab;

  let index;

  log("exercise.type = " + exercise.type);

  switch (exercise.type) {
    case EX_SINGLECHOICE: // 1
      log("1");
      break;
    case EX_DRAGCONTAINER: // 7
      log("7");
      break;
    default:
      log("default");
      log("test");
      for (index in exercise.items) {
        const targetText = exercise.items[index].targetText;
        exercise.items[index].correct = true;
        exercise.items[index].selected =
          targetText.indexOf("|") !== -1
            ? targetText.split("|")[0]
            : targetText;
        exercise.items[index].processed = true;
      }
      /*
            try{
                for (index in exercise.items) {
                    exercise.items[index].correct = true;
                    exercise.items[index].selected = exercise.items[index].targetText.split("|")[0];
                    exercise.items[index].processed = true;
                }
                log("case: text");
            }catch(err){
                for (index in exercise.items) {
                    exercise.items[index].correct = true;
                    exercise.items[index].selected = exercise.items[index].targetText;
                    exercise.items[index].processed = true;
                }
                log("case: choice");
            } */
      break;
  }

  /*
    switch(exercise.type){
        case EX_SINGLECHOICE:
        case EX_MULTIPLECHOICE:
        case EX_DRAGNDROP:
        case EX_TRUEORFALSE:
        case EX_PAIRS:
            log("case: EX_MULTIPLECHOICE");
            for (index in exercise.items) {
                exercise.items[index].correct = true;
                exercise.items[index].selected = exercise.items[index].targetText;
                exercise.items[index].processed = true;
            }
            break;
        default:
            try{
                log("case: text");
                for (index in exercise.items) {
                    exercise.items[index].correct = true;
                    exercise.items[index].selected = exercise.items[index].targetText.split("|")[0];
                    exercise.items[index].processed = true;
                }
            }catch(err){
                log("case: choice");
                for (index in exercise.items) {
                    exercise.items[index].correct = true;
                    exercise.items[index].selected = exercise.items[index].targetText;
                    exercise.items[index].processed = true;
                }
            }

            break;
    } */

  // switch(exercise.type){
  //    case EX_TEXTENTRYDROPLIST:
  //        break;
  // }

  exercise.updateOkBtn();
}

function log(m) {
  console.log("Slave: " + m);
}
