import React, { useState } from "react";
import _ from "lodash";

import PaptechLogo from '../assets/logo/PaptechLogo.png';
import AppBar from "../components/AppBar";

import {
  InputWthLabel,
  AuthCardWidget,
  InputPasswordWithLabel,
} from "../widgets";

import { FaKey } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";

import {
  Button,
  Flex,
  Divider,
  Input,
  Space,
  Checkbox,
  Typography
} from "antd";

const { Text } = Typography;

const LoginPage = (props = {}) => {

  const [mobileExtensionText, setMobileExtensionText] = useState("");
  const [mobileNumberText, setMobileNumberText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [openOtpVerifier, setOpenOtpVerifier] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleOnInputOtp = (value) => {
    setOtpValue(_.join(value, ''));
  };

  const handleOnCompleteOtp = (text) => {
    setOtpValue(text);
  };

  const handleMobileExtensionChange = (e) => {
    console.log(e.target.value);
    setMobileExtensionText(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    console.log(e.target.value);
    setMobileNumberText(e.target.value);
  };

  const handleEmailTextChange = (e) => {
    console.log(e.target.value);
    setEmailText(e.target.value);
  };

  const handlePasswordTextChange = (e) => {
    console.log(e.target.value);
    setPasswordText(e.target.value);
  };

  const handleOnClickRememberMeCheckbox = () => {
    setIsRememberMeChecked(!isRememberMeChecked);
  };

  const handleForgortPasswordClick = () => {
    console.log("Forgot Password Clicked");
    props.history.push("/forgot-password");
  };

  const handleSignUpClick = () => {
    console.log("Sign Up Clicked");
    props.history.push("/register");
  };

  const googleLoginSection = (
    <Flex justify="center">
      <Button
        type="primary"
        onClick={ () => console.log("Google clicked") }
      >
        <FaGoogle size={ 20 } />
        <div className="mx-5">Log in with Google</div>
      </Button>
    </Flex>
  );

  const continueWithDivider = (
    <Flex>
      <Divider
        plain
        orientationMargin="10px"
        style={ { borderColor: '#d1d5dc' } }
      >
        <div className="font-light text-sm">
          OR CONTINUE WITH
        </div>
      </Divider>
    </Flex>
  );

  const inputOTPWithLabel = (
    <Space
      direction="vertical"
      size="small"
    >
      <Flex
        className="font-normal text-sm"
        justify="flex-start"
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

  const mobileLoginSection = (
    <Flex
      vertical
      gap="large"
    >
      <Flex
        align="flex-end"
        justify="space-between"
      >
        <CiMobile3 size={ 35 } />
        <InputWthLabel
          label="Extension"
          keyName="mobile_extension"
          placeholder="+91"
          defaultValue="+91"
          width="15%"
          value={ mobileExtensionText }
          onChange={ handleMobileExtensionChange }
        />
        <InputWthLabel
          label="Mobile Number"
          keyName="mobile_number"
          placeholder="9800398003"
          defaultValue=""
          value={ mobileNumberText }
          onChange={ handleMobileNumberChange }
        />
        <Flex>
          <Button
            type="primary"
            onClick={ () => setOpenOtpVerifier(true) }
          >
            <FaKey size={ 15 } />
            <div className="text-xs pl-2">Get OTP</div>
          </Button>
        </Flex>
      </Flex>
      <Flex justify="center">
        {
          openOtpVerifier &&
          inputOTPWithLabel
        }
      </Flex>
    </Flex>
  );

  const loginWithEmailAndPassword = (
    <Flex
      vertical
      gap="middle"
    >
      <InputWthLabel
        label="Email"
        keyName="login_email"
        placeholder="johnDoe@gmail.com"
        defaultValue=""
        value={ emailText }
        width="100%"
        onChange={ handleEmailTextChange }
      />
      <InputPasswordWithLabel
        width="100%"
        placeholder="Enter Password"
        value={ passwordText }
        onChange={ handlePasswordTextChange }
      />
      <Flex justify="space-between" align="center">
        <Checkbox
          defaultChecked={ false }
          checked={ isRememberMeChecked }
          onClick={ handleOnClickRememberMeCheckbox }
        >
          Remember me
        </Checkbox>
        <Button onClick={ handleForgortPasswordClick } type="link">
          Forgot Password ?
        </Button>
      </Flex>
      <Button style={ { width: '100%' } } type="primary">
        Login
      </Button>
      <Flex justify="space-between" align="center">
        <Text>
          Want to Register ?
        </Text>
        <Button onClick={ handleSignUpClick } type="link">
          Sign Up
        </Button>
      </Flex>
    </Flex>
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
    <Flex
      flex="5"
      vertical
      justify="center"
      align="center"
      style={ { height: '100%' } }
    >
      <Flex
        vertical
        style={ { height: '80%', width: '70%' } }
        gap="medium"
        justify="space-between"
      >
        {
          googleLoginSection
        }
        {
          continueWithDivider
        }
        {
          mobileLoginSection
        }
        {
          continueWithDivider
        }
        {
          loginWithEmailAndPassword
        }
      </Flex>
    </Flex>
  );

  return (
    <AuthCardWidget
      heading="LOGIN"
      leftPanel={ loginLeftPanel }
      rightPanel={ loginRightPanel }
    />
  );
};

export default LoginPage;
