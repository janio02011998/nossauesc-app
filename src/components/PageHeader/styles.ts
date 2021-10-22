import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: theme.colors.highlight,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: "#FFF",
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
