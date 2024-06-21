import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/styles";
import { User, updatePhoneNumber, updateProfile } from "firebase/auth";
import { auth } from "../../../configs/firebaseConfig";
import { UserPlay } from "../PlayScreen";

interface Props {
  userAuth: User;
  showModal: boolean;
  setShowModal: Function;
}

export const UserEditComponent = ({
  userAuth,
  showModal,
  setShowModal,
}: Props) => {
  //Hook useEffect: para capturar la data del usuario autenticado
  useEffect(() => {
    setFormUser({
      name: auth.currentUser?.displayName ?? "N/A",
      phone: auth.currentUser?.phoneNumber ?? "",
      urlImagen: auth.currentUser?.photoURL ?? "",
    });
  }, []);

  //Hook useState: para ir trabajando la data del usuario
  const [formUser, setFormUser] = useState<UserPlay>({
    name: "",
    phone: "",
    urlImagen: "",
  });

  //Función que cambie los valores del formUser
  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  //Función actualizar la data del usuario autenticado
  const handlerUpdateUser = async () => {
    await updateProfile(userAuth!, {
      displayName: formUser.name,
      photoURL: formUser.urlImagen,
    });
    setShowModal(false);
  };

  //Función para actualizar el número de teléfono
  const handlerUpdatePhone = async () => {
    await updatePhoneNumber;
    setShowModal(false);
  };

  return (
    <Portal>
      <Modal visible={showModal} contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text variant="headlineMedium">Editar Perfil</Text>
          <View style={styles.iconEnd}>
            <IconButton
              icon="close-box"
              size={28}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
        <Divider />
        <TextInput
          mode="flat"
          label="Inserta tu Nombre"
          value={formUser.name}
          onChangeText={(value) => handlerSetValues("name", value)}
        />
        <TextInput
          mode="flat"
          label="Inserta tu número celular"
          value={formUser.phone}
          onChangeText={(value) => handlerSetValues("phone", value)}
        />
        <TextInput
          mode="flat"
          label="Inserta URL de tu foto de perfil"
          value={formUser.urlImagen}
          onChangeText={(value) => handlerSetValues("urlImagen", value)}
        />
        <TextInput
          mode="outlined"
          label="Correo"
          value={userAuth?.email!}
          disabled
        />
        <Button
          mode="contained-tonal"
          onPress={() => {
            handlerUpdateUser();
          }}
        >
          Actualizar
        </Button>
      </Modal>
    </Portal>
  );
};
