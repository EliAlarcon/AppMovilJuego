import React, { useEffect, useId, useState } from "react";
import firebase, { signOut, updatePhoneNumber, updateProfile } from "firebase/auth";
import { auth } from '../../configs/firebaseConfig';
import { View } from "react-native";
import { styles } from "../../theme/styles";
import { Avatar, Button, Divider, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";

//Interfaz que va a tener la data del usuario
interface FormUser {
  name: string;
  phone: string;
  urlImagen: string;
}

export const PlayScreen = () => {
  //Hook useState: para ir trabajando la data del usuario
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
    phone: "",
    urlImagen: ""
  });

  //Hook useState: que me permita trabajar con la data del usuario autenticado
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

  //Hook useEffect: para capturar la data del usuario autenticado
  useEffect(() => {
    setUserAuth(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "N/A",
        phone: auth.currentUser?.phoneNumber?? "",
        urlImagen: auth.currentUser?.photoURL?? ""
     });
     
     
  }, []);

  //Hook useState: para manipular el modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //Hook de navegación
  const navigation = useNavigation();

  //Función que cambie los valores del formUser
  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  //Función actualizar la data del usuario autenticado
  const handlerUpdateUser = async () => {
    await updateProfile(userAuth!, {
      displayName: formUser.name,
      photoURL: formUser.urlImagen
    },
);
    setShowModal(false);
  };

  //Función cerrar sesión
  const handlerSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "HomeScreen" }] })
    );
  };

  //Función para actualizar el número de teléfono
  const handlerUpdatePhone = async () => {
    await updatePhoneNumber
    setShowModal(false);
  }

  
  return (
    <>
    <View style={styles.rootHome}>
    <View style={styles.header}>
          <Avatar.Image size={50} source={{uri: userAuth?.photoURL??""}} />
          <View>
            <Text variant="bodySmall">Bienvenido</Text>
            <Text variant="labelLarge">{userAuth?.displayName}</Text>
            <Text variant="labelLarge">{userAuth?.phoneNumber}</Text>
          </View>
          <View style={styles.iconEnd}>
            <IconButton
              icon="logout"
              mode="contained"
              size={32}
              onPress={handlerSignOut}
            />
            <IconButton
              icon="account-edit"
              mode="contained"
              size={32}
              onPress={() => setShowModal(true)}
            />
          </View>
        </View>
    </View>
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
    </>
  )
};