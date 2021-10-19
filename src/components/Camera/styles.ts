import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  addButton: {
    backgroundColor: theme.colors.secondary40,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
