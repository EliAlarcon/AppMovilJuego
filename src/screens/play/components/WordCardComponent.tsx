import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { useEffect } from "react";

const word = "ESTUDIANTE";

export const WordCardComponent = () => {
  //Hook para controlar el estado del botón presionado del alfabeto
  const [pressLetter, setPressLetter] = useState<string[]>([]);

  //Función para almacenar letras de los botones presionados
  const handlerSetValues = (letter: string) => {
    setPressLetter([...pressLetter, letter]);
  };
  //console.log(pressLetter);

  //Función para mostrar alfabeto
  const displayAlphabet = () => {
    //Arreglo para las letras del alfabeto
    const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    //console.log(alphabet);
    return alphabet.map((letter: string) => (
      <Button
        key={letter}
        mode="text"
        labelStyle={{ fontSize: 20 }}
        onPress={() => {
          handlerSetValues(letter);
        }}
        disabled={pressLetter.includes(letter)} //Deshabilitamos el botón si la letra ya se almacenó
      >
        {letter}
      </Button>
    ));
  };

  //Función para convertir palabra en arreglo
  const splitWord = () => {
    const lettersWord: string[] = word.split("");
    //console.log(lettersWord);
    return lettersWord.map((letter: string, index: number) => (
      <Text key={index} variant="titleLarge"> {pressLetter.includes(letter) ? letter : "_"} </Text>
    ));
  };

  return (
    <>
      <View style={styles.wordContainer}>{splitWord()}</View>
      <Card>
        <View style={styles.alphabetContainer}>{displayAlphabet()}</View>
      </Card>
    </>
  );
};
