import React, { PropTypes } from 'react';

const Loading = ({ text }) => (
  <div>{text}</div>
);

Loading.defaultProps = {
  text: 'Loading...',
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
