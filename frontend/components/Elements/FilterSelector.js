// https://rsuitejs.com/components/slider/
// dit component voorzien variabelen voor de search query

import { Slider, Input, Checkbox, HelpBlock } from "rsuite";
import React, {Component} from "react";
import "rsuite/dist/styles/rsuite-default.css";




class FilterSelector extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props)

    this.state = {
      checkboxFire: true,
      checkboxPol: true,
      checkboxAmbu: true
    }

  }
  
  sendSearchRangeChange = (e) => {
    this.props.searchRangeChange(e);
  }

  sendDateRangeChange = (e) => {
    this.props.dateRangeChange(e);
  }

  sendWordSearchChange = (e) => {
    this.props.wordSearchChange(e);
  }

  sendIncludePoliceChange = (e) => {
    this.props.includePoliceChange(e);
  }

  sendIncludeFireChange = (e) => {
    this.props.includeFireChange(e);
    // console.log(e)
  }
  
  sendIncludeAmbuChange = (e) => {
    this.props.includeAmbuChange(e);
    
  }

  handleFireChange = (event) => {
    this.setState({
      checkboxFire: !this.state.checkboxFire})
    this.sendIncludeFireChange(this.state.checkboxFire)
  }
  handlePolChange = (event) => {
    this.setState({
      checkboxPol: !this.state.checkboxPol})
    this.sendIncludePoliceChange(this.state.checkboxPol)
  }   
  handleAmbuChange = (event) => {
    this.setState({
      checkboxAmbu: !this.state.checkboxAmbu})
    this.sendIncludeAmbuChange(this.state.checkboxAmbu)
  }

  render() {
    return (
      <div>
        How big is the search area in km?
        <Slider
          progress
          min={0.5}
          step={0.5}
          max={20}
          defaultValue={1} 
          onChange={(value) => {
            console.log("radius " + value);
            this.sendSearchRangeChange(value);
            console.log(this.props.searchRanged)
          }}
        />
        <br />
        Look back how many days? 
        <Slider
          progress
          defaultValue={30}
          min={0}
          max={50}
          onChange={(value) => {
            console.log("date range " + value);
            this.sendDateRangeChange(value);
            console.log(this.props.dateRanged);
          }}
        />
        <br />
        Filter on other words/values
        <Input 
        placeholder="ex. 'Brand'"
        onChange={(value) => {
          this.sendWordSearchChange(value);
        } }
        />
        
        <br />
        <Checkbox 
          defaultChecked 
          onChange={this.handleFireChange}
          > 
          Brandweer
        </Checkbox>
        <Checkbox 
          defaultChecked
          onChange={this.handlePolChange}
          > Politie
        </Checkbox>
        <Checkbox 
        defaultChecked 
        
          onChange={this.handleAmbuChange}
          > Ambulance
        </Checkbox>
      </div>
    );
  }
}

export default FilterSelector;