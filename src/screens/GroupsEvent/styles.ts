import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f7",
  },
  wrapper: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.secondary100,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
