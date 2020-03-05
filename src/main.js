import responses from "./data/cannedResponses.js";

var markdownConverter = new showdown.Converter();

// Data store
let state = {
  history: { index: 0, scrollSession: false },
  consoleHistory: [],
  currentResponse: ""
};

// Reusable Functions
// paste a message on the terminal, if html set true, just use that code, otherwise use a p tag
const addToConsole = (output, markdown = false) => {
  if (markdown) {
    document
      .getElementById("TerminalInput")
      .insertAdjacentHTML("beforebegin", markdownConverter.makeHtml(output));
  } else {
    document
      .getElementById("TerminalInput")
      .insertAdjacentHTML(
        "beforebegin",
        `<p class='consoleLine'>${output}</p>`
      );
  }

  state.currentResponse = "";
};

// Handlers
const enterHandler = () => {
  // reset history index
  state.history.index = 0;
  state.history.scrollSession = false;

  //   Store input and clear box
  let input = document.getElementById("TerminalTextInput").value;
  document.getElementById("TerminalTextInput").value = "";
  state.consoleHistory.unshift(input);

  //   Put input into the window
  addToConsole(input);

  // Check if it should trigger anything
  switch (input) {
    case "bloop":
      addToConsole(responses.ding);
      state.currentResponse = "ding";
      break;
    case "header":
      addToConsole(responses.lineReturn, true);
      break;
    default:
      break;
  }
};

const handleArrowScroll = val => {
  console.log(state.history.scrollSession);
  if (state.history.scrollSession == false) {
    state.history.index = 0;
    state.history.scrollSession = true;
  } else {
    state.history.index = state.history.index + val;
  }
  console.log(state.history.index);
  document.getElementById("TerminalTextInput").value =
    state.consoleHistory[state.history.index];
};

// Event Listeners
document.addEventListener("keydown", e => {
  if (e.key == "Enter") {
    enterHandler();
  }
  if (e.key == "ArrowUp") {
    if (state.history.index == state.consoleHistory.length - 1) {
      handleArrowScroll(0);
    } else {
      handleArrowScroll(1);
    }
  }
  if (e.key == "ArrowDown") {
    if (state.history.index == 0) {
      handleArrowScroll(0);
    } else {
      handleArrowScroll(-1);
    }
  }
});

// This fires on doc ready (script is loader after doc)
addToConsole(responses.intro, true);
