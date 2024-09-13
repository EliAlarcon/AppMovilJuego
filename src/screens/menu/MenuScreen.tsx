import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../../theme/styles";
import { NewPalabraComponent } from "./components/NewPalabraComponent";
import { BestScoreComponent } from "./components/BestScoreComponent";

export const MenuScreen = () => {
  //Hook useState: para manipular el modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalWord, setShowModalWord] = useState<boolean>(false);

  return (
    <ImageBackground
      source={require("../../assets/images/fondo.png")}
      resizeMode="stretch"
      style={styles.image}
    >
      <View style={styles.root}>
        <View style={styles.groupButtonMenu}>
          <Text style={styles.buttonMenu} onPress={() => setShowModal(true)}>
            Puntuaciones
          </Text>
          <Text
            style={styles.buttonMenu}
            onPress={() => setShowModalWord(true)}
          >
            Añadir Palabra
          </Text>
        </View>
        <NewPalabraComponent
          showModal={showModalWord}
          setShowModal={setShowModalWord}
        />
      </View>
      <BestScoreComponent showModal={showModal} setShowModal={setShowModal} />
    </ImageBackground>
  );
};
