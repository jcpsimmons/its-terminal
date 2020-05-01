import React, { Component } from "react";

// ASCII Art to preserve formatting
const hello = `
 _   _      _ _       
| | | |    | | |      
| |_| | ___| | | ___  
|  _  |/ _ | | |/ _ \\ 
| | | |  __| | | (_)|
\\_| |_/\\___|_|_|\\___/ 
`;

export default class Responses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // just use a try catch sort of like a switch with this - don't forget to display an error message and pass some info back up to parent component on err
    // have something for sudo --- this is the easter egg
    const responseObject = {
      greeting: (
        <div>
          <pre>{hello}</pre>
          Welcome to the portfolio site of Josh Simmons. The menu options may
          have changed so please take a look and enter (or click/tap) the option
          you'd like to view. Please enable sound for a more immersive
          experience.
          <br />
          <br />
          Under no circumstances should you try to escalate your privileges to
          superuser on this machine ;)
          <ol>
            <li>
              <a onClick={this.props.passLinkUp} href="#">
                nano ~./Documents/resume.md
              </a>
            </li>
            <li>
              <a onClick={this.props.passLinkUp} href="#">
                lynx ~./web_projects.html
              </a>
            </li>
            <li>
              <a onClick={this.props.passLinkUp} href="#">
                man website
              </a>
            </li>
            <li>
              <a onClick={this.props.passLinkUp} href="#">
                man josh
              </a>
            </li>
          </ol>
        </div>
      ),
      resume: (
        <div>
          <p>This is wher the resume will go</p>
        </div>
      ),
      error: (
        <div>
          <p>No such command</p>
        </div>
      ),
    };

    let responseKey = this.props.response;
    // translation case in case props doesn't directly match an object key
    if (Object.keys(responseObject).indexOf(this.props.response) == -1) {
      console.log("eval res obj");
      switch (this.props.response) {
        case "nano ~./Documents/resume.md":
        case "1":
          responseKey = "resume";
          break;
        default:
          console.log("default case");
          responseKey = "error";
      }
    }
    return <div>{responseObject[responseKey]}</div>;
  }
}
