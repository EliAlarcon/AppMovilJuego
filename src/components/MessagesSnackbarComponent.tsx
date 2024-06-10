import React, { useState } from "react";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";

//Interface - mensajes
interface MessageSnackbar {
  visible: boolean;
  message: string;
  color: string;
}

export const MessagesSnackbarComponent = () => {
  //Hook useState: para visualiazar u ocultar mensaje
  const [showMessage, setShowMessage] = useState<MessageSnackbar>({
    visible: false,
    message: "",
    color: "#ffff",
  });

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
