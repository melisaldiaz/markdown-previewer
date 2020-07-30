import React from 'react';
import logo from './logo.svg';
import './App.css';
import marked from 'marked';
import DOMPurify from 'dompurify';

const initialState =
  "# Welcome to my React Markdown Previewer!\r\n\r\n## This is a sub-heading...\r\n### And here's some other cool stuff:\r\n  \r\nHeres some code, `<div></div>`, between 2 backticks.\r\n\r\n```\r\n// this is multi-line code:\r\n\r\nfunction anotherExample(firstLine, lastLine) {\r\n  if (firstLine == '```' && lastLine == '```') {\r\n    return multiLineCode;\r\n  }\r\n}\r\n```\r\n  \r\nYou can also make text **bold**... whoa!\r\nOr _italic_.\r\nOr... wait for it... **_both!_**\r\nAnd feel free to go crazy ~~crossing stuff out~~.\r\n\r\nThere's also [links](https://www.freecodecamp.com), and\r\n> Block Quotes!\r\n\r\nAnd if you want to get really crazy, even tables:\r\n\r\nWild Header | Crazy Header | Another Header?\r\n------------ | ------------- | ------------- \r\nYour content can | be here, and it | can be here....\r\nAnd here. | Okay. | I think we get it.\r\n\r\n- And of course there are lists.\r\n  - Some are bulleted.\r\n     - With different indentation levels.\r\n        - That look like this.\r\n\r\n\r\n1. And there are numbererd lists too.\r\n1. Use just 1s if you want! \r\n1. But the list goes on...\r\n- Even if you use dashes or asterisks.\r\n* And last but not least, let's not forget embedded images:\r\n\r\n![React Logo w/ Text](https://goo.gl/Umyytc)\r\n";

const App = (props) => {
  // state contains a string that represents the input of the editor textarea.
  const [state, setState] = React.useState(initialState);

  return (
    <div class="row justify-content-center">
      <Editor input={state} onInputChange={setState} />
      <Preview markdownText={state} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <div class="editor-container col-lg-6 col-md-7">
      <div class="top col-md-12">
        <i class="fas fa-pencil-alt"></i>
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
        <i class="far fa-file"></i>
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
