// Data store
state = {
  history: { index: 0, scrollSession: false },
  consoleHistory: []
};

// Responses
responses = {
  demoResponse: "This is a demo response"
};

// Reusable Functions
const addToConsole = (output, html = false) => {
  if (html) {
  } else {
    document
      .getElementById("TerminalInput")
      .insertAdjacentHTML(
        "beforebegin",
        `<p class='consoleLine'>${output}</p>`
      );
  }
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
    case "demo response":
      addToConsole("worked");
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
