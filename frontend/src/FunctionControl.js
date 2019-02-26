import React, { Component } from 'react'
import { Checkbox, Segment } from 'semantic-ui-react'

export default class FunctionControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 0,
      checkValue: false
    }
  }

  componentDidMount() {
    //console.log("FunctionState:"+this.props.functionState)
  }

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
      this.props.functio.type === 1 ?
        (<div>
          <Checkbox toggle onChange={this.handleCheckboxValue} checked={this.state.checkValue} />
          <div>{this.props.functio.state}</div>
        </div>) :
        (<div>
          <Segment secondary>
            <div>Brightness: {sliderValue}</div>
            <input
              type='range'
              min='0'
              max='10'
              value={sliderValue}
              onChange={this.handleSliderChange}
              onMouseUp={this.handleSliderLeave}
            />
          </Segment>
          <div>{this.props.functio.state}</div>
        </div>)
    )
  }
}
