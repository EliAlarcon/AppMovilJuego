import React, { useEffect, useState } from "react";
import firebase, {
  signOut,
} from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";
import { View } from "react-native";
import { styles } from "../../theme/styles";
import {
  Avatar,
  IconButton,
  Text,
} from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { WordCardComponent } from "./components/WordCardComponent";
import { UserEditComponent } from "./components/UserEditComponent";

//Interfaz que va a tener la data del usuario
export interface User {
  name: string;
  phone: string;
  urlImagen: string;
}

export const PlayScreen = () => {
  //Hook useState: que me permita trabajar con la data del usuario autenticado
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

  //Hook useEffect: para capturar la data del usuario autenticado
  useEffect(() => {
    setUserAuth(auth.currentUser);
  }, []);

  //Hook useState: para manipular el modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //Hook de navegación
  const navigation = useNavigation();

  //Función cerrar sesión
  const handlerSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "HomeScreen" }] })
    );
  };

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Image size={50} source={{ uri: userAuth?.photoURL ?? "" }} />
          <View>
            <Text variant="bodySmall">Bienvenido</Text>
            <Text variant="labelLarge">{userAuth?.displayName}</Text>
            <Text variant="labelLarge">{userAuth?.phoneNumber}</Text>
          </View>
          <View style={styles.groupButton}>
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
      <UserEditComponent
        userAuth={userAuth!}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <WordCardComponent />
    </>
  );
};
