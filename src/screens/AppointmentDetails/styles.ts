import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: "100%",
    height: 234,
    justifyContent: "flex-end",
  },
  bannerContent: {
    width: "100%",
    alignSelf: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 30,
    backgroundColor: theme.colors.overlay,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  legend: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    textAlign: "justify",
  },
  legendTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    lineHeight: 21,
  },
  wrapperMembers: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  members: {
    marginLeft: 24,
    marginTop: 12,
  },
  wrapper: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  wrapperDescription: {
    paddingHorizontal: 24,
  },
  wrapperTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    margin: getBottomSpace(),
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
  containerScroll: {
    marginBottom: 40,
  },
});
