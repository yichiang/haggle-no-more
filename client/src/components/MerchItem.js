import React, { Component } from 'react';
import './../styles/App.css';

class MerchItem extends Component {
  render() {
    return (

        <li class="listContainer">
            <p>{this.props.item.name}</p>

        </li>
    );
  }
}

export default MerchItem;
