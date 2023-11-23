import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import MainApp from "./MainApp";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        password: ''
    }
    handleUsername = (text) => {
        this.setState({ username: text });
    }
    handlePassword = (text) => {
        this.setState({ password: text });
    }
    login = (username, pass) => {
        if(username === "test" && pass === "test"){
            this.props.navigation.navigate("MainApp");
        } else {
            alert('username: ' + username + ' password: ' + pass + "\n is not a valid user");
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Username"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handleUsername}/>

                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Password"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handlePassword}/>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.login(this.state.username, this.state.password)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default LoginScreen;

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