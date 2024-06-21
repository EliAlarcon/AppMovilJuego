import React, { useState } from "react";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { ModalNewComponent } from "../../../components/ModalNewComponent";
import { View } from "react-native";
import { push, ref, set } from "firebase/database";
import { dbRealTime } from "../../../configs/firebaseConfig";
import { MessageSnackbar, MessagesSnackbarComponent } from "../../../components/MessagesSnackbarComponent";

interface Props {
  showModal: boolean;
  setShowModal: Function;
}

interface Word {
  words: string[];
}

export const NewPalabraComponent = ({ showModal, setShowModal }: Props) => {
  //Hook para controlar el input de inserción de palabras
  const [formWord, setFormWord] = useState<Word>({
    words: [],
  });

  //Hook useState: para visualiazar u ocultar mensaje
  const [showMessage, setShowMessage] = useState<MessageSnackbar>({
    visible: false,
    message: "",
    color: "#ffff",
  });

  //Función para cambiar valores del input de palabras
  const hadlerSetValues = (key: string, value: string[]) => {
    setFormWord({ ...formWord, [key]: value });
  };

  //Función para guardar arreglo de palabras
  const handlerSaveWord = async () => {
    if (!formWord.words) {
      return;
    }
    const dbRef = ref(dbRealTime, "words/");
    const saveWord = push(dbRef);
    try {
      await set(saveWord, formWord);
      setShowMessage({
        visible: true,
        message: "Las palabras se registraron correctamente",
        color: "#16AD01",
      });
    } catch (ex) {
      console.log(ex);
    }
    setShowModal(false);
    //console.log(formWord);
  };

  return (
    <ModalNewComponent
      title={"Nuevas Palabras"}
      children={
        <View style={{ gap: 15 }}>
          <Text variant="titleSmall">
            Inserta las palabras que deseas agregar al juego.
          </Text>
          <Text>
            NOTA: Las palabras deben estar separadas solo por una coma
          </Text>
          <TextInput
            label="Ejemplo: LEON,CABALLO,IGUANA"
            multiline={true}
            numberOfLines={5}
            onChangeText={(value) => hadlerSetValues("words", value.split(","))}
          />
          <Button
            mode="contained-tonal"
            onPress={() => {
              handlerSaveWord();
            }}
          >
            Guardar
          </Button>
          <MessagesSnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage}/>
        </View>
      }
      showModal={showModal}
      setShowModal={setShowModal}
    />
  );
};
