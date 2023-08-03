import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    width: 350,
    height: 60,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 10,
  },
  leftContent: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  subTitle: {
    color: "rgba(0, 0, 0, 0.50)",
    fontFamily: "Roboto",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});