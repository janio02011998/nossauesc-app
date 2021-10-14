import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop:27,
    },
    title: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        fontSize: 18,
        // marginBottom: 16,
    },
    subtitle: {
        color: theme.colors.highlight,
        fontFamily: theme.fonts.text400,
        fontSize: 18,
    }
});