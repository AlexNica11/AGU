import React, { useState, useCallback, useRef } from "react";
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ArticleScreen({navigation}) {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View>
            <Text>Title</Text>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = { () => {} }>
                <Text style = {styles.submitButtonText}> Delete Article </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = { () => navigation.navigate("AddArticle") }>
                <Text style = {styles.submitButtonText}> Edit Article </Text>
            </TouchableOpacity>
            <Text>
                Article text
            </Text>
            <View>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={"ypxvaOhyyj8"}
                    onChangeState={onStateChange}
                />
                <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    },
});