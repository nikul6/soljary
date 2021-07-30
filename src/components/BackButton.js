import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements'

const BackButton = ({ navigate, color }) => {
  return (
    <TouchableOpacity onPress={() => navigate()}>
      <Icon 
      name="arrow-left"
      type="font-awesome-5"
      color={color || "#FFF"}
      size={23}
      />
    </TouchableOpacity>
  );
};

export { BackButton };
