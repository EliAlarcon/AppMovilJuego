import React, { useEffect, useState } from "react";
import { ModalNewComponent } from "../../../components/ModalNewComponent";
import { Button, Text } from "react-native-paper";
import { signOut } from "firebase/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { auth, dbRealTime } from "../../../configs/firebaseConfig";
import { View } from "react-native";
import { push, ref, set } from "firebase/database";

interface Props {
  showModal: boolean;
  setShowModal: Function;
  punctuation: number;
}

interface Score{
  score: number;
}

export const PunctuationComponent = ({
  showModal,
  setShowModal,
  punctuation,
}: Props) => {
  
  const [scoreReg, setScoreReg] = useState<Score>({
    score:punctuation
  })

  useEffect(() => {
    setScoreReg({...scoreReg,['score']:punctuation})
    console.log("sC"+scoreReg.score);
  }, [])
  
  const handlerSaveScore = async () => {
    const dbRef = ref(dbRealTime, "score/");
    const saveScore = push(dbRef);
    try {
      await set(saveScore, scoreReg);
    } catch (ex) {
      console.log(ex);
    }
    setShowModal(false);
  };

  return (
    <ModalNewComponent
      title="Puntaje Total"
      children={
        <View style={{ gap: 15 }}>
          <Text variant="titleSmall">
            Tu puntaje hasta el momento es de: {punctuation}
          </Text>
          <Text>Deseas almacenarlo en este momento?</Text>

          <Button mode="contained-tonal" onPress={handlerSaveScore}>
            Guardar
          </Button>
        </View>
      }
      showModal={showModal}
      setShowModal={setShowModal}
    />
  );
};
