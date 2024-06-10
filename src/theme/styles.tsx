import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 11
    },
    inputs:{
        width:'90%'
    },
    button:{
        width:'90%'
    },
    textRedirect: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5322af'
    },
    rootHome:{
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 25
    },
    header: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    iconEnd: {
        alignItems: "flex-end",
        flex: 1
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        gap: 10
    },
    rootMessage:{
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center'
    },
    fabMessage: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})