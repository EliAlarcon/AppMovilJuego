import React, { ReactNode } from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { styles } from "../theme/styles";
import { View } from "react-native";

interface Props {
  title: string;
  children: ReactNode;
  showModal: boolean;
  setShowModal: Function;
}

export const ModalNewComponent = ({
  title,
  children,
  showModal,
  setShowModal,
}: Props) => {
  return (
    <Portal>
      <Modal visible={showModal} contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text variant="headlineMedium">{title}</Text>
          <View style={styles.iconEnd}>
            <IconButton
              icon="close-box"
              size={28}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
        <Divider />
        <View>{children}</View>
      </Modal>
    </Portal>
  );
};
