import React, {Component} from "react";
import {StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import {serverIp} from "../env/Variables";

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
        // pictures : [],
        isLoading: true,
        request: 'POST'
    }

    getArticle = async () => {
        if(this.props.route.params !== undefined && this.props.route.params !== null){
            try {
                const response = await fetch(serverIp + '/articles/' + this.props.route.params.articleId, {
                    method : 'GET'
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

    addArticle = () => {
        if(!(this.state.title && this.state.content && this.state.videoLink)){
            Alert.alert('Invalid input','Input fields cannot be empty');
        } else {
            fetch(serverIp + '/articles' + (this.state.request === 'PUT' ? '/' + this.state.articleID : ''), {
                method: this.state.request,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // author: this.state.author,
                    author: 'newAuthor',
                    title: this.state.title,
                    content: this.state.content,
                    videoLink: this.state.videoLink,
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
                    <View>
                        <Text>Add Article</Text>
                        <TextInput style = {styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Title"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.title}
                                   onChangeText = { (text) => { this.setState( {title: text} ) }}/>

                        <TextInput style = {styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Content"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.content}
                                   onChangeText = { (text) => { this.setState( {content: text} ) }}/>
                        <TextInput style = {styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "Video Url"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value = {this.state.videoLink}
                                   onChangeText = { (text) => { this.setState( {videoLink: text} ) }}/>
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress = {
                                () => {
                                    this.addArticle();
                                    this.props.navigation.goBack();
                                }
                            }>
                            <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                        <Text>
                            Add support for pictures{"\n"}
                            Only YouTube links are supported
                        </Text>
                    </View>
                )
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
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
    }
});