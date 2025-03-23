import React from "react";
import PropTypes from "prop-types";

import {
  Flex
} from "antd";

const AuthCardWidget = (props = {}) => {
  const dots = (
    <Flex justify="start" flex="1">
      <div style={ { backgroundColor: '#e8392c' } } className="w-3 h-3 rounded-full mx-1"></div>
      <div style={ { backgroundColor: '#fcb138' } } className="w-3 h-3 rounded-full mx-1"></div>
      <div style={ { backgroundColor: '#19c219' } } className="w-3 h-3 rounded-full mx-1"></div>
    </Flex>
  );

  return (
    <Flex vertical className={ `border border-gray-700 dark:border-gray-300 shadow-2xl rounded-xl w-full md:w-[80vw] h-[90vh] text-center` }>
      <Flex justify="space-between" align="center" className="border-b border-b-gray-950 bg-gray-200 text-sm font-medium py-3 px-4 rounded-t-xl">
        { dots }
        <Flex justify="center" flex="14">
          { props.heading }
        </Flex>
      </Flex>
      <Flex justify="space-around" align="center" className="h-full">
        { props.leftPanel }
        { props.rightPanel }
      </Flex>
    </Flex>
  );
};

export default AuthCardWidget;

AuthCardWidget.propTypes = {
  heading: PropTypes.string,
  leftPanel: PropTypes.node,
  rightPanel: PropTypes.node
};