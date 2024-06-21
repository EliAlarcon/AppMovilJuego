import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#000000c0",
  },
  inputs: {
    width: "90%",
  },
  button: {
    width: "90%",
    backgroundColor: "#FDFEFE",
  },
  rootEnd: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textRedirect: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FDFEFE",
  },
  rootHome: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  iconEnd: {
    alignItems: "flex-end",
    flex: 1,
  },
  groupButton: {
    flexDirection: 'row-reverse',
    left: '20%'
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    gap: 10,
  },
  rootMessage: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  fabMessage: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textTitle: {
    color: "#FDFEFE",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSubtitle: {
    color: "#FDFEFE",
    fontSize: 22,
    textAlign: "center",
  },
  buttonHome: {
    backgroundColor: "#E5E7E9",
    borderColor: "#17202A",
    borderStyle: "dashed",
    borderWidth: 3,
    width: "35%",
    height: "20%",
    alignContent: "center",
    borderRadius: 0,
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  groupButtonHome: {
    alignItems: "flex-end",
    gap: 25,
    marginTop: 42,
  },
  alphabetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center'
  },
  cardImagePlay: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    height: "40%",
    justifyContent:'center',
    marginHorizontal: 30
  },
  imagePlay:{
    height:"90%",
    width: 300
  },
  textInput:{
    borderColor: "#17202A",
    borderStyle: "dashed",
    borderWidth: 3,
  },
  groupButtonPlay: {
    flexDirection: 'row',
    gap: 50,
    marginTop: 42,
    justifyContent: 'center',
    paddingBottom: 30
  },

  buttonPlay: {
    backgroundColor: "#E5E7E9",
    borderColor: "#17202A",
    borderStyle: "dashed",
    borderWidth: 2,
    width: "35%",
    borderRadius: 0,
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  groupButtonMenu: {
    alignItems: 'center',
    gap: 60
  },
  buttonMenu: {
    backgroundColor: "#E5E7E9",
    borderColor: "#17202A",
    borderStyle: "dashed",
    borderWidth: 3,
    width: 300,
    height: "25%",
    alignContent: "center",
    borderRadius: 0,
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "bold",
    paddingHorizontal: '10%',
    justifyContent: 'center'
  },
});
