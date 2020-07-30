import React from 'react';
import logo from './logo.svg';
import './App.css';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFile } from "@fortawesome/free-regular-svg-icons";

const initialState =
  "# Welcome to my React Markdown Previewer!\r\n\r\nHere you can write GitHub Flavored Markdown, often shortened as GFM.\r\n\r\nIt\'s very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http:\/\/google.com)\r\n\r\nSometimes you want numbered lists:\r\n\r\n1. One\r\n2. Two\r\n3. Three\r\n\r\nSometimes you want bullet points:\r\n\r\n* Start a line with a star\r\n* Profit!\r\n\r\nAlternatively,\r\n\r\n- Dashes work just as well\r\n- And if you have sub points, put two spaces before the dash or star:\r\n  - Like this\r\n  - And this\r\n\r\nYou can also add some structure to you documents:\r\n\r\n# Structured documents\r\n\r\nSometimes it\'s useful to have different levels of headings to structure your documents. Start lines with a `#` to create headings. Multiple `##` in a row denote smaller heading sizes.\r\n\r\n### This is a third-tier heading\r\n\r\nYou can use one `#` all the way up to `######` six for different heading sizes.\r\n\r\nIf you\'d like to quote someone, use the > character before the line:\r\n\r\n> Coffee. The finest organic suspension ever devised... I beat the Borg with it.\r\n> - Captain Janeway\r\n\r\nWriting code:\r\n\r\nThere are many different ways to style code with GitHub\'s markdown. If you have inline code blocks, wrap them in backticks: `var example = true`.  If you\'ve got a longer block of code, you can indent with four spaces:\r\n\r\n    if (isAwesome){\r\n      return true\r\n    }\r\n\r\nGitHub also supports something called code fencing, which allows for multiple lines without indentation:\r\n\r\n```\r\nif (isAwesome){\r\n  return true\r\n}\r\n```\r\n\r\nAnd if you\'d like to use syntax highlighting, include the language:\r\n\r\n```javascript\r\nif (isAwesome){\r\n  return true\r\n}\r\n```"

const App = (props) => {
  // state contains a string that represents the input of the editor textarea.

const [state, setState] = React.useState(initialState);

  return (
    <div class="container-fluid">
      <div class="row justify-content-center">
        <Editor input={state} onInputChange={setState} />
        <Preview markdownText={state} />
      </div>
    </div>
  );
};

const Editor = (props) => {
  return (
    <div class="editor-container col-lg-6 col-md-7">
      <div class="top col-md-12">
        <FontAwesomeIcon icon={faEdit}/>
        <span class="text-center title">Editor</span>
      </div>
      <textarea
        class="col-md-12"
        id="editor"
        name="editor"
        rows="10"
        value={props.input}
        onChange={(e) => props.onInputChange(e.target.value)}
      ></textarea>
    </div>
  );
};

const Preview = (props) => {
  const dirtyHTML = marked(props.markdownText);
  const cleanHTML = DOMPurify.sanitize(dirtyHTML);

  return (
    <div class="preview-container col-lg-7 col-md-9">
      <div class="top col-md-12">
      <FontAwesomeIcon icon={faFile}/>
        <span class="text-center title">Preview</span>
      </div>
      <div
        class="col-md-12 previewer"
        id="preview"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      ></div>
    </div>
  );
};

export default App;
