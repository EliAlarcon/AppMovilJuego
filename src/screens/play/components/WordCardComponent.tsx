import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";

export const WordCardComponent = () => {

    //Hook para controlar el estado del botón presionado del alfabeto
    const [pressLetter, setPressLetter] = useState<string>("");

    //Función para almacenar la letra presionada
    

  const displayAlphabet = () => {
    //Arreglo para las letras del alfabeto
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    //console.log(alphabet);
    return alphabet.map((letter) => (
      <Button key={letter} onPress={() => {}}>
        {letter}
      </Button>
    ));
  };

  return (
    <>
      <Card>
        <View style={styles.alphabetContainer}>{displayAlphabet()}</View>
      </Card>
    </>
  );
};
