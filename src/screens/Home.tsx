import React, { useEffect } from 'react';
import { Appearance, FlatList, View } from 'react-native';
import { styles } from '../styles/Styles';
import { Appbar, Button, Dialog, Icon, Modal, Portal, Surface, Text, TextInput } from 'react-native-paper';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import axios from 'axios';
import { GeminiResponseInterface } from '../interfaces/GeminiResponseInterface';
import { MessagesInterface } from '../interfaces/MessagesInterface';
import { API_KEY } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

export const Home: React.FC = () => {

    const [loading, setLoading] = React.useState(false);
    const [messages, setMessages] = React.useState<MessagesInterface[]>([]);
    const [showModal, setShowModal] = React.useState(false);
    const [text, setText] = React.useState('');

    let messagesData: MessagesInterface[] = [];

    const flatListRef = React.useRef<FlatList>(null);

    const colors = Appearance.getColorScheme();
    const currentStyle = colors === 'dark' ? darkColors : lightColors;

    const deleteData = async () => {
        try {
            setLoading(true);
            await AsyncStorage.removeItem('messages')
                .then(() => {
                    console.log('Data deleted');
                });
            messagesData = [];
            setMessages([]);
            setLoading(false);
            setShowModal(false);
        } catch (e) {
            console.error(e);
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('messages');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    };

    const sendPrompt = async () => {
        try {

            setLoading(true);
            console.log('User:', text);

            setMessages(messages => [...messages, { author: 'user', message: text }]);
            setText('');

            messagesData = [...messages, { author: 'user', message: text }];

            flatListRef.current?.scrollToEnd({
                animated: true,
            });

            await axios.post<GeminiResponseInterface>('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: text
                            }
                        ]
                    }
                ]
            },
                {
                    params: {
                        key: API_KEY
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            )
                .then((response) => {
                    console.log('Bot:', response.data.candidates[0].content.parts[0].text);
                    setMessages(messages => [...messages, { author: 'bot', message: response.data.candidates[0].content.parts[0].text }]);

                    messagesData = [...messagesData, { author: 'bot', message: response.data.candidates[0].content.parts[0].text }];
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    flatListRef.current?.scrollToEnd({
                        animated: true,
                    });

                    storeData(messagesData)
                    setLoading(false);
                });
        }
        catch (err) {
            console.error(err);
        }
    };

    const storeData = async (value: MessagesInterface[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('messages', jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData()
            .then((data) => {
                if (data) {
                    messagesData = data;
                    setMessages(data);
                }
            });
    }, []);

    return (
        <View style={styles.homeContainer}>

            <Appbar.Header
                mode='center-aligned'
                style={styles.appbarHeader}
            >
                <Appbar.Content
                    title="GeniusChat"
                />
                <Appbar.Action
                    icon="trash-can"
                    onPress={() => setShowModal(true)}
                />
            </Appbar.Header>

            <FlatList
                data={messages}
                ref={flatListRef}
                renderItem={({ item }) => (
                    <View style={[
                        styles.homeFlatListPrimaryContainer,
                        {
                            flexDirection: item.author === 'user'
                                ? 'row-reverse'
                                : 'row',
                            alignItems: item.author === 'user'
                                ? 'flex-end'
                                : 'flex-start',
                        }
                    ]}>
                        {item.author === 'bot' && (
                            <View style={styles.homeFlatListIconContainer}>
                                <Icon
                                    color={currentStyle.primaryText.color}
                                    size={20}
                                    source={"creation"}
                                />
                            </View>
                        )}
                        <View
                            style={[
                                styles.homeFlatListSecondaryContainer,
                                {
                                    backgroundColor: item.author === 'user'
                                        ? currentStyle.secondaryBackground.color
                                        : currentStyle.primaryBackground.color,
                                }
                            ]}
                        >
                            <Text
                                style={styles.homeFlatListText}
                            >
                                {item.message}
                            </Text>
                        </View>
                    </View>
                )}
            />

            <View style={styles.homeInputContainer}>
                <TextInput
                    activeOutlineColor={currentStyle.primaryText.color}
                    activeUnderlineColor={currentStyle.primaryText.color}
                    cursorColor={currentStyle.primaryText.color}
                    disabled={loading}
                    label={"Message"}
                    mode='outlined'
                    outlineColor={currentStyle.primaryText.color}
                    right={<TextInput.Icon
                        disabled={loading}
                        icon={"send"}
                        loading={loading}
                        onPress={sendPrompt}
                    />}
                    selectionColor={currentStyle.secondaryText.color}
                    style={styles.homeInput}
                    textColor={currentStyle.primaryText.color}
                    underlineColor={currentStyle.primaryText.color}
                    value={text}
                    onChangeText={text => setText(text)}
                />
            </View>

            <Portal>
                <Dialog
                    style={styles.homeDialogContainer}
                    visible={showModal}
                    onDismiss={() => setShowModal(false)}
                >
                    <Dialog.Title>
                        Confirmation
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            Are you sure you want to delete all messages?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={deleteData}
                        >
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}