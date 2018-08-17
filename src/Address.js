import React from 'react';

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddressClick = this.handleAddressClick.bind(this);

  }

  handleAddressClick(address, e) {
    e.preventDefault();
    console.log(address);
    this.props.onClick(address, e);
  }

  render() {
    return (
      <div onClick={(e) => this.handleAddressClick(this.props.address, e)}>
        <br/>
        {this.props.address.address}
      </div>
    )
  }
}

export default Address;