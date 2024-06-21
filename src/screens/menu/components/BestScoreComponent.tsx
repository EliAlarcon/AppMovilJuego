import React, { useEffect, useState } from "react";
import { ModalNewComponent } from "../../../components/ModalNewComponent";
import { onValue, ref } from "firebase/database";
import { auth, dbRealTime } from "../../../configs/firebaseConfig";
import { UserPlay } from "../../play/PlayScreen";
import { Score } from "../../play/components/PunctuationComponent";

interface Props {
  showModal: boolean;
  setShowModal: Function;
}

interface ScoreResponse {
    userId: string;
  name: string;
  phone: string;
  urlImagen: string;
  scoreId: string;
  score: number;
}

const returnUserScore = (data: ScoreResponse) => {
    const user: UserPlay ={
        id: data.userId,
        name: data.name,
        phone: data.phone,
        urlImagen: data.urlImagen
    }

    const score: Score ={
        id: data.scoreId,
        score: data.score
    }

    return{
        user: user,
        score: score
    }
}

export const BestScoreComponent = ({ showModal, setShowModal }: Props) => {
  //Hook useState: para leer la data
  const [scoreData, setScoreData] = useState<Score[]>([]);
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
      const listScore: Score[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listScore.push(value);
      });
      setScoreData(listScore);
    });
  };

  const listScore = () => {
    for (let index = 0; index < scoreData.length; index++) {
      const element = scoreData[index];
    }
  };

  return (
    <ModalNewComponent
      title="Mejores Puntajes"
      showModal={showModal}
      setShowModal={setShowModal}
      children={<></>}
    />
  );
};
