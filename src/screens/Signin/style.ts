import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 360,
  },
  content: {
    marginTop: -40,
    paddingHorizontal: 50,
  },
  title: {
    color: theme.colors.heading,
    textAlign: "center",
    fontSize: 40,
    fontFamily: theme.fonts.title700,
    lineHeight: 40,
    // marginBottom: 16,
  },
  subtitle: {
    color: theme.colors.heading,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 25,
    marginTop: -40,
    marginBottom: 16,
    fontFamily: theme.fonts.title500,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  buttonWithoutLogin: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.secondary60,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    fontFamily: theme.fonts.title500,
    color: theme.colors.overlay,
  },
  buttonTextWithLogin: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.title500,
    fontSize: 22,
    alignSelf: "center",
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  wrapper: {},
});
