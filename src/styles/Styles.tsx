import { Appearance, StyleSheet } from "react-native";
import { darkColors } from "../colors/DarkColors";
import { lightColors } from "../colors/LightColors";

const currentStyle = Appearance.getColorScheme();

export const styles = StyleSheet.create({
    appbarHeader: {
        backgroundColor: currentStyle === 'dark'
            ? darkColors.primaryBackground.color
            : lightColors.primaryBackground.color,
    },
    homeContainer: {
        flex: 1,
        backgroundColor: currentStyle === 'dark'
            ? darkColors.primaryBackground.color
            : lightColors.primaryBackground.color,
    },
    homeDialogContainer: {
        backgroundColor: currentStyle === 'dark'
            ? darkColors.secondaryBackground.color
            : lightColors.secondaryBackground.color,
    },
    homeFlatListIconContainer: {
        marginRight: 5,
        marginTop: 10,
    },
    homeFlatListPrimaryContainer: {
        marginHorizontal: 10,
        padding: 5,
    },
    homeFlatListSecondaryContainer: {
        borderRadius: 15,
        maxWidth: '90%',
        padding: 5,
    },
    homeFlatListText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        fontSize: 16,
        padding: 5,
        textAlignVertical: 'center',
    },
    homeInputContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
    },
    homeInput: {
        flex: 1,
        backgroundColor: currentStyle === 'dark'
            ? darkColors.primaryBackground.color
            : lightColors.primaryBackground.color,
    },
});