import React, { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { ImagePlayComponent } from "./ImagePlayComponent";
import { onValue, push, ref, set } from "firebase/database";
import { auth, dbRealTime } from "../../../configs/firebaseConfig";
import { PunctuationComponent } from "./PunctuationComponent";

interface WordData {
  id: string;
  words: string[];
}

let successes = 0;

export const WordCardComponent = () => {
  //Hook para controlar el estado del botón presionado del alfabeto
  const [pressLetter, setPressLetter] = useState<string[]>([]);

  //Hook para controlar los errores
  const [attempt, setAttempt] = useState<number>(0);

  //Hook useState: para leer la data
  const [wordData, setWordData] = useState<WordData[]>([]);

  //Hook para controlar la palabra seleccionada
  const [wordSelect, setWordSelect] = useState<string>("");

  //Hook para controlar el puntaje
  const [punctuation, setPunctuation] = useState<number>(0);

  //Hook para traer la palabra
  useEffect(() => {
    getAllWords();
  }, []);

  //Hook useState: para manipular el modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //Arreglo de palabra a adivinar
  const lettersWord: string[] = wordSelect.split("");

  //Función para obtener palabra aleatoria
  const randomWordFunction = () => {
    let ramdomId: number = Math.floor(Math.random() * wordData.length);
    if (ramdomId == 1) {
      ramdomId = 0;
    }
    const wordList = wordData[ramdomId].words;
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];
    setWordSelect(randomWord);
  };

  //Función para almacenar letras de los botones presionados
  const handlerSetValues = (letter: string) => {
    //Validación para contar el número de intentos
    if (attempt < 5) {
      if (!wordSelect.includes(letter)) {
        setAttempt(attempt + 1);
      } else {
        winePlay(letter);
      }
    } else {
      Alert.alert("Game Over", `La palabra era: ${wordSelect}`, [
        { text: "Inténtalo de nuevo", onPress: resetGame },
      ]);
    }
    setPressLetter([...pressLetter, letter]);
  };
  //console.log(pressLetter);

  //Función para contar aciertos
  const lenghtWord: number = wordSelect.length;
  const winePlay = (letter: string) => {
    lettersWord.forEach((value) => {
      if (value == letter) {
        successes = successes + 1;
        if (successes == lenghtWord) {
          Alert.alert(
            "Felicidades Ganaste!!!!",
            "Vamos con el siguiente reto",
            [{ text: "Siguiente", onPress: nextWord }]
          );
        }
      }
    });
  };

  //Función para reiniciar el juego
  const resetGame = () => {
    setPressLetter([]);
    setAttempt(0);
    successes = 0;
  };

  //Función para continuar con la siguiente palabra
  const nextWord = () => {
    setAttempt(0);
    successes = 0;
    setPressLetter([]);
    randomWordFunction();
    setPunctuation(punctuation + 10);
    console.log(punctuation);
  };

  //Función para mostrar alfabeto
  const alphabetKeyboard = () => {
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

  const splitWord = () => {
    return lettersWord.map((letter: string, index: number) => (
      <Text key={index} variant="titleLarge">
        {pressLetter.includes(letter) ? letter : "_ "}
      </Text>
    ));
  };

  //READ - CRUD
  const getAllWords = () => {
    const dbRef = ref(dbRealTime, "words/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const getKeys = Object.keys(data);
      const listWords: WordData[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listWords.push(value);
      });
      setWordData(listWords);
    });
  };

  return (
    <>
      <View style={styles.groupButtonPlay}>
        <Text onPress={() => setShowModal(true)} style={styles.buttonPlay}>Puntaje</Text>
        <Text onPress={randomWordFunction} style={styles.buttonPlay}>Empezar</Text>
      </View>
      <ImagePlayComponent attempt={attempt} />
      <View style={styles.wordContainer}>{splitWord()}</View>
      <Card>
        <View style={styles.alphabetContainer}>{alphabetKeyboard()}</View>
      </Card>
      <PunctuationComponent
        punctuation={punctuation}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};
