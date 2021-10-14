import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 360,   
    },
    content: {
        marginTop: -40,
        paddingHorizontal: 50,
    },
    title: {
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: theme.fonts.title700,
        lineHeight: 40,
        // marginBottom: 16,
    },
    subtitle: {
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 25,
        marginTop: -40,
        marginBottom: 64,
        fontFamily: theme.fonts.title500,
    }
});