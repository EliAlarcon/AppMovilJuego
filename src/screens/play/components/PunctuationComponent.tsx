import React, { useEffect, useState } from "react";
import { ModalNewComponent } from "../../../components/ModalNewComponent";
import { Button, Text } from "react-native-paper";
import { auth, dbRealTime } from "../../../configs/firebaseConfig";
import { View } from "react-native";
import { onValue, push, ref, set, update } from "firebase/database";

interface Props {
  showModal: boolean;
  setShowModal: Function;
  punctuation: number;
}

interface Score{
  id: string;
  usuario: string;
  score: number;
}

export const PunctuationComponent = ({
  showModal,
  setShowModal,
  punctuation,
}: Props) => {
  
  const [scoreReg, setScoreReg] = useState<Score>({
    id: auth.currentUser?.uid || "anonymous",
    usuario: auth.currentUser?.displayName || "Anónimo",
    score:punctuation
  })

  useEffect(() => {
    setScoreReg((prev) => ({
      ...prev,
      score: punctuation
    }));
  }, [punctuation]);
  
  // Función para verificar si ya existe una puntuación para el usuario
  const checkIfScoreExists = async () => {
    const dbRef = ref(dbRealTime, `score/${auth.currentUser?.uid}`);
    return new Promise<boolean>((resolve) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        resolve(!!data);  // Retorna true si hay datos, false si no
      });
    });
  };

  // Función para guardar o actualizar la puntuación
  const handlerSaveScore = async () => {
    const dbRef = ref(dbRealTime, "score/");
    const saveScore = push(dbRef);
    try {

      // Verifica si ya existe una puntuación para el usuario
      const scoreExists = await checkIfScoreExists();

      if (scoreExists) {
        // Si ya existe, actualiza la puntuación
        await update(dbRef, { score: scoreReg.score });
        console.log("Puntaje actualizado con éxito.");
      } else {
      await set(saveScore, scoreReg);
      console.log("Puntaje guardado con éxito.");
      }
    } catch (error) {
      console.log("Error al guardar el puntaje: ", error);
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
