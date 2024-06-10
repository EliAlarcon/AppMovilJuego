import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//Interfaz para manejo de formulario de Registro
interface FormRegister {
  email: string;
  password: string;
}

//Interface - mensajes
interface MessageSnackbar {
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  //Hook useState: para manejo de formulario
  const [formRegister, setFormRegister] = useState<FormRegister>({
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
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(false)

  //Hook useNavigation: para navegar entre Screens
  const navigation = useNavigation();

  //Función para cambiar los valores de nuestro formulario
  const handlerSetValues = (key: string, value: string) => {
    //operador spread: ...saca una copia superficial de un objeto
    setFormRegister({ ...formRegister, [key]: value });
  };

  //Función para validar el correo
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Función para enviar la data y crear usuario nuevo
  const handlerRegister = async () => {
    //Validación para que no me permita enviar datos vacíos
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: "Completa todos los campos!",
        color: "#FF334F",
      });
      return;
    } else {
      if (!isValidEmail(formRegister.email)) {
        setShowMessage({
          visible: true,
          message: "Correo no válido!",
          color: "#FF334F",
        });
        return;
      }
    }
    //console.log(formRegister);
    //Código para registrar usuario
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: "Registro exitoso!",
        color: "#16AD01",
      });
    } catch (ex) {
      console.log(ex);
      setShowMessage({
        visible: true,
        message: "No se completó el registro. Inténtelo mas tarde",
        color: "#FF334F",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text variant="displaySmall">Registro</Text>
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
        style={styles.inputs}
        secureTextEntry={hiddenPassword}
        right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
        onChangeText={(value) => handlerSetValues("password", value)}
      />
      <Button
        icon="account-plus"
        mode="contained-tonal"
        style={styles.button}
        onPress={handlerRegister}
      >
        Registrarse
      </Button>
      <Text
        style={styles.textRedirect}
        onPress={() => navigation.dispatch(CommonActions.navigate({name: "Login"}))}
      >
        Ya tienes una cuenta? Inicia Sesión
      </Text>
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
