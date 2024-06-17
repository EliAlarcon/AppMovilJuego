import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "../theme/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { HomeScreen } from "../screens/home/HomeScreen";
import { PlayScreen } from "../screens/play/PlayScreen";

const Stack = createStackNavigator();

//Interfaz de rutas
interface Routes {
  name: string;
  screen: () => JSX.Element; //elemento JSX
  headerShown?: boolean;
}

//Arreglo con las rutas de la aplicación
const routes: Routes[] = [
  { name: "LoginScreen", screen: LoginScreen },
  { name: "RegisterScreen", screen: RegisterScreen },
  { name: "HomeScreen", screen: HomeScreen },
  { name: "PlayScreen", screen: PlayScreen },
];

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
        <Stack.Navigator initialRouteName={isAuth ? "PlayScreen" : "LoginScreen"}>
          {routes.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              options={{ headerShown: item.headerShown ?? false }}
              component={item.screen}
            />
          ))}
        </Stack.Navigator>
      )}
    </>
  );
};
