import React, { Component } from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Button} from 'react-native'
import MainApp from "../MainApp";

const Separator = () => <View style={styles.separator} />;

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
    login = (username, password) => {
        // enable the if and else for authentication
        if(!(username && password)){
            alert('username and password cannot be empty');
        } else
            if(username === "test" && password === "test"){
                this.props.navigation.navigate("MainApp");
            } else {
                alert('username: ' + username + ' password: ' + password + "\nis not a valid user");
            }
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text>
                    LogIn
                </Text>
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
                <Text>
                    Test user is: username: test, password: test
                </Text>
                <Separator />
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.props.navigation.navigate("SignUp")
                    }>
                    <Text style = {styles.submitButtonText}> Create a new account </Text>
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
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});