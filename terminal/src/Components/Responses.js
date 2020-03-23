import React from "react";

// ASCII Art to preserve formatting
const hello = `
 _   _      _ _       
| | | |    | | |      
| |_| | ___| | | ___  
|  _  |/ _ | | |/ _ \\ 
| | | |  __| | | (_)|
\\_| |_/\\___|_|_|\\___/ 
`;

function Greeting() {
  return (
    <div>
      <pre>{hello}</pre>
      Welcome to the portfolio site of Josh Simmons. The menu options may have
      changed so please take a look and enter (or click/tap) the option you'd
      like to view. Please enable sound for a more immersive experience.
      <ol>
        <li>
          <a href="#">item 1</a>
        </li>
        <li>
          <a href="#">another item</a>
        </li>
        <li>
          <a href="#">a third item</a>
        </li>
        <li>
          <a href="#">About Portfolio Site</a>
        </li>
      </ol>
    </div>
  );
}

export { Greeting };
