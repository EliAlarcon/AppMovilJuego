import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "../theme/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";

const Stack = createStackNavigator();

//Interfaz de rutas
interface Routes {
  name: string;
  screen: () => JSX.Element; //elemento JSX
}

//Arreglo que contenga las rutas si el usuario no está autenticado
const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: RegisterScreen },
];

//Arreglo que contenga las rutas si el usuario está autenticado
const routesAuth: Routes[] = [{ name: "Home", screen: HomeScreen }];

export const StackNavigator = () => {
  //Hook useState: verifica si está autenticado o no
  const [isAuth, setIsAuth] = useState<boolean>(false);

  //Hook useState: controlar la carga del activity
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Hook useEffect: validar y obtener la data del usuario atenticado
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      //Si existe un usuario authenticado
      if (user) {
        //console.log(user);
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.root}>
          <ActivityIndicator size={25} />
        </View>
      ) : (
        <Stack.Navigator>
          {!isAuth
            ? routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))
            : routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))}
        </Stack.Navigator>
      )}
    </>
  );
};
