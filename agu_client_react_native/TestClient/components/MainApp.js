import {Button, View, Alert} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ArticlesScreen from "./articles/ArticlesScreen";
import ArticlesNavigator from "./articles/ArticlesNavigator";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
            <Button
                onPress={() => navigation.navigate("Notifications")}
                title="Go to notifications"
            />
        </View>
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
            onPress: () => {
                navigation.navigate("LogIn")
            },
        }
    ])
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
            <Drawer.Screen name="Find a baby" component={NotificationsScreen}/>
            <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
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