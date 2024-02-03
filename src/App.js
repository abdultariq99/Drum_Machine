import './App.css';
import React, {Component} from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <body className="d-flex flex-column align-items-center justify-content-center">
        <DrumBox />
      </body>
    );
  }
}

class DrumBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentDisplay: true,
      mode: "left",
      power: "right",
      status: "",
      volume: 50,
      screen: ""
    };
    this.toggleComponent = this.toggleComponent.bind(this);
    this.modeToggle = this.modeToggle.bind(this);
    this.powerToggle = this.powerToggle.bind(this);
    this.handleChildData = this.handleChildData.bind(this);
    this.volumeSlider = this.volumeSlider.bind(this);
  }

  handleChildData(childData) {
    this.setState({ screen: childData });
  }

  toggleComponent() {
    this.modeToggle();
    this.setState((state) => ({
      componentDisplay: !state.componentDisplay
    }));
  }

  modeToggle() {
    this.setState((state) => ({
      mode: state.mode === "left" ? "right" : "left",
      screen:
        state.screen === ""
          ? "Piano Kit"
          : state.screen === "Piano Kit"
          ? "Heater Kit"
          : "Piano Kit"
    }));
  }

  powerToggle() {
    this.setState((state) => ({
      power: state.power === "right" ? "left" : "right",
      status: state.status === "" ? "disabled" : "",
      screen: "",
      volume: state.status === "disabled" ? 50 : 0
    }));
  }

  volumeSlider(event) {
    const volume = parseInt(event.target.value, 10);
    this.setState({
      volume: volume,
      screen: `Volume = ${volume}`
    });
  }

  render() {
    let modeFloat = { float: this.state.mode };
    let powerFloat = { float: this.state.power };
    return (
      <div>
        <div
          id="drum-machine"
          className="container d-flex flex-row align-items-center drumbox"
        >
          {this.state.componentDisplay == true ? (
            <HeaterKit
              parentCallback={this.handleChildData}
              powerStatus={this.state.status}
              volControl={this.state.volume}
            />
          ) : (
            <PianoKit
              parentCallback={this.handleChildData}
              powerStatus={this.state.status}
              volControl={this.state.volume}
            />
          )}
          <div className="control-panel d-flex flex-column align-items-center justify-content-evenly">
            <div className="panel-item">
              Power
              <div className="selector">
                <button
                  className="inner-selector powerbutton"
                  onClick={this.powerToggle}
                  style={powerFloat}
                ></button>
              </div>
            </div>
            <div className="panel-item display text-center" id="display">
              {" "}
              {this.state.status === "" ? <p>{this.state.screen}</p> : null}
            </div>
            <div className="panel-item d-flex flex-column align-items-center">
              <div>Volume</div>
              {this.state.status == "" ? (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={this.state.volume}
                  onChange={this.volumeSlider}
                  className="slider"
                  id="myRange"
                ></input>
              ) : (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="50"
                  className="slider"
                  id="myRange"
                ></input>
              )}
            </div>
            <div className="panel-item">
              Mode
              <div className="selector">
                <button
                  className="inner-selector modebutton"
                  onClick={this.toggleComponent}
                  style={modeFloat}
                ></button>
              </div>
            </div>
          </div>
        </div>
        <footer className="credit">Created by Abdulrehman Tariq</footer>
      </div>
    );
  }
}

class HeaterKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSource: "",
      clickStyle: {}
    };

    this.playMusic = this.playMusic.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.eventWrapper = this.eventWrapper.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.eventWrapper);
  }

  playMusic() {
    const audio = new Audio(this.state.audioSource);
    audio.play();
    audio.volume = this.props.volControl / 100;
  }

  handleClick(event) {
    this.props.parentCallback(event.target.name);
    this.setState(
      {
        audioSource: event.target.value
      },
      () => this.playMusic()
    );
  }

  handleKeyPress(event) {
    let audioSource = "";

    switch (event.key) {
      case "q":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3";
        this.props.parentCallback("Heater 1");
        break;
      case "w":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3";
        this.props.parentCallback("Heater 2");
        break;
      case "e":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3";
        this.props.parentCallback("Heater 3");
        break;
      case "a":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3";
        this.props.parentCallback("Heater 5");
        break;
      case "s":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3";
        this.props.parentCallback("Clap");
        break;
      case "d":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3";
        this.props.parentCallback("Open HH");
        break;
      case "z":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3";
        this.props.parentCallback("Kick n' Hat");
        break;
      case "x":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3";
        this.props.parentCallback("Kick");
        break;
      case "c":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3";
        this.props.parentCallback("Closed HH");
        break;
      default:
        break;
    }

    if (audioSource) {
      this.setState({ audioSource }, () => this.playMusic());
    }
  }

  eventWrapper(event) {
    event.hasOwnProperty("target")
      ? this.handleClick(event)
      : this.handleKeyPress(event);
  }

  render() {
    const powerMode = this.props.powerStatus === "disabled";

    return (
      <div className="container pad">
        <div className="row">
          <button
            id="drumpad-elem-1"
            className="col drum-pad"
            id="heater-1"
            name="Heater 1"
            value="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            Q
          </button>
          <button
            id="drumpad-elem-2"
            className="col drum-pad"
            name="Heater 2"
            value="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            W
          </button>
          <button
            id="drumpad-elem-3"
            className="col drum-pad"
            name="Heater 3"
            value="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
            onClick={(e) => this.handleClick(e, "Heater 3")}
            disabled={powerMode}
          >
            E
          </button>
        </div>
        <div className="row">
          <button
            id="drumpad-elem-4"
            className="col drum-pad"
            name="Heater 5"
            value="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            A
          </button>
          <button
            id="drumpad-elem-5"
            className="col drum-pad"
            name="Clap"
            value="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            S
          </button>
          <button
            id="drumpad-elem-6"
            className="col drum-pad"
            name="Open HH"
            value="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            D
          </button>
        </div>
        <div className="row">
          <button
            id="drumpad-elem-7"
            className="col drum-pad"
            name="Kit n' Hat"
            value="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            Z
          </button>
          <button
            id="drumpad-elem-8"
            className="col drum-pad"
            name="Kick"
            value="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            X
          </button>
          <button
            id="drumpad-elem-9"
            className="col drum-pad"
            name="Closed HH"
            value="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            C
          </button>
        </div>
      </div>
    );
  }
}

class PianoKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSource: ""
    };
    this.playMusic = this.playMusic.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.eventWrapper = this.eventWrapper.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.eventWrapper);
  }

  playMusic() {
    const audio = new Audio(this.state.audioSource);
    audio.play();
    audio.volume = this.props.volControl / 100;
  }

  handleClick(event) {
    this.props.parentCallback(event.target.name);
    this.setState(
      {
        audioSource: event.target.value
      },
      () => this.playMusic()
    );
  }

  handleKeyPress(event) {
    let audioSource = "";

    switch (event.key) {
      case "q":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3";
        this.props.parentCallback("Chord 1");
        break;
      case "w":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3";
        this.props.parentCallback("Chord 2");
        break;
      case "e":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3";
        this.props.parentCallback("Chord 3");
        break;
      case "a":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3";
        this.props.parentCallback("Shaker");
        break;
      case "s":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3";
        this.props.parentCallback("Open HH");
        break;
      case "d":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3";
        this.props.parentCallback("Closed HH");
        break;
      case "z":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3";
        this.props.parentCallback("Punchy Kick");
        break;
      case "x":
        audioSource =
          "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3";
        this.props.parentCallback("Side Stick");
        break;
      case "c":
        audioSource = "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3";
        this.props.parentCallback("Snare");
        break;
      default:
        break;
    }

    if (audioSource) {
      this.setState({ audioSource }, () => this.playMusic());
    }
  }

  eventWrapper(event) {
    event.hasOwnProperty("target")
      ? this.handleClick(event)
      : this.handleKeyPress(event);
  }

  render() {
    const powerMode = this.props.powerStatus === "disabled";
    return (
      <div className="container pad">
        <div className="row">
          <button
            className="col"
            name="Chord 1"
            value="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            Q
          </button>
          <button
            className="col"
            name="Chord 2"
            value="https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            W
          </button>
          <button
            className="col"
            name="Chord 3"
            value="https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            E
          </button>
        </div>
        <div className="row">
          <button
            className="col"
            name="Shaker"
            value="https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            A
          </button>
          <button
            className="col"
            name="Open HH"
            value="https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            S
          </button>
          <button
            className="col"
            name="Closed HH"
            value="https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            D
          </button>
        </div>
        <div className="row">
          <button
            className="col"
            name="Punchy Kick"
            value="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            Z
          </button>
          <button
            className="col"
            name="Side Stick"
            value="https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            X
          </button>
          <button
            className="col"
            name="Snare"
            value="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            onClick={this.eventWrapper}
            disabled={powerMode}
          >
            C
          </button>
        </div>
      </div>
    );
  }
}

export default App;
