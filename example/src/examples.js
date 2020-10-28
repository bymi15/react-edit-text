export default [
`import React from 'react'
import EditText from 'react-edit-text'
const App = () => {
    return (
        <React.Fragment>
            <EditText
            name="textbox1"
            value="Click me to edit my text"
            />
            <EditText
            name="textbox2"
            placeholder="I am a placeholder text"
            />
        </React.Fragment>
    );
}`,
`import React from 'react'
import EditText from 'react-edit-text'
const App = () => {
    return (
        <React.Fragment>
            <EditText
            name="textbox1"
            style={{border: '1px solid #999'}}
            value="Click me to edit my text"
            />
            <br/>
            <EditText
            name="textbox2"
            style={{padding: '10px', fontSize: '36px'}}
            value="Click me to edit my text"
            />
            <br/>
            <EditText
            name="textbox3"
            style={{padding: '15px', fontSize: '24px', backgroundColor: "#EEE"}}
            value="Click me to edit my text"
            />
            <br/>
            <EditText
            name="textbox3"
            style={{padding: '15px', fontSize: '24px', color: "#FFF", backgroundColor: "#000"}}
            value="Click me to edit my text"
            />
        </React.Fragment>
    );
}`,
`import React from 'react'
import EditText from 'react-edit-text'
const App = () => {
    return (
        <React.Fragment>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Full Name <small>(read-only)</small>: </label></strong>
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
        </React.Fragment>
    );
}`,
`import React from 'react'
import EditText from 'react-edit-text'
const App = () => {
    const handleTextChange = ({name, value}) => {
        alert(name + ' saved as: ' + value);
    }
    return (
        <React.Fragment>
            <div style={{whiteSpace: 'nowrap'}}>
                <strong><label>Full Name: </label></strong>
                <EditText name="fullName" style={{width: '200px'}} onSave={handleTextChange} value="James Smith" inline/>
            </div>
            <div style={{whiteSpace: 'nowrap'}}>
            <strong><label>Age: </label></strong>
                <EditText name="age" type="number" style={{width: '200px'}} onSave={handleTextChange} value="25" inline/>
            </div>
        </React.Fragment>
    );
}`
];
