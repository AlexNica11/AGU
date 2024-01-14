import React, {Component} from "react";
import {StyleSheet, TextInput, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView} from 'react-native'
import {serverIp, ytbWatchURL} from "../env/Variables";
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
        sources: [''],
        videoLinks : [''],
        imageLinks : [''],
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
                this.setState( {sources: json.sources});
                this.setState( {videoLinks: json.videoLinks});
                this.setState( {imageLinks: json.imageLinks});
                this.setState( {request: 'PUT'});
            } catch (error) {
                console.error(error);
            }
        }
        this.setState( {isLoading: false});
    };

    addArticle = async () => {
        if (!(this.state.title && this.state.content)) {
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
                    sources: this.state.sources,
                    videoLinks: this.state.videoLinks,
                    imageLinks: this.state.imageLinks,
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
                        <Block style = {styles.container} center>
                            <Text>
                                ImageLink 0 will be used as head image for the article
                            </Text>
                            { this.state.imageLinks.map((source, index) => <Input
                                color={"#7a42f4"}
                                style={{ borderColor: "#9a73ef" }}
                                underlineColorAndroid = "transparent"
                                placeholder = {"ImageLink" + " " + index}
                                placeholderTextColor = "#9a73ef"
                                autoCapitalize = "none"
                                value = {this.state.imageLinks.at(index)}
                                onChangeText = { (text) => {
                                    this.state.imageLinks[index]=text;
                                    this.setState( {sources: this.state.imageLinks} )
                                    // console.log(this.state.imageLinks);
                                }}/>)}
                            <Button
                                round
                                size="large"
                                color="#7a42f4"
                                onPress = {() => {
                                    // this.setState( {content: this.state.content + 'text'} )
                                    this.state.imageLinks.push('')
                                    this.setState({imageLinks: this.state.imageLinks});
                                }}>
                                <Text style = {styles.submitButtonText}> Add one Image link </Text>
                            </Button>
                            <Button
                                round
                                size="large"
                                color="#7a42f4"
                                onPress = {() => {
                                    // this.setState( {content: this.state.content + 'text'} )
                                    if(this.state.imageLinks.length > 1) {
                                        this.state.imageLinks.pop();
                                    }
                                    this.setState({imageLinks: this.state.imageLinks});
                                }}>
                                <Text style = {styles.submitButtonText}> Delete last Image link </Text>
                            </Button>
                        </Block>
                        <Block style = {styles.container} center>
                            <Text>
                                Only YouTube links are supported
                            </Text>
                            { this.state.videoLinks.map((source, index) => <Input
                                color={"#7a42f4"}
                                style={{ borderColor: "#9a73ef" }}
                                underlineColorAndroid = "transparent"
                                placeholder = {"VideoLink" + " " + index}
                                placeholderTextColor = "#9a73ef"
                                autoCapitalize = "none"
                                value = {this.state.videoLinks.at(index)}
                                onChangeText = { (text) => {
                                    this.state.videoLinks[index]=text.replace(ytbWatchURL, '');
                                    this.setState( {videoLinks: this.state.videoLinks} )
                                    // console.log(this.state.videoLinks);
                                }}/>)}
                            <Button
                                round
                                size="large"
                                color="#7a42f4"
                                onPress = {() => {
                                    // this.setState( {content: this.state.content + 'text'} )
                                    this.state.videoLinks.push('')
                                    this.setState({videoLinks: this.state.videoLinks});
                                }}>
                                <Text style = {styles.submitButtonText}> Add one Video link </Text>
                            </Button>
                            <Button
                                round
                                size="large"
                                color="#7a42f4"
                                onPress = {() => {
                                    // this.setState( {content: this.state.content + 'text'} )
                                    if(this.state.videoLinks.length > 1) {
                                        this.state.videoLinks.pop();
                                    }
                                    this.setState({videoLinks: this.state.videoLinks});
                                }}>
                                <Text style = {styles.submitButtonText}> Delete last Video link </Text>
                            </Button>
                        </Block>
                        <Block style = {styles.container} center>
                            { this.state.sources.map((source, index) => <Input
                                color={"#7a42f4"}
                                style={{ borderColor: "#9a73ef" }}
                                underlineColorAndroid = "transparent"
                                placeholder = {"Source" + " " + index}
                                placeholderTextColor = "#9a73ef"
                                autoCapitalize = "none"
                                value = {this.state.sources.at(index)}
                                onChangeText = { (text) => {
                                    this.state.sources[index]=text;
                                    this.setState( {sources: this.state.sources} )
                                    // console.log(this.state.sources);
                                }}/>)}
                            <Button
                                round
                                size="large"
                                color="#7a42f4"
                                onPress = {() => {
                                    // this.setState( {content: this.state.content + 'text'} )
                                    this.state.sources.push('')
                                    this.setState({sources: this.state.sources});
                                }}>
                                <Text style = {styles.submitButtonText}> Add one Sources link </Text>
                            </Button>
                            <Button
                                round
                                size="large"
                                color="#7a42f4"
                                onPress = {() => {
                                    // this.setState( {content: this.state.content + 'text'} )
                                    if(this.state.sources.length > 1) {
                                        this.state.sources.pop()
                                    }
                                    this.setState({sources: this.state.sources});
                                }}>
                                <Text style = {styles.submitButtonText}> Delete last Sources link </Text>
                            </Button>
                        </Block>
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
