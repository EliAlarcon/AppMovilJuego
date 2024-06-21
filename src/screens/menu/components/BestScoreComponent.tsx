import React, { useEffect, useState } from "react";
import { ModalNewComponent } from "../../../components/ModalNewComponent";
import { onValue, ref, remove } from "firebase/database";
import { auth, dbRealTime } from "../../../configs/firebaseConfig";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  showModal: boolean;
  setShowModal: Function;
}

interface ScoreData {
  id: string;
  score: number;
}

export const BestScoreComponent = ({ showModal, setShowModal }: Props) => {
  //Hook useState: para leer la data
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  console.log(scoreData);

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
      
    });
  };

  return (
    <ModalNewComponent
      title="Mejores Puntajes"
      showModal={showModal}
      setShowModal={setShowModal}
      children={
        <>
          <View>
            {scoreData.length > 0 ? (
              scoreData.map((score, index) => (
                <Text key={score.id}>{`${index + 1}. Score: ${
                  score.score
                }`}</Text>
              ))
            ) : (
              <Text>No scores available</Text>
            )}
          </View>
        </>
      }
    />
  );
};
