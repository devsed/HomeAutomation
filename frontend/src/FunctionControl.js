import React, { Component } from 'react'
import { Checkbox, Segment } from 'semantic-ui-react'

export default class FunctionControl extends Component {
  state = {
    sliderValue: 0,
    checkValue: false
  };

  handleSliderChange = e => this.setState({
    sliderValue: Number(e.target.value)
  });

  handleCheckboxValue = e => {
    this.setState({
      checkValue: !this.state.checkValue,
    })
    alert("Check value:" + !this.state.checkValue)
  }

  handleSliderLeave = e => {
    alert("Slider value is:" + this.state.sliderValue)
  }

  render() {
    let { sliderValue } = this.state;

    return (
      this.props.props.type === 1 ?
        (<Checkbox toggle onChange={this.handleCheckboxValue} checked={this.state.checkValue} />) :
        (<Segment secondary>
          <div>Brightness: {sliderValue}</div>
          <input
            type='range'
            min='0'
            max='10'
            value={sliderValue}
            onChange={this.handleSliderChange}
            onMouseUp={this.handleSliderLeave}
          />
        </Segment>)
    )
  }
}