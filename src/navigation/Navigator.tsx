import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Home } from '../screens/Home';
import { Appearance, StatusBar } from 'react-native';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';

const Stack = createStackNavigator();

export const Navigator: React.FC = () => {

    const style = Appearance.getColorScheme() === 'dark' ? darkColors : lightColors;

    useEffect(() => {
        StatusBar.setBackgroundColor(style.primaryBackground.color);
        StatusBar.setBarStyle(style.primaryText.color === '#fff' ? 'light-content' : 'dark-content');
    }, []);

    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}