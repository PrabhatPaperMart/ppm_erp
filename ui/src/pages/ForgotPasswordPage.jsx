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

const ForgotPasswordPage = (props = {}) => {

  const [emailText, setEmailText] = useState("");
  const [newPasswordText, setNewPasswordText] = useState("");
  const [confirmNewPasswordText, setConfirmNewPasswordText] = useState("");
  const [otpValue, setOtpValue] = useState("");

  useState(() => {
    if (
      !_.isEmpty(newPasswordText) &&
      !_.isEmpty(confirmNewPasswordText) &&
      (confirmNewPasswordText !== newPasswordText)
    ) {
      console.log("Passwords do not match");
    } else {
      console.log("Passwords match");
    }
  }, [confirmNewPasswordText]);

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

  const handleConfirmNewPasswordTextChange = (e) => {
    setConfirmNewPasswordText(e.target.value);
  };

  const handleNewPasswordTextChange = (e) => {
    setNewPasswordText(e.target.value)
  };

  const handleOnResetPasswordClick = () => {
    console.log("Click on Reset Password");
  };

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
          label="Email"
          keyName="register_email"
          placeholder="johnDoe@gmail.com"
          defaultValue=""
          value={ emailText }
          onChange={ handleEmailTextChange }
        />
        <Flex
          vertical
          gap="large"
        >
          <InputPasswordWithLabel
            label="New Password"
            keyName="register_new_password"
            placeholder="Enter New Password"
            value={ newPasswordText }
            defaultValue=""
            onChange={ handleNewPasswordTextChange }
          />
          <InputPasswordWithLabel
            label="Confirm New Password"
            keyName="confirm_register_new_password"
            placeholder="Enter New Password for Confirmation"
            value={ confirmNewPasswordText }
            defaultValue=""
            onChange={ handleConfirmNewPasswordTextChange }
          />
        </Flex>
        <Button type="primary" onClick={ handleOnResetPasswordClick }>Reset Password</Button>
        <Flex justify="space-between" align="center">
          <Text>
            Already a User ?
          </Text>
          <Button onClick={ () => props.history.push("/login") } type="link">
            Log In
          </Button>
        </Flex>
        <Flex justify="space-between" align="center">
          <Text>
            Want to Register ?
          </Text>
          <Button onClick={ () => props.history.push("/register") } type="link">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <AuthCardWidget
      heading="RESET PASSWORD"
      leftPanel={ loginLeftPanel }
      rightPanel={ loginRightPanel }
    />
  );
};

export default ForgotPasswordPage;
