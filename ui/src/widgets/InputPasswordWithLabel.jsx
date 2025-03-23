import React from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Input,
  Space
} from "antd";

const InputPasswordWithLabel = (props = {}) => {
  return (
    <Space
      direction="vertical"
      size="small"
      style={ { width: props.width || '100%' } }
    >
      <Flex
        justify="flex-start"
        className="font-normal text-sm"
      >
        { props.label }
      </Flex>
      <Input.Password
        key={ props.keyName }
        placeholder={ props.placeholder }
        defaultValue={ props.defaultValue }
        value={ props.value }
        disabled={ props.disabled }
        onChange={ props.onChange }
      />
    </Space>
  );
};

export default InputPasswordWithLabel;

InputPasswordWithLabel.propTypes = {
  label: PropTypes.string,
  width: PropTypes.string,
  keyName: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};