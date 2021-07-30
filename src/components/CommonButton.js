import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const CommonButton = ({}) => {
  return (
    <Button
      buttonStyle={btnStyle}
      title={"title"}
    />
  );
};

const btnStyle = {
  borderRadius: 5,
  width: width * 0.90,
  backgroundColor:'#140960',
};

export { CommonButton };

