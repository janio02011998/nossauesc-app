import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 72,
    paddingTop: getStatusBarHeight() + 24,
    paddingHorizontal: 24,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    color: theme.colors.heading,
  },
});
