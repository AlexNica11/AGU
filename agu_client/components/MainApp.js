import {View, Alert, StyleSheet} from "react-native";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ArticlesScreen from "./articles/ArticlesScreen";
import ArticlesNavigator from "./articles/ArticlesNavigator";
import * as SecureStore from "expo-secure-store";
import FindBabyScreen from "./baby/FindBabyScreen";
import {Block, Button, Text} from "galio-framework";

function HomeScreen({ navigation }) {
    return (
        <Block style={styles.blockComp}>
            <Text h4 style={{padding:20}}>
                Welcome to AGU, a helping hand to all moms
            </Text>
            <Block center style={{padding:10}}>
                <Text h5>
                    {'\n'}
                    Articles to help you with your baby life:
                </Text>
                <Button
                    round
                    size="large"
                    color="#7a42f4"
                    onPress = {() => {
                        navigation.navigate("Articles")
                    }}>
                    <Text style = {styles.submitButtonText}> Go to Articles </Text>
                </Button>
                <Text h5>
                    {'\n'}
                    Articles to help you with your baby life:
                </Text>
                <Button
                    round
                    size="large"
                    color="#7a42f4"
                    onPress = {() => {
                        navigation.navigate("Recipes")
                    }}>
                    <Text style = {styles.submitButtonText}> Go to Recipes </Text>
                </Button>
            </Block>
        </Block>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
            <Button onPress={() => navigation.navigate("Home")} title="Go back home" />
        </View>
    );
}

function LogoutScreen({navigation}){
    return (
        <View/>
    )
}

function LogoutAlert(navigation){
    Alert.alert("Logout", "Do you want to Logout?", [
        {
            text: 'Cancel',
            onPress: () => {
                navigation.navigate("Home")
            },
            style: 'cancel'
        },
        {
            text: 'Ok',
            onPress: async () => {
                await SecureStore.setItemAsync("jwt", "");
                await SecureStore.setItemAsync("username", "");
                navigation.navigate("LogIn")
            },
        }
    ])
}

function AboutUsPage(navigation){
    return(
        <Block style={styles.blockComp}>
            <Text h4 style={{padding: 10}}>
                AGU Team
            </Text>
            <Text p>
                We are a team of 2 students working on an app targeted at people with small children.
            </Text>
            <Text p>
                Contacts:
            </Text>
            <Text>
                Nica Alexandru: alexandru.nika2001@gmail.com
            </Text>
            <Text>
                Berehorschi Ana:
            </Text>
        </Block>
    )
}

const Drawer = createDrawerNavigator();

// to be added if time is available
// const Tab = createBottomTabNavigator();

function MainApp () {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Articles" component={ArticlesNavigator}/>
            <Drawer.Screen name="Recipes" component={ArticlesScreen}/>
            <Drawer.Screen name="Find a baby" component={FindBabyScreen}/>
            <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
            <Drawer.Screen name="About Us" component={AboutUsPage}/>
            <Drawer.Screen name="Logout" component={LogoutScreen} listeners={({navigation}) => ({
                drawerItemPress: (e) => {
                    // Prevent default action
                    e.preventDefault();
                    LogoutAlert(navigation);
                }
            })} />
        </Drawer.Navigator>
    )
}

export default MainApp;

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
    blockComp:{
        flex: 1,
        alignItems: "center",
        backgroundColor: '#f9c2ff'
    },
});
