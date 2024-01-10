import React, { useState, useCallback, useRef, useEffect } from "react";
import {Alert, StyleSheet, TouchableOpacity, View, ActivityIndicator, ScrollView, Linking} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {serverIp, ytbWatchURL} from "../env/Variables";
import * as SecureStore from "expo-secure-store";
import {Block, Button, Text} from "galio-framework";

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
                <ScrollView style={styles.scrollView}>
                <Block style = {{flex:1}}>
                    <Block left>
                        <Text h4 style={{padding:10}}>{data.title}</Text>
                    </Block>
                    <Block left>
                        <Text h6 style={{padding:5}}>
                            By: {data.author}
                        </Text>
                        <Text hp style={{padding:7}}>
                            {data.content}
                        </Text>
                    </Block>
                    <Block>
                        <YoutubePlayer
                            height={300}
                            play={playing}
                            videoId={"ypxvaOhyyj8"}
                            // videoId={data.videoLink}
                            onChangeState={onStateChange}
                        />
                        <Block center>
                            <Text onPress={() => Linking.openURL(ytbWatchURL + data.videoLink)}>
                                Source: {ytbWatchURL}{data.videoLink}
                            </Text>
                            <Button round
                                    size="large"
                                    color="#7a42f4"
                                    onPress={togglePlaying}>
                                <Text style={styles.submitButtonText}>
                                    {playing ? "pause" : "play"}
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                    <Block center>
                        <Button
                            round
                            size="large"
                            color="#7a42f4"
                            onPress = { () => {deleteArticle()} }>
                            <Text style = {styles.submitButtonText}> Delete Article </Text>
                        </Button>
                        <Button
                            round
                            size="large"
                            color="#7a42f4"
                            onPress = { () => navigation.navigate("AddArticle", {
                                articleId: articleID
                            }) }>
                            <Text style = {styles.submitButtonText}> Edit Article </Text>
                        </Button>
                    </Block>
                </Block>
                </ScrollView>
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
    scrollView:{
        backgroundColor: '#f9c2ff',
    },
});
