import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#706E64",
    borderRadius: 5,
    padding: 20,
    width: "80%",
  },
  input: {
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: "#FFF",
    marginBottom: 8,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonRegister: {
    width: "45%",
    backgroundColor: "#D3FA3A",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonCancel: {
    width: "45%",
    backgroundColor: "#B6B4B4",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonProfileImage: {
    width: "100%",
    backgroundColor: "#B6B4B4",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  titleModal: {
    color: "#D3FA3A",
    fontFamily: "Roboto",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});