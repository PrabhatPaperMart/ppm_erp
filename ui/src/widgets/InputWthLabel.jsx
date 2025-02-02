import React from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Input,
  Space
} from "antd";

const InputWthLabel = (props = {}) => {
  return (
    <Space
      direction="vertical"
      size="small"
      style={ { width: props.width  } }
    >
      <Flex
        justify="flex-start"
        className="font-normal text-sm"
      >
        { props.label }
      </Flex>
      <Input
        key={ props.keyName }
        placeholder={ props.placeholder }
        defaultValue={ props.defaultValue }
        value={ props.value }
        onChange={ props.onChange }
      />
    </Space>
  );
};

export default InputWthLabel;

InputWthLabel.propTypes = {
  label: PropTypes.string,
  keyName: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.string,
};