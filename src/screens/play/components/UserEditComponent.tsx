import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Avatar,
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
import { auth, storageRef } from "../../../configs/firebaseConfig";
import { UserPlay } from "../PlayScreen";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  userAuth: User;
  showModal: boolean;
  setShowModal: Function;
}

export const UserEditComponent = ({ userAuth, showModal, setShowModal }: Props) => {
  const [formUser, setFormUser] = useState({
    id: "",
    name: "",
    phone: "",
    urlImagen: "",
  });

  // Hook useEffect: para capturar la data del usuario autenticado
  useEffect(() => {
    setFormUser({
      id: auth.currentUser?.uid!,
      name: auth.currentUser?.displayName ?? "N/A",
      phone: auth.currentUser?.phoneNumber ?? "",
      urlImagen: auth.currentUser?.photoURL ?? "",
    });
  }, []);

  // Función para seleccionar imagen de la galería
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Define el aspecto de la imagen
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Subir la imagen a Firebase Storage
      const uri = result.assets[0].uri;;
      await uploadImageToFirebase(uri);
    }
  };

  // Función para subir imagen a Firebase Storage
  const uploadImageToFirebase = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      //const storage = getStorage();
      const almacenamiento = ref(storageRef, `profile_pictures/${auth.currentUser?.uid}.jpg`); // Crear referencia para almacenar imagen

      await uploadBytes(almacenamiento, blob); // Subir imagen a Firebase Storage

      // Obtener la URL de descarga de la imagen almacenada
      const downloadURL = await getDownloadURL(almacenamiento);

      // Actualizar la URL de la imagen del perfil en Firebase Auth
      await updateProfile(auth.currentUser!, {
        photoURL: downloadURL,
      });

      // Actualizar el estado de formUser con la nueva URL de imagen
      setFormUser((prevState) => ({ ...prevState, urlImagen: downloadURL }));
    } catch (error) {
      console.error("Error al subir la imagen: ", error);
    }
  };

  // Función para actualizar el nombre de usuario y la URL de la imagen
  const handlerUpdateUser = async () => {
    await updateProfile(auth.currentUser!, {
      displayName: formUser.name,
      photoURL: formUser.urlImagen,
    });
    setShowModal(false);
  };

  // Función para cambiar los valores del formUser
  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
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
        {/* Avatar de la imagen del perfil */}
        <Avatar.Image size={100} source={{ uri: formUser.urlImagen || "https://example.com/default-avatar.png" }} />
        
        <Button mode="outlined" onPress={pickImage}>
          Seleccionar Imagen de Perfil
        </Button>

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
