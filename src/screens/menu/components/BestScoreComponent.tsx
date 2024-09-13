import React, { useEffect, useState } from "react";
import { ModalNewComponent } from "../../../components/ModalNewComponent";
import { onValue, ref, remove } from "firebase/database";
import { auth, dbRealTime } from '../../../configs/firebaseConfig';
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

interface Props {
  showModal: boolean;
  setShowModal: Function;
}

interface ScoreData {
  id: string;
  usuario: string;
  score: number;
}

export const BestScoreComponent = ({ showModal, setShowModal }: Props) => {
  //Hook useState: para leer la data
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);

  useEffect(() => {
    getAllScores();
  }, []);

  //READ - CRUD
  const getAllScores = () => {
    const dbRef = ref(dbRealTime, "score/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const getKeys = Object.keys(data);
      const listScore: ScoreData[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listScore.push(value);
      });
      setScoreData(listScore);
      console.log(listScore);
    });
  };

  return (
    <ModalNewComponent
      title="Puntajes"
      showModal={showModal}
      setShowModal={setShowModal}
      children={
        <>
          <View>
            {scoreData.length > 0 ? (
              scoreData.map((score, index) => {
                if (score.usuario) {
                  
                }
                return (
                  <Text key={index}>Usuario: {score.usuario} Puntaje: {score.score}</Text>
                )
              })
            ) : (
              <Text>No scores available</Text>
            )}
          </View>
        </>
      }
    />
  );
};
