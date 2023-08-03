import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  info: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 16,
    marginBottom: 16,
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(0, 0, 0, 0.60)",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
  },
});