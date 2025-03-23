import React, { useState } from "react";
import _ from "lodash";

import PaptechLogo from '../assets/logo/PaptechLogo.png';

import {
  InputWthLabel,
  AuthCardWidget,
  InputPasswordWithLabel,
} from "../widgets";

import {
  Button,
  Flex,
  Input,
  Space,
  Typography
} from "antd";

const { Text } = Typography;

const RegisterPage = (props = {}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [openOtpVerifier, setOpenOtpVerifier] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isOtpVerifiedSuccesfully, setIsOtpVerifiedSuccessfully] = useState(false);

  const handleOnInputOtp = (value) => {
    setOtpValue(_.join(value, ''));
  };

  const handleOnCompleteOtp = (text) => {
    setOtpValue(text);

    if (text === '123456') {
      setIsOtpVerifiedSuccessfully(true);
    }
  };

  const handleEmailTextChange = (e) => {
    console.log(e.target.value);
    setEmailText(e.target.value);
  };

  const hanleOnVerifyEmailClick = () => {
    setOpenOtpVerifier(true);
  };

  const handleLogInClick = () => {
    props.history.push("/login");
  };

  const handlePasswordTextChange = (e) => {
    setPasswordText(e.target.value)
  };

  const handleOnRegisterClick = () => {
    console.log("Click register");
  };

  const inputOTPWithLabel = (
    <Space
      direction="vertical"
      size="small"
    >
      <Flex
        className="font-normal text-sm"
        justify="center"
      >
        Submit OTP
      </Flex>
      <Input.OTP
        length={ 6 }
        onChange={ handleOnCompleteOtp }
        onInput={ handleOnInputOtp }
        value={ otpValue }
      />
    </Space>
  );

  const paptechLogo = (
    <img
      src={ PaptechLogo }
      alt="Logo"
      width={ 175 }
      height={ 175 }
      className="border-2 rounded-3xl"
    />
  );

  const loginLeftPanel = (
    <Flex flex="2" justify="center">
      {
        paptechLogo
      }
    </Flex>
  );

  const loginRightPanel = (
    <Flex flex="5" justify="center">
      <Flex
        vertical
        justify="space-between"
        align="stretch"
        style={ { width: '70%' } }
        gap="large"
      >
        <InputWthLabel
          label="First Name"
          keyName="register_first_name"
          placeholder="John"
          defaultValue=""
          value={ firstName }
          onChange={ (e) => setFirstName(e.target.value) }
        />
        <InputWthLabel
          label="Last Name"
          keyName="register_last_name"
          placeholder="Doe"
          defaultValue=""
          value={ lastName }
          onChange={ (e) => setLastName(e.target.value) }
        />
        <Flex align="flex-end" gap="middle" justify="space-between">
          <InputWthLabel
            label="Email"
            keyName="register_email"
            placeholder="johnDoe@gmail.com"
            defaultValue=""
            value={ emailText }
            width="80%"
            onChange={ handleEmailTextChange }
          />
          <Button
            type="primary"
            onClick={ hanleOnVerifyEmailClick }
          >
            Verify Email
          </Button>
        </Flex>
        <Flex justify="center">
          {
            openOtpVerifier &&
            inputOTPWithLabel
          }
        </Flex>
        <InputPasswordWithLabel
          label="Password"
          keyName="register_password"
          placeholder="Enter Password"
          value={ passwordText }
          defaultValue=""
          disabled={ !isOtpVerifiedSuccesfully }
          onChange={ handlePasswordTextChange }
        />
        <Button type="primary" onClick={ handleOnRegisterClick }>Register</Button>
        <Flex justify="space-between" align="center">
          <Text>
            Already a User ?
          </Text>
          <Button onClick={ handleLogInClick } type="link">
            Log In
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <AuthCardWidget
      heading="REGISTER"
      leftPanel={ loginLeftPanel }
      rightPanel={ loginRightPanel }
    />
  );
};

export default RegisterPage;
