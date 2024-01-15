import React, {Component} from 'react'
import {Alert, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {serverIp} from "../env/Variables";
import {Block, Button, Input, theme, Text} from "galio-framework";
import {sha256} from "react-native-sha256";

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
        sha256(text).then(hash => this.setState({ password: hash }));
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
            <Block style = {styles.container} center>
                <Text h6 style={{padding:5}} color="#7a42f4">
                    SignUp
                </Text>
                <Input placeholder="Username"
                       // color={theme.COLORS.THEME}
                       color={"#7a42f4"}
                       style={{ borderColor: "#9a73ef" }}
                           underlineColorAndroid = "transparent"
                           // placeholder = "Username"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handleUsername}/>

                <Input placeholder="Password" password viewPass
                       style={{ borderColor: "#9a73ef" }}
                       color={"#7a42f4"}
                           underlineColorAndroid = "transparent"
                           // placeholder = "Password"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handlePassword}/>

                <Button
                    round
                    size="large"
                    color="#7a42f4"
                    // style = {styles.submitButton}
                    onPress = {
                        () => this.signup(this.state.username, this.state.password)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </Button>
            </Block>
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
