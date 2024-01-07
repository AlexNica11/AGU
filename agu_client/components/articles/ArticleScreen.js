import React, { useState, useCallback, useRef, useEffect } from "react";
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {serverIp} from "../env/Variables";
import * as SecureStore from "expo-secure-store";

export default function ArticleScreen({route, navigation}) {
    const [playing, setPlaying] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const articleID = route.params.articleId;

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const deleteArticle = async () => {
        try {
            const response = await fetch(serverIp + '/articles/' + articleID, {
                method : 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : ('Bearer ' + (await SecureStore.getItemAsync("jwt" ))),
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            navigation.goBack();
        }
    }

    const getArticle = async () => {
        try {
            const response = await fetch(serverIp + '/articles/' + articleID, {
                method : 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : ('Bearer ' + (await SecureStore.getItemAsync("jwt" ))),
                }
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getArticle();
    }, []);

    return (
        isLoading ? (
                <ActivityIndicator />
            ) :
            (
                <View>
                    <Text>{data.title}</Text>
                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = { () => {deleteArticle()} }>
                        <Text style = {styles.submitButtonText}> Delete Article </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = { () => navigation.navigate("AddArticle", {
                            articleId: articleID
                        }) }>
                        <Text style = {styles.submitButtonText}> Edit Article </Text>
                    </TouchableOpacity>
                    <Text>
                        {data.author}
                    </Text>
                    <Text>
                        {data.content}
                    </Text>
                    <View>
                        <YoutubePlayer
                            height={300}
                            play={playing}
                            videoId={"ypxvaOhyyj8"}
                            // videoId={data.videoLink}
                            onChangeState={onStateChange}
                        />
                        <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
                    </View>
                </View>
            )
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