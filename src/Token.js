import React from 'react';

class Token extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(token, e) {
    e.preventDefault();
    console.log(token);
    this.props.onClick(token, e);
  }

  render() {
    return (
      <li onClick={(e) => this.handleClick(this.props.token, e)} >
        {this.props.token.name}
      </li>
    )
  }
}

export default Token;