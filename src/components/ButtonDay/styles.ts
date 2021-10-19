import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  wrapperButton: {
    height: 32,
    width: 32,
    borderRadius: 18,
    backgroundColor: theme.colors.heading,
    fontFamily: theme.fonts.title500,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.on,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  titleOverlay: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  wrapperButtonOverlay: {
    height: 32,
    width: 32,
    borderRadius: 18,
    backgroundColor: theme.colors.overlay,
    fontFamily: theme.fonts.title500,
    justifyContent: "center",
    alignItems: "center",
  },
});
