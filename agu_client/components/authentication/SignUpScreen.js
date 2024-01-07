import React, {Component} from 'react'
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {serverIp} from "../env/Variables";

class SignUpScreen extends Component {
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

    signIn = async (username, password) => {
        try {
            const response = await fetch(serverIp + '/users/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            return response.status;
        } catch (error){
            console.error(error);
            return 401;
        }
    }

    signup = async (username, password) => {
        if (!(username && password)) {
            alert('Username and password cannot be empty');
        } else {
            let response = await this.signIn(username, password);
            if (response === 201) {
                Alert.alert("Sign-up successful", "User: " + username + " has been signed up", [
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.props.navigation.navigate("LogIn")
                        },
                    },
                ])
            } else {
                alert('Username: ' + username + "\nis already in use");
            }
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text>
                    SignUp
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
                        () => this.signup(this.state.username, this.state.password)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default SignUpScreen;

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