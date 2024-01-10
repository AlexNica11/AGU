import React, { Component } from 'react'
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import {theme, Input, Block, Button, Text} from 'galio-framework';
import MainApp from "../MainApp";
import {serverIp} from "../env/Variables";

const Separator = () => <View style={styles.separator} />;

class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        password: '',
    }

    signIn = async (username, password) => {
        let jwt = "";
        try {
            const response = await fetch(serverIp + '/users/signin', {
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
            const json = await response.json();
            // console.log(response.status);
            // console.log(json.jwt);

            jwt = json.jwt;
            const decodedToken = jwtDecode(jwt);
            // console.log(decodedToken);
            await SecureStore.setItemAsync("username", decodedToken.sub);
            // console.log(decodedToken.sub);
        } catch (error){
            console.error(error);
        }

        await SecureStore.setItemAsync("jwt", jwt);
        // console.log(await SecureStore.getItemAsync("jwt"));
        // console.log(await SecureStore.getItemAsync("username"));
    }

    handleUsername = (text) => {
        this.setState({ username: text });
    }
    handlePassword = (text) => {
        this.setState({ password: text });
    }
    login = async (username, password) => {
        // enable the if and else for authentication
        if (!(username && password)) {
            alert('username and password cannot be empty');
        } else {
            await this.signIn(username, password);
            let jwt = await SecureStore.getItemAsync("jwt");
            if (jwt !== "") {
                this.props.navigation.navigate("MainApp");
            } else {
                alert('username: ' + username + ' password: ' + password + "\nis not a valid user");
            }
        }
    }

    render() {
        return (
            <Block style = {styles.container} center >
                <Text h6 style={{padding:5}} color="#7a42f4">
                    LogIn
                </Text>
                {/*<TextInput style = {styles.input}*/}
                <Input placeholder="Username"
                       color={"#7a42f4"}
                       style={{ borderColor: "#9a73ef" }}
                       // placeholderTextColor={theme.COLORS.THEME}
                           underlineColorAndroid = "transparent"
                           // placeholder = "Username"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handleUsername}/>

                {/*<TextInput style = {styles.input}*/}
                <Input
                    placeholder="Password" password viewPass
                       color={"#7a42f4"}
                       style={{ borderColor: "#9a73ef" }}
                           underlineColorAndroid = "transparent"
                           // placeholder = "Password"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handlePassword}
                           // secureTextEntry
                />

                <Button
                    round
                    size="large"
                    color="#7a42f4"
                    // style = {styles.submitButton}
                    onPress = {
                        () => this.login(this.state.username, this.state.password)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </Button>
                <Separator />
                <Button
                    round
                    size="large"
                    color="#7a42f4"
                    // style = {styles.submitButton}
                    onPress = {
                        () => this.props.navigation.navigate("SignUp")
                    }>
                    <Text style = {styles.submitButtonText}> Create a new account </Text>
                </Button>
            </Block>
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
