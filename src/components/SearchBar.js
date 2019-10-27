import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InputGroup, Input } from 'native-base';
import Voice from 'react-native-voice';
import * as Permissions from 'expo-permissions';

import Icon from "react-native-vector-icons/FontAwesome";

export default class SearchBar extends React.Component {
    async componentDidMount() {
        const { status, expires, permissions } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );
        if (status !== "granted") {
            this.setState({showRecordButton: false});
        } else {
            this.setState({showRecordButton: true});
        }
    }

    render() {
        return (
            <View style={styles.searchBar}>
                <View style={styles.inputWrapper} >
                    <InputGroup>
                        <Icon name="search" size={15} color="#a9a9a9" />
                        <Input style={styles.inputSearch} placeholder="What can I find for you?" />
                        <Icon name="microphone" size={18} color="#a9a9a9" onPress={() => console.log(Voice.getSpeechRecognitionServices())} />
                    </InputGroup>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar:{
        top: 0,
        position: "absolute",
        width: "100%"
    },
    inputSearch:{
        fontSize: 14
    },
    inputWrapper:{
        paddingLeft: 10,
        paddingRight: 15,
        marginLeft:15,
        marginRight:15,
        marginTop:20,
        marginBottom:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    }
});