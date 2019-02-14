import _ from 'lodash'
import React, { Component } from 'react'
import { Checkbox, Segment } from 'semantic-ui-react'

const panels = _.times(15, i => ({
  key: `panel-${i}`,
}))

const Switch = () => <Checkbox toggle />

export default class FunctionControl extends Component {
  state = { statusValue: 0 };

  handleSliderChange = e => this.setState({ statusValue: Number(e.target.value) })

  render() {
    const device = this.props.device;
    const type = device.type;
    const { statusValue } = this.state;

//    const Switch = () => <Checkbox toggle />

    const Control = () =>
    type === 0 ? <Switch /> : 

      <Segment secondary>
        <div>Brightness: {statusValue}</div>
        <input
          type='range'
          min='-1'
          max={panels.length - 1}
          value={statusValue}
          onChange={this.handleSliderChange}
        />
      </Segment>

    return ( <Control/>
      //      type === 0 ? <div><Switch /></div> : <div><Dimmer /></div>
/*      <Segment secondary>
        <div>Brightness: {statusValue}</div>
        <input
          type='range'
          min='-1'
          max={panels.length - 1}
          value={statusValue}
          onChange={this.handleSliderChange}
        />
      </Segment>*/
    )
  }
}
