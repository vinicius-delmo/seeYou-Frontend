import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 32,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  headerImageText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#D3FA3A",
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: "bold",
  },
  searchInput: {
    marginTop: 24,
    width: "100%",
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});