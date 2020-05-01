import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

import "../crtStyling.css";

import Responses from "./Responses";

const TerminalScreen = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  border: 1px solid black;
  background-color: #2b1066;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  * {
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.8rem;
    font-weight: bold;
    color: #46ff43;
  }
  li {
    word-break: break-word;
  }
  p {
    margin: 0;
  }
`;

const TerminalInput = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  input {
    width: 100%;
    background-color: #2b1066;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.295);
  }
`;

export default class TerminalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [
        <Responses passLinkUp={this.passLinkUp} response="greeting" />,
      ],
      currentText: "",
      machine: "anonMachine",
    };
  }

  // get computer os and info on load for bash prompts
  componentDidMount() {
    if (navigator.platform) {
      this.setState({ machine: navigator.platform });
    }
  }

  //   this is how I can pass props back up with element clicks
  passLinkUp = (e) => {
    e.preventDefault();
    let clickedText = e.target.innerText;
    this.setState({
      chatHistory: (this.state.currentText += clickedText),
    });
    this.wrapAndLogText();
  };

  handleTextInput = (e) => {
    this.setState({
      currentText: e.target.value,
    });
  };

  onEnterHandler = (e) => {
    if (e.key === "Enter" && this.state.currentText !== "") {
      this.wrapAndLogText();
      const newHistory = this.state.chatHistory.concat(
        <Responses
          passLinkUp={this.passLinkUp}
          response={this.state.currentText}
        />
      );
      this.setState({
        chatHistory: newHistory,
      });
      e.target.value = "";
    }
  };

  wrapAndLogText = () => {
    //   wrap the text in a p tag
    let formattedText = (
      <p>
        {this.state.machine}:~ {this.state.currentText}
      </p>
    );

    this.setState({
      chatHistory: this.state.chatHistory.concat(formattedText),
      currentText: "",
    });
  };

  render() {
    return (
      <div className="crt">
        <TerminalScreen>
          {this.state.chatHistory.map((el) => {
            return el;
          })}
          <TerminalInput>
            <input
              onKeyPress={this.onEnterHandler}
              onChange={this.handleTextInput}
              type="text"
            />
          </TerminalInput>
        </TerminalScreen>
      </div>
    );
  }
}
