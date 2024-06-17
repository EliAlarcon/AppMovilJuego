import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
//import { CommonActions, useNavigation } from "@react-navigation/native";

//Interfaz del formulario login
interface FormLogin {
  email: string;
  password: string;
}

//Interface - mensajes
interface MessageSnackbar {
  visible: boolean;
  message: string;
  color: string;
}

export const LoginScreen = () => {
  //Hook useState: formulario de inicio de sesión
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  //Hook useState: para visualiazar u ocultar mensaje
  const [showMessage, setShowMessage] = useState<MessageSnackbar>({
    visible: false,
    message: "",
    color: "#ffff",
  });

  //Hook useState: para visualizar la contraseña
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  //Hook useNavigation: para navegar entre Screens
  const navigation = useNavigation();

  //Función que cambie los valores del formLogin
  const handlerSetValues = (key: string, value: string) => {
    //operador spread: ...saca una copia superficial de un objeto
    setFormLogin({ ...formLogin, [key]: value });
  };

  //Función que permite verificar si un usuario existe
  const handlerLogin = async () => {
    //Validación para que no me permita enviar datos vacíos
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Completa todos los campos!",
        color: "#FF334F",
      });
      return;
    }
    //console.log(formLogin);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      navigation.dispatch(CommonActions.navigate({ name: "PlayScreen" }));
    } catch (ex) {
      console.log(ex);
      setShowMessage({
        visible: true,
        message: "Usuario y/o contraseña incorrecta",
        color: "#b53333",
      });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/fondo.png")}
      resizeMode="stretch"
      style={styles.image}
    >
      <View style={styles.root}>
        <Text style={styles.textTitle}>Bienvenido</Text>
        <Text style={styles.textSubtitle}>Inicia Sesión</Text>
        <TextInput
          mode="flat"
          label="Email"
          placeholder="Ingrese su email"
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("email", value)}
        />
        <TextInput
          mode="flat"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          secureTextEntry={hiddenPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setHiddenPassword(!hiddenPassword)}
            />
          }
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("password", value)}
        />
        <View style={styles.rootEnd}>
          <Button
            icon="account"
            mode="contained-tonal"
            onPress={handlerLogin}
            style={styles.button}
          >
            Iniciar Sesión
          </Button>
          <Text
            style={styles.textRedirect}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({ name: "RegisterScreen" })
              )
            }
          >
            No tienes una cuenta? Regístrate ahora
          </Text>
        </View>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
      </View>
    </ImageBackground>
  );
};
