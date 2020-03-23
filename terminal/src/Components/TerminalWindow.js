import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

import { Greeting } from "./Responses";

const glowAnimation = keyframes`
    from {
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.404),
        0 0 3px rgba(255, 255, 255, 0.404), 0 0 5px #46ff435d;
    }
    to {
      text-shadow: 0 0 2px rgba(255, 255, 255, 0.404), 0 0 4px #a0eba7,
        0 0 3px #a0eba7;
    }`;

const TerminalScreen = styled.div`
  overflow-y: scroll;
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
    font-weight: bold;
    color: #46ff43;
    -webkit-animation: ${glowAnimation} 3s ease-in-out infinite alternate;
    -moz-animation: ${glowAnimation} 3s ease-in-out infinite alternate;
    animation: ${glowAnimation} 3s ease-in-out infinite alternate;
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
      chatHistory: [<Greeting test={this.callbackTest} />],
      currentText: ""
    };
  }

  //   this is how I can pass props back up with element clicks
  callbackTest = e => {
    e.preventDefault();
    console.log(e.target.dataset.link);
  };

  handleTextInput = e => {
    this.setState({
      currentText: e.target.value
    });
  };

  onEnterHandler = e => {
    if (e.key === "Enter" && this.state.currentText !== "") {
      //   wrap the text in a p tag
      let formattedText = <p>{this.state.currentText}</p>;

      this.setState({
        chatHistory: this.state.chatHistory.concat(formattedText),
        currentText: ""
      });
      e.target.value = "";
    }
  };

  render() {
    return (
      <div>
        <TerminalScreen>
          {this.state.chatHistory.map(el => {
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
