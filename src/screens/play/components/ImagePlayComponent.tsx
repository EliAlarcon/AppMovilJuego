import React from "react";
import { Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";

//Interfaz Props
interface Props {
  attempt: number;
}

const rutasImagen = [
  require("../../../assets/images/ahorcado-0.png"),
  require("../../../assets/images/ahorcado-1.png"),
  require("../../../assets/images/ahorcado-2.png"),
  require("../../../assets/images/ahorcado-3.png"),
  require("../../../assets/images/ahorcado-4.png"),
  require("../../../assets/images/ahorcado-5.png"),
  require("../../../assets/images/ahorcado-6.png"),
];
export const ImagePlayComponent = ({ attempt }: Props) => {
  const rutaImagen = rutasImagen[attempt];

  return (
    <Card style={styles.cardImagePlay}>
      <Image source={rutaImagen} style={styles.imagePlay} />
    </Card>
  );
};
