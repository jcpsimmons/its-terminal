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
          <p>~~~~~~~~~~~~~~~~~~~</p>
          <p>Josh Simmons Resume</p>
          <p>~~~~~~~~~~~~~~~~~~~</p>
          <br />
          <p>Employment</p>
          <ul>
            <li>
              Front End Developer
              <ul>
                <li>Living Spaces Furniture</li>
                <li>May 2019 - Present</li>
              </ul>
            </li>
            <li>
              Web Developer
              <ul>
                <li>University of California Irvine</li>
                <li>August 2015 - Spring 2019</li>
              </ul>
            </li>
            <li>
              C# Developer
              <ul>
                <li>Headbang VR</li>
                <li>May 2017 - May 2018</li>
              </ul>
            </li>
          </ul>
          <p>-------------------</p>
          <br />
          <p>Education</p>
          <p>-------------------</p>
          <br />
          <p>Education</p>
          <p>-------------------</p>
          <br />
          <p>Education</p>
          <p>-------------------</p>
          <br />
          <p>Education</p>
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
      console.log("this.props.response", this.props.response);
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
