import React, { useState } from "react";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";

//Interface - mensajes
export interface MessageSnackbar {
  visible: boolean;
  message: string;
  color: string;
}

interface Props{
  showMessage: MessageSnackbar;
  setShowMessage: Function
}

export const MessagesSnackbarComponent = ({showMessage, setShowMessage}:Props) => {

  return (
    <View>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
