import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";

export const WordCardComponent = () => {
  const handlerLetter = () => {
    //Arreglo para las letras del alfabeto
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    console.log(alphabet);
    return alphabet.map((letter) => (
      <Button key={letter} onPress={() => {}}>
        {letter}
      </Button>
    ));
  };

  return (
    <>
      <Card>
        <View style={styles.alphabetContainer}>{handlerLetter()}</View>
      </Card>
    </>
  );
};
