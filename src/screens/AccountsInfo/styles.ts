import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  avatar: {
    width: 126,
    height: 126,
    borderRadius: 63,
    marginBottom: 15,
  },
  banner: {
    width: "100%",
    resizeMode: "contain",
  },

  title: {
    fontFamily: theme.fonts.text400,
    color: "#FFF",
    fontSize: 18,
    lineHeight: 30,
    marginTop: 5,
  },

  titleBold: {
    fontFamily: theme.fonts.title500,
  },

  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 25,
    justifyContent: "space-between",
  },

  button: {
    height: 125,
    width: "48%",
    backgroundColor: theme.colors.secondary30,
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
  },

  buttonPrimary: {
    backgroundColor: theme.colors.secondary60,
  },

  buttonSecondary: {
    backgroundColor: theme.colors.secondary30,
  },

  buttonText: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 20,
  },

  totalConnections: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 20,
  },

  input: {
    flex: 1,
    height: 40,
    marginVertical: 4,
    borderRadius: 8,
    padding: 10,
    backgroundColor: theme.colors.heading,
  },
  titleButton: {
    fontFamily: theme.fonts.title700,
    color: "#FFF",
    fontSize: 20,
  },
  buttonConfirm: {
    backgroundColor: theme.colors.secondary60,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  select: {
    flexDirection: "row",
    width: "100%",
    height: 64,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    paddingRight: 25,
    overflow: "hidden",
    marginTop: 15,
  },
  image: {
    width: 64,
    height: 68,
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
  },
  selectBody: {
    flex: 1,
    alignItems: "center",
  },
  containerAct: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalAct: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  field: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  caracteresLimit: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // header: {
  //   width: "100%",
  //   paddingHorizontal: 24,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: getStatusBarHeight() + 26,
  //   marginBottom: 42,
  // },
  // avatar: {
  //   width: 126,
  //   height: 126,
  //   borderRadius: 50,
  // },
  // selectBody: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // label: {
  //   fontSize: 18,
  //   fontFamily: theme.fonts.title700,
  //   color: theme.colors.heading,
  // },
  // form: {
  //   paddingHorizontal: 24,
  //   marginTop: 32,
  // },
  // select: {
  //   flexDirection: "row",
  //   width: "100%",
  //   height: 68,
  //   borderColor: theme.colors.secondary50,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   paddingRight: 25,
  //   overflow: "hidden",
  // },
  // image: {
  //   width: 64,
  //   height: 68,
  //   backgroundColor: theme.colors.secondary40,
  //   borderRadius: 8,
  //   borderColor: theme.colors.secondary50,
  //   borderWidth: 1,
  // },
  // buttonPrimary: {
  //   backgroundColor: "#9871f5",
  // },

  // buttonSecondary: {
  //   backgroundColor: "#04d361",
  // },

  // buttonText: {
  //   fontFamily: theme.fonts.title700,
  //   color: "#FFF",
  //   fontSize: 20,
  // },
  // buttonsContainer: {
  //   flexDirection: "row",
  //   marginTop: 40,
  //   justifyContent: "space-between",
  // },

  // button: {
  //   height: 150,
  //   width: "48%",
  //   backgroundColor: "#333",
  //   borderRadius: 8,
  //   padding: 24,
  //   justifyContent: "space-between",
  // },
});
