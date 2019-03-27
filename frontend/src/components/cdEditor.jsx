import React, { Component, Fragment } from "react";
import AceEditor from "react-ace";
import "brace/mode/jsx";
import "brace/ext/language_tools";
import "brace/ext/searchbox";
import { Columns, Column } from "react-flex-columns";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  FormControlLabel,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Switch
} from "@material-ui/core/";
import axios from "axios";

const languages = [
  "python",
  "c_cpp",
  "sh",
  "r",
  "html",
  "javascript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
  "gob"
];

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
  require(`brace/theme/${theme}`);
});

const defaultValue = `# Write your code here`;

class cdEditor extends Component {
  onLoad() {
    console.log("i've loaded");
  }

  onSelectionChange(newValue, event) {
    console.log("select-change", newValue);
    console.log("select-change-event", event);
  }

  onCursorChange(newValue, event) {
    console.log("cursor-change", newValue);
    console.log("cursor-change-event", event);
  }

  onValidate(annotations) {
    console.log("onValidate", annotations);
  }

  setMode(e) {
    this.setState({
      mode: e.target.value
    });
  }

  setBoolean(name, value) {
    this.setState({
      [name]: value
    });
  }

  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10)
    });
  }

  //
  // ---------------------------------------
  // Apearance Dialog box functions
  // ---------------------------------------
  //

  handleChangeAppearance = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpenAppearance = () => {
    this.setState({ openappearance: true });
  };

  handleCloseAppearance = () => {
    this.setState({ openappearance: false });
  };

  // End - Dialog box functions

  //
  // ---------------------------------------
  // Program specs Dialog box functions
  // ---------------------------------------
  //

  handleChangeProgram = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpenProgram = () => {
    this.setState({ openprogram: true });
  };

  handleCloseProgram = () => {
    this.setState({ openprogram: false });
  };

  // End - Dialog box functions

  //
  // ---------------------------------------
  // Program parameter functions
  // ---------------------------------------
  //

  setTheme(e) {
    this.setState({
      theme: e.target.value
    });
  }

  setTitle = title => event => {
    this.setState({
      [title]: event.target.value
    });
  };

  setDescription = description => event => {
    this.setState({
      [description]: event.target.value
    });
  };

  onChange(newValue) {
    console.log("change", newValue);
    this.setState({
      value: newValue
    });
  }

  setCommandLineArgs = commandLineArgs => event => {
    this.setState({
      [commandLineArgs]: event.target.value
    });
  };

  // ---------------------------------------
  // End - Program parameter functions
  // ---------------------------------------

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      openappearance: false,
      openprogram: false,
      theme: "monokai",
      mode: "python",
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: true,
      showLineNumbers: true,
      programList: []
    };
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/program/")
      .then(res => this.setState({ programList: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete = item => {
    axios
      .delete(`http://127.0.0.1:8000/api/program/${item.id}/`)
      .then(res => this.refreshList());
  };

  editItem = item => {
    this.setState({ value: item.code, title: item.title, mode: item.language, description: item.description, openprogram: !this.state.openprogram });
  };

  renderPrograms = () => {

    return this.state.programList.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span title={item.description}>
          {item.title}
        </span>
        <span>
          <Button
            onClick={() => this.submitCode(item)}
            color="primary"
          >
            {" "}
            Save{" "}
          </Button>

          <Button
            onClick={() => this.editItem(item)}
            color="primary"
          >
            {" "}
            Edit{" "}
          </Button>
          <Button
            onClick={() => this.handleDelete(item)}
            color="secondary"
          >
            Delete
          </Button>
        </span>
      </li>
    ));
  };

  submitCode = code => {
    const data = {
      language: this.state.mode,
      title: this.state.title,
      description: this.state.description,
      code: this.state.value,
      commandLineArgs: this.state.commandLineArgs
    };
    if (code.id) {
      axios
        .put(`http://localhost:8000/api/program/${code.id}/`, data)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/program/", data)
      .then(res => { this.refreshList() })
      .catch(err => {
        console.log(err);
      });
   
  };

  render() {
    return (
      <Fragment>

        <div>
          {this.renderPrograms()}
        </div>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={this.handleClickOpenAppearance}
        >
          Appearance
          </Button>

        <Dialog
          maxWidth="xs"
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.openappearance}
          onClose={this.handleCloseAppearance}
        >
          <DialogTitle>Change Editor Appearance</DialogTitle>
          <DialogContent>
            <form >
              <div>
                <p>Theme</p>
                <FormControl>
                  <Select onChange={this.setTheme} value={this.state.theme}>
                    <MenuItem value={"terminal"}>Terminal</MenuItem>
                    <MenuItem value={"monokai"}>Monokai</MenuItem>
                    <MenuItem value={"github"}>GitHub</MenuItem>
                    <MenuItem value={"tomorrow"}>Tomorrow</MenuItem>
                    <MenuItem value={"kuroir"}>Kuroir</MenuItem>
                    <MenuItem value={"twilight"}>Twilight</MenuItem>
                    <MenuItem value={"xcode"}>Xcode</MenuItem>
                    <MenuItem value={"textmate"}>Textmate</MenuItem>
                    <MenuItem value={"solarized_dark"}>Solarized Dark</MenuItem>
                    <MenuItem value={"solarized_light"}>Solarized Light</MenuItem>
                    <MenuItem value={"gob"}>Green on Black</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <hr />
              <div>
                <p>Font Size</p>
                <FormControl>
                  <Select onChange={this.setFontSize} value={this.state.fontSize}>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <hr />
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.enableBasicAutocompletion}
                      onChange={e => this.setBoolean("enableBasicAutocompletion", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Basic Autocomplete"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      fullWidth
                      checked={this.state.enableLiveAutocompletion}
                      onChange={e => this.setBoolean("enableLiveAutocompletion", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Live Autocomplete"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.showGutter}
                      onChange={e => this.setBoolean("showGutter", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Gutter"
                />
              </div>
              <hr />
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAppearance} color="primary">
              Save
              </Button>
          </DialogActions>
        </Dialog>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={this.handleClickOpenProgram}
        >
          New
          </Button>

        <Dialog
          maxWidth="md"
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.openprogram}
          onClose={this.handleCloseProgram}
        >
          <DialogTitle>Create New Program</DialogTitle>
          <DialogContent>
            <form>
              <div>
                <FormControl>
                  <InputLabel>Language</InputLabel>
                  <Select onChange={this.setMode} value={this.state.mode}>
                    <MenuItem value={"python"}>Python</MenuItem>
                    <MenuItem value={"c_cpp"}>C or C++</MenuItem>
                    <MenuItem value={"sh"}>BASH</MenuItem>
                    <MenuItem value={"r"}>R</MenuItem>
                    <MenuItem value={"html"}>HTML</MenuItem>
                    <MenuItem value={"css"}>CSS</MenuItem>
                    <MenuItem value={"javascript"}>Java Script</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <hr />
              <div>
                <p> Title </p>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Enter Program Title"
                  value={this.state.title}
                  onChange={this.setTitle("title")}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              <div>
                <p> Description </p>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Enter Program Description"
                  value={this.state.description}
                  onChange={this.setDescription("description")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <hr />
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseProgram} color="primary">
              Save
              </Button>
          </DialogActions>
        </Dialog>

        <div className="column">
          <AceEditor
            mode={this.state.mode}
            theme={this.state.theme}
            height={430}
            width={1100}
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            onCursorChange={this.onCursorChange}
            onValidate={this.onValidate}
            value={this.state.value}
            fontSize={this.state.fontSize}
            showPrintMargin={this.state.showPrintMargin}
            showGutter={this.state.showGutter}
            highlightActiveLine={this.state.highlightActiveLine}
            setOptions={{
              enableBasicAutocompletion: this.state.enableBasicAutocompletion,
              enableLiveAutocompletion: this.state.enableLiveAutocompletion,
              enableSnippets: this.state.enableSnippets,
              showLineNumbers: this.state.showLineNumbers,
              tabSize: 4
            }}
          />
        </div>

        <div>
          <TextField
            fullWidth
            id="outlined-required"
            label="Command Line Arguments"
            value={this.state.commandLineArgs}
            onChange={this.setCommandLineArgs("commandLineArgs")}
            margin="normal"
            variant="outlined"
          />
        </div>

        <Columns gutters>
          <Column flex>
            <Button
              onClick={this.submitCode.bind(this)}
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
              </Button>
          </Column>
        </Columns>
      </Fragment>
    );
  }
}

export default cdEditor;
