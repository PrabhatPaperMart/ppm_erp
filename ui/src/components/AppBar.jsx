import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import { RxMoon } from "react-icons/rx";
import { FiSun } from "react-icons/fi";

import {
  Space,
  Flex,
  Switch
} from 'antd';


const AppBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleOnClickModeSwitch = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Flex justify="space-between" align="center" className="m-5 p-5 border-b border-gray-800">
      <Flex className="text-2xl font-bold">Cutting Schedule</Flex>
      <Flex className="flex flex-row items-center">
        <Flex className="mr-5">User</Flex>
        <Flex className="mr-5">Settings</Flex>
        <Flex className="mr-5">Logout</Flex>
        <Space size="small" direction="row" align="center">
          <FiSun size={ 20 } />
          <Switch
            onChange={ handleOnClickModeSwitch }
            checked={ isDarkMode }
          />
          <RxMoon size={ 20 } />
        </Space>
      </Flex>
    </Flex>
  );
};

export default AppBar;

AppBar.prototypes = {
  title: PropTypes.string,
  onLogout: PropTypes.func,
};