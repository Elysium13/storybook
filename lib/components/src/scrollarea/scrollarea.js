import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

const genShadowTopStyle = (opacity) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 10,
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
  opacity,
});
const genShadowBottomStyle = (opacity) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 10,
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
  opacity,
});

class ScrollArea extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
    };
    this.scrollbars = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    
    this.setState({ shadowTopOpacity, shadowBottomOpacity });
  }

  render() {
    const { style, ...props } = this.props;
    const containerStyle = {
      ...style,
      position: 'relative',
    };
    const { shadowTopOpacity, shadowBottomOpacity } = this.state;
    return (
      <div style={containerStyle}>
        <Scrollbars ref={this.scrollbars} onUpdate={this.handleUpdate} {...props} />
        <div ref={this.shadowTop} style={genShadowTopStyle(shadowTopOpacity)} />
        <div ref={this.shadowBottom} style={genShadowBottomStyle(shadowBottomOpacity)} />
      </div>
    );
  }
}

ScrollArea.propTypes = {
  style: PropTypes.object,
};

export default ScrollArea;
