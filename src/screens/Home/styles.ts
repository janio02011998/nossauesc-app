import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getStatusBarHeight() + 26,
    marginBottom: 42,
  },
  matches: {
    height: 225,
    marginTop: 24,
    marginLeft: 24,
  },
  switchSearch: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingBottom: 12,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  separtorView: {
    height: 42,
    borderLeftWidth: 1,
    borderLeftColor: "white",
  },
});
