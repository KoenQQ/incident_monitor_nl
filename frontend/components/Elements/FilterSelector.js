// https://rsuitejs.com/components/slider/
// dit component voorzien variabelen voor de search query

import { Slider, Input, Checkbox, HelpBlock } from "rsuite";
import React, {Component} from "react";
import "rsuite/dist/styles/rsuite-default.css";

class FilterSelector extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
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
    console.log(e)
  }
  
  sendIncludeAmbuChange = (e) => {
    this.props.includeAmbuChange(e);
    
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
        // onChange={(value) => {
        //   this.sendIncludeFireChange(value)
        // }}
        > Brandweer</Checkbox>
        <Checkbox defaultChecked> Politie</Checkbox>
        <Checkbox defaultChecked> Ambulance</Checkbox>
      </div>
    );
  }
}

export default FilterSelector;