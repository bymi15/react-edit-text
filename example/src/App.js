import React from 'react'

import EditText from 'react-edit-text'
import 'react-edit-text/dist/index.css'

import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import examples from './examples';

const App = () => {
  const handleTextChange = ({name, value}) => {
    alert(name + ' saved as: ' + value);
  }
  return (
    <React.Fragment>
      <Navbar/>
      <Jumbotron/>
      <div className="container">
        <h3>Basic Usage</h3>
        <ul>
          <li className="lead">Click on an <b>EditText</b> component to switch into <b>edit mode</b></li>
          <li className="lead">Click outside the textbox to trigger the <b>onSave</b> callback</li>
          <li className="lead">Hitting the <b>Enter</b> key will also do the same</li>
          <li className="lead">Hitting the <b>ESC</b> key will exit edit mode without triggering the <b>onSave</b> callback</li>
        </ul>
        <hr/>
        <div className="row">
          <div className="col-md-6">
          <h4>Example</h4>
          <SyntaxHighlighter language="javascript" showLineNumbers={true} style={okaidia}>
            {examples[0]}
          </SyntaxHighlighter>
          </div>
          <div className="col-md-6">
            <h4>Output</h4>
            <div className="card">
              <div className="card-body">
                <EditText name="textbox1" value="Click me to edit my text"/>
                <EditText name="textbox2" placeholder="I am a placeholder text"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <h3>Custom Styling</h3>
        <div className="row mt-3">
          <div className="col-md-6">
          <h4>Example</h4>
          <SyntaxHighlighter language="javascript" showLineNumbers={true} style={okaidia}>
            {examples[1]}
          </SyntaxHighlighter>
          </div>
          <div className="col-md-6">
            <h4>Output</h4>
            <div className="card">
              <div className="card-body">
                <EditText name="textbox1" style={{border: '1px solid #999'}} value="Click me to edit my text"/>
                <br/>
                <EditText name="textbox2" style={{padding: '10px', fontSize: '36px'}} value="Click me to edit my text"/>
                <br/>
                <EditText name="textbox3" style={{padding: '15px', fontSize: '24px', backgroundColor: "#EEE"}} value="Click me to edit my text"/>
                <br/>
                <EditText name="textbox3" style={{padding: '15px', fontSize: '24px', color: "#FFF", backgroundColor: "#000"}} value="Click me to edit my text"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <h3>Props</h3>
        <p className="lead">Here are some useful props that can be passed</p>
        <ul>
          <li><b>id</b> sets the id of the DOM element</li>
          <li><b>name</b> sets the name of the input element</li>
          <li><b>inline</b> (default: false) displays the input box as an inline component</li>
          <li><b>readonly</b> (default: false) displays only the view component and hides the input element</li>
          <li><b>type</b> (default: 'text') can be set to a DOM input text type (e.g. 'email', 'tel', etc.)</li>
          <li><b>style</b> sets the style of the DOM element</li>
          <li><b>placeholder</b> sets the placeholder of the component</li>
          <li><b>value</b> sets the value of the component</li>
        </ul>
        <div className="row mt-3">
          <div className="col-md-6">
          <h4>Example</h4>
          <SyntaxHighlighter language="javascript" showLineNumbers={true} style={okaidia}>
            {examples[2]}
          </SyntaxHighlighter>
          </div>
          <div className="col-md-6">
            <h4>Output</h4>
            <div className="card">
              <div className="card-body">
                <div style={{whiteSpace: 'nowrap'}}>
                  <strong><label className="mr-2">Full Name <small className="text-muted">(read-only)</small>: </label></strong>
                  <EditText id="fullName" name="fullName" value="James Smith" inline readonly/>
                </div>
                <div style={{whiteSpace: 'nowrap'}}>
                  <strong><label className="mr-2">Email Address: </label></strong>
                  <EditText name="age" type="email" style={{width: '200px'}} value="james.smith@domain.com" inline/>
                </div>
                <div style={{whiteSpace: 'nowrap'}}>
                  <strong><label className="mr-2">Score: </label></strong>
                  <EditText name="age" type="number" style={{width: '200px'}} value="25000" inline/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <h3>Callback Usage</h3>
        <p className="lead"><b>onSave</b> callback function triggers when the text input value is changed</p>
        <div className="row mt-3">
          <div className="col-md-6">
          <h4>Example</h4>
          <SyntaxHighlighter language="javascript" showLineNumbers={true} style={okaidia}>
            {examples[3]}
          </SyntaxHighlighter>
          </div>
          <div className="col-md-6">
            <h4>Output</h4>
            <div className="card">
              <div className="card-body">
                  <EditText name="textbox1" style={{fontSize: '20px'}} onSave={handleTextChange} placeholder="Click to edit textbox1"/>
                  <br/>
                  <EditText name="textbox2" style={{fontSize: '20px'}} onSave={handleTextChange} placeholder="Click to edit textbox2"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App
