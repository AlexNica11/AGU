import React, {Component} from "react";
import {StyleSheet, TextInput, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView} from 'react-native'
import {serverIp} from "../env/Variables";
import * as SecureStore from "expo-secure-store";
import {Block, Button, Input, Text} from "galio-framework";

export default class AddArticle extends Component{
    constructor(props) {
        super(props);
    }

    //this.props.route.params.articleId

    state = {
        articleID: '',
        title : '',
        content : '',
        videoLink : '',
        pictureLink : '',
        isLoading: true,
        request: 'POST'
    }

    getArticle = async () => {
        if(this.props.route.params !== undefined && this.props.route.params !== null){
            try {
                const response = await fetch(serverIp + '/articles/' + this.props.route.params.articleId, {
                    method : 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization' : ('Bearer ' + (await SecureStore.getItemAsync("jwt" ))),
                    }
                });
                const json = await response.json();
                this.setState( {articleID: json.id});
                this.setState( {title: json.title});
                this.setState( {content: json.content});
                this.setState( {videoLink: json.videoLink});
                this.setState( {request: 'PUT'});
            } catch (error) {
                console.error(error);
            }
        }
        this.setState( {isLoading: false});
    };

    addArticle = async () => {
        if (!(this.state.title && this.state.content && this.state.videoLink)) {
            Alert.alert('Invalid input', 'Input fields cannot be empty');
        } else {
            fetch(serverIp + '/articles' + (this.state.request === 'PUT' ? '/' + this.state.articleID : ''), {
                method: this.state.request,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': ('Bearer ' + (await SecureStore.getItemAsync("jwt"))),
                },
                body: JSON.stringify({
                    // author: this.state.author,
                    author: await SecureStore.getItemAsync("username"),
                    title: this.state.title,
                    content: this.state.content,
                    videoLink: this.state.videoLink,
                    // pictureLink: this.state.pictureLink,
                })
            }).catch(error => {
                console.error(error);
            });
        }
    };

    componentDidMount = () => {
        this.getArticle();
    };

    render() {
        return(
            this.state.isLoading ? (
                    <ActivityIndicator />
                ) :
                (
                    <ScrollView style={styles.scrollView}>
                    <Block style = {styles.container} center>
                        <Text h6 style={{padding:5}} >Add Article</Text>
                        <Input
                               color={"#7a42f4"}
                               style={{ borderColor: "#9a73ef" }}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Title"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.title}
                                   onChangeText = { (text) => { this.setState( {title: text} ) }}/>

                        <Input
                            multiline
                            maxLength={255}
                            color={"#7a42f4"}
                            style={{
                                borderColor: "#9a73ef",
                                height: 150,
                            }}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Content"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.content}
                                   onChangeText = { (text) => { this.setState( {content: text} ) }}/>
                        <Input
                            color={"#7a42f4"}
                            style={{ borderColor: "#9a73ef" }}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Video Url"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.videoLink}
                                   onChangeText = { (text) => { this.setState( {videoLink: text} ) }}/>
                        <Input
                            color={"#7a42f4"}
                            style={{ borderColor: "#9a73ef" }}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Image Url"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.pictureLink}
                                   onChangeText = { (text) => { this.setState( {pictureLink: text} ) }}/>
                        <Button
                            round
                            size="large"
                            color="#7a42f4"
                            onPress = {
                                () => {
                                    this.addArticle();
                                    this.props.navigation.goBack();
                                }
                            }>
                            <Text style = {styles.submitButtonText}> Submit </Text>
                        </Button>
                        <Text>
                            Add support for pictures{"\n"}
                            Only YouTube links are supported
                        </Text>
                    </Block>
                    </ScrollView>
                )
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        flex: 1,
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
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
