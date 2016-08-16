import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import request from 'superagent';
import { Link } from 'react-router';
import _ from 'underscore';

import Dashboard from './Dashboard';
import Terminal from './Terminal';
import Settings from './Settings';

export default class Bot extends React.Component {
  constructor(props) {
    super(props);

    this.tabSelectEvent = this.tabSelectEvent.bind(this);

    this.state = {
      showModal: false,
      selectedTab: 1,
    };
  }

  tabSelectEvent(key) {
    this.setState({
      selectedTab: key,
    });
  }

  render() {
    const endpoint = `/v1/bots/${this.props.bot.settings.uuid}`;

    return (
      <div>
        <Tabs activeKey={this.state.selectedTab} onSelect={this.tabSelectEvent}>
          <Tab eventKey={1} title="Dashboard">
            <Dashboard endpoint={endpoint}/>
          </Tab>
          <Tab eventKey={2} title="Terminal">
            <Terminal endpoint={endpoint}/>
          </Tab>
          <Tab eventKey={3} title="Settings">
            <Settings bot={this.props.bot}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}


/*
<div className="row">
  <div className="col-md-12">
    {this.renderConnectButton()}
    <Button style={{margin: "5px"}} onClick={this.toggleModal}>Edit Bot</Button>
    {this.renderJobButtons()}
    <div>State: {this.props.bot.state}</div>
    <div>Job State: {this.props.currentJob === undefined ? `Not processing job` : `${this.props.currentJob.state}. ${this.props.currentJob.percentComplete}%` }</div>
    <JogPanel endpoint={`/v1/bots/${this.props.bot.settings.uuid}`}/>
    <Button onClick={this.homeX} disabled={this.checkDisabled()}>Home X</Button>
    <Button onClick={this.homeY} disabled={this.checkDisabled()}>Home Y</Button>
    <Button onClick={this.homeZ} disabled={this.checkDisabled()}>Home Z</Button>
    <Button onClick={this.homeAll} disabled={this.checkDisabled()}>Home Axes</Button>
    <div className="clearfix">
      <div style={{ float: 'left', margin: '0px 5px 5px 5px' }}>
        <form onSubmit={this.processGcode}>
          <input type="textarea" name="gcode" disabled={this.checkDisabled()}></input>
        <br/>
          <input type="submit" value="Send Gcode" disabled={this.checkDisabled()}></input>
        </form>
      </div>
      <div style={{ float: 'left', margin: '0px 5px 5px 5px' }}>
        <form onSubmit={this.setTemp}>
          <input type="textarea" name="temp" disabled={this.checkDisabled()}></input>
        <br/>
          <input type="submit" value="Set Extruder Temp" disabled={this.checkDisabled()}></input>
        </form>
      </div>
    </div>
    <div>Port: {this.props.bot.port}</div>
    <div>Temp:{this.props.bot.status.sensors ? this.props.bot.status.sensors.t0 : '?'}</div>
    <div>
      X:{`${this.props.bot.status.position ? this.props.bot.status.position.x : `?`} `}
      Y:{`${this.props.bot.status.position ? this.props.bot.status.position.y : `?`} `}
      Z:{`${this.props.bot.status.position ? this.props.bot.status.position.z : `?`} `}
      E:{`${this.props.bot.status.position ? this.props.bot.status.position.e : `?`} `}
    </div>
    { this.props.conducting ?
      (<form onSubmit={this.choir}>
        <h3>Jog alll the bots</h3>
        <input type="textarea" name="gcode" placeholder="Enter Gcode Here"></input>
        <br/>
        <input type="submit" value="Send Gcode to all bots"></input>
      </form>) : ``
    }
  </div>
</div>
{this.renderModal()}
*/

/*
detect() {
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `checkSubscription` })
  .end();
}

deleteBot() {
  request.delete(`/v1/bots/${this.props.bot.settings.uuid}`)
  .end();
  this.closeModal();
}

pauseJob() {
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `pause` })
  .end();
  this.closeModal();
}

resumeJob() {
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `resume` })
  .end();
  this.closeModal();
}

cancelJob() {
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `cancel` })
  .end();
  this.closeModal();
}

processGcode(event) {
  event.preventDefault();
  const gcode = event.target.gcode.value;
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `processGcode` })
  .send({ gcode })
  .end();
}

setTemp(event) {
  event.preventDefault();
  const temp = event.target.temp.value;
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `processGcode` })
  .send({ gcode: `M104 S${temp}` })
  .end();
}

homeX(event) {
  event.preventDefault();
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `processGcode` })
  .send({ gcode: `G28 X` })
  .end();
}

homeY(event) {
  event.preventDefault();
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `processGcode` })
  .send({ gcode: `G28 Y` })
  .end();
}

homeZ(event) {
  event.preventDefault();
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `processGcode` })
  .send({ gcode: `G28 Z` })
  .end();
}

homeAll(event) {
  event.preventDefault();
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `processGcode` })
  .send({ gcode: `G28` })
  .end();
}

choir(event) {
  event.preventDefault();
  const gcode = event.target.gcode.value;
  request.post(`/v1/conductor/`)
  .send({ command: `choir` })
  .send({ gcode })
  .end();
}

connect() {
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `connect` })
  .set('Accept', 'application/json')
  .end();
}

disconnect() {
  request.post(`/v1/bots/${this.props.bot.settings.uuid}`)
  .send({ command: `disconnect` })
  .set('Accept', 'application/json')
  .end();
}

renderConnectButton() {
  switch (this.props.bot.state) {
    case `unavailable`:
      return <Button style={{margin: "5px"}} onClick={this.detect}>Detect</Button>;
    case `ready`:
      return <Button bsStyle="success" style={{margin: "5px"}} onClick={this.connect}>Connect</Button>;
    case `connected`:
      return <Button bsStyle="danger" style={{margin: "5px"}} onClick={this.disconnect}>Disconnect</Button>;
    default:
      return <Button style={{margin: "5px"}} disabled>Nope!</Button>;
  }
}

updateBot(event) {
  event.preventDefault();
  let update = request.put(`/v1/bots/${this.props.bot.settings.uuid}`)
  for (const [settingKey, setting] of _.pairs(this.props.bot.settings)) {
    const paramJson = {};
    if (event.target[settingKey] !== undefined) {
      paramJson[settingKey] = event.target[settingKey].value;
      update = update.send(paramJson);
    }
  }
  update = update.set('Accept', 'application/json');
  try {
    update.end();
    this.closeModal();
  } catch (ex) {
    console.log(`Update error`, ex);
  }
}

toggleModal() {
  this.setState({
    showModal: !this.state.showModal,
  });
}

closeModal() {
  this.setState({ showModal: false });
}

renderJobButtons() {
  const buttons = [];
  if (this.props.currentJob === undefined) {
    buttons.push(<Button style={{margin: "5px"}} disabled>Nope</Button>);
    buttons.push(<Button style={{margin: "5px"}} bsStyle="danger" disabled>Nope</Button>);
  } else {
    switch (this.props.currentJob.state) {
      case `running`:
        buttons.push(<Button style={{margin: "5px"}} onClick={this.pauseJob}>Pause</Button>);
        buttons.push(<Button style={{margin: "5px"}} bsStyle="danger" onClick={this.cancelJob}>Cancel</Button>);
        break;
      case `paused`:
        buttons.push(<Button style={{margin: "5px"}} onClick={this.resumeJob}>Resume</Button>);
        buttons.push(<Button style={{margin: "5px"}} bsStyle="danger" onClick={this.cancelJob}>Cancel</Button>);
        break;
      default:
        buttons.push(<Button style={{margin: "5px"}} disabled>Nope</Button>);
        buttons.push(<Button style={{margin: "5px"}} bsStyle="danger" disabled>Nope</Button>);
        break;
    }
  }
  return buttons;
}

checkDisabled() {
  let disabled = false;
  switch (this.props.bot.state) {
    case `detecting`:
    case `ready`:
    case `startingJob`:
    case `stopping`:
    case `parking`:
    case `unparking`:
    case `unavailable`:
    case `connecting`:
      disabled = true;
      break;
    default:
      break;
  }
  return disabled;
}

renderModal() {
  return (<Modal show={this.state.showModal} onHide={this.closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Bot</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={this.updateBot}>
        {_.pairs(this.props.bot.settings).map(([settingKey, setting]) => {
          switch (settingKey) {
            case `createdAt`:
            case `updatedAt`:
            case `uuid`:
            case `id`:
            case `model`:
              return;
            case `endpoint`:
              if (this.props.botPresets[this.props.bot.settings.model].info.connectionType === `serial`) {
                return;
              }
            default:
              return (<div key={settingKey}>
                <label key={`${settingKey}label`} htmlFor={settingKey}>{settingKey}</label>
                <input key={`${settingKey}input`} type="textarea" name={settingKey} defaultValue={setting}/>
              </div>);
          }
        })}
        <Button bsStyle="primary" type="submit">Update Bot</Button>
      </form>
    </Modal.Body>
    <br/>
    <br/>
    <br/>
    <br/>
    <Button bsStyle="danger" onClick={this.deleteBot}>Delete Bot</Button>
  </Modal>);
}
*/
