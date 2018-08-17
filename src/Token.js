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
      <div onClick={(e) => this.handleClick(this.props.token, e)} >
        {this.props.token.name}
      </div>
    )
  }
}

export default Token;