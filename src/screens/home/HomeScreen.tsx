import React from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/fondo.png")}
        resizeMode="stretch"
        style={styles.image}
      >
        <View style={styles.groupButtonHome}>
          <Text style={styles.buttonHome} onPress={()=>{navigation.dispatch(CommonActions.navigate({name: "LoginScreen"}))}}>Jugar</Text>
          <Text style={styles.buttonHome} onPress={()=>{navigation.dispatch(CommonActions.navigate({name: "MenuScreen"}))}}>Menu</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
