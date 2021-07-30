import React from "react";
import { ImageBackground, Dimensions, ScrollView } from "react-native";
import { Header } from "react-native-elements";
const { height, width } = Dimensions.get("window");

const CustomHeader = ({ children, title, leftComponent, rightComponent, source, centerComponent, outerContainerStyles }) => {
  return (
    <ImageBackground
      style={backgroundStyle}
    >
      <Header
        leftComponent={leftComponent}
        centerComponent={centerComponent || {
          text: title,
          style: { color: "#FFF", fontSize: 20, fontWeight: "bold" }
        }}
        rightComponent={rightComponent}
        outerContainerStyles={outerContainerStyles || { borderBottomWidth: 0, height: height * .50 }}
        containerStyle={{
          backgroundColor: '#FFC526',
          borderBottomWidth:0
        }}
      />
      {children}
    </ImageBackground>
  );
};

const backgroundStyle = {
  height,
  width,
  flex: 1,
  zIndex: 3,
};

export { CustomHeader };
