import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text, Overlay } from "react-native-elements";
import { styles } from "./LoadingModel.styles";

export function LoadingModel(props) {
  const { show, text } = props;
  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#5353ec" />
        {text && <Text style={styles.text} >{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModel.defaultProps = {
  show: false,
};
