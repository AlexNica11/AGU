import React, {Component} from "react";
import {StyleSheet, TextInput, View, Text} from 'react-native'

export default class AddArticle extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        title : '',
        content : '',
        videoLink : '',
        pictures : []
    }

    render() {
        return(
            <View>
                <Text>Add Article</Text>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Title"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = { (text) => { this.setState( {title: text} ) }}/>

                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Content"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = { (text) => { this.setState( {content: text} ) }}/>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Video Url"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = { (text) => { this.setState( {videoLink: text} ) }}/>
                <Text>
                    Add support for pictures
                </Text>
            </View>
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
});