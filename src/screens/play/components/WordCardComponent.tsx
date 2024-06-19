import React, { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { ref } from "firebase/storage";
import { storageRef } from "../../../configs/firebaseConfig";
import { ImagePlayComponent } from "./ImagePlayComponent";

const word = "ESTUDIANTE";

export const WordCardComponent = () => {
  //Hook para controlar el estado del botón presionado del alfabeto
  const [pressLetter, setPressLetter] = useState<string[]>([]);

  //Hook para controlar los errores
  const [attempt, setAttempt] = useState(0);

  //Función para almacenar letras de los botones presionados
  const handlerSetValues = (letter: string) => {
    //Validación para contar el número de intentos
    if (attempt < 6) {
      if (!word.includes(letter)) {
        setAttempt(attempt + 1);
      }
    } else {
      Alert.alert("Game Over", `La palabra era: ${word}`, [
        { text: "Inténtalo de nuevo", onPress: resetGame },
      ]);
    }
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

  //Función para convertir la palabra en arreglo
  const splitWord = () => {
    const lettersWord: string[] = word.split("");
    //console.log(lettersWord);
    return lettersWord.map((letter: string, index: number) => (
      <Text key={index} variant="titleLarge">
        {pressLetter.includes(letter) ? letter : "_ "}
      </Text>
    ));
  };

  //Función para reiniciar el juego
  const resetGame = () => {
    setPressLetter([]);
    setAttempt(0);
  };

  return (
    <>
      <ImagePlayComponent attempt={attempt} />
        <View style={styles.wordContainer}>{splitWord()}</View>
      <Card>
        <View style={styles.alphabetContainer}>{displayAlphabet()}</View>
      </Card>
    </>
  );
};
