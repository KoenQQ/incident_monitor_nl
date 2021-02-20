// https://rsuitejs.com/components/slider/
// dit component voorzien variabelen voor de search query

import { Slider } from "rsuite";
import React, {Component} from "react";
import "rsuite/dist/styles/rsuite-default.css";

class FilterSelector extends React.Component {
  constructor(props) {
    super(props)
    
    console.log(this.props)
    // this.sendSearchRangeChange = this.sendSearchRangeChange.bind(this);
    // this.sendDateRangeChange = this.sendDateRangeChange.bind(this)
  }
  
  sendSearchRangeChange = (e) => {
    this.props.searchRangeChange(e);
  }

  sendDateRangeChange = (e) => {
    this.props.dateRangeChange(e);
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
        <hr />
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
      </div>
    );
  }
}

export default FilterSelector;